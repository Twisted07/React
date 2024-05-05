const accountInitialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
}

export default function accountReducer (state = accountInitialState, action) {
    switch(action.type) {
        case "account/deposit": 
            return {...state, balance: state.balance + action.payload};
        
        case "account/withdraw":
            if (state.balance !== 0)
                return {...state, balance: state.balance - action.payload};
            else alert("insufficient balance!"); return;
        
        case "account/requestLoan":
            if (state.loan > 0) return state;
                return {...state, loan: action.payload.amount, loanPurpose: action.payload.purpose, balance: state.balance + action.payload.amount};

        case "account/settleLoan":
            if (state.loan > state.balance) {
                alert('Could not settle loan due to insufficent balance');
                return state;
            }
            return {...state, loanPurpose: "", loan: 0, balance: state.balance - state.loan};

        default:
            return state;
    }
}


export function deposit(amount) {
    return ({type: 'account/deposit', payload: amount});
}

export function withdraw(amount) {
    return ({type: 'account/withdraw', payload: amount});
}

export function requestLoan(amount, reason) {
    return ({type: 'account/requestLoan', payload: {amount: amount, purpose: reason}});
}

export function settleLoan() {
    return ({type: 'account/settleLoan'});
}