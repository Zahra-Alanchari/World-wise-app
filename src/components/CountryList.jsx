import { useCities } from "../context/citiesContext"
import CountryItem from "./CountryItem"
import styles from "./CountryList.module.css"
import Message from "./Message"
import Spinner from "./Spinner"

export default function CountryList(){
    const {cities, isLoading} = useCities()
    if(isLoading) return <Spinner/>
    if(!cities.length) return <Message message='add your first city by add in map'/>

    return <ul className={styles.countryList}>
    {cities.map(country => <CountryItem country={country} key={country.id}/>)}
</ul>

}