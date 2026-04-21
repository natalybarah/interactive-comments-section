import { createContext, useState, useEffect } from "react";
import rawData from '../data.json';

export const UserContext= createContext({
    currentUserProfile: {},
    setCurrentUserProfile: ()=> null
})


export const UserProvider= ({children})=>{

    
    const [currentUserProfile, setCurrentUserProfile]= useState(()=>{
        try{
            const saved= localStorage.getItem('currentUserProfile');
            return saved ? JSON.parse(saved) : rawData.currentUser;
        } catch{
            return rawData.currentUser
        }
    });

    useEffect(()=>{ 
        localStorage.setItem('currentUserProfile', JSON.stringify(currentUserProfile))
    }, [currentUserProfile])

    const value= {currentUserProfile, setCurrentUserProfile}
    return <UserContext value={value}>{children}</UserContext>
}


