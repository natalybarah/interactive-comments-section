import CommentCard from "./comment-card.component";
import { useContext, useState } from "react";
import { UserContext } from "../../context/user-context";
import "../comment-card/comment-card.styles.scss";
import { CommentsContext } from "../../context/comments-context";
import NewCommentBox from "../new-comment/new-comment";


const CommentsWithReplies= ({comment, onReply, setRef, getSetRef, editingCommentId, setEditingCommentId})=>{// este es comment del map

    const {currentUserProfile}=useContext(UserContext);
    const {isReplyClick, setReplyClick}= useContext(CommentsContext);
    
    
//    console.log("respondiendo a", replyingTo)

    return(
        <div className="comment-thread">
            <div className= "comment-card-wrapper">
            <CommentCard comment={comment} onReply={()=> onReply(comment)} setRef={setRef} editingCommentId={editingCommentId} setEditingCommentId={setEditingCommentId}  />
            {/*replyingTo && replyingTo.id===comment.id ?        <NewCommentBox  replyingTo={replyingTo} onCancelReply={()=>{setReplyingTo(null)}}/> : null*/}
                </div>
                {/*isReplyClick? <NewCommentBox  /> : null*/ }
                { /*comment under approach isReplyClick && replyingTo ? <NewCommentBox replyingTo={replyingTo} /*onCancelReply={()=>setReplyingTo(null)}/>/>  : null */ }
              
            {
                comment.replies && comment.replies.length > 0 && (
                    <div className="replies-wrapper">
                        {comment.replies.map(reply=>(
                            <CommentsWithReplies key={reply.id}   comment={reply} onReply={onReply} getSetRef={getSetRef} setRef={getSetRef(reply.id)} editingCommentId={editingCommentId} setEditingCommentId={setEditingCommentId}/>
                        ))}
                    </div>
                )
            }
         
        </div>
    )

}

export default CommentsWithReplies;

//es como que en replies nested no llega el replyingto