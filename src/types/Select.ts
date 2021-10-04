import type { ReactElement, ReactNode } from 'react'
import type {
  PlainObject,
  // FnValueToString,
  ComponentType,
  ComponentStyleType,
  Option,
} from './common'

export type SelectState<ValueType = any> = {
  isOpen: boolean
  highlightedIndex: number
  searchText: string
  selectedOption: Option<ValueType> | null
  options: Option<ValueType>[]
}

export type SelectActions<ValueType = any> = {
  closeMenu: () => void
  openMenu: () => void
  selectOption: (option: Option<ValueType>) => void
  setHighlightedIndex: (index: number) => void
  setInputValue: (value: string) => void
  toggleMenu: () => void
  reset: () => void
}

export type SelectContext<ValueType = any> = {
  state: SelectState<ValueType>
  // valueToString: FnValueToString<ValueType>
  actions: SelectActions<ValueType>
}

export type SelectComponentType<PropsType, ValueType = any> = ComponentType<
  SelectContext<ValueType> & {
    className: string
  } & PropsType
>

export type LabelType<ValueType = any> = SelectComponentType<
  {
    children: ReactNode
    labelProps: PlainObject
  },
  ValueType
>

export type ComboboxType<ValueType = any> = SelectComponentType<
  {
    children: ReactNode
    comboboxProps: PlainObject
  },
  ValueType
>

export type TextInputType<ValueType = any> = SelectComponentType<
  {
    inputProps: PlainObject
  },
  ValueType
>

export type ToggleMenuButtonType<ValueType = any> = SelectComponentType<
  {
    buttonProps: PlainObject
    children: ReactNode
  },
  ValueType
>

export type MenuType<ValueType = any> = SelectComponentType<
  {
    menuProps: PlainObject
    getOptionDomProps: (opts: {
      option: Option<ValueType>
      index: number
    }) => PlainObject
    renderOption: (props: {
      option: Option<ValueType>
      index: number
    }) => ReactElement
  },
  ValueType
>

type MenuOptionContext<ValueType = any> = {
  isHighlighted: boolean
  option: Option<ValueType>
  index: number
}

export type MenuOptionType<ValueType = any> = SelectComponentType<
  MenuOptionContext<ValueType>,
  ValueType
>

export type InfoBoxType<ValueType = any> = SelectComponentType<
  {
    children: ReactNode
  },
  ValueType
>

export type ClearButtonType<ValueType = any> = SelectComponentType<
  any,
  ValueType
>

export type SelectComponents<ValueType = any> = {
  Label: LabelType<ValueType>
  Combobox: ComboboxType<ValueType>
  TextInput: TextInputType<ValueType>
  ToggleMenuButton: ToggleMenuButtonType<ValueType>
  Menu: MenuType<ValueType>
  MenuOption: MenuOptionType<ValueType>
  InfoBox: InfoBoxType<ValueType>
  ClearButton: ClearButtonType<ValueType>
}

export type SelectComponentStyleType<
  PropsType = any,
  ValueType = any
> = ComponentStyleType<SelectContext<ValueType> & PropsType>

export type Component<PropsType> = (props: PropsType) => ReactElement

export type MenuOptionStyleType = SelectComponentStyleType<MenuOptionContext>

export type SelectComponentStyles<ValueType = any> = {
  Select: SelectComponentStyleType<any, ValueType>
  Label: SelectComponentStyleType<any, ValueType>
  Combobox: SelectComponentStyleType<any, ValueType>
  TextInput: SelectComponentStyleType<any, ValueType>
  ToggleMenuButton: SelectComponentStyleType<any, ValueType>
  Menu: SelectComponentStyleType<any, ValueType>
  MenuOption: MenuOptionStyleType
  InfoBox: SelectComponentStyleType<any, ValueType>
}

export type FnOnSearchTextChange = (newSearchText: string) => void

export type SelectProps<ValueType = any> = {
  // valueToString?: FnValueToString<ValueType>
  options: Option<ValueType>[]
  label: ReactNode
  placeholder?: string
  info: ReactNode

  selectedOption: Option<ValueType> | null
  onSelectOption: (option: Option<ValueType> | null) => void

  onSearchTextChange: FnOnSearchTextChange
  textInputProps?: PlainObject

  //
  // About Partial<T>
  // https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype
  //
  components?: Partial<SelectComponents<ValueType>>
  classNames?: Partial<SelectComponentStyles<ValueType>>
}

export type SelectType = <ValueType = any>(
  props: SelectProps<ValueType>
) => React.ReactElement
