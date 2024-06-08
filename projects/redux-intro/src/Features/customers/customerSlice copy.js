const customerInitialState = {
    fullName: "",
    nationalID: "",
    createdAt: "",
    lastUpdaed: "",
    accountNumber: "",
}


export default function customerReducer (state = customerInitialState, action) {
    switch (action.type) {
        case 'customer/createCustomer':
            return {...state, fullName: action.payload.fullName, nationalID: action.payload.nationalID, createdAt: new Date().toISOString()};

        case 'customer/updateName':
            return {...state, fullName: action.payload, lastUpdated: new Date().toISOString()};

        default:
            return state;
    }
}


export function createCustomer(fullName, nationalID) {
    return ({type: 'customer/createCustomer', payload: {
        fullName: fullName,
        nationalID: nationalID,
    }});
}

export function updateName(fullName) {
    return ({type: 'customer/updateName', payload: fullName});
}