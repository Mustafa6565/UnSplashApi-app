
import { RouterProvider } from 'react-router-dom'
import './App.css'
import { Router } from './router/Router'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <>

      <RouterProvider router={Router} />
      <ToastContainer position="bottom-right" />
    </>
  )
}

export default App
