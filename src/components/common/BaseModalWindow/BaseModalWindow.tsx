import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

import styles from "./BaseModalWindow.module.css";
import sprite from "src/assets/images/sprite/sprite.svg";
import { BaseModalWindowProps } from "../../../../types/common";

export const BaseModalWindow = ({
  onShow,
  children,
  title,
  onClose,
}: BaseModalWindowProps) => {
  const modalRoot = document.querySelector("#modal-root") as HTMLElement;
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const bodyScroll = (isDisable: boolean) => {
      document.body.style.overflow = isDisable ? "hidden" : "auto";
    };

    if (isVisible || modalRoot.children.length !== 0) {
      bodyScroll(true);
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => {
      bodyScroll(false);
      window.removeEventListener("keydown", handleEsc);
    };
  }, [modalRoot.children.length, isVisible, onClose]);

  useEffect(() => {
    if (typeof onShow === "function") {
      setIsVisible(true);
    }
  }, [onShow]);

  return createPortal(
    <>
      <CSSTransition
        in={isVisible}
        timeout={400}
        nodeRef={backdropRef}
        classNames={{
          enter: styles.enter,
          enterActive: styles.enterActive,
          exit: styles.exit,
          exitActive: styles.exitActive,
        }}
        unmountOnExit>
        <div
          className={styles.baseModal}
          onClick={onClose}
          ref={backdropRef}></div>
      </CSSTransition>

      <CSSTransition
        in={isVisible}
        timeout={400}
        nodeRef={modalContainerRef}
        classNames={{
          enter: styles.modalEnter,
          enterActive: styles.modalEnterActive,
          exit: styles.modalExit,
          exitActive: styles.modalExitActive,
        }}
        unmountOnExit>
        <div
          className={styles.modalContent}
          onClick={e => e.stopPropagation()}
          ref={modalContainerRef}>
          <div className={styles.modalHeader}>
            <h2 className={styles.secondaryTitle}>{title}</h2>
            <button className={styles.closeBtn} onClick={onClose}>
              <svg className={styles.closeIcon}>
                <use href={`${sprite}#icon-outline`}></use>
              </svg>
            </button>
          </div>
          {children}
        </div>
      </CSSTransition>
    </>,
    modalRoot
  );
};
