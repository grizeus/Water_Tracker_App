import { BaseModalWindow } from "../../common/BaseModalWindow/BaseModalWindow";
import { useDispatch, useSelector } from "react-redux";
import { deleteWaterThunk } from "../../../redux/water/operations";

import { selectIsLoading } from "../../../redux/root/selectors";
import { ContentLoader } from "../../common/Loader/Loader";
import { OpenerType, OpenerTypeWithData } from "../../components";
import { AppDispatch } from "../../../redux/store";

export const DeletingEntryModal = ({
  onClose,
  onShow,
  recordId,
}: {
  onClose: OpenerType;
  onShow: OpenerTypeWithData;
  recordId: string;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectIsLoading);

  const handleDelete = async () => {
    await dispatch(deleteWaterThunk(recordId));
    onClose();
  };
  return (
    <BaseModalWindow onClose={onClose} onShow={onShow} title={"Delete entry"}>
      <div className="px-6 pb-8 md:w-[592px]">
        <span className="mb-6 block text-[18px] font-medium leading-5 text-charcoal">
          Are you sure you want to delete the entry?
        </span>
        <div className="flex flex-col gap-6 md:flex-row-reverse">
          <button
            className="bg-sunset inline-block w-full rounded-[10px] px-[30px] py-2 text-[18px] font-medium leading-6 text-white shadow-sm transition-shadow duration-300 ease-in-out hover:shadow-lg active:shadow-none md:w-40 md:py-[10px]"
            onClick={handleDelete}>
            Delete {isLoading && <ContentLoader />}
          </button>
          <button
            className="inline-block w-full rounded-[10px] bg-hawkes px-[30px] py-2 text-[18px] font-medium leading-6 text-royal md:w-40 md:py-[10px]"
            onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </BaseModalWindow>
  );
};
