import React, { useState } from 'react'

import { SelectInputProps } from './types'

import { Select } from './Select'
import { useAutoSearch, optionsSearcher } from './useAutoSearch'

export function SelectInput({
  value,
  onSetValue,
  options,
  noOptionsMessage,
  ...props
}: SelectInputProps): React.ReactElement {
  const [selectedOption, setSelectedOption] = useState(
    options.find((option) => option.value === value) || null
  )

  return (
    <Select
      selectedOption={selectedOption}
      onSelectOption={(nextSelectedOption) => {
        setSelectedOption(nextSelectedOption)
        onSetValue(
          nextSelectedOption === null ? null : nextSelectedOption.value
        )
      }}
      {...useAutoSearch({
        options,
        search: optionsSearcher(),
        noOptionsMessage,
      })}
      {...props}
    />
  )
}
