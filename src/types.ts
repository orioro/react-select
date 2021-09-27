import type { ReactElement, ReactNode } from 'react'

type NotUndefined = null | string | number | boolean | object | symbol

export type PlainObject = {
  [key: string]: any
}

export type Option = NotUndefined
export type FnValueToString = (value: any) => string

export type SelectState = {
  isOpen: boolean
  highlightedIndex: number
  searchText: string
  value: Option
  options: Option[]
}

export type SelectContext = {
  state: SelectState
  valueToString: FnValueToString
}

type CommonSelectComponentProps = SelectContext & {
  className: string
}

export type LabelProps = CommonSelectComponentProps & {
  children: ReactNode
  labelProps: PlainObject
}
export type ComboboxProps = CommonSelectComponentProps & {
  comboboxProps: PlainObject
  children: ReactNode
}
export type TextInputProps = CommonSelectComponentProps & {
  inputProps: PlainObject
}
export type ToggleMenuButtonProps = CommonSelectComponentProps & {
  buttonProps: PlainObject
  children: ReactNode
}
export type MenuProps = CommonSelectComponentProps & {
  menuProps: PlainObject
  getOptionDomProps: (option: any) => PlainObject
  renderOption: (props: { option: any; index: number }) => ReactElement
}
export type MenuOptionProps = CommonSelectComponentProps & {
  isHighlighted: boolean
  option: any
  index: number
}
export type InfoBoxProps = CommonSelectComponentProps & {
  children: ReactNode
}

export type ComponentStyleSpec<StyleContextType = SelectContext> =
  | null
  | string
  | PlainObject
  | ((context: StyleContextType) => string | null)
export type Component<PropsType> = (props: PropsType) => ReactElement

export type MenuOptionStyleContext = SelectContext & {
  isHighlighted: boolean
  option: Option
  index: number
}

export type SelectComponents = {
  Label: Component<LabelProps>
  Combobox: Component<ComboboxProps>
  TextInput: Component<TextInputProps>
  ToggleMenuButton: Component<ToggleMenuButtonProps>
  Menu: Component<MenuProps>
  MenuOption: Component<MenuOptionProps>
  InfoBox: Component<InfoBoxProps>
}

export type SelectComponentStyleSpecs = {
  Container: ComponentStyleSpec
  Label: ComponentStyleSpec
  Combobox: ComponentStyleSpec
  TextInput: ComponentStyleSpec
  ToggleMenuButton: ComponentStyleSpec
  Menu: ComponentStyleSpec
  MenuOption: ComponentStyleSpec<MenuOptionStyleContext>
}

export type FnOnSearchTextChange = (newSearchText: string) => void

export type SelectProps = {
  valueToString?: FnValueToString
  options: Option[]
  label: ReactNode
  info: ReactNode

  value: NotUndefined
  onSetValue: (newValue: any) => void

  onSearchTextChange: FnOnSearchTextChange

  //
  // About Partial<T>
  // https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype
  //
  components?: Partial<SelectComponents>
  classNames?: Partial<SelectComponentStyleSpecs>
}
