// import required component from router
import { RouterProvider, createBrowserRouter } from "react-router-dom"

import { Provider } from "react-redux";

import { store } from "./store";

import styles from "./styles/App.module.css"

import { ToastContainer } from "react-toastify";

// import pages and other Components 
import Navbar from "./Components/Navbar";
import DetailList from "./Components/DetailList";
import WeekView from "./Pages/WeekView";
import CreateTracker from "./Components/CreateTracker";
import FavouriteList from "./Components/FavouriteList";


function App() {

  const router = createBrowserRouter([
    {
      path: "/", element:
        <Navbar />
      , children: [
        { index: true, element: <CreateTracker /> },
        { path: "/detailview", element: <DetailList /> },
        { path: "/weekview", element: <WeekView /> },
        { path: "/favourite", element: <FavouriteList /> }
      ]
    }
  ])
  return (
    <Provider store={store}>
      <div className={styles.AppContainer}>
        <RouterProvider router={router} />
        <ToastContainer />
      </div>
    </Provider>
  );
}

export default App;
