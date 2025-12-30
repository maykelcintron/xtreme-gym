import { forwardRef } from "react";

interface InputFieldProps {
  label?: string;
  type: string;
  placeholder?: string;
  error?: string;
  value?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, type, placeholder, error, ...props }, ref) => {
    return (
      <div className="text-white flex flex-col gap-2">
        {label && (
          <label className="font-medium text-[16px]">
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={`p-2 text-[16px] rounded-md text-gray-800 w-full outline-none ${
            type === "submit" 
              ? "bg-red-600 text-white font-medium hover:cursor-pointer hover:bg-red-500 transition-colors duration-300" 
              : error 
                ? "border-2 border-red-500 bg-white" 
                : "bg-white"
          }`}
          {...props}
        />
        {error && (
          <span className="text-red-400 text-sm mt-1">
            {error}
          </span>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";
export default InputField;