
import './replies.styles.scss';
import {useContext} from 'react';
import { CommentsContext } from '../../context/comments-context';
import CommentCard from '../comment-card/comment-card.component';

const Replies= ()=> {

    const {commentsArray, setComments} = useContext(CommentsContext);

   const repliesC= commentsArray.comment.replies
    return(
        
       <div>
        {
            repliesC && repliesC.map((comment)=>{
                return    <CommentCard comment={comment} />
            })
        }
            
       </div> 
        
    )
};

export default Replies;