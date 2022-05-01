import { QueryFunction, QueryKey, useQuery } from 'react-query'
import { useLocation } from 'react-router-dom'

export function useStatefulQuery<FieldType>(stateField: string, queryKey: any[], queryFn: QueryFunction<FieldType, QueryKey>) {
  let state = useLocation().state as { [stateField: string]: FieldType }
  if (!(state as any)[stateField]) {
    const { isLoading, error, data } = useQuery<FieldType>(queryKey, queryFn)
    return { isLoading, error, data }
  } else {
    return { isLoading: false, error: undefined, data: state[stateField] }
  }
}
