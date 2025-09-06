import ReactDOM from 'react-dom';

const Portal= ({children})=>{

    const modalRoot= document.getElementById('modal-root');
    return ReactDOM.createPortal(children, modalRoot);

}

export default Portal;