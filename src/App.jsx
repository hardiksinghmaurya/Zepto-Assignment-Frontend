import { useState } from 'react'
import './App.css'
import { Datalist } from './datalist'

function App() {

  const [search, setSearch] = useState('')
  const [show, setShow] = useState(false)
  const [datalist, setDatalist] = useState(Datalist)
  const [selected, setSelected] = useState([])
  const [email, setEmail] = useState('')

  function handleBack(){
    setShow(!show)
  }

  function NameHandleClick(name, email) {
    setDatalist(datalist.filter((data) => data.name !== name))
    setSelected([...selected, name])
    setSearch("")
    setShow(false)
    setEmail(email)
  }

  function RemoveSelected(name) {
    setSelected([...selected.filter((select) => select !== name)])
    setDatalist([{
      name: name,
      email: email
    }, ...datalist])
  }

  return (
    <main onClick={handleBack}>
      
      <input type="search" placeholder='name' onChange={(e) => setSearch(e.target.value)} onClick={() => setShow(true)} />

      <div className='selected'>
        {
          selected.map((name, id) => {
            return <span key={id}> <img src="/user.svg" alt="user:" /> {name} <img onClick={() => RemoveSelected(name)} src="/cancel.svg" alt="x" /></span>
          })
        }
      </div>
      
      {
        show &&
        datalist.filter((item) => {
          return search.toLowerCase() == '' ? item : item.name.toLowerCase().includes(search.toLowerCase())
        }).map((list) => (
          <p key={list.id} onClick={() => NameHandleClick(list.name, list.email)}>
            <span className='name'><img src="/user.svg" alt="" />{list.name}</span>
            <span className='email'>{list.email}</span>
          </p>
        ))
      }
    </main>
  )
}


export default App