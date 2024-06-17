import CityItem from "./CityItem"
import styles from "./CityList.module.css"
import Message from "./Message"
import Spinner from "./Spinner"

export default function CityList({cities, isLoading}){
    if(isLoading) return <Spinner/>
    if(!cities.length) return <Message message='add your first city by add in map'/>

    return <ul className={styles.cityList}>
        {cities.map(city => <CityItem city={city} key={city.id}/>)}
    </ul>
}