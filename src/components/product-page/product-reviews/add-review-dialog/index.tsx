import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import { StarIcon } from "@/components/icons";
import RateBlock from "@/components/product-page/product-reviews/add-review-dialog/rate-block";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import MobileDialog from "@/components/ui/mobile-dialog";
import { Textarea } from "@/components/ui/textarea";
import { addReviewScheme } from "@/lib/scheme";
import ProductService from "@/services/product.service";
import { AddReviewFormType, AddReviewParams } from "@/types/review";

type AddReviewDialogPropType = {
  product_id: string;
  canBeRated?: boolean;
  productRate: number;
  totalReviews: number;
  onRefetch: () => void;
};

export default function AddReviewDialog({
  product_id,
  canBeRated,
  productRate,
  totalReviews,
  onRefetch,
}: AddReviewDialogPropType) {
  const [isOpen, setOpen] = useState(false);
  const form = useForm({
    defaultValues: {
      rate: 0,
      text: "",
    },
    resolver: zodResolver(addReviewScheme),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (params: AddReviewParams) => ProductService.addReview(params),
    onSuccess: () => {
      setOpen(false);
      form.reset();
      onRefetch();
    },
  });

  const addReview = useCallback(
    (values: AddReviewFormType) => {
      mutate({
        rate: values.rate,
        text: values.text || "",
        product_id,
        date: new Date(),
        productRate,
        totalReviews,
      });
    },
    [product_id, productRate, totalReviews, mutate]
  );

  const handleDialogState = useCallback(
    (fl: boolean) => {
      !fl && form.reset();
      setOpen(fl);
    },
    [form]
  );
  return (
    <MobileDialog
      open={isOpen}
      onOpenChange={handleDialogState}
      title="Rate Product"
      trigger={
        <Button
          className="max-w-[240px]"
          disabled={!canBeRated}
        >
          <StarIcon /> Add Review
        </Button>
      }
      buttonsBlock={
        <Button
          onClick={form.handleSubmit(addReview)}
          loading={isPending}
          disabled={!form.formState.isValid}
        >
          Confirm
        </Button>
      }
    >
      <Form {...form}>
        <FormField
          control={form.control}
          name="rate"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RateBlock
                  value={Number(field.value)}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
    </MobileDialog>
  );
}
