import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fullName: "",
    nationalID: "",
    createdAt: "",
    lastUpdated: "",
    accountNumber: "",
}

const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        createCustomer: {
            prepare(fullName, nationalID) {
                return {
                    payload: {fullName, nationalID}
                }
            },

            reducer(state, action) {
                state.fullName = action.payload.fullName;
                state.nationalID = action.payload.nationalID;
                state.createdAt = new Date().toISOString();
            },
        },

        updateName(state, action) {
            state.lastUpdated = new Date().toISOString();
            state.fullName = action.payload;
        }
    }
})

export const {createCustomer, updateName} = customerSlice.actions;
export default customerSlice.reducer;