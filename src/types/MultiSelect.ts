import { SelectProps } from './Select'

import {
  ComponentStyleType,
  ComponentType,
  FnValueToString,
  PlainObject,
} from './common'
import { ReactNode } from 'react'

export type MultiSelectState<OptionType = any> = {
  value: OptionType[]
}

export type MultiSelectContext<OptionType = any> = {
  state: MultiSelectState<OptionType>
  valueToString: FnValueToString<OptionType>
}

type MultiSelectComponentType<PropsType, OptionType = any> = ComponentType<
  MultiSelectContext<OptionType> & {
    className: string
  } & PropsType
>

export type SelectedValueListType<OptionType = any> = MultiSelectComponentType<
  {
    getValueDomProps: (opts: { value: any; index: number }) => PlainObject
    renderValue: (opts: { value: any; index: number }) => ReactNode
  },
  OptionType
>

export type SelectedValueType<OptionType = any> = MultiSelectComponentType<
  {
    value: any
    index: number
    onRemove: (item: any) => void
  },
  OptionType
>

export type MultiSelectComponents<OptionType = any> = {
  SelectedValueList: SelectedValueListType<OptionType>
  SelectedValue: SelectedValueType<OptionType>
}

export type MultiSelectComponentStyleType<
  PropsType = any,
  OptionType = any
> = ComponentStyleType<MultiSelectContext<OptionType> & PropsType>

export type SelectedValueStyleType<OptionType = any> =
  MultiSelectComponentStyleType<
    {
      value: any
      index: number
    },
    OptionType
  >

export type MultiSelectComponentStyles<OptionType = any> = {
  MultiSelect: MultiSelectComponentStyleType
  SelectedValueList: MultiSelectComponentStyleType
  SelectedValue: SelectedValueStyleType<OptionType>
}

export type MultiSelectProps<OptionType = any> = Omit<
  SelectProps<OptionType>,
  'value' | 'onSetValue'
> & {
  value: OptionType[]
  onSetValue: (newValue: OptionType[]) => void

  components?: Partial<MultiSelectComponents<OptionType>>
  classNames?: Partial<MultiSelectComponentStyles<OptionType>>
}

export type MultiSelectType = <OptionType = any>(
  props: MultiSelectProps<OptionType>
) => React.ReactElement
