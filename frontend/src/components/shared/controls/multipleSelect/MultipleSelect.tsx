"use client";

import React, { useEffect, useState } from "react";
import { MultiSelect, Option } from "react-multi-select-component";
import "./multipleSelect.scss";

type MultipleSelectProps = {
  label: string;
  options?: Option[];
  handleChange?: (value: Option[]) => void;
  defaultValue?: Option[];
};

const MultipleSelect = ({
  label,
  options,
  handleChange,
  defaultValue,
}: MultipleSelectProps) => {
  const [selected, setSelected] = useState<Option[]>(defaultValue || []);

  useEffect(() => {
    if (!defaultValue) return;
    setSelected(defaultValue);
  }, [defaultValue]);

  if (!options) return null;

  return (
    <MultiSelect
      options={options}
      hasSelectAll={false}
      overrideStrings={{
        search: "Поиск",
        selectSomeItems: label,
        allItemsAreSelected: "Выбраны все варианты",
        noOptions: "Нет доступных вариантов",
      }}
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
