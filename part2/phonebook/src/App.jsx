import { useEffect, useState } from 'react'
import axios from 'axios'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [lastID, setLastID] = useState(5)
  const [showNames, setShowNames] = useState(persons);

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }

  useEffect(hook, [])
  console.log(persons);

  const handleChange = (event) => {    
    const { name, value } = event.target;

    if (name == 'name') setNewName(value);
    else if (name == 'number') setNewNumber(value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (persons.some((person => person.name === newName))) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    setPersons(persons.concat({ name: newName, number: newNumber, id: lastID }));
    setLastID(lastID + 1);
    setNewName('');
    setNewNumber('');
  }

  const filterNames = (event) => {
    const target = event.target.value.toLowerCase();

    const valid = persons.filter(person => person.name.toLowerCase().includes(target));
    setShowNames(target ? valid : persons);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterNames={filterNames} />
      
      <h3>Add a new</h3>
      <PersonForm 
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        handleChange={handleChange}
      />

      <h3>Numbers</h3>
      <Names contacts={showNames} />
    </div>
  )
}

const Filter = ({ filterNames }) => {
  return (
    <div>
      filter shown with
      <input onChange={filterNames}/>
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

const Names = ({ contacts }) => {
  return (
    <div>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            {contact.name} {contact.number}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App