import PostComments from "../post-comments/post-comments";
import './comments-container.styles.scss'
//import { UserContext } from "../../context/user-context";

import Modal from "../modals/modal";


const CommentsContainer= () => {

    //const {commentsArray} = useContext(CommentsContext);

    return(
            <div className="main-container"> 
                <PostComments/> 
           {/*    <Modal/>*/} 
            </div>
    )
}

export default CommentsContainer;