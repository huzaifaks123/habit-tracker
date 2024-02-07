// import required toolkit
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


// set initial state for reducer
const initialState = {
  // created dummy Habit 
  habits: [
    {
      schedule: [{ day: "S", id: 1 }, { day: "M", id: 2 }, { day: "T", id: 3 }, { day: "W", id: 4 }, { day: "T", id: 5 }, { day: "F", id: 6 }, { day: "S", id: 7 }],
      time: "10:00",
      title: { text: 'Study', img: 'https://cdn-icons-png.flaticon.com/128/1081/1081040.png' },
      favourite: false,
      currWeekStatus: [{ status: "", date: "" }, { status: "", date: "" }, { status: "", date: "" }, { status: "", date: "" }, { status: "", date: "" }, { status: "", date: "" }, { status: "", date: "" },]
    },
    {
      schedule: [{ day: "S", id: 1 }, { day: "M", id: 2 }, { day: "T", id: 3 }, { day: "W", id: 4 }, { day: "T", id: 5 }, { day: "F", id: 6 }, { day: "S", id: 7 }],
      time: "12:30",
      title: { text: 'Meditation', img: 'https://cdn-icons-png.flaticon.com/128/3048/3048398.png' },
      favourite: false,
      currWeekStatus: [{ status: "", date: "" }, { status: "", date: "" }, { status: "", date: "" }, { status: "", date: "" }, { status: "", date: "" }, { status: "", date: "" }, { status: "", date: "" },]
    },
    {
      schedule: [{ day: "S", id: 1 }, { day: "M", id: 2 }, { day: "T", id: 3 }, { day: "W", id: 4 }, { day: "T", id: 5 }, { day: "F", id: 6 }, { day: "S", id: 7 }],
      time: "22:00",
      title: { text: 'Entertainment', img: 'https://cdn-icons-png.flaticon.com/128/1179/1179069.png' },
      favourite: false,
      currWeekStatus: [{ status: "", date: "" }, { status: "", date: "" }, { status: "", date: "" }, { status: "", date: "" }, { status: "", date: "" }, { status: "", date: "" }, { status: "", date: "" },]
    }
  ],
  isSideMenu: false,
  isCreateTracker: false,
};


// create required slice with reducer and actions
const homeSlice = createSlice({
  name: "habit",
  initialState,
  reducers: {
    setHabits: (state, action) => {
      state.habits.push({
        title: { text: action.payload.title.text, img: action.payload.title.img },
        time: action.payload.time,
        schedule: action.payload.schedule,
        favourite: action.payload.favourite,
        currWeekStatus: [{ status: "", date: "" }, { status: "", date: "" }, { status: "", date: "" }, { status: "", date: "" }, { status: "", date: "" }, { status: "", date: "" }, { status: "", date: "" }]
      })
    },
    removeHabit: (state, action) => {
      state.habits = state.habits.filter((habit) => habit.title.text !== action.payload.title.text)
    },
    setFavourite: (state, action) => {
      const index = state.habits.findIndex((fav) => fav.title.text === action.payload.title.text)
      state.habits[index].favourite = !state.habits[index].favourite
    },
    toggleSideMenu: (state, action) => {
      state.isSideMenu = !state.isSideMenu
    },
    toggleCreateTracker: (state, action) => {
      state.isCreateTracker = !state.isCreateTracker
    },
    toggleWeekStatus: (state, action) => {
      if (state.habits[action.payload.index].currWeekStatus[action.payload.i].status === "") {
        state.habits[action.payload.index].currWeekStatus[action.payload.i].status = "T"
      }
      else if (state.habits[action.payload.index].currWeekStatus[action.payload.i].status === "T") {
        state.habits[action.payload.index].currWeekStatus[action.payload.i].status = "F"
      } else {
        state.habits[action.payload.index].currWeekStatus[action.payload.i].status = ""
      }
    },
    setCurrWeekStatus: (state, action) => {
      console.log(action.payload, "payload", state.habits)
      for (let i = 0; i < state.habits.length; i++) {
        for (let j = 0; j <= 6; j++) {
          console.log(state.habits.length)
          state.habits[i].currWeekStatus[j].date = action.payload[j]
        }
      }
    }
  },
})

// export reducer here
export const homeReducer = homeSlice.reducer;

// export acions here
export const { setHabits, removeHabit, setFavourite, toggleSideMenu, setCurrWeekStatus, toggleWeekStatus, toggleCreateTracker } = homeSlice.actions

// export selector here
export const homeSelector = (state) => state.homeReducer