import { CommentsContext } from "../../context/comments-context";


import { useContext } from "react";



const NewCommentBox= ({replyingTo}) => {
    
    const {onAddNewComment, onNewCommentChange, commentValues, replyValues, onReplyChange, onAddNewReply, isReplyClick} = useContext(CommentsContext);
    
    //const {commentValues}= useState();(
   // const {content}= commentValues;
   const onNewCommentAndReplyHandler= (event)=>{
    if(isReplyClick){
        onAddNewReply(event, replyingTo)
    } else onAddNewComment(event)
   };

    const onCommentAndReplyChange=  (event)=>{
        if(isReplyClick){
        onReplyChange(event)} else {
            onNewCommentChange(event)
        }
    }

    return(
        <form onSubmit={onNewCommentAndReplyHandler}>
                <label>
                    <input onChange={ onCommentAndReplyChange} name="content" type="text" 
                    placeholder={isReplyClick ? "You are replying to" : "Add a new comment..."}
                     value={ isReplyClick ? replyValues.content : commentValues.content} />
                </label>
                <button type="submit">Send</button>
        </form>
    )
}
//se esta llamado on reply change y on add new reply, añade el reply duplicado al final de cada comment y despues de su reply existente
//necesito añadir algo para verificar a donde se respondio y a que comment unico deberia agregarse
//al agregar nuevo comment SI LLAMA onNewCommentChange pero no llama onAddNewComment, porque? y en vez llama a a onAddNewReply
export default NewCommentBox;
//cuando se da click aqui deberia actualizar hacer los submit de form 
//para actualizar los nuevos comments array







