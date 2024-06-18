import { createContext, useContext, useEffect, useState } from "react";
const url = "http://localhost:9000";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, SetIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      try {
        SetIsLoading(true);
        const res = await fetch(`${url}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("there was an error loading data");
      } finally {
        SetIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id){
        try {
          SetIsLoading(true);
          const res = await fetch(`${url}/cities/${id}`);
          const data = await res.json();
          setCurrentCity(data);
        } catch {
          alert("there was an error loading data");
        } finally {
          SetIsLoading(false);
        }
  }
  return (
    <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity }}>
      {children}
    </CitiesContext.Provider>
  );
}
function useCities() {
  const context = useContext(CitiesContext);
  return context;
}

export { CitiesProvider, useCities };
