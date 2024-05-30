import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentTab:'bun'
}

const tabInfoSlice = createSlice ({
    name: 'tabInfo',
    initialState,
    reducers: {
        changeActiveTab: (state, action) => {
            state.currentTab = action.payload
        }
    }
})

export const { changeActiveTab } = tabInfoSlice.actions

export default tabInfoSlice