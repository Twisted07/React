import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
}

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        deposit(state, action) {
            state.balance += action.payload;
        },
        withdraw(state, action) {
            if (state.balance < action.payload) {
                alert("Insufficient Balance!");
                return;
            }
            state.balance -= action.payload;
        },
        requestLoan: {
            prepare(amount, purpose) {
                return {
                    payload: {amount, purpose}
                }
            },

            reducer(state, action) {
                if (state.loan > 0) return;
                state.loan = Number(action.payload.amount);
                state.loanPurpose = action.payload.purpose;
                state.balance += Number(action.payload.amount);
            }


        },
        settleLoan(state, action) {
            if (state.loan > state.balance) {
                alert('Could not settle loan due to insufficient balance');
                return;
            }
            state.balance -= state.loan;
            state.loanPurpose = "";
            state.loan = 0;
        },
    }
})

export function deposit(amount, currency) {
    if (currency === 'USD') {
        return ({type: 'account/deposit', payload: amount});
    }
    return async function (dispatch, getState) {
        const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);
        const data = await response.json();

        const converted = data.rates.USD;
        console.log(converted, "converted rate")
        dispatch({type: 'account/deposit', payload: converted});
    }
}

export const { withdraw, requestLoan, settleLoan } = accountSlice.actions;

export default accountSlice.reducer;

