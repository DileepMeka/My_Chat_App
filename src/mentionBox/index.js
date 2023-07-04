import { Component } from "react";
import "./index.css"

class MentionBox extends Component{

    render(){

        const {name,onMention}=this.props

        const onMentionName= ()=>{
            onMention(name)
        }

        return(
            <li className="mentions">
                <div className="mention-sender sender-letter-container">
                    <h1 className="sender-letter">
                        {name[0]}
                    </h1>
                </div>
                <button onClick={onMentionName} className="mention-name">{`@${name}`}</button>
            </li>
        )
    }

}

export default MentionBox