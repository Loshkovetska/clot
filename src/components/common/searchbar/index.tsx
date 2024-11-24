"use client";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

import { CloseIcon, SearchIcon } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { ROUTES } from "@/lib/constants/routes";
import { cn } from "@/lib/utils";

type SearchBarPropType = {
  className?: string;
  formClassName?: string;
  searchValue?: string;
  navigateOnSubmit?: boolean;
  setSearchValue?: Dispatch<SetStateAction<string>>;
};

export default function SearchBar({
  formClassName,
  className,
  searchValue,
  navigateOnSubmit = true,
  setSearchValue,
}: SearchBarPropType) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [value, setValue] = useState("");

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (setSearchValue) return setSearchValue?.(e.target.value);

      setValue(e.target.value);
    },
    [setSearchValue]
  );

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      navigateOnSubmit && router.push(`${ROUTES.products}?q=${value}`);
    },
    [value, router, navigateOnSubmit]
  );

  useEffect(() => {
    if (searchParams.get("q")) {
      setTimeout(() => {
        setValue(searchParams?.get("q") || "");
      }, 1000);
    }
  }, [searchParams]);

  return (
    <form
      onSubmit={onSubmit}
      className={cn("w-full", formClassName)}
    >
      <Input
        value={value || searchValue}
        variant="rounded"
        placeholder="Search"
        className={className}
        iconLeft={<SearchIcon />}
        iconRight={
          (value || searchValue)?.length ? (
            <CloseIcon onClick={() => (setSearchValue || setValue)?.("")} />
          ) : undefined
        }
        onChange={handleChange}
      />
    </form>
  );
}
