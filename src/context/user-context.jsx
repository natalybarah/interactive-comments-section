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

    useEffect(()=>{ //aqui vamos a llamar a local storage object de window y guardar laninformacion que queremos
        //en este caso, quiero guardar cual es mi currentuserprofile, y local storage solon recibe JSON objects asi que lo stringify y 
        //llamo este efecto cada vez que hay un cambio de profile
        localStorage.setItem('currentUserProfile', JSON.stringify(currentUserProfile))
    }, [currentUserProfile])

    const value= {currentUserProfile, setCurrentUserProfile}
    return <UserContext value={value}>{children}</UserContext>
}


