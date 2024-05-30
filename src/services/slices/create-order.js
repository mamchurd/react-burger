import { createSlice } from "@reduxjs/toolkit"
import { createOrder } from "../../utils/api"

const initialState = {
    orderNumber: null,
    isLoading: false,
    isError: false
}

export const createOrderSlice = createSlice({
    name: 'createOrder',
    initialState,
    reducers: {
        orderLoading: (state) => {
            state.isLoading = true
            state.isError = false
        },
        orderSucces: (state, action) => {
            state.isLoading = false
            state.orderNumber = action.payload
        },
        orderError: (state) => {
            state.isLoading = false
            state.isError = true
        },
        clearOrder: (state) => {
            state.orderNumber = null
            state.isLoading = false
            state.isError = false
        }
    }
})

export const { orderLoading, orderSucces, orderError, clearOrder } = createOrderSlice.actions

export const fetchOrder = (ingredients) => async (dispatch) => {
    
    dispatch(orderLoading())
    createOrder(ingredients)
        .then(res => {
            dispatch(orderSucces(res))
        })
        .catch(e => {
            dispatch(orderError())
        })
}

export default createOrderSlice