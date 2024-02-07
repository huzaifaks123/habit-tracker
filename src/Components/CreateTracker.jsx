// import necessory hooks
import { useState } from "react"

// import habits data here
import { Data } from "../Data/data"

//import styles here
import styles from "../styles/CreateTracker.module.css"

// import useful hooks from react-redux
import { useDispatch, useSelector } from "react-redux";

// import required actions and selector from reducers
import { setHabits, homeSelector, toggleCreateTracker } from "../Redux/Reducer/HomePageReducer";
import { notify } from "../Redux/Reducer/notificationReducer";

// create and export CreateTracker here
export default function CreateTracker() {

    //  create required state to use within component
    const [text, setText] = useState("")
    const [time, setTime] = useState("")
    const [day, setDay] = useState([{ day: "S", id: 1 }, { day: "M", id: 2 }, { day: "T", id: 3 }, { day: "W", id: 4 }, { day: "T", id: 5 }, { day: "F", id: 6 }, { day: "S", id: 7 }])
    const [category, setCategory] = useState({ text: "", img: "" })

    // create var to dispatch actions
    const dispatch = useDispatch()

    // destructure necessory state
    const { isCreateTracker } = useSelector(homeSelector)

    // create array for days
    const days = [{ day: "S", id: 1 }, { day: "M", id: 2 }, { day: "T", id: 3 }, { day: "W", id: 4 }, { day: "T", id: 5 }, { day: "F", id: 6 }, { day: "S", id: 7 }]

    // function to update time
    function handleTimeChange(e) {
        setTime(e.target.value)
    }

    // function to update text
    function handleTextChange(e) {
        setText(e.target.value)
        setCategory({ text: "", img: "" })
    }

    // function to handle submission of form
    function handleSubmitForm(e) {
        e.preventDefault();
        if (text) {
            dispatch(setHabits({ title: { text: text, img: "" }, time: time, schedule: day, favourite: false }))
            setText("");
            setTime("")
            setCategory({ text: "", img: "" })
            if (isCreateTracker) {
                dispatch(toggleCreateTracker())
            }
            dispatch(notify("Habit Added Successfully"))
        } else {
            dispatch(setHabits({ title: { text: category.text, img: category.img }, time: time, schedule: day, favourite: false }))
            setText("");
            setTime("")
            setCategory({ text: "", img: "" })
            if (isCreateTracker) {
                dispatch(toggleCreateTracker())
            }
            dispatch(notify("Habit Added Successfully"))
        }
    }

    // function to handle category from data
    function handleCategory(data) {
        if (category.text === data.title) {
            setCategory({ text: "", img: "" })
            return
        }
        setCategory({ text: data.title, img: data.img })
        setText("");
    }

// function to manage active dates to schedule
    function handleDays(k) {
        const isPresent = day.findIndex((item) => item.id === k.id)
        if (isPresent === -1) {
            const index = day.findIndex((item) => item.id > k.id)
            const newDay = [...day];
            if (index === -1) {
                newDay.splice(index, 0, k)
            } else {
                newDay.splice(index, 0, k)
            }
            setDay(newDay)
        }
        else {
            const newDay = day.filter((item) => item.id !== k.id)
            setDay([...newDay])
        }
    }

    // return jsx here
    return (
        <div className={styles.PageContainer}>
            <form className={styles.form} onSubmit={handleSubmitForm}>
                <input
                    className={styles.textInput}
                    type="text"
                    name="textInput"
                    value={text}
                    placeholder="Add new Habits"
                    onChange={handleTextChange} />
                <div className={styles.category}>
                    {Data.map((data, index) => (
                        <div onClick={() => handleCategory(data)} className={category.text === data.title ? styles.actCategoryBtn : styles.CategoryBtn} key={index}>{data.title} <img className={styles.imgTag} src={data.img} /></div>
                    ))}
                </div>
                <div className={styles.week}>
                    {days.map((item, index) => (
                        <div onClick={() => handleDays(item)} className={day.find((num) => num.id === item.id) ? styles.actDay : styles.day} key={index}>{item.day}</div>
                    ))}
                </div>
                <div className={styles.time}>
                    <input
                        className={styles.timeInput}
                        type="time"
                        name="timeInput"
                        value={time}
                        onChange={handleTimeChange}
                    >
                    </input>
                </div>
                <button className={styles.submitBtn}>CREATE</button>
            </form>
        </div>
    )
}