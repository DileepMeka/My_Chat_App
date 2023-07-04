import React, {Component} from "react"
import {v4 as uuidv4} from "uuid"
import "./index.css"
import MentionBox from "../mentionBox";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUsers} from '@fortawesome/free-solid-svg-icons';
import {faFaceSmile} from '@fortawesome/free-solid-svg-icons';
import MsgBody from "../msgBody"
import EmojiPicker from 'emoji-picker-react';

const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];

class ChatApp extends Component{

    state={
        messages:[],
        presentMsg:"",
        currentLetter:"",
        toggleEmojiKeyboard:false
    }

    chatContainerRef = React.createRef();

    onMention=(name)=>{
        const {presentMsg}= this.state
        this.setState({
            presentMsg:`${presentMsg}${name}`,
            currentLetter:name[name.length-1]
        })
    }

    onChangeInput=(e)=>{
        this.setState({
            presentMsg:e.target.value,
            currentLetter:e.target.value[e.target.value.length-1]
        })
    }

    sendMessage=(e)=>{
        e.preventDefault()
        const chatMessages = document.getElementById("chat-messages");
        chatMessages.scrollTop = chatMessages.scrollHeight;
        const {presentMsg,messages}=this.state
        const message= presentMsg
        const updatedMsg= message.trim()
        if(updatedMsg!==""){
        const msgId= uuidv4()
        const randomNumber= Math.random()*(user_list.length-1)
        const roundedNumber= Math.floor(randomNumber)
        const sender= user_list[roundedNumber]
        const date= new Date()
        const hours= date.getHours()
        const minutes = date.getMinutes()
        const updatedMinutes= minutes>9? minutes:`0${minutes}`
        const sentTime= `${hours}:${updatedMinutes}`
        const messageDetails = {
            msgId,
            message:updatedMsg,
            sender,
            sentTime,
            likeCount:0
        }
        const element = document.getElementById("chat-messages")
        element.scrollTop = element.scrollHeight+10000;
        this.setState({
            messages:[...messages,messageDetails],
            presentMsg:""
        })
        setTimeout(() => {
            chatMessages.scrollTop = chatMessages.scrollHeight;
          }, 0);
    }
    }


    onEmojiClick=(e)=>{
     const {presentMsg}=this.state
     this.setState({
        presentMsg:presentMsg+e.emoji
     })   
    }

    toggleEmojiKeyboard= ()=>{
        const {toggleEmojiKeyboard}=this.state
        this.setState({toggleEmojiKeyboard:!toggleEmojiKeyboard})
    }

    render(){

        const {messages,presentMsg,currentLetter,toggleEmojiKeyboard}= this.state

        const mentions = currentLetter==="@"?(<ul className="mention-box">
        {user_list.map(item=>(
            <MentionBox name={item} onMention={this.onMention} key={user_list.indexOf(item)} />
        ))}
    </ul>):""

        const emojiKeyboard= toggleEmojiKeyboard?(
            <div className="emojiKeyboard">
                <EmojiPicker onEmojiClick={this.onEmojiClick} />
            </div>
        ):"";


        return(
            <div className="body">
                <div className="header">
                    <div className="chat-detils">
                        <h1 className="chat-heading">Introductions</h1>
                        <p className="chat-description">This Channel is For Company Wide Chatter</p>
                    </div>
                    <div className="members">
                        <p className="members-count"><span>{user_list.length}</span> | 100</p>
                        <FontAwesomeIcon className="users-icon" icon={faUsers} />
                    </div>
                </div>
                <hr />
                <div className="chat-body" id="chat-body">
                    <div id="chat-messages" className="chat-messages">
                        {messages.map(item=>(
                            <MsgBody messageDetails={item} key={item.msgId} />
                        ))}
                    </div>
                    {emojiKeyboard}
                    {mentions}
                                        
                    <div className="input-bar">
                        <form className="form" onSubmit={this.sendMessage} >                        
                            <input onChange={this.onChangeInput} autoFocus value={presentMsg} className="input" type="text" placeholder="Type Message" />
                        </form>
                        <button onClick={this.toggleEmojiKeyboard} className="emoji-button">
                            <FontAwesomeIcon className="emoji" icon={faFaceSmile} />
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ChatApp