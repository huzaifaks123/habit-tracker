// import useful hooks from react-redux
import { useDispatch, useSelector } from "react-redux"

//import styles here
import styles from "../styles/WeekList.module.css"

// import required actions and selector from reducers
import { homeSelector, toggleWeekStatus, setFavourite } from "../Redux/Reducer/HomePageReducer"

// create and export WeekList here
export default function WeekList() {

    // create var to dispatch actions
    const dispatch = useDispatch()

    // destructure necessory state
    const { habits } = useSelector(homeSelector)

    // function to add and remove to favourite
    function handleFavourite(habit) {
        dispatch(setFavourite(habit))
    }

    // function to toggle status
    function toggleStatus(index, i) {
        dispatch(toggleWeekStatus({ index, i }))
    }
    // return jsx below
    return (
        <div className={styles.listContianer} >
            {habits.map((habit, index) => (
                <div className={styles.detailContainer} key={index}>
                    <div className={styles.leftContainer}>
                        <div className={styles.title}>{habit.title.text} {habit.title.img ? <img src={habit.title.img} className={styles.imgTag} alt="catImg"/> : ""}</div>
                        <div className={styles.rightContainer}>
                            <div className={styles.time}>{habit.time}</div>
                            <div onClick={() => handleFavourite(habit)} className={habit.favourite ? styles.favourite : styles.actFavourite}><img src={habit.favourite ? "https://cdn-icons-png.flaticon.com/128/1828/1828884.png" : "https://cdn-icons-png.flaticon.com/128/56/56786.png"} alt="favorite"></img></div>
                        </div>
                    </div>
                    <div className={styles.weekCal}>
                        {habit.currWeekStatus.map((day, i) => (
                            <div onClick={() => toggleStatus(index, i)} className={styles.boxDate} key={i}><div className={styles.date}>{day.date}</div><img src={day.status === "T" ? "https://cdn-icons-png.flaticon.com/128/11762/11762507.png" : day.status === "F" ? "https://cdn-icons-png.flaticon.com/128/3388/3388701.png" : "https://cdn-icons-png.flaticon.com/128/3899/3899584.png"} alt="status"></img></div>
                        ))}
                    </div>
                </div>
            ))}

        </div>
    )
} 