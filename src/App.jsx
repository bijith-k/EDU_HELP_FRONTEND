import './App.css'
import { BrowserRouter, Route, Routes , Navigate } from 'react-router-dom'
import HomePage from './pages/student/HomePage'
import StudentLoginPage from './pages/student/StudentLoginPage'
import StudentSignUpPage from './pages/student/StudentSignUpPage'
import NotesPage from './pages/student/NotesPage'
import TutorLoginPage from './pages/Tutor/TutorLoginPage'
import TutorSignUpPage from './pages/Tutor/TutorSignUpPage'
import UploadNotesPage from './pages/student/UploadNotesPage'
import OtpPage from './pages/student/OtpPage'

function App() {
   

  return (
    <BrowserRouter>
    <Routes>
      <Route 
      path='/' 
      // element={ student.token != '' ? <HomePage /> : <Navigate to='/login' />} 
      element={ <HomePage /> } 

      />
      <Route 
      path='/signin' 
      // element={ student.token === '' ? <StudentLoginPage /> : <Navigate to='/' /> } 
      element={ <StudentLoginPage /> } 
      />
      <Route
       path='/signup' 
      //  element={ student.token === '' ? <StudentSignUpPage /> : <Navigate to='/' />} 
       element={<StudentSignUpPage /> } 
       />
       <Route
       path='/otp' 
      //  element={ student.token === '' ? <StudentSignUpPage /> : <Navigate to='/' />} 
       element={<OtpPage /> } 
       />
       <Route
       path='/upload-notes' 
      //  element={ student.token === '' ? <StudentSignUpPage /> : <Navigate to='/' />} 
       element={<UploadNotesPage /> } 
       />
       <Route
       path='/tutor-signin' 
       element={<TutorLoginPage />} 
       />
        <Route
       path='/tutor-signup' 
       element={<TutorSignUpPage />} 
       />
      <Route
       path='/notes' 
       element={<NotesPage />} 
       />
  
    </Routes>
  </BrowserRouter>
  )
}

export default App
