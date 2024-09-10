import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import ErrorPage from './errorPage'
import Testing, {loader as testLoader} from './routes/Testing'

const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Testing />,
        loader: testLoader,
      }
    ]
  },
]) 

export default function App () {
  return(
      <RouterProvider router={router} />
  )
}
