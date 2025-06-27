import PostComments from "../post-comments/post-comments";
import './comments-container.styles.scss'


const CommentsContainer= () => {


    return(
        <div className='main-container'>
            <PostComments/>
        </div>
    )
}

export default CommentsContainer;