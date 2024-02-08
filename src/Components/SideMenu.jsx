// import useful hooks from react-redux
import { useDispatch } from "react-redux"

// import required actions and selector from reducers
import { toggleSideMenu } from "../Redux/Reducer/HomePageReducer"

//import styles here
import styles from "../styles/SideMenu.module.css"

// import required component from router
import { Link } from "react-router-dom"

// create and export SideMenu here
export default function SideMenu() {

    // create var to dispatch actions
    const dispatch = useDispatch()

    // toggle menu to open and close sideMenu
    function toggleMenu() {
        dispatch(toggleSideMenu())
    }

    // return jsx below
    return (
        <div className={styles.sideMenuContainer}>
            <div className={styles.brandNameContainer}>
                <Link onClick={toggleMenu} className={styles.brandName} to={"/"}>
                    <div className={styles.name} >TrackMe</div>
                </Link>
                <div className={styles.close}><img onClick={toggleMenu} src="https://cdn-icons-png.flaticon.com/128/2976/2976286.png" alt="menuBar"></img></div>
            </div>
            <Link className={styles.navigationLink} to={"/"}><div onClick={toggleMenu}  >Home</div></Link>
            <Link className={styles.navigationLink} to={"/detailview"}><div onClick={toggleMenu}  >Detail View</div></Link>
            <Link className={styles.navigationLink} to={"/weekview"}><div onClick={toggleMenu}  >Week View</div></Link>
            <Link className={styles.navigationLink} to={"/favourite"}><div onClick={toggleMenu}  >Favourite</div></Link>
        </div>
    )
} 