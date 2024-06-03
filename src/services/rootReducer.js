import loadIngredientsSlice from './slices/load-ingredients';
import ingredientsDetailSlice from './slices/ingredients-details';
import tabInfoSlice from './slices/tab-info';
import constructorIngredientsListSlice from './slices/constructor-ingredients-list';
import createOrderSlice from './slices/create-order';

export const rootReducer = {
  [loadIngredientsSlice.reducerPath]: loadIngredientsSlice.reducer,
  [ingredientsDetailSlice.reducerPath]: ingredientsDetailSlice.reducer,
  [tabInfoSlice.reducerPath]: tabInfoSlice.reducer,
  [constructorIngredientsListSlice.reducerPath]: constructorIngredientsListSlice.reducer,
  [createOrderSlice.reducerPath]: createOrderSlice.reducer
};
