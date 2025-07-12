import PostComments from "../post-comments/post-comments";
import './comments-container.styles.scss'
//import { UserContext } from "../../context/user-context";
import { CommentsContext } from "../../context/comments-context";
import { useContext } from "react";


const CommentsContainer= () => {

    //const {commentsArray} = useContext(CommentsContext);

    return(
            <div>
                <PostComments/> 
               
            </div>
    )
}

export default CommentsContainer;