import {useCallback, useEffect, useState} from 'react'
import axios from 'axios'
import {List} from './List'
import {Form} from './Form'

const baseUrl = process.env.NODE_ENV === 'production' ?  'http://localhost:7100/' : 'http://localhost:7100/'
const apiSome = axios.create({
  baseUrl: baseUrl
})

function App() {
  const [notes, setNotes] = useState([])

  async function createNote(text) {
    const note = await apiSome.post('http://localhost:7100/api/note', {text})
    setNotes([...notes, {...note.data.note}])
  }

  const fetchNotes = useCallback(async () => {
    const notes = await apiSome.get('http://localhost:7100/api/note')
    setNotes(notes.data)
  }, [])

  useEffect(() => {
    fetchNotes()
  }, [fetchNotes])

  return (
    <>
      <nav className="navbar">
        <h3>Docker MERN</h3>
      </nav>
      <div className="container with-nav">
        <Form onCreate={createNote} />
        <List list={notes} />
      </div>
    </>
  )
}

export default App;
