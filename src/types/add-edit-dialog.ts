import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { addressScheme, cardScheme, profileInfoScheme } from "@/lib/scheme";

type MainInfoFormType = UseFormReturn<z.infer<typeof profileInfoScheme>>;

type AddressFormType = UseFormReturn<z.infer<typeof addressScheme>>;

type CardFormType = UseFormReturn<z.infer<typeof cardScheme>>;

type AddEditDialogFormType = {
  form: MainInfoFormType | AddressFormType | CardFormType;
};

export type {
  AddEditDialogFormType,
  AddressFormType,
  CardFormType,
  MainInfoFormType,
};
