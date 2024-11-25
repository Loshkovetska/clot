import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { toast } from "sonner";

import { QUERY_KEYS } from "@/lib/constants/querykeys";
import { setQueryData } from "@/lib/utils/add-edit";
import AddressService from "@/services/address.service";
import { AddressType } from "@/types/address";

type useAddressParams = {
  enabled?: boolean;
  onAddSuccess?: () => void;
  onUpdateSuccess?: () => void;
};

export const useAddress = ({
  enabled,
  onAddSuccess,
  onUpdateSuccess,
}: useAddressParams) => {
  const queryClient = useQueryClient();
  const { data: addresses, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.ADDRESSES],
    queryFn: () => AddressService.getAddresses(),
    enabled,
  });

  const { mutate: addAddress, isPending: addAddressPending } = useMutation({
    mutationFn: (params: Partial<AddressType>) =>
      AddressService.addAddress(params),
    onSuccess: (data) => {
      setQueryData(queryClient, QUERY_KEYS.ADDRESSES, "add", data);
      toast.success("Address was successfully added.");
      onAddSuccess?.();
    },
    onError: () => toast.error("Something went wrong"),
  });

  const { mutate: updateAddress, isPending: updateAddressPending } =
    useMutation({
      mutationFn: (params: Partial<AddressType>) =>
        AddressService.updateAddress(params),
      onSuccess: (data, vars) => {
        setQueryData(
          queryClient,
          QUERY_KEYS.ADDRESSES,
          "update",
          data,
          vars as AddressType
        );

        toast.success("Address was successfully updated.");
        onUpdateSuccess?.();
      },
      onError: () => toast.error("Something went wrong"),
    });

  const { mutate: deleteAddress, isPending: deleteAddressPending } =
    useMutation({
      mutationFn: (params: string) => AddressService.deleteAddress(params),
      onSuccess: (_, vars) => {
        setQueryData(
          queryClient,
          QUERY_KEYS.ADDRESSES,
          "delete",
          undefined,
          vars
        );
        toast.success("Address was successfully deleted.");
      },
      onError: () => toast.error("Something went wrong"),
    });

  const selectedAddress = useMemo(
    () => addresses?.find((address) => address.is_primary),
    [addresses]
  );

  return {
    addresses,
    selectedAddress,
    isLoading,
    addAddressPending,
    updateAddressPending,
    deleteAddressPending,
    addAddress,
    updateAddress,
    deleteAddress,
  };
};
