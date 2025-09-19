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
    
        const updateItems= (items)=>{
           return items.map(item=>{
                if(item.id === selectedVoteComment.id){
                    return {...item, score: item.score + 1}
                }
                if(item.replies && item.replies.length > 0){
                    item.replies= updateItems(item.replies)
                }
                return item
            })
        }
      return  updateItems(commentsArray);

};

export const onDecreaseVotes= (selectedVoteComment, commentsArray)=>{

        const updateItems= (items)=> {
            return items.map(item=> {
                if(item.id === selectedVoteComment.id && item.score > 0){
                    return {...item, score: item.score -1}
                }
                if(item.replies && item.replies.length > 0){
                    item.replies= updateItems(item.replies)
                }
                return item;
                })
            }
        return updateItems(commentsArray)
    }

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
    const [isReplyClick, setReplyClick]=useState(false);

    useCallback(formatRelativeTime, [])
    
    const onIncrementVotesHandler= (selectedVoteComment)=>{
        setComments(onIncrementVotes(selectedVoteComment, commentsArray))
    }
 
    const onDecreaseVotesHandler= (selectedVoteComment) => {
        setComments(onDecreaseVotes(selectedVoteComment, commentsArray))
    }
    

// # DELETE ITEMS
const onDeleteItem=(targetComment)=>{

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

// # NEW ITEMS

const onChangeItem= (event)=>{
    event.preventDefault();
    setReplyClick(false);
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

const onAddNewItem=(event, replyingTo)=>{
    event.preventDefault();
    setReplyClick(false);
    if(replyingTo=== null){
        const newCommentsArray= [...commentsArray, commentValues];
        setComments(newCommentsArray);
        setCommentValues(defaultCommentValues);
    }

    if(replyingTo){
        const findSelectedComment= (items)=>{
            return items.map(item=>{
                if(item.id===replyingTo.id){
                    console.log("item de map", item )
                    console.log("id de replying to en map", replyingTo.id)
                  return  {...item, replies: [...item.replies, commentValues]}
                }          
            
                if(item.replies && item.replies.length > 0){
                   item.replies= findSelectedComment(item.replies)
                }
                // We now return the parent item that has updated replies
                  return item
                 
            }
            )
        }
        const newCommentsArray= findSelectedComment(commentsArray);
        setComments(newCommentsArray);
        setCommentValues(defaultCommentValues);
        console.log("comments array actual", commentsArray)
    }
} 

    const value= {commentsArray, isReplyClick, setReplyClick, setComments,  onIncrementVotesHandler,onDecreaseVotesHandler, commentValues, onDeleteItem, onAddNewItem, onChangeItem}
    return <CommentsContext value={value}>{children}</CommentsContext>

}