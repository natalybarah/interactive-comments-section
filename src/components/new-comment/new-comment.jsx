import { CommentsContext } from "../../context/comments-context";
import "../new-comment/new-comment.styles.scss"
import { useContext, useRef, useEffect} from "react";
import { UserContext } from "../../context/user-context";

const NewCommentBox= ({replyingTo, onCancelReply}) => {
    
    const inputRef=useRef(null);
   
    const { commentValues, isReplyClick, onAddNewItem, onChangeItem } = useContext(CommentsContext);
    const { currentUserProfile } = useContext(UserContext);

 useEffect(() => {
    if (replyingTo && inputRef.current) inputRef.current.focus({preventScroll: true});
  }, [replyingTo]);
  
  const placeholder = isReplyClick && replyingTo?.user?.username
      ? `You are replying to @${replyingTo.user.username}`
      : 'Add a comment...';
    
    return(
        <div  className="new-box-container">
            <form onSubmit={(event)=>onAddNewItem(event, replyingTo, onCancelReply)}  >
                    <label className="add-item-input" >
                        <input  ref={inputRef} required 
                                onChange={ onChangeItem} 
                                name="content" 
                                type="text" 
                                placeholder={placeholder}
                                value={commentValues.content}  />
                    </label>
                    <div className="add-item-actions">
                        <span>{currentUserProfile && <img src={require(`../../assets/avatars/${currentUserProfile.image.png}`)} alt=""/>}</span>
                        <button type="submit">SEND</button>
                    </div>
            </form>
        </div>
    )
}

export default NewCommentBox;


 



