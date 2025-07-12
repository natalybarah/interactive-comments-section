import { CommentsContext } from "../../context/comments-context";


import { useContext } from "react";



const NewCommentBox= () => {
    
    const {onAddNewComment, onNewCommentChange, commentValues} = useContext(CommentsContext);
    //const {commentValues}= useState();
   // const {content}= commentValues;
    
    return(
        <form onSubmit={onAddNewComment}>
                <label>
                    <input onChange={onNewCommentChange} name="content" type="text" placeholder="Add a comment..." value={commentValues.content} />
                </label>
                <button type="submit">Send</button>
        </form>
    )
}

export default NewCommentBox;








