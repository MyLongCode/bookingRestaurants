"use client";

import React, { useEffect, useState } from "react";
import { MultiSelect, Option } from "react-multi-select-component";
import "./multipleSelect.scss";

type MultipleSelectProps = Partial<React.ComponentProps<typeof MultiSelect>> & {
  label: string;
  options?: Option[];
  handleChange?: (value: Option[]) => void;
  defaultValue?: Option[];
  className?: string;
};

const MultipleSelect = ({
  label,
  options,
  handleChange,
  defaultValue,
  className,
  ...props
}: MultipleSelectProps) => {
  const [selected, setSelected] = useState<Option[]>(defaultValue || []);

  useEffect(() => {
    if (!defaultValue) return;
    setSelected(defaultValue);
  }, [defaultValue]);

  if (!options) return null;

  return (
    <MultiSelect
      {...props}
      options={options}
      hasSelectAll={false}
      overrideStrings={{
        search: "Поиск",
        selectSomeItems: label,
        allItemsAreSelected: "Выбраны все варианты",
        noOptions: "Нет доступных вариантов",
      }}
      className={className}
      value={selected}
      labelledBy={label}
      onChange={(value: Option[]) => {
        setSelected(value);
        if (handleChange) handleChange(value);
      }}
    />
  );
};

export default MultipleSelect;
