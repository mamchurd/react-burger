import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bun: null,
    ingredients: []
}

const constructorIngredientsListSlice = createSlice({
    name: 'ingredientsList',
    initialState,
    reducers: {
        setBun: (state, action) => {
            state.bun = action.payload
        },
        addIngredient: (state, action) => {
            state.ingredients = [...state.ingredients, action.payload]
        },
        deleteIngredient: (state, action) => {
            state.ingredients = state.ingredients.filter((item, index) => index !== action.payload)
        },
        swapIngredientsPosition: (state, action) => {
            const ingredients = [...state.ingredients]
            ingredients.splice(action.payload.toIndex, 0, ingredients.splice(action.payload.fromIndex, 1)[0])
            state.ingredients = ingredients
        }
        
    }
})

export const { setBun, addIngredient, deleteIngredient, swapIngredientsPosition } = constructorIngredientsListSlice.actions

export default constructorIngredientsListSlice