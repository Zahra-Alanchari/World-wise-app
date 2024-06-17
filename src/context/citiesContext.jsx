import { createContext, useContext, useEffect, useState } from "react";
const url = "http://localhost:9000";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, SetIsLoading] = useState(false);

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
  return (
    <CitiesContext.Provider value={{ cities, isLoading }}>
      {children}
    </CitiesContext.Provider>
  );
}
function useCities(){
    const context = useContext(CitiesContext)
    return context;
}

export { CitiesProvider, useCities };
