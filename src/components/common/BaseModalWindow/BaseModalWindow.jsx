import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  BaseModalStyled,
 
  CloseIcon,
  ModalContent,
  ModalHeader,
} from "./BaseModalWindow.module.css";
import sprite from "src/assets/images/sprite/sprite.svg";
import { CSSTransition } from "react-transition-group";
export const BaseModalWindow = ({
  onShow = true,
  children,
  title,
  onClose,
  stylesPadding,
}) => {
  const modalRoot = document.querySelector("#modal-root");
  const modalContainerRef = useRef(null);
  const backdropRef = useRef(null);
  useEffect(() => {
    if (!onShow) return;
    const bodyScroll = disable => {
      document.body.style.overflow = disable ? "hidden" : "auto";
    };
    if (onShow || modalRoot.children.length !== 0) {
      bodyScroll(true);
    }
    const handleEsc = e => {
      if (e.code === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      bodyScroll(false);
      window.removeEventListener("keydown", handleEsc);
    };
  }, [modalRoot.children.length, onShow, onClose]);
  return createPortal(
    <>
      <CSSTransition
        in={onShow}
        timeout={600}
        nodeRef={backdropRef}
        classNames="base-modal"
        unmountOnExit>
        <div className={BaseModalStyled} onClick={onClose} ref={backdropRef}></div>
      </CSSTransition>
      <CSSTransition
        in={onShow}
        timeout={600}
        nodeRef={modalContainerRef}
        classNames="modal-content"
        unmountOnExit>
        <div className={ModalContent}
          onClick={e => e.stopPropagation()}
          ref={modalContainerRef}>
          <div div className={ModalHeader} stylesPadding={stylesPadding}>
            <h2>{title}</h2>
            <button onClick={onClose}>
              <svg className={CloseIcon} >
                <use href={`${sprite}#icon-outline`}></use>
              </svg>
            </button>
          </div>
          <div>{children}</div>
        </div>
      </CSSTransition>
    </>,
    modalRoot
  );
};
// BaseModalWindow.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   children: PropTypes.node.isRequired,
//   onShow: PropTypes.bool,
//   title: PropTypes.string.isRequired,
// };
