import * as Yup from "yup";

export const validationSchemaAddEntryData = Yup.object().shape({
  amount: Yup.number()
    .min(50, "The amount of water must be at least 50 ml")
    .required("Amount is required"),
  time: Yup.string()
    .matches(
      /^([0-9]{2}):([0-9]{2})$/,
      "Please enter a valid time in the format HH:mm"
    )
    .required("Time is required"),
});
