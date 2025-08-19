
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ChartDisplay from './components/ChartDisplay/ChartDisplay'
import ChartForm from './components/ChartForm/ChartForm'
import Dashboard from './pages/Dashboard/Dashboard'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Dashboard/>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
