import { Link } from 'react-router-dom';
import styles from './CityItem.module.css';
import Message from './Message';
import { useContext } from 'react';
import { CitiesContext } from '../contexts/CitiesContext';

function CityItem({city}) {
  const {currCity, deleteCity} = useContext(CitiesContext);
  const {cityName, emoji, date, id, position} = city;

  const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

  function handleClick(e) {
    e.preventDefault();

    deleteCity(id);
    // console.log(typeof id, "id");
  }


  if (!city) return <Message message='Welcome! Please select a location on the map to get started' />;
        
  return (
    <li>
      <Link to={`${id}?lng=${position.lng}&lat=${position.lat}`} className={`${styles.cityItem} ${id===currCity.id ? styles['cityItem--active'] : ''}`}>
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleClick}>&times;</button>
      </Link>
    </li>
)
}

export default CityItem