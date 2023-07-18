import './ConfirmDialog.css';

const ConfirmDialog = (props) =>{
    const question = props.question;

    function onHandleCancel(){
        props.handleCancel();
    }

    function handleDelete(){
        props.handleDelete();
    } 
    
    return(
        <div className="modal">
            <p>{question}</p>
            <div className="buttons-list">
                <button type="button" className="button cancel-button" onClick={onHandleCancel}>Cancel</button>
                <button type="button" className="button delete-button"  onClick={handleDelete}>Delete</button>
            </div>
        </div>   
    )
}

export default ConfirmDialog;