// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import "react-datepicker/dist/react-datepicker.css";

import { useContext, useEffect, useState } from "react";
import Message from "./Message";
import styles from "./Form.module.css";
import Button from "./Button";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../hooks/useURLPosition";
import ReactDatePicker from "react-datepicker";
import { CitiesContext } from "../contexts/CitiesContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}



function Form() {
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat, lng] = useUrlPosition();
  const [geoCodingError, setGeoCodingError] = useState("");
  const [emoji, setEmoji] = useState("");
  const navigate = useNavigate();
  
  const {createCity} = useContext(CitiesContext);
  const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";



  useEffect(function () {
    if (!lat && !lng) return;

    async function fetchCityData() {
      try {
        setIsLoadingGeoCoding(true);
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();

        if (!data.city) throw new Error("This is not a valid city. Please select another location on the map.")
        
        setCityName(`${data.city}`);
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
        setGeoCodingError("");

        // console.log(data)
        
      } catch (err) {
        setGeoCodingError(err.message)

      } finally {
        setIsLoadingGeoCoding(false);
      }
    }

    fetchCityData();
  }, [lat, lng])



  function handleNavBack(e) {
    e.preventDefault();
    navigate(-1);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !country) return;

    const cityObj = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat,
        lng,
      },
    }

    createCity(cityObj);
    navigate("/app/cities")
  }



  if(isLoadingGeoCoding) return <Spinner />;
  if (!lat && !lng) return <Message message={"Start by clicking somewhere on the map..."} />;
  if (geoCodingError) return <Message message={geoCodingError} />;

  return (

    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName} {emoji}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}

        <ReactDatePicker 
          id={"date"}
          selected={date}
          onChange={date => setDate(date)}
          dateFormat={"dd/MM/yyyy"}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName} {emoji}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type={'primary'} onclick={handleSubmit}>Add</Button>
        <Button type={'back'} onclick={handleNavBack}>&larr; Back</Button>
      </div>
    </form>
  );
}



export default Form;
