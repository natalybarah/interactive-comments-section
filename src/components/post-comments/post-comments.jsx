import './post-component.styles.scss';
import ReplyIcon from '../../assets/icons/icon-reply.svg';
import PlusIcon from '../../assets/icons/icon-plus.svg';
import MinusIcon from '../../assets/icons/icon-minus.svg';
import NewCommentBox from '../new-comment/new-comment';
import { useContext, useEffect } from 'react';
import { CommentsContext } from '../../context/comments-context';
import {UserContext} from '../../context/user-context'
import rawData from '../../data.json';

const PostComments= () =>{
    
    const {setComments, commentsArray, onIncrementVotesHandler, onDecreaseVotesHandler}= useContext(CommentsContext);
    const {setCurrentUserProfile} = useContext(UserContext);

    const {comments, currentUser}=rawData

    useEffect(
        ()=>{
        setComments(comments)
    }, [setComments, comments]
    );

    useEffect(
        ()=>{
        setCurrentUserProfile(currentUser)
    }, []
    );
  console.log("commentsArray in postcomment", commentsArray)


    return (
       <div> 
        { commentsArray.map((comment)=> {
                    const {id, content, user, createdAt, score, replies}= comment;
                    const {image, username}= user;
                    const selectedVoteComment= {id, content, user,  createdAt, score, replies, image, username};

                   return( <div key={comment.id} className='comment-container'>
                            <div className="user-info-container">
                                 <img src={require(`../../assets/avatars/${comment.user.image.png}`)} alt=""/> 
                                    <div className="user-info">
                                        <h2>{comment.user.username}</h2>
                                        <span>{comment.createdAt}</span>
                                    </div>
                            </div>
                            <p>{comment.content}</p>
                            <div className="comments-actions">
                                    <div className="vote-container">
                                        <button   onClick={()=> onIncrementVotesHandler(selectedVoteComment)}><img src={PlusIcon} alt="minus"/></button>
                                        <span>{comment.score}</span>
                                        <button onClick={()=> onDecreaseVotesHandler(selectedVoteComment)}><img src={MinusIcon} alt="minus"/></button>
                                    </div>
                                <div className="reply-container">
                                    <img src={ReplyIcon} alt=""/>
                                    <span>Reply</span>
                                </div>
                            </div> 
                         </div>)
        } )}
        <NewCommentBox/>
        </div>
    )  
}

export default PostComments;
