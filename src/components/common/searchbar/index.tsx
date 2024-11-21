"use client";
import { SearchIcon } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { useCallback, useState } from "react";

export default function SearchBar() {
  const [value, setValue] = useState("");
  // todo: add functionality
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);
  return (
    <Input
      value={value}
      onChange={handleChange}
      variant="rounded"
      placeholder="Search"
      iconLeft={<SearchIcon />}
    />
  );
}
