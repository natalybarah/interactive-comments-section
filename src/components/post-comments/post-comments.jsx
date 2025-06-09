import './post-component.styles.scss';
import AmyLogo from '../../assets/avatars/image-amyrobson.png';
import ReplyIcon from '../../assets/icons/icon-reply.svg';
import PlusIcon from '../../assets/icons/icon-plus.svg';
import MinusIcon from '../../assets/icons/icon-minus.svg';

const PostComments= () =>{
    return (
        <div className='comment-container'>
            <div className="user-info-container">
                <img src={AmyLogo} alt=""/>
                <div className="user-info">
                    <h2>Username</h2>
                    <span>1 month ago</span>
                </div>
            </div>
            <p>Impresive! though it seems the drag <br></br>
            feature could be improved. But overall 
            it looks incredible. You've nailed the design
            and the responsiveness at various
            breakpoints works really well.
            </p>
           
                <div className="comments-actions">
                    <div className="vote-container">
                        <img src={PlusIcon} alt="plus"/>
                        <span>12</span>
                        <img src={MinusIcon} alt="minus"/>
                    </div>
                    <div className="reply-container">
                        <img src={ReplyIcon} alt=""/>
                        <span>Reply</span>
                    </div>
                </div> 
            
        </div>
    )
}

export default PostComments;
