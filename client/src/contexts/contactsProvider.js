import React, {useContext} from 'react'
import useLocalStorage from '../hooks/localstorage';

const ContactsContext = React.createContext()


export function useContacts() {
  return useContext(ContactsContext)
}

export function ContactsProvider({children}) {

  const [contacts, setContacts] = useLocalStorage('contacts', [])

  function createContact(login, name) {
    setContacts(prevContacts => {
      return [...prevContacts, {login, name}]
    })
  }

  return (
    <ContactsContext.Provider value={{contacts, createContact}}>
    {children}
    </ContactsContext.Provider>  
  )
}




