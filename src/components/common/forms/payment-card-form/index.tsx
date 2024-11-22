import { UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function PaymentCardForm({
  form,
}: {
  form: UseFormReturn<any>;
}) {
  return (
    <>
      <FormField
        control={form.control}
        name="card_number"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                {...field}
                placeholder="Card Number"
                sizeB="lg"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex w-full items-center gap-5">
        <FormField
          control={form.control}
          name="ccv"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="CCV"
                  sizeB="lg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="expired_date"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Exp"
                  sizeB="lg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="cardholder_name"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                {...field}
                placeholder="Cardholder Name"
                sizeB="lg"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
