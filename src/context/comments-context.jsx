import { createContext, useState} from "react";


export const CommentsContext= createContext({
    commentsArray: [],
    setComments: ()=>null, 
    onIncrementVotesHandler: ()=> {},
    onDecreaseVotesHandler: ()=> {}
});

export const onIncrementVotes= (selectedVoteComment, commentsArray )=>{

    const findSelectedCommentToLike= commentsArray.find((comment)=> comment.id===selectedVoteComment.id)
        if(findSelectedCommentToLike){
                return commentsArray.map((comment)=>
                comment.id===selectedVoteComment.id 
                ? {...comment, score: comment.score +1}
                : comment
            ) 
            
        } else return;

};

export const onDecreaseVotes= (selectedVoteComment, commentsArray)=>{
  
    const findSelectedCommentToDecrease= commentsArray.find((comment)=> comment.id === selectedVoteComment.id)
        if(findSelectedCommentToDecrease){
            return commentsArray.map((comment)=> comment.id === selectedVoteComment.id && comment.score > 0
            ? {...comment, score: comment.score - 1}
            : comment
            )
        } else return;
}

export const CommentsProvider= ({children})=>{
    const [commentsArray, setComments]= useState([]);

    const onIncrementVotesHandler= (selectedVoteComment)=>{
        setComments(onIncrementVotes(selectedVoteComment, commentsArray))
    }

    const onDecreaseVotesHandler= (selectedVoteComment) => {
        setComments(onDecreaseVotes(selectedVoteComment, commentsArray))
    }
    const value= {commentsArray, setComments, onIncrementVotesHandler, onDecreaseVotesHandler}
    
    return <CommentsContext value={value}>{children}</CommentsContext>

}