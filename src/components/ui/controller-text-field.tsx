import { FieldError, Input, Label, TextField } from "@heroui/react";
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form";

type ControllerTextFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  type?: "email" | "text";
  className: string;
};

export const ControllerTextField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  className,
}: ControllerTextFieldProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState }) => (
      <TextField
        className={className}
        name={name}
        isInvalid={Boolean(fieldState.error)}
      >
        <Label htmlFor={name}>{label}</Label>
        <Input
          {...field}
          aria-label={label}
          id={name}
          type={type}
          placeholder={placeholder}
        />
        <FieldError>{fieldState.error?.message}</FieldError>
      </TextField>
    )}
  />
);
