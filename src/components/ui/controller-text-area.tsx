import { FieldError, Label, TextArea, TextField } from "@heroui/react";
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form";

type ControllerTextAreaProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  className: string;
};

export const ControllerTextArea = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  className,
}: ControllerTextAreaProps<T>) => (
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
        <TextArea
          {...field}
          className="resize-none"
          aria-label={label}
          id={name}
          placeholder={placeholder}
          rows={6}
        />
        <FieldError>{fieldState.error?.message}</FieldError>
      </TextField>
    )}
  />
);
