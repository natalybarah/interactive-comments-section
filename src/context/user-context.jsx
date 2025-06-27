import { createContext, useState } from "react";


export const UserContext= createContext({
    currentUserProfile: {},
    setCurrentUserProfile: ()=> null
})


export const UserProvider= ({children})=>{

    const [currentUserProfile, setCurrentUserProfile]= useState(null)
    const value= {currentUserProfile, setCurrentUserProfile}


    return <UserContext value={value}>{children}</UserContext>
}


