import { Component } from "react";
import "./index.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faThumbsUp} from '@fortawesome/free-solid-svg-icons';


class MsgBody extends Component{

    state={likeCount:0}
    
    hitLike=()=>{
     this.setState(prevState=>({
        likeCount:prevState.likeCount+1
     }))   
    }

    render(){
    const {messageDetails}= this.props
    const {msgId,message,sender,sentTime}= messageDetails
    const {likeCount}= this.state
    const likeCLass=likeCount>0?"liked" :""
    

    return(
        <div className="message-box">
            <div className="sender-letter-container">
                <h1 className="sender-letter">
                    {sender[0]}
                </h1>
            </div>
            <div className="message-details-container">
                <div className="message-details">
                    <h1 className="sender">{sender}</h1>
                    <p className="sent-time">
                        {sentTime}
                    </p>
                </div>
                <div className="message-body-container">
                    <p className="message-body">
                        {message}
                    </p>
                </div>
            </div>
            <button onClick={this.hitLike} className="like-button">
            <FontAwesomeIcon className={`${likeCLass} like`} icon={faThumbsUp} />
            <span className="like-count"><sub>{likeCount}</sub></span>
            </button>
            
        </div>

    )
    }

}

export default MsgBody