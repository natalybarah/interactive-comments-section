/*const addNewReply= (event, commentsArray, replyingTo)=>{
    event.preventDefault();

    const newRepliesArray= commentsArray.map(comment=>{
        if(comment.id === replyingTo.id){
            return {
                ...comment,
                replies: [...comment.replies, replysValues]
            }
        }
        if(comment.replies && comment.replies>0){
            const updatedReplies= updateNestedReplies(comment.replies, replyingTo)
            if(comment.replies !== updatedReplies){
                return {
                    ...comment,
                    replies: updatedReplies
                }
            }
        }
        return comment;
    })

    setComments(newRepliesArray);
    setReplyValues(defaultReplyValues)
}

const updateNestedReplies= (replies, targetReply)=>{
    const newReplies= replies.map(reply=>{
        if(reply.id === targetReply.id){
            return {
                ...reply,
                replies: [...(reply.replies || []), replyValues]
            }
        }
        if(reply.id !== targetReply.id){
            return {

            }
        }
    })

}*/