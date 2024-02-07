// import reducer from slice
import { notificationReducer } from "./Redux/Reducer/notificationReducer";
import { homeReducer } from "./Redux/Reducer/HomePageReducer";

// import reuqired element to configure store
import { configureStore } from "@reduxjs/toolkit";

// export store to be availble at global state
export const store = configureStore({
    reducer: {
        notificationReducer,
        homeReducer,
    }
})