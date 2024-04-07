"use client";

import React, { useState } from "react";
import { MultiSelect, Option } from "react-multi-select-component";
import "./multipleSelect.scss";

type MultipleSelectProps = {
  label: string;
  options?: Option[];
  handleChange?: (value: Option[]) => void;
};

const MultipleSelect = ({
  label,
  options,
  handleChange,
}: MultipleSelectProps) => {
  const [selected, setSelected] = useState<Option[]>([]);

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
