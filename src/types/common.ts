import { ReactElement } from 'react'

// 
// https://github.com/microsoft/TypeScript/issues/7648#issuecomment-541625573
// 
export type NotUndefined =
  | string
  | number
  | boolean
  | symbol
  | bigint
  | object
  | null

export type PlainObject = {
  [key: string]: any
}
export type FnValueToString<ValueType = any> = (
  value: ValueType | null
) => string
export type ComponentType<PropsType> = (props: PropsType) => ReactElement

export type ComponentStyleType<ContextType = any> =
  | null
  | string
  | PlainObject
  | ((context: ContextType) => string | null)

export type Option<ValueType = NotUndefined> = {
  label: string
  value: ValueType
  disabled?: boolean
}
