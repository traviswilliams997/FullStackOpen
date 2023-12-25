import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Personform from './components/Personform'
import personService from './services/persons'
import Notification from './components/Notification'
import './index.css'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [addedMessage, setAddedMessage] = useState('')


  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const allNames = persons.map(person => person.name)

    if(allNames.includes(newName)){
      alert(`${newName} name already added to phone book`)
    }else{
      const personObject = { 
        name: newName, 
        number: newNumber,
        id: persons.length + 1 
      }
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setAddedMessage(`Added ${returnedPerson.name}`) 
        setTimeout(() => {
          setAddedMessage(null)
        }, 5000)
      })
    
   }    

    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }


  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const deletePerson = (id) => {
    if (window.confirm("Do you really want to delete?")) {
      personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
      })     
    }
    
  }

  const filteredPersons =  newFilter === '' ?  persons :  persons.filter(person => person.name.toLowerCase() === newFilter.toLowerCase())

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={addedMessage} />
      <Filter value={newFilter} onChange={handleFilterChange}/>
      <h3>add a new</h3>
      <Personform 
        onSubmit={addPerson} 
        newName={newName} 
        newNumber={newNumber} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} 
      />    
      <h3>Numbers</h3>    
      <Persons persons={filteredPersons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App