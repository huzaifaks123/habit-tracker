// import necessory hooks
import { useEffect, useState } from "react"

//import styles here
import styles from "../styles/Navbar.module.css"

// import required component from router
import { Outlet, useLocation } from "react-router-dom"

// import required actions and selector from reducers
import { homeSelector, toggleCreateTracker, toggleSideMenu } from "../Redux/Reducer/HomePageReducer"

// import useful hooks from react-redux
import { useDispatch, useSelector } from "react-redux"

// import Component here
import SideMenu from "./SideMenu"
import CreateTracker from "./CreateTracker"

// create and export Navbar here
export default function Navbar() {

    //  create required state to use within component
    const [pageName, setPageName] = useState()

    // create var to for following actions
    const location = useLocation()
    const today = new Date().getDate()
    const dispatch = useDispatch()

    // destructure necessory state
    const { isSideMenu, isCreateTracker } = useSelector(homeSelector)

    // Show page name based on the path location
    useEffect(() => {
        const path = location.pathname
        function setName() {
            if (path === "/detailview") {
                setPageName("Detail View")
            }
            else if (path === "/weekview") {
                setPageName("Week View")
            }
            else if (path === "/favourite") {
                setPageName("Favourite")
            }
            else {
                setPageName("Home")
            }
        }
        setName()
    }, [toggleMenu])

    // toggle menu to open and close sideMenu
    function toggleMenu() {
        dispatch(toggleSideMenu())
        if (isCreateTracker) {
            dispatch(toggleCreateTracker())
        }
    }

    // function to show create tracker window 
    function handleAddtracker() {
        dispatch(toggleCreateTracker())
    }

    // return jsx here
    return (
        <>
            <div className={styles.navContainer}>
                <div className={styles.menuIcon}><img onClick={() => toggleMenu()} src="https://cdn-icons-png.flaticon.com/128/56/56763.png" /></div>
                <div className={styles.leftContainer}>
                    <div className={styles.pageName}>{pageName}</div>
                    <div className={styles.rightContainer}>
                        <div className={styles.calendarIcon}><span className={styles.calDate}>{today}</span><img src="https://cdn-icons-png.flaticon.com/128/5503/5503356.png" /></div>
                        <div className={styles.profileIcon}><img src="https://cdn-icons-png.flaticon.com/128/64/64572.png" /></div>
                    </div>
                </div>
            </div>
            <div className={isSideMenu ? styles.actSideMenu : styles.inactSideMenu}>
                < SideMenu />
            </div>
            <div className={isCreateTracker ? styles.actCreateTracker : styles.inActCreateTracker}>
                <h1 className={styles.heading}>New Habit</h1>
                < CreateTracker />
            </div>
            {location.pathname !== "/" ? <div onClick={() => handleAddtracker()} className={isCreateTracker ? styles.closeTracker : styles.addTracker}>+</div> : ""}
            {/* render outlet here */}
            <Outlet />
        </>
    )
}