import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { useContext, useState, useEffect } from 'react';
import { CitiesContext } from '../contexts/CitiesContext';
import { useGeolocation } from '../hooks/useGeolocation.js';
import Button from './Button';
import { useUrlPosition } from '../hooks/useURLPosition.js';

//#region Map Function
function Map() {

  const [mapPosition, setMapPosition] = useState([40.0, 0]);
  const [lat, lng] = useUrlPosition();
  const {cities} = useContext(CitiesContext);
  const {
    isLoading: isLoadingGeoLocation,
    position: geoPosition,
    getPosition} = useGeolocation();



  useEffect(function(){
    if (lat && lng) setMapPosition([lat, lng]);
  }, [lat, lng])
  
  useEffect(function() {
    if (geoPosition) setMapPosition([geoPosition.lat, geoPosition.lng]);
  }, [geoPosition])



  return (
    <div className={styles.mapContainer}>
      {!geoPosition && <Button
        type={"position"}
        onclick={getPosition}
      >
        {isLoadingGeoLocation ? "Loading..." : "Use Your Current Position"}
      </Button>}

      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a>   contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {cities?.map(city => 
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
          <Popup>
            <span>{city.emoji} | {city.country}</span>
          </Popup>
          </Marker>)}


          <FocusPinPosition position={mapPosition} />
          <DetectClick />
      </MapContainer>
    </div>
  )
}


function FocusPinPosition ({position}) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: e => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`); 
    }
  })
}

export default Map;