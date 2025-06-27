import { CommentsContext } from "../../context/comments-context";
import {UserContext} from '../../context/user-context';

import { useContext, useState, useCallback } from "react";

const defaultCommentValues={
        content: "",
        createdAt: null,
        id: "",
        replies: [],
        score: null,
        user: {}
    }

const NewCommentBox= () => {
    
    const {commentsArray, setComments} = useContext(CommentsContext);
    const [commentValues, setCommentValues]=useState(defaultCommentValues);
    const {currentUserProfile, setCurrentUserProfile}= useContext(UserContext);
    const {content, createdAt, id, replies, score, user}= commentValues;
    
    const formatRelativeTime= useCallback((date)=> {
        const now = new Date();
        const secondsAgo = Math.round((now - date) / 1000);

        const intervals = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60,
        };

        // Find the largest matching unit (e.g., "day" for 86400 seconds)
        for (const [unit, secondsInUnit] of Object.entries(intervals)) {
            if (secondsAgo >= secondsInUnit) {
            const value = Math.floor(secondsAgo / secondsInUnit);
            return new Intl.RelativeTimeFormat('en', { style: 'short' }).format(-value, unit);
            }
        }

        return 'Just now'; // Fallback for < 1 minute
    }, [])



    // Example Usage:
    const pastDate = new Date(Date.now()  * 24 * 60 * 60 * 1000); // 2 days ago
    //console.log(formatRelativeTime(pastDate)); // Output: "2 days ago"
    const createdAtTime= formatRelativeTime(pastDate);
   
 


    const onNewCommentChange= (event)=>{
        event.preventDefault()
        const {name, value}= event.target
                                                                        
        let maxId= 0;

        const findMaxIdLoop= ()=>{
            for (let i= 0; i < commentsArray.length; i++){
                if(commentsArray[i].id > i){
                  maxId= commentsArray[i].id
                } 
            }
            return maxId
        }
            findMaxIdLoop()
            setCommentValues({...commentValues, [name]: value, user: currentUserProfile, createdAt: createdAtTime, score: 0, id: maxId + 1})
    }   


       const onAddNewComment=(event)=>{
        event.preventDefault();
        //const {name, value}= event.target;
        const newCommentsArray= [...commentsArray, commentValues];
        setComments(newCommentsArray);
        setCommentValues(defaultCommentValues);
        }  
   
     console.log(commentsArray, "commentsArray here")

     //commentValues es igual a content: "", pero con setCommentValues, commentValues cambia a el input que escribimos. 
    console.log("new content", commentValues);
        
    return(
        <form onSubmit={onAddNewComment}>
                <label>
                    <input onChange={onNewCommentChange} name="content" type="text" placeholder="Add a comment..." value={content} />
                </label>
                <button type="submit">Send</button>
        </form>
    )

}

export default NewCommentBox;








