import CommentCard from "./comment-card.component";
import { useContext } from "react";
import { CommentsContext } from "../../context/comments-context";

const CommentsWithReplies= ({comment, onVote, onDownVote,  onReply})=>{

    const {onIncrementVotesReplyHandler, onDecreaseVotesReplyHandler}= useContext(CommentsContext);
    return(
        <div>
        
            <CommentCard comment={comment} onVote={onVote} onDownVote={onDownVote} onReply={()=> onReply(comment)} />
            {
                comment.replies && comment.replies.length > 0 && (
                    <div className="replies-wrapper">
                        {comment.replies.map(reply=>(
                            <CommentsWithReplies key={reply.id}  comment={reply} onVote={onIncrementVotesReplyHandler} onDownVote={onDecreaseVotesReplyHandler}  onReply={onReply} />
                        ))}
                    </div>
                )
            }
        </div>
    )

}

export default CommentsWithReplies;