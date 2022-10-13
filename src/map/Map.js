import { createContext, useContext, useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import styled from 'styled-components';
import { BlogStyle } from '../blog/Styles';

export const AppContext = createContext({});
export const MapContext = createContext({});

const MapTitle = styled.div`
  padding: 20px;
  font-size: 30px;
  font-weight: bold;
`;

const Countries = styled.div`
  background-color: white;
  margin-left: 10px;
`;

const Country = styled.div`
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) -4px 9px 25px -6px;
  margin-bottom: 10px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
`;

const CountryName = styled.div`
  flex: 1;
  padding-right: 20px;
`;

const Button = styled.button`
  color: white;
  background-color: ${props => (props.danger ? 'red' : 'rgb(0, 82, 204)')};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 0px 5px;
  padding: 5px 10px;
`;

const MapProvider = ({ children }) => {
  const pins = useRef([]);
  const [map, setMap] = useState(false);
  const { countries } = useContext(AppContext);

  useEffect(() => {
    if (!map) return;

    // Add the ones missing
    countries
      .filter(c => !pins.current.some(p => p.id === c.id))
      .forEach(c => {
        pins.current = [
          ...pins.current,
          {
            id: c.id,
            pin: new mapboxgl.Marker().setLngLat(c).addTo(map),
          },
        ];
      });

    // Remove the ones not there anymore
    pins.current
      .filter(p => !countries.some(c => p.id === c.id))
      .forEach(p => {
        p.pin.remove();
      });
  }, [map, countries]);

  return (
    <MapContext.Provider
      value={{
        map,
        setMap,
        removePinById: ({ id }) => {
          pins.find(p => p.id)?.remove();
          pins.current = pins.current.filter(p => p.id !== id);
        },
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

const AppProvider = ({ children }) => {
  const [countries, setCountries] = useState([
    {
      id: 'AR',
      name: 'Argentina',
      lat: -38.4161,
      lng: -63.6167,
    },
    {
      id: 'US',
      name: 'United States',
      lat: 37.0902,
      lng: -95.7129,
    },
    {
      id: 'SP',
      name: 'Spain',
      lat: 40.25,
      lng: 3.45,
    },
  ]);

  return (
    <AppContext.Provider
      value={{
        addCountry: newCountry => {
          setCountries([...countries, newCountry]);
        },
        removeCountryById: ({ id }) => setCountries([...countries.filter(c => c.id !== id)]),
        countries,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const CountryList = () => {
  const { countries, removeCountryById } = useContext(AppContext);
  const { map } = useContext(MapContext);

  return (
    <Countries>
      {countries.map(c => (
        <Country key={c.id}>
          <CountryName>{c.name}</CountryName>
          <Button danger onClick={() => removeCountryById({ id: c.id })}>
            Remove
          </Button>
          {map && (
            <Button
              onClick={() =>
                map.flyTo({
                  center: c,
                  zoom: 9,
                })
              }
            >
              Zoom
            </Button>
          )}
        </Country>
      ))}
    </Countries>
  );
};

const MapInner = () => {
  const { setMap } = useContext(MapContext);
  const mapContainer = useRef();

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoibmljb3RlamVyYSIsImEiOiJTX0dITmZnIn0.RX1xqgMqyDKktm3OrGBqLA';

    const mapboxMap = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0],
      zoom: -10,
    });

    mapboxMap.on('load', () => {
      setMap(mapboxMap);
    });
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <div ref={mapContainer} style={{ height: 400, width: 400, borderRadius: 10 }} />
      <CountryList />
    </div>
  );
};

const Map = () => (
  <MapProvider>
    <MapInner />
  </MapProvider>
);

const AppInner = () => {
  const { countries } = useContext(AppContext);

  return (
    <div>
      <MapTitle>{countries.length} Countries</MapTitle>
      <Map />
    </div>
  );
};

/**
 
+-------App Context -------+
|                          |
|      AppInner            |
|                          |
|   +--- MapContext ---+   |
|   |  CountryList     |   |
|   |  Map             |   |
|   |                  |   |
|   +------------------+   |
|                          |
+--------------------------+


 */

const App = () => (
  <AppProvider>
    <BlogStyle />
    <AppInner />
  </AppProvider>
);

export default App;
