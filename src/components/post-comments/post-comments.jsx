import './post-component.styles.scss';
import NewCommentBox from '../new-comment/new-comment';
import { useContext, useEffect, useState, useRef } from 'react';
import { CommentsContext } from '../../context/comments-context';
import {UserContext} from '../../context/user-context'
import rawData from '../../data.json';
import CommentsWithReplies from '../comment-card/comments.replies';

const PostComments= () =>{
    
    const {commentsArray,onIncrementVotesHandler, onDecreaseVotesHandler}= useContext(CommentsContext);
    const { currentUserProfile, setCurrentUserProfile} = useContext(UserContext);
    const [replyingTo, setReplyingTo]= useState(null);
    const [offSet, setOffSet] = useState(0);
    const { setComments} = useContext(CommentsContext)
    const {isReplyClick}= useContext(CommentsContext);
    const {comments, currentUser}=rawData
    const commentRefs= useRef({})

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


    const handleReply=(comment)=>{
        const element= commentRefs.current[comment.id];
        if(!element) return;

        console.log(comment, "COMMENT HANDLE REPLY")
        const rect= element.getBoundingClientRect();
        console.log(element, "REF OBJECT POSITION");
        const distanceToUse= window.innerHeight- rect.bottom;
        setOffSet(distanceToUse)
        setReplyingTo(comment)
        console.log(distanceToUse, "OFFSET!!!")
    }

    const getSetRef= (id) => (el) => {
        if (el) commentRefs.current[id]= el;
        else delete commentRefs.current[id];
    }


    return (
       <div>    
            {sortedComments.map((comment)=>  (
                <div>
                <CommentsWithReplies 
                    key={comment.id} 
                    onVote={onIncrementVotesHandler} 
                    onDownVote={onDecreaseVotesHandler}  
                    onReply={handleReply} 
                    comment={comment}
                    setRef={getSetRef(comment.id)}

                />
  {/*replyingTo && replyingTo.id===comment.id ?        <NewCommentBox  replyingTo={replyingTo} onCancelReply={()=>{setReplyingTo(null)}}/> : null*/}
                </div>
            ))}
           <NewCommentBox offSet={offSet} replyingTo={replyingTo} onCancelReply={()=>setReplyingTo(null)}/>
        </div>
        )
}

export default PostComments;
