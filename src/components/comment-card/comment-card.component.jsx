import { useContext, useState } from "react";
import { CommentsContext } from "../../context/comments-context";
import { UserContext } from "../../context/user-context";
import "../comment-card/comment-card.styles.scss";
import MinusIcon from '../../assets/icons/icon-minus.svg';
import ReplyIcon from '../../assets/icons/icon-reply.svg';
import PlusIcon from "../../assets/icons/icon-plus.svg";
import DeleteIcon from "./../../assets/icons/icon-delete.svg";
import EditIcon from "../../assets/icons/icon-edit.svg";
import Modal from "../modals/modal";

const CommentCard= ({comment, onReply, setRef, editingCommentId, setEditingCommentId, onCancelReply})=> {

const { upVote, downVote,  setReplyClick, onDeleteItem, onChangeEditItem, onUpdateItem}= useContext(CommentsContext);
const {currentUserProfile}= useContext(UserContext);
const [toggleDelete, setToggleDelete]= useState(false);
const [editContent, setEditContent]= useState(comment.content);
const isEditing= editingCommentId === comment.id;

    return(
         <div>
            <div ref={setRef} key={comment.id} className="comment-container">
                            <div className="user-info-container">
                                <img src={require(`../../assets/avatars/${comment.user.image.png}`)} alt=""/> 
                                    <div className="user-info">
                                        <h2>{comment.user.username}</h2>
                                        {currentUserProfile.username === comment.user.username && 
                                        (<span className="user-badge">You</span>)}
                                        <span>{comment.createdAt}</span>
                                    </div>
                            </div>
                      {isEditing ? (
                                <form >
                                    <label>
                                        <textarea className="edit-textarea"  required onChange={(event)=>{onChangeEditItem(event); setEditContent(event.target.value)}} name="content" type="text" value={editContent} />
                                    </label>
                                </form>
                                ) :(     
                                <div className="comment-content">
                                    <p>{comment.content}</p>
                                </div>)
                        }
                            <div className="vote-container">
                                <button onClick={()=> downVote(comment, currentUserProfile.id) }><img src={MinusIcon} alt="minus"/></button>
                                    <span>{comment.score}</span>
                                <button   onClick={()=> upVote(comment, currentUserProfile.id)}><img src={PlusIcon} alt="plus"/></button>
                            </div>

                    <div className="comments-actions">
                       
                     {isEditing ? (       
                        <div onClick={()=>{onUpdateItem(comment); setEditingCommentId(null)}} className="update-container">
                            <button>UPDATE</button> 
                        </div>
                     ) : currentUserProfile.username === comment.user.username  ? (     
                                <div className="action-buttons">
                                    <button onClick={()=>setToggleDelete(true)}>
                                        <img alt="delete" src={DeleteIcon}/>
                                        <span className="delete-label">Delete</span>
                                    </button>
                                    <button onClick={()=> setEditingCommentId(comment.id)}>
                                        <img alt="edit" src={EditIcon}/>
                                        <span className="edit-label">Edit</span>
                                    </button>
                                </div>)
                                :  <div className="reply-container">
                                        <img src={ReplyIcon} alt=""/>
                                        <span  onClick={()=>{onReply(comment); setReplyClick(true)}}>Reply</span>
                                    </div>   }
                    </div>
                    { toggleDelete && ( <Modal onCancelReply={()=>onCancelReply(null)} setToggleDelete={setToggleDelete}  comment={comment} onDeleteItem={onDeleteItem}/> )}
            </div>
        </div>
    )
}

export default CommentCard;
