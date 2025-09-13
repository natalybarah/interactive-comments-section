import './post-component.styles.scss';
import NewCommentBox from '../new-comment/new-comment';
import { useContext, useEffect, useState } from 'react';
import { CommentsContext } from '../../context/comments-context';
import {UserContext} from '../../context/user-context'
import rawData from '../../data.json';
import CommentsWithReplies from '../comment-card/comments.replies';

const PostComments= () =>{
    
    const {setComments, commentsArray,onIncrementVotesHandler, onDecreaseVotesHandler}= useContext(CommentsContext);
    const {setCurrentUserProfile} = useContext(UserContext);
    const [replyingTo, setReplyingTo]= useState(null);

    const {comments, currentUser}=rawData

    useEffect(
        ()=>{
        setComments(comments)
    }, [setComments, comments]
    );

    useEffect(
        ()=>{
        setCurrentUserProfile(currentUser)
    }, []
    );
    //const commentsToSort=[...commentsArray];
    const compare=(a, b)=>{
        return b.score-a.score
    }

    const sortedComments= commentsArray.sort(compare)
  

    return (
       <div>    
            {sortedComments.map((comment)=> (
            
                <CommentsWithReplies key={comment.id} onVote={onIncrementVotesHandler} onDownVote={onDecreaseVotesHandler}  onReply={setReplyingTo}  /*onVote={onIncrementVotesReplyHandler} onDownVote={onDecreaseVotesReplyHandler}*/ comment={comment}/>
            ))
            }
            <NewCommentBox replyingTo={replyingTo} onCancelReply={()=>{setReplyingTo(null)}}/>
        </div>
    )  
}

export default PostComments;
