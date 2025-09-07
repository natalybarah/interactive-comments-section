import { useContext } from "react";
import { CommentsContext } from "../../context/comments-context";
import { UserContext } from "../../context/user-context";
import MinusIcon from '../../assets/icons/icon-minus.svg';
import ReplyIcon from '../../assets/icons/icon-reply.svg';
import PlusIcon from "../../assets/icons/icon-plus.svg";
import DeleteIcon from "./../../assets/icons/icon-delete.svg";
import EditIcon from "../../assets/icons/icon-edit.svg";

const CommentCard= ({comment,  onDownVote, onVote, onReply})=> {

const {  onIncrementVotesHandler, onDecreaseVotesHandler, setReplyClick}= useContext(CommentsContext);
const {currentUserProfile}= useContext(UserContext);

const voteHandlerIncrease= onVote|| onIncrementVotesHandler; 
const voteHandlerDecrease= onDownVote || onDecreaseVotesHandler; 
console.log(currentUserProfile.username, "este currentUserProfile username")
console.log(comment.username, " este comment.Username!")
    return(
         <div>
            <div key={comment.id} className="comment-container">
                            <div className="user-info-container">`
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
                            { currentUserProfile.username === comment.user.username ? 
                                
                                <div className="action-buttons" >
                                    <button><img alt="delete" src={DeleteIcon}/></button>
                                    <span className="delete-label">Delete</span>
                                    <button><img alt="edit" src={EditIcon}/></button>
                                    <span className="edit-label">Edit</span>
                                </div>
                                : <div className="reply-container">
                                    <img src={ReplyIcon} alt=""/>
                                    <span  onClick={()=>{ onReply(); setReplyClick(true)}}   >Reply</span>
                                </div>
                            }
                            
                    </div> 
                </div>
                <div>
                </div>
        </div>
    )
}

export default CommentCard;
//si es mi comentario, me sale delete o edit
//si no es mi comentario me sale reply