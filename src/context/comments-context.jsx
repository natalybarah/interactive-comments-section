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
    
   
     
        const findSelectedCommentToLike= commentsArray.find((comment)=> {
            console.log("id de comment:", comment.id)
            return comment.id===selectedVoteComment.id})
  console.log("id de selected comment:", selectedVoteComment.id)


        if(findSelectedCommentToLike){
                return commentsArray.map((comment)=>{
                  console.log("summing here")
              return   comment.id===selectedVoteComment.id
                ? {...comment, score: comment.score +1}
                : comment
        }) 
               
        }
         
        else return;
    
    
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
            return commentsArray.map((comment)=> { console.log("i decrease NEW HERE"); return comment.id === selectedVoteComment.id && comment.score > 0
            ? {...comment, score: comment.score - 1}
            : comment
        })
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

const defaultReplyValues={
    content: "",
    createdAt: null,
    id: "",
    replies:[],
    score: null,
    user: {},
    username: "",
    replyingTo: ""
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
    const [replyValues, setReplyValues]= useState(defaultReplyValues);
    const [isReplyClick, setReplyClick]=useState(false);

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


/*

AL dar click tendria que poseer en mi memoria el comment que voy a eliminar. 
luego necesito tener acceso al comments array donde estan todos los comments
luego necesito encontrar cual de todos esos comments fue el seleccionado, que en este caso seria por su ID
y luego tendria que eliminarlo. 
con algun metodo de javascript o algun metodo mas manual?
tratare de pensar en el manual primero
[{comment1, id: 1}, {comment 2, id:2}, {comment3, id:3}]
tal vez podria hacver un map y adentro un filtro donde incluya todos menos los que coinciden 



*/ 

// # DELETE COMMENT FOR ROOT AND NESTED COMMENTS
const onDeleteComment=(targetComment)=>{

    const findSelectedComment= (targetComment, commentsArray)=>{
        let i=0;
        for(i; i< commentsArray.length; i++ ){
            if(commentsArray[i].id=== targetComment.id){
            
                return commentsArray[i]
            }
            if (commentsArray[i].replies && commentsArray[i].replies.length > 0){
                const theFound= findSelectedComment(targetComment, commentsArray[i].replies);
                if(theFound) return theFound
            }
        }
        return false
    }
    const matchComment= findSelectedComment(targetComment, commentsArray);

   const newCommentsArray= (items)=>{  
     return   items.filter((item) =>  {
      if(  item.id === matchComment.id) {
        return false;
      }
      if(item.replies && item.replies.length > 0){
        item.replies= newCommentsArray(item.replies); 
      } 
        return true;
        })
    }

    const result= newCommentsArray(commentsArray)
    setComments(result )
}




//RECURSIVE ID GENERATOR
const onNewCommentChange= (event)=>{
    event.preventDefault()
    const {name, value}= event.target                                                         
    let maxId=0;

    const generateNewId=()=>{
        const findMaxId=(items)=>{
          items.forEach((item)=>{
             
                if(item.id > maxId) maxId= item.id;
                console.log(item.id, "ITEM-ID")
                if(item.replies && item.replies.length > 0)  findMaxId(item.replies)
                console.log(item.replies, "ITEM-REPLIES")
            }) 
        } 
        findMaxId(commentsArray);
        return maxId
    }
    generateNewId()
    setCommentValues({...commentValues, [name]: value, user: currentUserProfile, createdAt: createdAtTime, score: 0, id: maxId + 1})
}   
// HERE WE ARE GOING TO MAKE A RECURSIVE FUNCTION TO ADD NEW COMMENTS AND REPLIES

const onAddNewComment=(event)=>{
    event.preventDefault();
    //const {name, value}= event.target;
    const newCommentsArray= [...commentsArray, commentValues];
    setComments(newCommentsArray);
    setCommentValues(defaultCommentValues);
    console.log("onAddNewComment")
    //el objetivo es cambiar commentValues, y hacer un setCommentValues
    //una vez commentValues cambiado deberemos asignarlo al item parent= ¨..., + commentValues]
   
    //el user da click en reply
    //el user es llevado al new comment box (aqui ya debe estar autenticado currentUser, asi que tiene nombre y es un diferente objeto)
    //commentValues se debe comenzar a actualizar con el input de cada letra 
    //        detras de escenas, onNewCommentChange captura los valores de  content: value, genera el id
    //setCommentValues

    //el user da click en SEND y se triggea onAddNewComment!

    
    //

}  

// # REPLY FEATURE

const getMaxReplyId = (commentsArray)=>{
   let maxReplyId= 0;
    const findMaxId= (items)=>{
       items.forEach(item=>{
       if( item.id > maxReplyId) maxReplyId= item.id
       if(item.replies) findMaxId(item.replies) 
    })
    }
    findMaxId(commentsArray);
    return maxReplyId
}

const onReplyChange= (event)=>{
    event.preventDefault();
console.log("printing before id issue")
    const {name, value}= event.target;
    const maxReplyId= getMaxReplyId(commentsArray);
    console.log("on reply change in context")
    setReplyValues({...replyValues, [name]: value, user: currentUserProfile, createdAt: createdAtTime, score: 0, id: maxReplyId + 1, isReply: true})

}

const onAddNewReply=(event, replyingTo)=>{
    event.preventDefault();
 
    const newRepliesArray= commentsArray.map(comment=> {
       if(comment.id === replyingTo.id ){
        return {
            ...comment,
            replies: [...comment.replies, replyValues]
            }
        } //return comment
        if (comment.replies && comment.replies.length >0){
            const updatedReplies= updateNestedReplies(comment.replies, replyingTo);
           if (updatedReplies !== comment.replies){
                return {
                    ...comment,
                    replies: updatedReplies
                }
           }
        }
        return comment;
    })
    
   console.log("onaddnewreply printing", event)

    setComments(newRepliesArray)
    setReplyValues(defaultReplyValues);
    console.log("new comments", newRepliesArray)
}





const updateNestedReplies= (replies, targetReply)=>{
    return replies.map(reply=> {
        if(reply.id === targetReply.id){
            console.log("before updating replyvalues")
            return {
                ...reply,
                replies: [...(reply.replies || []), replyValues]
            }
        }
        if (reply.replies && reply.replies.length > 0){
            return {
                ...reply,
                replies: updateNestedReplies(reply.replies, targetReply )
            }
        }
        return reply;
    })
};


    const value= {commentsArray, isReplyClick, setReplyClick, setComments,  onIncrementVotesHandler, onIncrementVotesReplyHandler, onDecreaseVotesHandler, onDecreaseVotesReplyHandler, onAddNewComment, onNewCommentChange, commentValues, onReplyChange, replyValues, onAddNewReply, onDeleteComment}
    
    return <CommentsContext value={value}>{children}</CommentsContext>

}