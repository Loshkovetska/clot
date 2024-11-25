"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  RegisterOptions,
  UseFormReturn,
  useFormContext,
} from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  formateCCV,
  formateCardNumber,
  formateExpiredDate,
  formatePhoneNumber,
  handleInputValue,
} from "@/lib/utils/string";

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        ref={ref}
        className={cn("space-y-2 relative", className)}
        {...props}
      />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn(
        "text-sm font-medium text-destructive absolute !mt-0",
        className
      )}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

type FormElementPropType = {
  form: UseFormReturn<any>;
  name: string;
  placeholder: string;
  rules?:
    | Omit<
        RegisterOptions<any, string>,
        "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
      >
    | undefined;

  type?: "number" | "string";
  itemClassName?: string;
  disabled?: boolean;
};

const FormElement = ({
  form,
  name,
  placeholder,
  rules,
  type,
  itemClassName,
  disabled,
}: FormElementPropType) => {
  const formateInputValue = React.useCallback(
    (value: string) => {
      if (name === "card_number") return formateCardNumber(value || "");
      if (name === "ccv") return formateCCV(value);
      if (name === "expired_date") return formateExpiredDate(value);
      if (name === "phonenumber") return formatePhoneNumber(value);

      return value;
    },
    [name]
  );

  const handleValueChange = React.useCallback(
    (onChange: (value: string) => void, value: string) => {
      if (!type) return onChange(value);

      const isValid = handleInputValue(value, type);
      isValid && onChange(value.replaceAll(/[.,]/g, ""));
    },
    [type]
  );

  return (
    <FormField
      control={form.control}
      name={name}
      rules={rules}
      render={({ field, fieldState }) => (
        <FormItem className={itemClassName}>
          <FormControl>
            <Input
              {...field}
              placeholder={placeholder}
              sizeB="lg"
              variant={fieldState.invalid ? "destructive" : "default"}
              disabled={disabled}
              value={formateInputValue(field.value || "")}
              onChange={(e) =>
                handleValueChange(field.onChange, e.target.value)
              }
              onPaste={(e) =>
                handleValueChange(field.onChange, e.currentTarget.value)
              }
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export {
  Form,
  FormControl,
  FormDescription,
  FormElement,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
};
