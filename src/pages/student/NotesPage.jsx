import React, { Suspense } from 'react'
// import Notes from '../../components/Student/Notes/Notes'
const Notes = React.lazy(()=>import('../../components/Student/Notes/Notes'))

const NotesPage = () => {
  return (
    <>
    <Suspense fallback={ <h2>loading</h2>}>
    <Notes />
    </Suspense>
    </>
  )
}

export default NotesPage