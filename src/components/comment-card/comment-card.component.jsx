import { useContext } from "react";
import { CommentsContext } from "../../context/comments-context";
import MinusIcon from '../../assets/icons/icon-minus.svg';
import ReplyIcon from '../../assets/icons/icon-reply.svg';
import PlusIcon from "../../assets/icons/icon-plus.svg";

const CommentCard= ({comment, onDownVote, onVote})=> {

const {onIncrementVotesHandler, onDecreaseVotesHandler}= useContext(CommentsContext);
const voteHandlerIncrease= onVote || onIncrementVotesHandler;
const voteHandlerDecrease= onDownVote || onDecreaseVotesHandler;

    return(
         <div>
                                    <div key={comment.id} className='comment-container'>
                                                    <div className="user-info-container">
                                                        <img src={require(`../../assets/avatars/${comment.user.image.png}`)} alt=""/> 
                                                            <div className="user-info">
                                                                <h2>{comment.user.username}</h2>
                                                                <span>{comment.createdAt}</span>
                                                            </div>
                                                    </div>
                                                    <p>{comment.content}</p>
                                            <div className="comments-actions">
                                                    <div className="vote-container">
                                                        <button   onClick={()=> voteHandlerIncrease(comment)} ><img src={PlusIcon} alt="minus"/></button>
                                                        <span>{comment.score}</span>
                                                        <button onClick={()=> voteHandlerDecrease(comment)}><img src={MinusIcon} alt="minus"/></button>
                                                    </div>
                                                    <div className="reply-container">
                                                        <img src={ReplyIcon} alt=""/>
                                                        <span >Reply</span>
                                                    </div>
                                            </div> 
                                        </div>
                                        <div>
                                            {/*comment.replies.map((commentReply)=>(
                                            <Replies commentReply={commentReply}/>
                                            ))*/}
                                        </div>
                                </div>
    )
}

export default CommentCard;
