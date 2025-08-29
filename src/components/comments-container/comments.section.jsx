import PostComments from "../post-comments/post-comments";
import './comments-container.styles.scss'
//import { UserContext } from "../../context/user-context";
;


const CommentsContainer= () => {

    //const {commentsArray} = useContext(CommentsContext);

    return(
            <div className="main-container"> 
                <PostComments/> 
               
            </div>
    )
}

export default CommentsContainer;