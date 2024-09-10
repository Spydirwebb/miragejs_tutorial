import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'


import ErrorPage from './errorPage'
import Testing from './routes/testing'
import Home from './routes/Home'
import makeServer from "./server"



const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/testing",
        element: <Testing />,
      }
    ]
  },
]) 

export default function App () {
  return(
      <RouterProvider router={router} />
  )
}
