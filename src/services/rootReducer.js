import constructorIngredientsListSlice from './slices/constructor-ingredients-list';
import createOrderSlice from './slices/create-order';
import ingredientsDetailSlice from './slices/ingredients-details';
import loadIngredientsSlice from './slices/load-ingredients';
import tabInfoSlice from './slices/tab-info';

export const rootReducer = {
  [loadIngredientsSlice.reducerPath]: loadIngredientsSlice.reducer,
  [ingredientsDetailSlice.reducerPath]: ingredientsDetailSlice.reducer,
  [tabInfoSlice.reducerPath]: tabInfoSlice.reducer,
  [constructorIngredientsListSlice.reducerPath]: constructorIngredientsListSlice.reducer,
  [createOrderSlice.reducerPath]: createOrderSlice.reducer
};
