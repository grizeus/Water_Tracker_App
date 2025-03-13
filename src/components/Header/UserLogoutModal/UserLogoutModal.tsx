import { useDispatch, useSelector } from "react-redux";

import { BaseModalWindow } from "../../common/BaseModalWindow/BaseModalWindow";
import { logOutThunk } from "../../../redux/auth/operations";
import { selectIsLoading } from "../../../redux/root/selectors";
import { ContentLoader } from "../../common/Loader/Loader";
import { AppDispatch } from "../../../redux/store";
import { OpenerType } from "../../../../types/global";

export const UserLogoutModal = ({
  onClose,
  onShow,
}: {
  onClose: OpenerType;
  onShow: OpenerType;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectIsLoading);
  const handleLogout = () => {
    void dispatch(logOutThunk());
  };
  return (
    <BaseModalWindow onClose={onClose} onShow={onShow} title="Log out">
      <div className="px-6 pb-8">
        <p className="mb-6 max-w-[232px] text-lg font-medium leading-5 text-charcoal md:min-w-[544px] md:max-w-full">
          Are you sure you want to delete the entry?
        </p>
        <ul className="flex flex-col-reverse gap-6 md:flex-row md:justify-end">
          <li>
            <button
              className="min-w-full rounded-[10px] bg-hawkes px-[30px] py-2 text-base font-medium leading-5 text-royal shadow-sm transition-shadow duration-300 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none md:min-w-40 md:py-2.5 md:text-lg md:leading-6"
              type="button"
              onClick={onClose}>
              Cancel
            </button>
          </li>
          <li>
            <button
              className="min-w-full rounded-[10px] bg-sunset px-[30px] py-2 text-base font-medium leading-5 text-white shadow-sm transition-shadow duration-300 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none md:min-w-40 md:py-2.5 md:text-lg md:leading-6"
              type="button"
              onClick={handleLogout}>
              Log out {isLoading && <ContentLoader />}
            </button>
          </li>
        </ul>
      </div>
    </BaseModalWindow>
  );
};
