import { Field, FieldProps } from "formik";

import type { Gender } from "../../../../types/global";

const GenderSelect = () => {
  return (
    <div className="mb-6 xl:mb-[52px]">
      <p className="mb-3 text-lg font-medium leading-5">Your gender identity</p>
      <div className="flex gap-6">
        <div className="flex">
          <Field
            className="absolute opacity-0"
            type="radio"
            name="gender"
            value="woman"
            id="gender-woman"
          />
          <label
            htmlFor="gender-woman"
            className="relative inline-block cursor-pointer pl-6">
            <span className="absolute left-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border border-royal bg-white"></span>
            <Field name="gender">
              {({ field }: FieldProps<string, Gender>) => (
                <span
                  className={`absolute left-1 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-royal transition-opacity duration-200 ${
                    field.value === "woman" ? "opacity-100" : "opacity-0"
                  }`}></span>
              )}
            </Field>
            <span className="text-base leading-5">Woman</span>
          </label>
        </div>
        <div className="flex">
          <Field
            className="absolute opacity-0"
            type="radio"
            name="gender"
            value="man"
            id="gender-man"
          />
          <label
            htmlFor="gender-man"
            className="relative inline-block cursor-pointer pl-6">
            <span className="absolute left-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border border-royal bg-white"></span>
            <Field name="gender">
              {({ field }: FieldProps<string, Gender>) => (
                <span
                  className={`absolute left-1 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-royal transition-opacity duration-200 ${
                    field.value === "man" ? "opacity-100" : "opacity-0"
                  }`}></span>
              )}
            </Field>
            <span className="text-base leading-5">Man</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default GenderSelect;
