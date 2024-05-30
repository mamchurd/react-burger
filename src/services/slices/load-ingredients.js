import { createSlice } from "@reduxjs/toolkit"
import { dataLoad } from "../../utils/api"

const initialState = {
    data: [],
    isLoading: false,
    isFailed: false
}

const loadIngredientsSlice = createSlice({
    name: 'loadIngredients',
    initialState,
    reducers: {
        ingredientsLoading: (state) => {
            state.isLoading = true
            state.isFailed = false
        },
        ingredientsSuccess: (state, action) => {
            state.data = action.payload
            state.isLoading = false
            state.isFailed = false
        },
        ingredientsFailed: (state) => {
            state.isLoading = false
            state.isFailed = true
        }
    }
})

const { ingredientsLoading, ingredientsSuccess, ingredientsFailed } = loadIngredientsSlice.actions

export const fetchIngredients = () => async (dispatch) => {
    dispatch(ingredientsLoading())
    dataLoad()
        .then(data => {
            dispatch(ingredientsSuccess(data))
        })
        .catch(e => {
            dispatch(ingredientsFailed())
        })
}

export default loadIngredientsSlice