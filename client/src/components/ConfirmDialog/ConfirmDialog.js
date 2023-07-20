import './ConfirmDialog.css';

const ConfirmDialog = (props) =>{
    const question = props.question;

    return(
        <div className="modal">
            <p>{question}</p>
            <div className="buttons-list">
                <button 
                    type="button" 
                    className="button cancel-button" 
                    onClick={() => props.handleCancel()}>Cancel
                </button>
                <button 
                    type="button" 
                    className="button delete-button"  
                    onClick={() => props.handleDelete()}>Delete
                </button>
            </div>
        </div>   
    )
}

export default ConfirmDialog;