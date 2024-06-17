import styles from "./AppLayout.module.css"
import Sidebar from "../components/sidbar";
import Map from "../components/map";

export default function AppLayout(){
    return(
        <div className={styles.app}>
            <Sidebar/>
            <Map/>
        </div>
    )
}