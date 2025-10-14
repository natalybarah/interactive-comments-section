
import Portal from "../portals/portal";
import './../modals/modal.styles.scss'


const Modal= ({comment, setToggleDelete, onDeleteItem})=>{
  
    return(
        <Portal>
                <div className="modal-mask">
                    <div className="delete-comment-container">
                        <div className="delete-comment-content">
                            <h1>Delete Comment</h1>
                            <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
                        </div>
                        <div className="delete-buttons-container">
                            <button onClick={()=> setToggleDelete(false)}>NO, CANCEL</button>
                            <div onClick={()=>onDeleteItem(comment)}>
                                <button>YES, DELETE</button>
                            </div>
                        </div>
                    </div>
                </div>
        </Portal>
    )
}

export default Modal;
