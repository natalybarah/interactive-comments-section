import './post-component.styles.scss';
import NewCommentBox from '../new-comment/new-comment';
import { useContext, useEffect } from 'react';
import { CommentsContext } from '../../context/comments-context';
import {UserContext} from '../../context/user-context'
import rawData from '../../data.json';
import CommentCard from '../comment-card/comment-card.component';

const PostComments= () =>{
    
    const {setComments, commentsArray, onIncrementVotesReplyHandler, onDecreaseVotesReplyHandler}= useContext(CommentsContext);
    const {setCurrentUserProfile} = useContext(UserContext);

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
    
  
  

    return (
       <div> 
        { commentsArray.map((comment)=> {
                    //const {id, content, user, createdAt, score, replies}= comment;
                    //const {image, username}= user;
                    //const selectedVoteComment= {id, content, user,  createdAt, score, replies, image, username};

                return(
                        <div key={comment.id}>
                            <CommentCard comment={comment} />
                           {comment.replies.map((reply)=> reply.id ? <CommentCard key={reply.id} onDownVote={onDecreaseVotesReplyHandler} onVote={onIncrementVotesReplyHandler} comment={reply} /> : null)}
                           
                        </div>)
                        
                        

                        
        } )}
            <NewCommentBox/>
        </div>
    )  
}

export default PostComments;
