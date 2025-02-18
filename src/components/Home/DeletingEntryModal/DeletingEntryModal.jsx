import { BaseModalWindow, ContentLoader } from "components";
import { useDispatch, useSelector } from "react-redux";
import { deleteWaterThunk } from "../../../redux/water/operations.js";
import {
  BoxModal,
  ButtonBox,
  ButtonStyle,
  TextStyle,
} from "./DeletingEntryModal.styled";

import { selectIsLoading } from "src/redux/root/selectors.js";

export const DeletingEntryModal = ({ onClose, onShow, recordId }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const stylesPadding = "32px 24px";

  const handleDelete = () => {
    dispatch(deleteWaterThunk(recordId)).then(data => {
      if (!data.error) onClose();
    });
  };
  return (
    <BaseModalWindow
      onClose={onClose}
      onShow={onShow}
      stylesPadding={stylesPadding}
      title={"Delete Entry"}>
      <BoxModal>
        <TextStyle>Are you sure you want to delete the entry?</TextStyle>
        <ButtonBox>
          <ButtonStyle onClick={handleDelete}>
            Delete {isLoading && <ContentLoader />}
          </ButtonStyle>
          <ButtonStyle onClick={onClose}>Cancel</ButtonStyle>
        </ButtonBox>
      </BoxModal>
    </BaseModalWindow>
  );
};
