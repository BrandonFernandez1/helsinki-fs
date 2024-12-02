import { useEffect, useState } from 'react'
import personService from './services/services.js'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [lastID, setLastID] = useState(5)
  const [filterTerms, setFilterTerms] = useState('');
  const [newPersonMessage, setNewPersonMessage] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleChange = (event) => {    
    const { name, value } = event.target;

    if (name == 'name') setNewName(value);
    else if (name == 'number') setNewNumber(value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName)

    if (existingPerson) {
      const updateNumber = window.confirm(`${existingPerson.name} is already added to the phonebook, replace the old number with a new one?`)
      
      if (updateNumber) {
        const updatedPerson = { ...existingPerson, number: newNumber }
        
        personService
          .update(updatedPerson.id, updatedPerson)
          .then(() => {
            setPersons(persons.map(person => {
              if (person.id === updatedPerson.id) return { ...person, number: newNumber }
              else return person
            }))
            setNewName('')
            setNewNumber('')
          })
      } 
    } else {
      personService
        .create({ name : newName, number: newNumber, id: `${lastID}` })
        .then(response => {
          console.log(response.data)
          setNewPersonMessage(`Added ${newName}`)
          setPersons(persons.concat(response.data));
          setLastID(lastID + 1);
          setNewName('');
          setNewNumber('');
        })
    }
  }

  const deleteName = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this contact?');
    console.log(id);

    if (confirmed) {
      personService
        .deleteName(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
   }

  const handleFilterChange = (event) => {
    setFilterTerms(event.target.value.toLowerCase());
  }

  const filteredPersons = () => {
    if (filterTerms) {
      return persons.filter(person => person.name.toLowerCase().includes(filterTerms))
    }
    else return persons
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={newPersonMessage} />
      <Filter handleFilterChange={handleFilterChange} />
      
      <h3>Add a new</h3>
      <PersonForm 
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        handleChange={handleChange}
      />

      <h3>Numbers</h3>
      <Names contacts={filteredPersons()} deleteName={deleteName} />

      <button onClick={()=>console.log(persons)}>persons</button>
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='message'>
      {message}
    </div>
  )
}

const Filter = ({ handleFilterChange }) => {
  return (
    <div>
      filter shown with
      <input onChange={handleFilterChange}/>
    </div>
  )
}

const PersonForm = ({ newName, newNumber, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div>name: <input name='name' value={newName} onChange={handleChange}/></div>
        <div>number: <input name='number' value={newNumber} onChange={handleChange}/></div>
        <button type='submit'>add</button>
      </div>
    </form>
  )
}

const Names = ({ contacts, deleteName }) => {
  return (
    <div>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            {contact.name} {contact.number}
            <button onClick={() => deleteName(contact.id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App