import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import ErrorPage from './errorPage'
import Home from './routes/Home'
import Testing from './routes/Testing'
import Login from './routes/Login'

const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Testing />,
      },
      {
        path: "/Home",
        element: <Home />
      },
      {
        path: "/Login",
        element: <Login />
      }
    ]
  },
]) 

export default function App () {
  return(
      <RouterProvider router={router} />
  )
}
