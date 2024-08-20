import {createSlice} from "@reduxjs/toolkit";



interface LoadingState {
    isLoading: boolean;
}

const initalLoadingState: LoadingState = {
    isLoading: false,
};







// Create loading
const loadingSlice = createSlice({
    name: 'loading',
    initialState: initalLoadingState,
    reducers: {
        GLOBAL_LOADING : (state) => {
            state.isLoading = true;
        },
        GLOBAL_LOADED : (state) => {
            state.isLoading = false;
        }
    }
});




export const loadingActions = loadingSlice.actions;
export const loadingReducer = loadingSlice.reducer;
