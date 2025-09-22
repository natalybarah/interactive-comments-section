import { CommentsContext } from "../../context/comments-context";
import "../new-comment/new-comment.styles.scss"

import { useContext } from "react";
import { UserContext } from "../../context/user-context";

const NewCommentBox= ({replyingTo, offSet}) => {

 
    console.log(replyingTo, "replying A!")
    const { commentValues,  isReplyClick, onAddNewItem, onChangeItem} = useContext(CommentsContext);
    const {currentUserProfile}= useContext(UserContext);
    
    return(
        <div  className="new-box-container" style={{bottom: replyingTo ?  `${offSet}px` : "1.6rem " }}>
        <form  onSubmit={(event)=>onAddNewItem(event, replyingTo)}  >
                <label className="add-item-input" >
                    <input required onChange={ onChangeItem} name="content" type="text" 
                    placeholder={isReplyClick ? `You are replying to ${replyingTo.user.username}` : "Add a comment..."}
                     value={commentValues.content}  />
                </label>
                <div className="add-item-actions">
                    <span>{currentUserProfile && <img src={require(`../../assets/avatars/${currentUserProfile.image.png}`)} alt=""/>}
                    </span>
                    <button type="submit">SEND</button>
                </div>
        </form>
        </div>
    )
}

export default NewCommentBox;


 



