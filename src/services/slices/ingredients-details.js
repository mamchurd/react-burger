import { createSlice } from "@reduxjs/toolkit"

const initialState ={ 
    selectedItem: null
}

const ingredientsDetailSlice = createSlice ({
    name: 'ingredientsDetail',
    initialState,
    reducers: {
        selectIngredient: (state, action) => {
            state.selectedItem = action.payload;
        },
        unselectIngredient: (state) => {
            state.selectedItem = null;
        }
    }
})

export const { selectIngredient, unselectIngredient } = ingredientsDetailSlice.actions

export default ingredientsDetailSlice