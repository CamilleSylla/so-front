import { useRouter } from "next/router";
import React, { useState, createContext, ReactNode, useEffect } from "react";

type FilterContextType = [
  {
    category: string[];
    material: string[];
    color: string[];
    
  },
  React.Dispatch<
    React.SetStateAction<{
      category: string[];
      material: string[];
      color: string[];
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
  }>(
    {} as {
      category: string[];
      material: string[];
      color: string[];
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
        }
      );
  }, [router]);

  return (
    <FilterContext.Provider value={[filters, setFilters]}>
      {children}
    </FilterContext.Provider>
  );
}
