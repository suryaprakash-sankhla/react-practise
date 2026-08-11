import React, { createContext } from 'react'

export const data =createContext()

const UserContext = ({children}) => {
    let username = "surya prakash";
    return (
    
    <div>
        <data.Provider value={username}>
            {children}
        </data.Provider>
    </div>
  )
}

export default UserContext