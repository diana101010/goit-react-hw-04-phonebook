import React, { useState, useEffect } from 'react';

const ContactBook = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const handleFormSubmit = event => {
    event.preventDefault();

    const newContact = {
      name: name,
      number: number,
      id: Date.now().toString(),
    };

    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (existingContact) {
      alert(`${newContact.name} is already in contacts!`);
      return;
    }

    setContacts(prevContacts => [...prevContacts, newContact]);
    setName('');
    setNumber('');
  };

  const handleFind = event => {
    setFilter(event.target.value);
  };

  const handleDeleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const getFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <div>
      <h1>Phonebook</h1>
      <form
        onSubmit={handleFormSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <label>Name</label>
        <input
          style={{ width: 'fit-content' }}
          type="text"
          name="name"
          pattern="^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$"
          title="Name may contain only letters, apostrophe, dash, and spaces."
          required
          value={name}
          onChange={handleInputChange}
        />
        <label>Number</label>
        <input
          style={{ width: 'fit-content' }}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses, and can start with +"
          required
          value={number}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          style={{ marginTop: '20px', width: 'fit-content' }}
        >
          Add Contact
        </button>
      </form>
      <h1>Contacts</h1>
      <label style={{ paddingRight: '15px' }}>Find contacts by name</label>
      <input type="text" value={filter} onChange={handleFind} />
      <ul>
        {filteredContacts.map(contact => (
          <li key={contact.id}>
            {contact.name}: {contact.number}
            <button
              onClick={() => handleDeleteContact(contact.id)}
              style={{ marginLeft: '15px' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactBook;
