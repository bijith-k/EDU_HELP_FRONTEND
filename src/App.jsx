import './App.css'
import { BrowserRouter, Route, Routes , Navigate } from 'react-router-dom'
import HomePage from './pages/student/HomePage'
import StudentLoginPage from './pages/student/StudentLoginPage'
import StudentSignUpPage from './pages/student/StudentSignUpPage'
import NotesPage from './pages/student/NotesPage'
import TutorLoginPage from './pages/Tutor/TutorLoginPage'
import TutorSignUpPage from './pages/Tutor/TutorSignUpPage'
import UploadNotesPage from './pages/student/UploadNotesPage'
import OtpPageStudent from './pages/student/OtpPageStudent'
import OtpPageTutor from './pages/Tutor/OtpPageTutor'
import UploadVideosPage from './pages/student/UploadVideosPage'
import UploadQuestionPapersPage from './pages/student/UploadQuestionPapersPage'
import AdminLoginPage from './pages/admin/AdminLoginPage'
import AdminDashboard from './pages/admin/AdminDashboard'
import { ToastContainer } from 'react-toastify'
import BoardListPage from './pages/admin/BoardListPage'
import AddBoardPage from './pages/admin/AddBoardPage'
import BranchListPage from './pages/admin/BranchListPage'
import AddBranchPage from './pages/admin/AddBranchPage'
import SubjectListPage from './pages/admin/SubjectListPage'
import AddSubjectPage from './pages/admin/AddSubjectPage'
import MangageNotesPage from './pages/admin/MangageNotesPage'
import ManageQuestionPapersPage from './pages/admin/ManageQuestionPapersPage'
import ManageVideosPage from './pages/admin/ManageVideosPage'
import EditVideosPage from './pages/admin/EditVideosPage'
import EditNotesPage from './pages/admin/EditNotesPage'
import EditQuestionPaperPage from './pages/admin/EditQuestionPaperPage'
 
 
function App() {
   

  return (
    <>
    <ToastContainer 
            position='top-right' 
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />  
    
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
       element={<OtpPageStudent /> } 
       />
       <Route
       path='/upload-notes' 
      //  element={ student.token === '' ? <StudentSignUpPage /> : <Navigate to='/' />} 
       element={<UploadNotesPage /> } 
       />
        <Route
       path='/upload-videos' 
      //  element={ student.token === '' ? <StudentSignUpPage /> : <Navigate to='/' />} 
       element={<UploadVideosPage /> } 
       />
        <Route
       path='/upload-question-paper' 
      //  element={ student.token === '' ? <StudentSignUpPage /> : <Navigate to='/' />} 
       element={<UploadQuestionPapersPage /> } 
       />
       <Route
       path='/tutor-signin' 
       element={<TutorLoginPage />} 
       />
       <Route
       path='/tutor-otp' 
       element={<OtpPageTutor />} 
       />
        <Route
       path='/tutor-signup' 
       element={<TutorSignUpPage />} 
       />
      <Route
       path='/notes' 
       element={<NotesPage />} 
       />
       <Route
       path='/admin' 
       element={<AdminLoginPage />} 
       />
       <Route
       path='/admin-dashboard' 
       element={<AdminDashboard />} 
       />
       <Route
       path='/admin-notes' 
       element={<MangageNotesPage />} 
       />
       <Route
       path='/admin-question-papers' 
       element={<ManageQuestionPapersPage />} 
       />
       <Route
       path='/admin-edit-videos' 
       element={<EditVideosPage />} 
       />
       <Route
       path='/admin-edit-notes' 
       element={<EditNotesPage />} 
       />
       <Route
       path='/admin-edit-question-papers' 
       element={<EditQuestionPaperPage />} 
       />
       <Route
       path='/admin-videos' 
       element={<ManageVideosPage />} 
       />
       <Route
       path='/admin-board' 
       element={<BoardListPage />} 
       />
       <Route
       path='/admin-add-board' 
       element={<AddBoardPage />} 
       />
        <Route
       path='/admin-branch' 
       element={<BranchListPage />} 
       />
       <Route
       path='/admin-add-branch' 
       element={<AddBranchPage />} 
       />
       <Route
       path='/admin-subject' 
       element={<SubjectListPage />} 
       />
       <Route
       path='/admin-add-subject' 
       element={<AddSubjectPage />} 
       />
  
    </Routes>
  </BrowserRouter>
  </>
  )
}

export default App
