import './post-component.styles.scss';
import NewCommentBox from '../new-comment/new-comment';
import { useContext, useEffect, useState, useRef } from 'react';
import { CommentsContext } from '../../context/comments-context';
import {UserContext} from '../../context/user-context'
import rawData from '../../data.json';
import CommentsWithReplies from '../comment-card/comments.replies';

const PostComments= () =>{
    
    const {commentsArray,onIncrementVotesHandler, onDecreaseVotesHandler, toggleEdit, setToggleEdit}= useContext(CommentsContext);
    const { currentUserProfile, setCurrentUserProfile} = useContext(UserContext);
    const [replyingTo, setReplyingTo]= useState(null);
    //const [offSet, setOffSet] = useState(0);
    const { setComments} = useContext(CommentsContext)
    const {isReplyClick}= useContext(CommentsContext);
    const {comments, currentUser}=rawData;
    const commentRefs= useRef({});
    const [editingCommentId, setEditingCommentId]= useState(null);

    console.log(toggleEdit, "TOGGLE EDIT EN POST")
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
    
   
  const getSetRef= (id) => (el) => {
        if (el) commentRefs.current[id]= el;
        else delete commentRefs.current[id];
    }

    const handleReply=(comment)=>{
        setReplyingTo(comment)
        const element= commentRefs.current[comment.id];
        if(!element) return;
        const rect= element.getBoundingClientRect();
        const offSet= rect.top-16; 
        window.scrollBy(0, offSet);
    }

   const sortedComments= commentsArray.sort(compare)


    return (
       <div className="post-comments-container">    
            {sortedComments.map((comment)=>  (
                <div>
                <CommentsWithReplies 
                    key={comment.id} 
                    onVote={onIncrementVotesHandler} 
                    onDownVote={onDecreaseVotesHandler}  
                    onReply={handleReply} 
                    comment={comment}
                    setRef={getSetRef(comment.id)}
                    getSetRef={getSetRef}
                    editingCommentId={editingCommentId}
                    setEditingCommentId={setEditingCommentId}

                />
  {/*replyingTo && replyingTo.id===comment.id ?        <NewCommentBox  replyingTo={replyingTo} onCancelReply={()=>{setReplyingTo(null)}}/> : null*/}
                </div>
            ))}
            {   !editingCommentId && (
                 <NewCommentBox replyingTo={replyingTo} onCancelReply={()=>setReplyingTo(null)}/>
            )
            }
        </div>
        )
}

export default PostComments;
