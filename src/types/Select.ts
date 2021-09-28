import type { ReactElement, ReactNode } from 'react'
import type {
  PlainObject,
  FnValueToString,
  ComponentType,
  ComponentStyleType,
} from './common'

export type SelectState<OptionType = any> = {
  isOpen: boolean
  highlightedIndex: number
  searchText: string
  value: OptionType
  options: OptionType[]
}

export type SelectActions<OptionType = any> = {
  closeMenu: () => void
  openMenu: () => void
  selectOption: (option: OptionType) => void
  setHighlightedIndex: (index: number) => void
  setInputValue: (value: string) => void
  toggleMenu: () => void
  reset: () => void
}

export type SelectContext<OptionType = any> = {
  state: SelectState<OptionType>
  valueToString: FnValueToString<OptionType>
  actions: SelectActions<OptionType>
}

export type SelectComponentType<PropsType, OptionType = any> = ComponentType<
  SelectContext<OptionType> & {
    className: string
  } & PropsType
>

export type LabelType<OptionType = any> = SelectComponentType<
  {
    children: ReactNode
    labelProps: PlainObject
  },
  OptionType
>

export type ComboboxType<OptionType = any> = SelectComponentType<
  {
    children: ReactNode
    comboboxProps: PlainObject
  },
  OptionType
>

export type TextInputType<OptionType = any> = SelectComponentType<
  {
    inputProps: PlainObject
  },
  OptionType
>

export type ToggleMenuButtonType<OptionType = any> = SelectComponentType<
  {
    buttonProps: PlainObject
    children: ReactNode
  },
  OptionType
>

export type MenuType<OptionType = any> = SelectComponentType<
  {
    menuProps: PlainObject
    getOptionDomProps: (opts: { option: any; index: number }) => PlainObject
    renderOption: (props: { option: any; index: number }) => ReactElement
  },
  OptionType
>

type MenuOptionContext = {
  isHighlighted: boolean
  option: any
  index: number
}

export type MenuOptionType<OptionType = any> = SelectComponentType<
  MenuOptionContext,
  OptionType
>

export type InfoBoxType<OptionType = any> = SelectComponentType<
  {
    children: ReactNode
  },
  OptionType
>

export type ClearButtonType<OptionType = any> = SelectComponentType<
  any,
  OptionType
>

export type SelectComponents<OptionType = any> = {
  Label: LabelType<OptionType>
  Combobox: ComboboxType<OptionType>
  TextInput: TextInputType<OptionType>
  ToggleMenuButton: ToggleMenuButtonType<OptionType>
  Menu: MenuType<OptionType>
  MenuOption: MenuOptionType<OptionType>
  InfoBox: InfoBoxType<OptionType>
  ClearButton: ClearButtonType<OptionType>
}

export type SelectComponentStyleType<
  PropsType = any,
  OptionType = any
> = ComponentStyleType<SelectContext<OptionType> & PropsType>

export type Component<PropsType> = (props: PropsType) => ReactElement

export type MenuOptionStyleType = SelectComponentStyleType<MenuOptionContext>

export type SelectComponentStyles<OptionType = any> = {
  Select: SelectComponentStyleType<any, OptionType>
  Label: SelectComponentStyleType<any, OptionType>
  Combobox: SelectComponentStyleType<any, OptionType>
  TextInput: SelectComponentStyleType<any, OptionType>
  ToggleMenuButton: SelectComponentStyleType<any, OptionType>
  Menu: SelectComponentStyleType<any, OptionType>
  MenuOption: MenuOptionStyleType
  InfoBox: SelectComponentStyleType<any, OptionType>
}

export type FnOnSearchTextChange = (newSearchText: string) => void

export type SelectProps<OptionType = any> = {
  valueToString?: FnValueToString<OptionType>
  options: OptionType[]
  label: ReactNode
  info: ReactNode

  value: OptionType | null
  onSetValue: (newValue: OptionType | null) => void

  onSearchTextChange: FnOnSearchTextChange
  textInputProps?: PlainObject

  //
  // About Partial<T>
  // https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype
  //
  components?: Partial<SelectComponents<OptionType>>
  classNames?: Partial<SelectComponentStyles<OptionType>>
}

export type SelectType = <OptionType = any>(
  props: SelectProps<OptionType>
) => React.ReactElement
