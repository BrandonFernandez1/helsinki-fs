import { useEffect, useState } from 'react'
import personService from './services/services.js'
import axios from 'axios'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [lastID, setLastID] = useState(5)
  const [filterTerms, setFilterTerms] = useState('');

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
        console.log(updatedPerson);
        console.log(persons);

        personService
          .update(updatedPerson.id, updatedPerson)
          .then(() => {
            setPersons(persons.map(person => {
              person.id === updatedPerson.id ? { ...person, number: newNumber } : person
              console.log(persons)
            }))
            setNewName('')
            setNewNumber('')
          })
      } else {
        personService
          .create(newContact)
          .then(response => {
            setPersons(persons.concat(response.data));
            setLastID(lastID + 1);
            setNewName('');
            setNewNumber('');
          })
      }
    }

    
  }

  const deleteName = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this contact?');

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

  // let filteredPersons = [];

  // for (let i = 0; i < persons.length; i++) {
  //   if (persons[i].name.includes(filterTerms)) {
  //     filteredPersons.push(persons[i])
  //   }
  // }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} />
      
      <h3>Add a new</h3>
      <PersonForm 
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        handleChange={handleChange}
      />

      <h3>Numbers</h3>
      <Names contacts={persons} deleteName={deleteName} />

      <button onClick={()=>console.log(persons)}>persons</button>
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