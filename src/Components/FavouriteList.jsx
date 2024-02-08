// import necessory hooks
import { useEffect, useState } from "react"

//import styles here
import styles from "../styles/DetailList.module.css"

// import useful hooks from react-redux
import { useDispatch, useSelector } from "react-redux"

// import required actions and selector from reducers
import { homeSelector, removeHabit, setFavourite } from "../Redux/Reducer/HomePageReducer"

// create and export FavouriteList here
export default function FavouriteList() {

    //  create required state to use within component
    const [check, setCheck] = useState("")
    const [list, setList] = useState([])

    // create var to dispatch actions
    const dispatch = useDispatch()

    // destructure necessory state
    const { habits } = useSelector(homeSelector)

    // load filterd favourite data inside list
    useEffect(() => {
        function refreshList() {
            const favouriteHabits = habits.filter(habit => habit.favourite === true);
            setList(favouriteHabits);

        }
        refreshList()
    }, [habits])

    // function to add and remove to favourite
    function handleFavourite(habit) {
        dispatch(setFavourite(habit))
        setList(
            list.filter((item) => item.title.text !== habit.title.text)
        )
    }

    // function to toggle checkbox for selected cell
    function handleChecked(index) {
        if (check === index) {
            setCheck("")
        } else {
            setCheck(index)
        }
    }

    // function to remove or delete a following habit
    function handleDelete(habit) {
        dispatch(removeHabit(habit))
        setCheck("")
        setList(
            list.filter((item) => item.title.text !== habit.title.text)
        )
    }

    // return jsx below
    return (
        <>
            {list.length === 0 ? <h1 className={styles.favHeading}>No Favourite Avaialable</h1> :
                list.map((habit, index) => (
                    <div className={styles.detailContainer} key={index}>
                        <input type="checkbox" checked={check === index ? true : false} onChange={() => handleChecked(index)} className={styles.checkBox}></input>
                        <div className={styles.leftContainer}>
                        <div onClick={() => handleDelete(habit)} className={check === index ? styles.visDeleteContainer : styles.hidDeleteContainer}>
                                <img className={check === index ? styles.actDelImg : styles.InActDelImg} src="https://cdn-icons-png.flaticon.com/128/7267/7267205.png" alt="delImg"></img>
                            </div>
                            <div className={styles.title}>{habit.title.text} {habit.title.img ? <img src={habit.title.img} className={styles.imgTag} alt="catImg" /> : ""}</div>
                            <div className={styles.rightContainer}>
                                <div className={styles.status}>{habit.time}</div>
                                <div className={styles.action}>
                                    <div onClick={() => handleFavourite(habit)} className={styles.favourite}><img src={habit.favourite ? "https://cdn-icons-png.flaticon.com/128/1828/1828884.png" : "https://cdn-icons-png.flaticon.com/128/56/56786.png"} alt="favorite"></img></div>
                                    <div className={styles.routine}>{habit.schedule && habit.schedule.length === 6
                                        ? habit.schedule.map((day) => (
                                            <span key={day.id}>{day}</span>
                                        ))
                                        : "Daily"}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </>
    )
} 