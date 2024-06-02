import { createSelector } from "@reduxjs/toolkit";

export const getBuns = createSelector(
    (state) => state.loadIngredients.data,
    (data) => data.filter(item => item.type==='bun') 
)

export const getSauces = createSelector(
    (state) => state.loadIngredients.data,
    (data) => data.filter(item => item.type==='sauce') 
)

export const getMains = createSelector(
    (state) => state.loadIngredients.data,
    (data) => data.filter(item => item.type==='main') 
)
