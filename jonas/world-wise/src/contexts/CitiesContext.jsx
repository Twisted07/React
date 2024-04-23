import { createContext, useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";

export const CitiesContext = createContext();
const BASE_URL = 'http://localhost:8000';

const initialState = {
    cities: [],
    isLoading: false,
    currCity: {},
    error: "",
}

function reducer (state, action) {
    switch (action.type) {
        case 'loading':
            return {
                ...state,
                isLoading: true,
            }

        case 'cities/loaded':
            return {
                ...state,
                isLoading: false,
                cities: action.payload,
            }

        case 'city/loaded':
            return {
                ...state,
                isLoading: false,
                currCity: action.payload,
            }
        
        case 'city/created':
            return {
                ...state,
                isLoading: false,
                cities: [...state.cities, action.payload],
                currCity: action.payload,

            }

        case 'city/deleted':
            return {
                ...state,
                isLoading: false,
                cities: state.cities.filter(city => city.id !== action.payload),
                currCity: {}
            }

        case 'rejected':
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }

        default: throw new Error ("Unknown action type!");
    }
}

function CitiesProvider ({children}) {
    // const [cities, setCities] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    // const [currCity, setCurrCity] = useState({});
    const [{cities, isLoading, currCity, error}, dispatch] = useReducer(reducer, initialState);


    useEffect(function () {
        async function fetchCities() {
            dispatch({type: "loading"})

            try {
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                dispatch({type: "cities/loaded", payload: data})

            } catch (error) {
                dispatch({type: "rejected", payload: "An error occurred while fetching data"})
                // console.error('An error occurred while fetching data');
            }
        }

        fetchCities();
    }, [isLoading]);

    
    async function getCity(id) {
        if (Number(currCity.id) === id) return;
        dispatch({type: "loading"})

        try {
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await res.json();
            dispatch({type: "city/loaded", payload: data})
            // setCurrCity(data);        

        } catch (error) {
            dispatch({type: "rejected", payload: 'An error occurred while fetching data'});
            alert('An error occurred while fetching data');

        }
    };

    async function createCity(cityObj) {
        dispatch({type: "loading"});

        try {
            const res = await fetch(`${BASE_URL}/cities`, {
                method: 'POST',
                body: JSON.stringify(cityObj),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json();
            dispatch({type: "city/created", payload: data})
            // console.log(data, "data from context...")

        } catch (err) {
            dispatch({type: "rejected", payload: "An error occcurred while creating city"});
            alert('An error occurred while creating city');

        }
    }

    async function deleteCity(id) {
        dispatch({type: "loading"});
        try {
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: 'DELETE',
            });
            
            dispatch({type: "city/deleted", payload: id});
            // console.log(cities, "cities");
            // console.log(data, "data from context...")

        } catch (err) {
            dispatch({type: "rejected", payload: "An error occurred while deleting city"});
            alert('An error occurred while deleting city')

        }
    }




    return (
        <CitiesContext.Provider value={{
            cities,
            isLoading,
            currCity,
            error,
            getCity,
            createCity,
            deleteCity,
        }}>
            {children}
        </CitiesContext.Provider>
    );
}

export default CitiesProvider;