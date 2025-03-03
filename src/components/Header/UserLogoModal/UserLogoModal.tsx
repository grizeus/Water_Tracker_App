import { UserLogoutModal } from "../UserLogoutModal/UserLogoutModal";
import { SettingModal } from "../SettingModal/SettingModal";
import { useEffect, useRef, useState, RefObject } from "react";
import sprite from "src/assets/images/sprite/sprite.svg";

const UserLogoModal = ({
  setOnShowDropdown,
  parentRef,
}: {
  setOnShowDropdown: (show: boolean) => void;
  parentRef: RefObject<HTMLElement>;
}) => {
  const userMenuRef = useRef<HTMLDivElement>(null);

  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);
  const handleSetingsOpen = () => setSettingsModalOpen(true);
  const handleSetingsClose = () => setSettingsModalOpen(false);

  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const handleLogoutOpen = () => setLogoutModalOpen(true);
  const handleLogoutClose = () => setLogoutModalOpen(false);

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node) &&
        parentRef.current &&
        !parentRef.current.contains(e.target as Node)
      ) {
        setOnShowDropdown(false);
      }
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        setOnShowDropdown(false);
      }
    };

    window.addEventListener("keydown", handleEsc);
    document.addEventListener("click", clickOutside);
    return () => {
      document.removeEventListener("click", clickOutside);
      window.removeEventListener("keydown", handleEsc);
    };
  }, [parentRef, setOnShowDropdown]);

  return (
    <>
      <div
        className="absolute right-0 top-4 w-[118px] rounded-[10px] bg-white p-4 shadow-[0_4px_8px_0_rgba(64,123,255,0.2)]"
        ref={userMenuRef}>
        <ul className="flex flex-col gap-4">
          <li>
            <button
              className="group flex items-center gap-2 leading-5 text-royal transition-colors duration-300 ease-in-out hover:text-sunshade"
              type="button"
              onClick={handleSetingsOpen}>
              <svg className="size-4 fill-transparent stroke-royal transition-colors duration-300 ease-in-out group-hover:stroke-sunshade">
                <use href={`${sprite}#icon-settings`}></use>
              </svg>
              Setting
            </button>
          </li>
          <li>
            <button
              className="group flex items-center gap-2 leading-5 text-royal transition-colors duration-300 ease-in-out hover:text-sunshade"
              type="button"
              onClick={handleLogoutOpen}>
              <svg className="size-4 fill-transparent stroke-royal transition-colors duration-300 ease-in-out group-hover:stroke-sunshade">
                <use href={`${sprite}#icon-exit`}></use>
              </svg>
              Log out
            </button>
          </li>
        </ul>
        {isSettingsModalOpen && (
          <SettingModal
            onClose={handleSetingsClose}
            onShow={handleSetingsOpen}
          />
        )}
        {isLogoutModalOpen && (
          <UserLogoutModal
            onClose={handleLogoutClose}
            onShow={handleLogoutOpen}
          />
        )}
      </div>
    </>
  );
};

export default UserLogoModal;
