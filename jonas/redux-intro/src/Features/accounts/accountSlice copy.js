// const accountInitialState = {
//     balance: 0,
//     loan: 0,
//     loanPurpose: "",
// }

// function accountReducer (state = accountInitialState, action) {
//     switch(action.type) {
//         case "account/deposit": 
//             return {...state, balance: state.balance + action.payload};
        
//         case "account/withdraw":
//             if (state.balance >= action.payload)
//                 return {...state, balance: state.balance - action.payload};
//             else alert("insufficient balance!"); return state;
        
//         case "account/requestLoan":
//             if (state.loan > 0) return state;
//                 return {...state, loan: action.payload.amount, loanPurpose: action.payload.purpose, balance: state.balance + action.payload.amount};

//         case "account/settleLoan":
//             if (state.loan > state.balance) {
//                 alert('Could not settle loan due to insufficent balance');
//                 return state;
//             }
//             return {...state, loanPurpose: "", loan: 0, balance: state.balance - state.loan};

//         default:
//             return state;
//     }
// }


// function deposit(amount, currency) {
//     if (currency === 'USD') {
//         return ({type: 'account/deposit', payload: amount});
//     }
//     return async function (dispatch, getState) {
//         const response = await fetch(`https://${host}/latest?amount=10&from=${currency}&to=USD`);
//         const data = await response.json();

//         const converted = data.rates.USD;
//         dispatch({type: 'account/deposit', payload: converted});
//     }
// }

// function withdraw(amount) {
//     return ({type: 'account/withdraw', payload: amount});
// }

// function requestLoan(amount, reason) {
//     return ({type: 'account/requestLoan', payload: {amount: amount, purpose: reason}});
// }

// function settleLoan() {
//     return ({type: 'account/settleLoan'});
// }