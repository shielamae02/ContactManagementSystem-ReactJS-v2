import './assets/css/index.css';
import { Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/Dashboard/DashboardPage';
import LoginPage from './pages/Auth/LoginPage';
import SignUpPage from './pages/Auth/SignUpPage';


function App() {

  return (
    <>
    <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/" index element={<LoginPage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/signup" element={<SignUpPage />}/>
    </Routes>
  </>
  )
}

export default App
