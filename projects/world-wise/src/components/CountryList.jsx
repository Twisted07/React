import styles from './CountryList.module.css';
import CountryItem from './CountryItem';
import Spinner from './Spinner';
import Message from './Message';
import { useContext } from 'react';
import { CitiesContext } from '../contexts/CitiesContext';

function CountryList() {

  const {cities, isLoading} = useContext(CitiesContext);

  if (isLoading) return <Spinner />

  if (!cities.length)
    return (
        <Message message='Add your first city by clicking on a city on the map.' />
    );


  const countries = cities.reduce((prev, curr) => {
    if (!prev.map(el => el.country).includes(curr.country))
        return [...prev, { country: curr.country, emoji: curr.emoji }];
    else return prev;
  }, []);


  return (
    <ul className={styles.countryList}>

        {
            countries?.map(country => <CountryItem country={country} key={country.country} />)
        }
    </ul>
  )
}

export default CountryList