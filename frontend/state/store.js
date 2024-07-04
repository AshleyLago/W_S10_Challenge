import { configureStore } from '@reduxjs/toolkit'
import ordersReducer from './ordersSlice'
import { ordersApi } from './ordersApi'

/*
const exampleReducer = (state = { count: 0 }) => {
  return state
}
*/

export const resetStore = () => configureStore({
  reducer: {
    ordersState: ordersReducer,
    [ordersApi.reducerPath]: ordersApi.reducer
  },
  middleware: getDefault => getDefault().concat(ordersApi.middleware),
})

export const store = resetStore()
