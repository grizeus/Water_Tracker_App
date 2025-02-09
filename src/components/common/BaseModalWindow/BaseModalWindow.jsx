import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  BaseModalStyled,
  CloseButton,
  CloseIcon,
  ModalContent,
  ModalHeader,
} from './BaseModalWindow.styled';
import sprite from 'src/assets/images/sprite/sprite.svg';
import { CSSTransition } from 'react-transition-group';

export const BaseModalWindow = ({
  onShow = true,
  children,
  title,
  onClose,
  stylesPadding,
}) => {
  const modalRoot = document.querySelector('#modal-root');

  const backdropRef = useRef(null);
  const modalContentRef = useRef(null);

  useEffect(() => {}, [modalRoot.children.length, onShow, onClose]);

  return createPortal(
    <>
      <CSSTransition
        in={onShow}
        nodeRef={backdropRef}
        timeout={600}
        classNames="base-modal"
        unmountOnExit
      >
        <BaseModalStyled onClick={onClose} ref={backdropRef} />
      </CSSTransition>
      <CSSTransition
        in={onShow}
        nodeRef={modalContentRef}
        timeout={600}
        classNames="modal-content"
        unmountOnExit
      >
        <ModalContent onClick={e => e.stopPropagation()} ref={modalContentRef}>
          <ModalHeader stylesPadding={stylesPadding}>
            <h2>{title}</h2>
            <CloseButton onClick={onClose}>
              <CloseIcon>
                <use href={`${sprite}#icon-outline`}></use>
              </CloseIcon>
            </CloseButton>
          </ModalHeader>
          <div>{children}</div>
        </ModalContent>
      </CSSTransition>
    </>,
    modalRoot,
  );
};
