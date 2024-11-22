import { useCallback } from "react";
import { UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formatePhoneNumber } from "@/lib/utils/string";

export default function ProfileInfoForm({
  form,
}: {
  form: UseFormReturn<any>;
}) {
  const handleValueChange = useCallback(
    (
      onChange: (val: string) => void,
      value: string,
      type: "string" | "number"
    ) => {
      const isNumeric = /\d+/g.test(value);
      if (
        !value.length ||
        (isNumeric && type === "number") ||
        (!isNumeric && type === "string")
      ) {
        onChange(value.replaceAll(/[.,]/g, ""));
      }
    },

    []
  );
  return (
    <>
      <div className="flex w-full items-center gap-4">
        <FormField
          control={form.control}
          name="firstname"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  onChange={(e) =>
                    handleValueChange(field.onChange, e.target.value, "string")
                  }
                  variant={fieldState.invalid ? "destructive" : "default"}
                  placeholder="Firstname"
                  sizeB="lg"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastname"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  onChange={(e) =>
                    handleValueChange(field.onChange, e.target.value, "string")
                  }
                  variant={fieldState.invalid ? "destructive" : "default"}
                  placeholder="Lastname"
                  sizeB="lg"
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="email"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormControl>
              <Input
                {...field}
                variant={fieldState.invalid ? "destructive" : "default"}
                placeholder="Email"
                sizeB="lg"
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="phonenumber"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormControl>
              <Input
                {...field}
                onChange={(e) =>
                  handleValueChange(field.onChange, e.target.value, "number")
                }
                value={formatePhoneNumber(field.value)}
                placeholder="Phone number"
                sizeB="lg"
                variant={fieldState.invalid ? "destructive" : "default"}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
