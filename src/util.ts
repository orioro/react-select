import { SelectContext, ComponentStyleSpec, FnValueToString } from './types'

export const defaultValueToString: FnValueToString = (item) =>
  item ? item : ''

export const componentStyle = <ContextType>(
  context: ContextType,
  styleSpec: ComponentStyleSpec<ContextType> | null = null
) =>
  styleSpec
    ? typeof styleSpec === 'function'
      ? styleSpec(context)
      : styleSpec
    : {}
