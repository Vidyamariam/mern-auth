import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    currentAdmin: null,
    loading: false,
    error: false
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
         signInStart: (state)=> {
            state.loading = true;
         },
         signInSuccess: (state, action)=> {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
         },
         signInFailure: (state, action)=> {
            state.loading = false;
            state.error = action.payload;
         },

    }

    });

    export const {signInStart, signInFailure, signInSuccess} = adminSlice.actions;

    export default adminSlice.reducer;