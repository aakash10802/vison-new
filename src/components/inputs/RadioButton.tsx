import React from "react";
import { twMerge } from "tailwind-merge";

const RadioButton = ({
  register,
  value,
  disabled,
  onChange,
  name,
  disPlayedValues,
}: {
  register: any;
  value: string;
  disabled: boolean;
  onChange: (val: string) => void;
  name: string;
  disPlayedValues: { label: string; value: string }[];
}) => {
  return (
    <div className="min-w-full flex items-start justify-start gap-3 text-white capitalize font-semibold ">
      {disPlayedValues.map((radio) => (
        <div
          key={radio.value}
          className="max-w-fit min-w-fit flex items-center justify-between px-2 gap-2  "
        >
          <label htmlFor={radio.value}>{radio.label}</label>
          <input
            type="radio"
            checked={value === radio.value}
            onChange={() => onChange(radio.value)}
            onClick={() => onChange(radio.value)}
            className={twMerge(
              "checked:accent-red-500 w-[15px] h-[15px] rounded-full border-white border-2 hover:scale-105 transition-all bg-transparent cursor-pointer disabled:cursor-not-allowed"
            )}
            disabled={disabled}
          />
        </div>
      ))}
    </div>
  );
};

export default RadioButton;
