import { FilterContext } from "@/context/ProductsFiltersContext";
import { Listbox } from "@headlessui/react";
import { useContext, useEffect, useState } from "react";

export default function CatalogueFilter({
  values,
  type,
  label,
}: {
  values: string[];
  type: "category" | "material" | "color";
  label: string;
}) {
  const [filters, setFilters] = useContext(FilterContext);
  const [select, setSelect] = useState<string[]>([]);
  useEffect(() => {
    if (filters[type]) {
      setSelect(filters[type]);
    }
  }, []);

  useEffect(() => {
    if (filters[type]) {
      setSelect(filters[type]);
    }
  }, [filters]);

  useEffect(() => {
    setFilters({ ...filters, [type]: select });
  }, [select]);

  return (
    <Listbox
      value={select}
      onChange={setSelect}
      multiple
      as="div"
      className="w-full border-gray-400 border-b "
    >
      <Listbox.Button className="text-sm font-semibold uppercase pb-1">
        {label}
      </Listbox.Button>
      <Listbox.Options className="space-y-0 py-2">
        {values.map((value) => (
          <Listbox.Option key={value} value={value}>
            {({ selected }) => (
              <>
                <div className="flex ml-2 gap-2 hover:bg-gray-300 duration-300 cursor-pointer items-center">
                  <p>{selected ? "-" : "+"}</p>
                  <span
                    className={`block truncate text-sm line-clamp-1 lowercase first-letter:uppercase ${
                      selected ? "font-medium" : "font-normal"
                    }`}
                  >
                    {value}
                  </span>
                </div>
              </>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}
