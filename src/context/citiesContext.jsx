import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
const url = "http://localhost:9000";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };

    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };

    case "cities/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "cities/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity:{},
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error("oops");
  }
}

function CitiesProvider({ children }) {
  const [{cities, isLoading, currentCity, error}, dispatch] = useReducer(reducer, initialState);
  // const [cities, setCities] = useState([]);
  // const [isLoading, SetIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${url}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "there was an error loading data",
        });
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${url}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "there was an error loading data",
      });
    }
  }
  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${url}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "cities/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "there was an error loading data",
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${url}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "cities/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "there was an error loading data",
      });
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        deleteCity,
        getCity,
        createCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
function useCities() {
  const context = useContext(CitiesContext);
  return context;
}

export { CitiesProvider, useCities };
