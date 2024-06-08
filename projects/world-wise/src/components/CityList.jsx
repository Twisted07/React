import styles from './CityList.module.css';
import CityItem from './CityItem';
import Message from './Message';
import Spinner from './Spinner';
import { useContext } from 'react';
import { CitiesContext } from '../contexts/CitiesContext';
import { useAuth } from '../contexts/AuthContext';
import Login from '../pages/Login';


function CityList() {
  
  const {cities, isLoading} = useContext(CitiesContext);

  if (isLoading) return <Spinner />

  if (!cities.length)
    return (
        <Message message='Add your first city by clicking on a city on the map.' />
    );

  
  return (
    <ul className={styles.cityList}>
        {
            cities?.map(city => <CityItem city={city} key={city.id} />)
        }
    </ul>
  )
}

export default CityList