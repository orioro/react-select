import type { ReactElement, ReactNode } from 'react'

type NotUndefined = null | string | number | boolean | object | symbol

type _AnyObject = {
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

export type LabelProps = SelectContext & {
  label: string
  labelProps: _AnyObject
  style: ComputedComponentStyle
}
export type ComboboxProps = SelectContext & {
  comboboxProps: _AnyObject
  children: ReactNode
  style: ComputedComponentStyle
}
export type TextInputProps = SelectContext & {
  inputProps: _AnyObject
  style: ComputedComponentStyle
}
export type ToggleMenuButtonProps = SelectContext & {
  buttonProps: _AnyObject
  children: ReactNode
  style: ComputedComponentStyle
}
export type MenuProps = SelectContext & {
  menuProps: _AnyObject
  getOptionDomProps: (option: any) => _AnyObject
  style: ComputedComponentStyle
  renderOption: (props: { option: any; index: number }) => ReactElement
}
export type MenuOptionProps = SelectContext & {
  isHighlighted: boolean
  style: ComputedComponentStyle
  option: any
}

export type ComponentStyleSpec<T> =
  | string
  | ((props: T) => string | _AnyObject)
  | _AnyObject
export type ComputedComponentStyle = string | _AnyObject
export type Component<T> = (props: T) => ReactElement

export type SelectStyles = {
  Select?: ComponentStyleSpec<SelectContext>
  Label?: ComponentStyleSpec<SelectContext>
  Combobox?: ComponentStyleSpec<SelectContext>
  TextInput?: ComponentStyleSpec<SelectContext>
  ToggleMenuButton?: ComponentStyleSpec<SelectContext>
  Menu?: ComponentStyleSpec<SelectContext>
  MenuOption?: ComponentStyleSpec<
    SelectContext & {
      isHighlighted: boolean
      option: Option
      index: number
    }
  >
}

export type SelectComponents = {
  Label: Component<LabelProps>
  Combobox: Component<ComboboxProps>
  TextInput: Component<TextInputProps>
  ToggleMenuButton: Component<ToggleMenuButtonProps>
  Menu: Component<MenuProps>
  MenuOption: Component<MenuOptionProps>
}

export type FnOnSetSearchText = (newSearchText: string) => void

export type SelectProps = {
  className?: string
  valueToString?: FnValueToString
  options: Option[]
  label: string

  value: NotUndefined
  onSetValue: (newValue: any) => void

  searchText: string
  onSetSearchText: FnOnSetSearchText

  components?: {
    Label?: Component<LabelProps>
    Combobox?: Component<ComboboxProps>
    TextInput?: Component<TextInputProps>
    ToggleMenuButton?: Component<ToggleMenuButtonProps>
    Menu?: Component<MenuProps>
    MenuOption?: Component<MenuOptionProps>
  }
  styles?: SelectStyles
}
