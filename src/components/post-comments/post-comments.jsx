import './post-component.styles.scss';
import NewCommentBox from '../new-comment/new-comment';
import { useContext, useEffect, useState } from 'react';
import { CommentsContext } from '../../context/comments-context';
import {UserContext} from '../../context/user-context'
import rawData from '../../data.json';
import CommentsWithReplies from '../comment-card/comments.replies';

const PostComments= () =>{
    
    const {commentsArray,onIncrementVotesHandler, onDecreaseVotesHandler}= useContext(CommentsContext);
    const { currentUserProfile, setCurrentUserProfile} = useContext(UserContext);
    const [replyingTo, setReplyingTo]= useState(null);
    const { setComments} = useContext(CommentsContext)

    const {comments, currentUser}=rawData

    useEffect(
        ()=>{
        setComments(comments)
    }, [setComments, comments]
    );

    useEffect(
        ()=>{
        setCurrentUserProfile(currentUser)
    }, []);


    //const commentsToSort=[...commentsArray];
    const compare=(a, b)=>{
        return b.score-a.score
    }
    
    const sortedComments= commentsArray.sort(compare)
  
    console.log(currentUserProfile, "y aqui currentuser en post comments?")

    return (
       <div>    
            {sortedComments.map((comment)=> (
            <div>
                <CommentsWithReplies key={comment.id} onVote={onIncrementVotesHandler} onDownVote={onDecreaseVotesHandler}  onReply={setReplyingTo} comment={comment}/>
  {replyingTo && replyingTo.id===comment.id ?        <NewCommentBox  replyingTo={replyingTo} onCancelReply={()=>{setReplyingTo(null)}}/> : null}
            </div>
        ))
            }
            
        </div>
    )  
}

export default PostComments;
