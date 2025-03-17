import { max } from "date-fns";
import * as Yup from "yup";

export const validationSchemaAddEntryData = Yup.object().shape({
  amount: Yup.number()
    .min(50, "The amount of water must be at least 50 ml")
    .max(5000, "The amount of water must be at least 5000 ml")
    .required("Amount is required"),
  time: Yup.string()
    .test(
      "is-valid-time",
      "Please enter a valid time (HH:mm or h:mm a)",
      value => {
        if (!value) return false;
        const is24HourFormat = /^(?:[01]?[0-9]|2[0-3]):([0-5][0-9])$/.test(
          value
        );

        const is12HourFormat =
          /^([1-9]|1[0-2]):([0-5][0-9]) ?(AM|PM|am|pm)?$/.test(value);

        return is24HourFormat || is12HourFormat;
      }
    )
    .required("Time is required"),
});
