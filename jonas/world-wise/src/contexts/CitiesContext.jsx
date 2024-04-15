import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const CitiesContext = createContext();
const BASE_URL = 'http://localhost:8000';

function CitiesProvider ({children}) {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currCity, setCurrCity] = useState({});


    useEffect(function () {
        async function fetchCities() {
        try {
            setIsLoading(true);
            const res = await fetch(`${BASE_URL}/cities`);
            const data = await res.json();
            setCities(data);        
        } catch (error) {
            console.error('An error occurred while fetching data');
        } finally {
            setIsLoading(false);
            
        }
        }

        fetchCities();
    }, [isLoading]);

    
    async function getCity(id) {
        try {
            setIsLoading(true);
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await res.json();
            setCurrCity(data);        
        } catch (error) {
            console.error('An error occurred while fetching data');
        } finally {
            setIsLoading(false);
            
        }
    };




    return (
        <CitiesContext.Provider value={{
            cities,
            isLoading,
            currCity,
            getCity,
        }}>
            {children}
        </CitiesContext.Provider>
    );
}

export default CitiesProvider;