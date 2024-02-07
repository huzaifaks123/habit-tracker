// import necessory hooks
import { useEffect, useState } from "react"

//import styles here
import styles from "../styles/WeekList.module.css"

// import required actions and selector from reducers
import { homeSelector, setCurrWeekStatus } from "../Redux/Reducer/HomePageReducer"

// import Component here
import WeekList from "../Components/WeekList"

// import useful hooks from react-redux
import { useDispatch, useSelector } from "react-redux"

// create and export WeekViewPage
export default function WeekView() {

    //  create required state to use within component
    const [monthYear, setMonthYear] = useState()
    const [weekDays, setWeekDays] = useState([])

    // create var to dispatch actions
    const dispatch = useDispatch()

    // destructure necessory state
    const { habits } = useSelector(homeSelector)

    // set current day and week when component mount
    useEffect(() => {

        // function to handle month and year
        function handleMonthYear(today) {
            const currentDate = new Date();
            const req = { month: 'long', year: 'numeric' };
            setMonthYear(currentDate.toLocaleString('en-US', req))
        }

        // function to handle weeldays
        const handleWeekDays = () => {
            const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const today = new Date();
            const dates = [];
            const weekDays = []
            weekDays.push(daysOfWeek[today.getDay()]);
            dates.push(today.getDate());
            for (let i = 1; i <= 6; i++) {
                const previousDay = new Date(today);
                previousDay.setDate(today.getDate() - i);
                weekDays.unshift(daysOfWeek[previousDay.getDay()]);
                dates.unshift(previousDay.getDate());
            }
            setWeekDays(weekDays)
            dispatch(setCurrWeekStatus(dates))
            return weekDays;
        };

        // calling function here
        handleWeekDays()
        handleMonthYear()
    }, [])

    // return components here
    return (
        <div className={styles.weekViewContainer}>
            <div className={styles.monthYear}>
                <img src="https://cdn-icons-png.flaticon.com/128/271/271220.png"></img>
                <div>{monthYear}</div>
                <img src="https://cdn-icons-png.flaticon.com/128/271/271228.png"></img>
            </div>
            <div className={styles.daysContainer}>
                {weekDays.map((day, index) => (
                    <div className={styles.weekDays} key={index}>{day}</div>
                ))}
            </div>
            <WeekList />
        </div>
    )
} 