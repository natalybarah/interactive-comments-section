import './post-component.styles.scss';
import NewCommentBox from '../new-comment/new-comment';
import { useContext,useState, useRef } from 'react';
import { CommentsContext } from '../../context/comments-context';
import CommentsWithReplies from '../comment-card/comments.replies';

const PostComments= () =>{
    
    const {commentTree, onIncrementVotesHandler, onDecreaseVotesHandler}= useContext(CommentsContext);
    const [replyingTo, setReplyingTo]= useState(null);
    const [editingCommentId, setEditingCommentId]= useState(null);
    
    const commentRefs= useRef({});
     
    const getSetRef= (id) => (el) => {
        if (el) commentRefs.current[id]= el;
        else delete commentRefs.current[id];
    }
   
    // why did i have this before? useEffect( ()=>{ setCommentTree(comments)}, [setCommentTree, comments]);
    //useEffect(()=>{setCurrentUserProfile(currentUser)}, []);

    const compare=(a, b)=> b.score-a.score
    const sortedComments = [...commentTree].sort(compare);
 
  
  const handleReply = (comment) => {
      setReplyingTo(comment);
      const el = commentRefs.current[comment.id];
      el?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
    };

    const cancelReply = () => setReplyingTo(null);

    return (
       <div className="post-comments-container">    
            {sortedComments.map((comment)=>  (
                <div key={comment.id}>
                <CommentsWithReplies 
                    onVote={onIncrementVotesHandler} 
                    onDownVote={onDecreaseVotesHandler}  
                    onReply={handleReply} 
                    comment={comment}
                    setRef={getSetRef(comment.id)}
                    getSetRef={getSetRef}
                    editingCommentId={editingCommentId}
                    setEditingCommentId={setEditingCommentId}
                    replyingTo={replyingTo}
                    onCancelReply={cancelReply}

                />
                </div>
            ))}
            {   !editingCommentId &&  !replyingTo && (
                 <NewCommentBox  replyingTo={replyingTo} onCancelReply={cancelReply} />
            )
            }
        </div>
        )
}

export default PostComments;
