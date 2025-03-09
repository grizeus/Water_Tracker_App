import { BaseModalWindow } from "src/components/index.js";
import {
  ModalWrap,
  ModalTitle,
  List,
  CancelBtn,
  LogOutBtn,
} from "./UserLogoutModal.styled.jsx";
import { useDispatch, useSelector } from "react-redux";
import { logOutThunk } from "src/redux/auth/operations";

import { selectIsLoading } from "src/redux/root/selectors";
import { ContentLoader } from "../../common/Loader/Loader";

export const UserLogoutModal = ({ onClose, onShow }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const stylesPadding = "32px 24px";
  return (
    <>
      <BaseModalWindow
        onClose={onClose}
        onShow={onShow}
        stylesPadding={stylesPadding}
        title="Log out">
        <ModalWrap>
          <ModalTitle>Do you really want to leave?</ModalTitle>
          <List>
            <li>
              <CancelBtn type="button" onClick={onClose}>
                Cancel
              </CancelBtn>
            </li>
            <li>
              <LogOutBtn type="button" onClick={() => dispatch(logOutThunk())}>
                Log out {isLoading && <ContentLoader />}
              </LogOutBtn>
            </li>
          </List>
        </ModalWrap>
      </BaseModalWindow>
    </>
  );
};
