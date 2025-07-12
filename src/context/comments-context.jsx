import { createContext, useState, useContext, useCallback} from "react";
import { UserContext } from "./user-context";

export const CommentsContext= createContext({
    commentsArray: [],
    setComments: ()=>null, 
    onIncrementVotesHandler: ()=> {},
    onDecreaseVotesHandler: ()=> {},
    onNewCommentChangeHandler: () => {},

});

// # VOTES COUNTER

export const onIncrementVotes= (selectedVoteComment, commentsArray )=>{
    
    /*if(selectedVoteComment.id === undefined){
        return 
    } else{*/ 
     
        const findSelectedCommentToLike= commentsArray.find((comment)=> {
            console.log("id de comment:", comment.id)
            return comment.id===selectedVoteComment.id})
  console.log("id de selected comment:", selectedVoteComment.id)


        if(findSelectedCommentToLike){
                return commentsArray.map((comment)=>
                comment.id===selectedVoteComment.id 
                ? {...comment, score: comment.score +1}
                : comment
            ) 
            
        } else return;
    
    
};

export const onIncrementVotesReply= (selectedVoteComment, commentsArray )=>{
    return commentsArray.map((comment)=> ({
        ...comment,
        replies: comment.replies.map((reply)=>
            
        reply.id===selectedVoteComment.id 
            ? {...reply, score: reply.score + 1}
            : reply 
        )
    }))
}

export const onDecreaseVotesReply=(selectedVoteComment, commentsArray)=>{
    return commentsArray.map(comment=>({
        ...comment, 
        replies: comment.replies.map((reply)=> {
            console.log('i decrease reply here')
            return reply.id===selectedVoteComment.id && reply.score > 0
            ? { ...reply, score: reply.score - 1}
            : reply
        }
           
        )
    }))
}

export const onDecreaseVotes= (selectedVoteComment, commentsArray)=>{
  
    const findSelectedCommentToDecrease= commentsArray.find((comment)=> comment.id === selectedVoteComment.id)
        if(findSelectedCommentToDecrease){
            return commentsArray.map((comment)=> comment.id === selectedVoteComment.id && comment.score > 0
            ? {...comment, score: comment.score - 1}
            : comment
            )
        } else return;
}


// # NEW COMMENT FEATURE 

const defaultCommentValues={
        content: "",
        createdAt: null,
        id: "",
        replies: [],
        score: null,
        user: {}
    }

const formatRelativeTime= (date)=> {
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
    }
    // Example Usage:
    const pastDate = new Date(Date.now()  * 24 * 60 * 60 * 1000); // 2 days ago
    //console.log(formatRelativeTime(pastDate)); // Output: "2 days ago"
    const createdAtTime= formatRelativeTime(pastDate);

       

// # COMMENTS PROVIDER

export const CommentsProvider= ({children})=>{
    const {currentUserProfile} = useContext(UserContext)
    const [commentsArray, setComments]= useState([]);
    const [commentValues, setCommentValues]=useState(defaultCommentValues);
    useCallback(formatRelativeTime, [])
    
    const onIncrementVotesReplyHandler= (selectedVoteComment)=>{
        setComments(onIncrementVotesReply(selectedVoteComment, commentsArray))
    }
    const onIncrementVotesHandler= (selectedVoteComment)=>{
        setComments(onIncrementVotes(selectedVoteComment, commentsArray))
    }

    const onDecreaseVotesHandler= (selectedVoteComment) => {
        setComments(onDecreaseVotes(selectedVoteComment, commentsArray))
    }
    
    const onDecreaseVotesReplyHandler= (selectedVoteComment)=>{
        setComments(onDecreaseVotesReply(selectedVoteComment, commentsArray))
    }

       const onAddNewComment=(event)=>{
        event.preventDefault();
        //const {name, value}= event.target;
        const newCommentsArray= [...commentsArray, commentValues];
        setComments(newCommentsArray);
        setCommentValues(defaultCommentValues);
        }  

         
 const onNewCommentChange= (event)=>{
        event.preventDefault()
        const {name, value}= event.target
                                                                        
        let maxId= 0;

        const generateNewId= ()=>{
            for (let i= 0; i < commentsArray.length; i++){
                if(commentsArray[i].id > i){
                  maxId= commentsArray[i].id
                } 
            }
            return maxId
        }
            generateNewId()
            //on add a new reply here, so the return value is updated in set comment values. 
            //aunque en otra funcion podria usar set comment values y solo copiar los datos de commentValues, y actualizar replies. podria probar
            setCommentValues({...commentValues, [name]: value, user: currentUserProfile, createdAt: createdAtTime, score: 0, id: maxId + 1})
    }   
    


    const value= {commentsArray, setComments,  onIncrementVotesHandler, onIncrementVotesReplyHandler, onDecreaseVotesHandler, onDecreaseVotesReplyHandler, onAddNewComment, onNewCommentChange, commentValues}
    
    return <CommentsContext value={value}>{children}</CommentsContext>

}