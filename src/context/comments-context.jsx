import { createContext, useState, useContext, useCallback, useEffect} from "react";
import { UserContext } from "./user-context";
import rawData from '../data.json';

export const CommentsContext= createContext({
    commentTree: [],
    setCommentTree: ()=>null, 
    commentValues: {},
    setCommentValues: ()=> {},
    isReplyClick: false,

});

const defaultCommentValues={
        content: "",
        createdAt: null,
        id: "",
        replies: [],
        score: null,
        user: {}
    }

// # VOTES COUNTER

export const voteManager= (items, targetComment, userId, direction)=>{

    return items.map(item=>{
        if(item.id === targetComment.id){
            const userVotes = item.userVotes ?? {};
            const oldVote = userVotes[userId] ?? 0;
            const newVote= direction === "up" ? ( oldVote === 1 ? 0 : 1) : ( oldVote === -1 ? 0 : -1);
            const delta = newVote - oldVote;
                
                return {...item, score: item.score + delta, userVotes: {...userVotes, [userId]: newVote}}
        }
                
        if(item.replies?.length){
            const newReplies= voteManager(item.replies, targetComment, userId, direction);
            if(item.replies !== newReplies) {
                return {...item, replies: newReplies}
            }
        }
            return item
    })
                
};
                    
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

        return 'Just now'; 
    }
 
    const pastDate = new Date(Date.now()  * 24 * 60 * 60 * 1000); // 2 days ago
    //console.log(formatRelativeTime(pastDate)); // Output: "2 days ago"
    const createdAtTime= formatRelativeTime(pastDate);

// # COMMENTS PROVIDER

export const CommentsProvider= ({children})=>{
    const {currentUserProfile} = useContext(UserContext)
   

    const [commentTree, setCommentTree]= useState(()=>{
        try{
            const saved= localStorage.getItem("commentTree");
            return saved ? JSON.parse(saved) : rawData.comments; // Initial value
        } catch{
            return rawData.comments;
        }
    });

    
    const [commentValues, setCommentValues]=useState(defaultCommentValues);
    const [isReplyClick, setReplyClick]=useState(false);

    useEffect(()=>{
        localStorage.setItem("commentTree", JSON.stringify(commentTree))
    }, [commentTree]);


    useCallback(formatRelativeTime, [])
     
    const upVote= (targetComment, userId)=>{
        setCommentTree(prev=> voteManager(prev, targetComment, userId, "up"))
    }

    const downVote= (targetComment, userId) =>{
        setCommentTree(prev=> voteManager(prev, targetComment, userId, "down"))
    }

// # DELETE ITEMS
const onDeleteItem=(targetComment)=>{

    const findSelectedComment= (targetComment, commentTree)=>{
        let i=0;
        for(i; i< commentTree.length; i++ ){
            if(commentTree[i].id=== targetComment.id){
            
                return commentTree[i]
            }
            if (commentTree[i].replies && commentTree[i].replies.length > 0){
                const found= findSelectedComment(targetComment, commentTree[i].replies);
                if(found) return found
            }
        }
        return false
    }
    const matchComment= findSelectedComment(targetComment, commentTree);

    const newCommentTree= (items)=>{  
     return   items.filter((item) =>  {
      if(  item.id === matchComment.id) {
        return false;
      }
      if(item.replies && item.replies.length > 0){
        item.replies= newCommentTree(item.replies); 
      } 
        return true;
        })
    }
    const result= newCommentTree(commentTree)
    setCommentTree(result )
}

// # NEW ITEMS

const onChangeItem= (event)=>{
    event.preventDefault();
    const {name, value}= event.target                                                 
    let maxId=0;

    const generateNewId=()=>{
        const findMaxId=(items)=>{
          items.forEach((item)=>{
             
                if(item.id > maxId) maxId= item.id;
                if(item.replies && item.replies.length > 0)  findMaxId(item.replies)
            }) 
        } 
        findMaxId(commentTree);
        return maxId
    }
    generateNewId()
    setCommentValues({...commentValues, [name]: value, user: currentUserProfile, createdAt: createdAtTime, score: 0, id: maxId + 1})
}   

const onChangeEditItem=(event)=>{
    event.preventDefault();
    const {value}= event.target;
    setCommentValues((prev)=>{return {...prev, content: value}})
}

const onUpdateItem=(targetComment)=>{
    const updatedItems=(items)=>{
        return items.map((item)=>{
            if(item.id ===targetComment.id) {
                return {...item, content: commentValues.content, createdAt: createdAtTime }
            } 
            if(item.replies && item.replies.length > 0){
                return {...item, replies: updatedItems(item.replies)}
            }
            return item
        })
     
    }

    const result= updatedItems(commentTree)
    setCommentTree(result)
    setCommentValues(defaultCommentValues);
}

const onAddNewItem=(event, replyingTo, onCancelReply)=>{
    event.preventDefault();
    
    if(replyingTo=== null){
        const newCommentTree= [...commentTree, commentValues];
        setCommentTree(newCommentTree);
        setCommentValues(defaultCommentValues);   
    }

    if(replyingTo){
        const findSelectedComment= (items)=>{
            return items.map(item=>{
                if(item.id===replyingTo.id){
                  return  {...item, replies: [...item.replies, commentValues]}
                }          
                if(item.replies && item.replies.length > 0){
                   item.replies= findSelectedComment(item.replies)
                }
                  return item
            }
            )
        }

        const newCommentTree= findSelectedComment(commentTree);
        setCommentTree(newCommentTree);
        setCommentValues(defaultCommentValues);
        setReplyClick(false);
        onCancelReply(null);
        
    }
} 

    const value= {  commentTree, 
                    isReplyClick, 
                    setReplyClick, 
                    setCommentTree,  
                    commentValues, 
                    onDeleteItem, 
                    onAddNewItem, 
                    onChangeItem, 
                    onChangeEditItem,
                    onUpdateItem,
                    upVote,
                    downVote
    }

    return <CommentsContext value={value}>{children}</CommentsContext>

}