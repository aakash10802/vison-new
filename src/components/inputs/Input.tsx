import React from "react";
import { twMerge } from "tailwind-merge";

const Input = ({
  value,
  name,
  register,
  onChange,
  label,
  className,
  type = "text",
  disabled = false,
}: {
  disabled?: boolean;
  value: string;
  name: string;
  register: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  className?: string;
  type?: string;
}) => {
  return (
    <div
      className={twMerge(
        "relative transition-all min-w-full",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      )}
    >
      <input
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        id={name}
        {...register}
        placeholder=" "
        className={twMerge(
          "block rounded-md focus:border-red-600 border-[1px] border-neutral-700 transition-all px-6 pt-6 pb-1 w-full text-md text-white bg-neutral-700 appearance-none focus:outline-none focus:ring-0 peer invalid:border-b-1 invalid:border-red-600 disabled:cursor-not-allowed",
          className
        )}
        autoComplete=" "
        disabled={disabled}
      />

      <label
        htmlFor={name}
        className={twMerge(
          `
      absolute 
      text-md
    text-zinc-400
      duration-150 
      transform 
      -translate-y-3 
      scale-75 
      top-4 
      z-10 
      origin-[0] 
      left-6
      peer-placeholder-shown:scale-100 
      peer-placeholder-shown:translate-y-0 
      peer-focus:scale-75
      peer-focus:-translate-y-3 capitalize
    `,
          disabled ? "cursor-not-allowed" : ""
        )}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
