import { useRouter } from "next/router";
import React, { useState, createContext, ReactNode, useEffect } from "react";

type FilterContextType = [
  {
    category: string[];
    material: string[];
    color: string[];
    sort: string;
  },
  React.Dispatch<
    React.SetStateAction<{
      category: string[];
      material: string[];
      color: string[];
      sort: string;
    }>
  >
];

export const FilterContext = createContext<FilterContextType>(
  {} as FilterContextType
);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<{
    category: string[];
    material: string[];
    color: string[];
    sort: string;
  }>(
    {} as {
      category: string[];
      material: string[];
      color: string[];
      sort: string;
    }
  );
  const router = useRouter();

  useEffect(() => {
    if (router.asPath !== "/catalogue")
      setFilters(
        {} as {
          category: string[];
          material: string[];
          color: string[];
          sort: string;
        }
      );
  }, [router]);

  return (
    <FilterContext.Provider value={[filters, setFilters]}>
      {children}
    </FilterContext.Provider>
  );
}
