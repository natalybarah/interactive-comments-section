import CommentCard from "./comment-card.component";
import "../comment-card/comment-card.styles.scss";
import NewCommentBox from "../new-comment/new-comment";


const CommentsWithReplies= ({comment, onReply, setRef, getSetRef, editingCommentId, setEditingCommentId, replyingTo, onCancelReply})=>{// este es comment del map
    
    const isReplyingHere= replyingTo && replyingTo.id === comment.id;


    return(
        
        <div className="comment-thread">
            <div className= "comment-card-wrapper">
                <CommentCard onCancelReply={onCancelReply} comment={comment} onReply={()=> onReply(comment)} setRef={setRef} editingCommentId={editingCommentId} setEditingCommentId={setEditingCommentId}  />
                {isReplyingHere && (  <NewCommentBox  onCancelReply={onCancelReply} replyingTo={replyingTo} /> )}
            </div>  
            { comment.replies && comment.replies.length > 0 && (
                    <div className="replies-wrapper">
                        {comment.replies.map(reply=>(
                            <CommentsWithReplies key={reply.id}   replyingTo={replyingTo} comment={reply} onReply={onReply} getSetRef={getSetRef} setRef={getSetRef(reply.id)} editingCommentId={editingCommentId} setEditingCommentId={setEditingCommentId} onCancelReply={onCancelReply}/>
                        ))}
                    </div>
                )
            }
        </div>
    )

}

export default CommentsWithReplies;

