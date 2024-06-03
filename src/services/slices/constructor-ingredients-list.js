import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  bun: null,
  ingredients: []
};

const constructorIngredientsListSlice = createSlice({
  name: 'ingredientsList',
  initialState,
  reducers: {
    setBun: (state, action) => {
      state.bun = action.payload;
    },
    addIngredient: {
      reducer: (state, action) => {
        state.ingredients = [...state.ingredients, action.payload];
      },
      prepare: (ingredient) => {
        return { payload: { ...ingredient, id: nanoid() } };
      }
    },
    deleteIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter((item) => item.id !== action.payload);
    },
    swapIngredientsPosition: (state, action) => {
      const ingredients = [...state.ingredients];
      ingredients.splice(action.payload.toIndex, 0, ingredients.splice(action.payload.fromIndex, 1)[0]);
      state.ingredients = ingredients;
    },
    clearIngredientsList: (state, action) => {
      state.ingredients = initialState.ingredients;
      state.bun = initialState.bun;
    }
  }
});

export const { setBun, addIngredient, deleteIngredient, swapIngredientsPosition, clearIngredientsList } =
  constructorIngredientsListSlice.actions;

export default constructorIngredientsListSlice;
