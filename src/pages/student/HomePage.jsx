import React, { Suspense } from 'react'
// import Home from '../../components/Student/Home/Home'
import Navbar from '../../components/Student/Home/Navbar'
import { ErrorBoundary } from 'react-error-boundary'
const Home = React.lazy(()=> import('../../components/Student/Home/Home'))
import ErrorFallback from '../student/ErrorBoundary'

const HomePage = () => {
   
  return (
    <>
     <Navbar />
     <ErrorBoundary FallbackComponent={ErrorFallback} onReset={()=>{ }}>
    <Suspense fallback={ <div className='bg-black h-screen'>loading</div>}> 
    <Home />
    </Suspense>
    </ErrorBoundary>

    </>
  )
}

export default HomePage