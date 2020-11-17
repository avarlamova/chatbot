import React, {useContext} from 'react'
import useLocalStorage from '../hooks/localstorage';

const ChatsContext = React.createContext()

export function useChats() {
  return useContext(ChatsContext)
}

export function ChatsProvider({children}) {

  const [chats, setChats] = useLocalStorage('chats', [])

  function createChat(receivers) {
    setChats(prevChats => {
      return [...prevChats, {receivers, messages: [] }]
    })
  }

  return (
    <ChatsContext.Provider value={{chats, createChat}}>
    {children}
    </ChatsContext.Provider>  
  )
}




