import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {sendPrompt,addChatHistory, loadChat } from '../store/dataSlice';
import ReactMarkdown from 'react-markdown';
// import 'prismjs/components/prism-clike';
// import 'prismjs/components/prism-javascript';
// import 'prismjs/themes/prism.css'; //Example style, you can use another
import geminiLogo from "../assets/Images/Google_Gemini_logo.svg.png"
// import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { EditIcon, SendIcon } from '../assets/iconSVGs';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/hljs';

function ChatPage() {
  const dispatch = useDispatch();
  const [prompt, setPromt] = useState("")
  const chats = useSelector((state) => state.chats);
  const status = useSelector((state) => state.status);
  const  error = useSelector((state) => state.error);
  const  chatHistory = useSelector((state) => state.chatHistory);
  useEffect(() => {
  }, [chatHistory])
  const send = () => {

    dispatch(sendPrompt({ prompt, chats }))
    setPromt("")
  }

  function splitTextAndCode(input) {
    const result = [];
    const regex = /```(\w+)?\n([\s\S]*?)\n```/g; // Matches code blocks with optional language
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(input)) !== null) {
      // Extract text before the code block
      if (lastIndex < match.index) {
        const textPart = input.slice(lastIndex, match.index);
        if (textPart.trim()) {
          result.push({ type: "text", context: textPart });
        }
      }

      // Extract and add the code block
      const language = match[1] ? match[1].trim() : "plain";
      const codeContent = match[2];
      result.push({
        type: "code",
        context: { language, code: codeContent },
      });

      lastIndex = regex.lastIndex;
    }

    // Process any remaining text after the last code block
    if (lastIndex < input.length) {
      const remainingText = input.slice(lastIndex);
      if (remainingText.trim()) {
        result.push({ type: "text", context: remainingText });
      }
    }

    return result;
  }
  return (
    <div className="container-fluid  vh-100">
      <div className="row h-100">
        {/* Sidebar */}
        <div className="col-md-2 border-end p-1">
          <div className=" w-100 d-flex align-center justify-content-between p-3 col-md-6">
            <h5>History</h5> <EditIcon
              width={15}
              color={"white"}
              onClick={() => { dispatch(addChatHistory(chats)) }}
              title={"New Chat"}
            />
          </div>
          <div className="list-group d-flex align-cente justify-content-center">
            {
              chatHistory.map((chat,i)=>{
                console.log(chat)
                return(

                  <button key={i} type="button" onClick={()=>{dispatch(loadChat(chat.id))}} className={"list-group-item btn-sm list-group-item-action p1"+ " "+ (i==0?"active":"")}>{chat.title?.slice(0,20)}...</button>
                )
              })
            }
          
          </div>

        </div>
        {/* Chat Area */}
        <div className="col-md-10 d-flex h-100 align-center justify-content-center ">
          <div className=" d-flex h-100 w-100 flex-column">
            {/* Chat Header */}
            <div className="row d-flex align-center  justify-content-center">
              <div className="col-md-6 border-bottom flex-10 d-flex align-center  justify-content-between p-3">
                <h5 className="">Chat with AI</h5>
                {
                  chats.length>0?<img src={geminiLogo} style={{height:"20px"}} alt="" />:""
                }
              </div>
            </div>

            {/* Chat Messages */}
            <div className="row overflow-auto h-100 d-flex align-center justify-content-center ">
       {

chats.length>0?

             <div className="p-3  col-md-6  ">
              {chats.map((message, index) => {
                  // Check if the sender is "model"
                  if (message.sender === "model") {
                    const formattedData = splitTextAndCode(message.message); // Split message into text and code

                    return (
                      <div className="mb-3" key={index}>
                        <div className="p-2   rounded w-100">
                          {formattedData.map((val, i) => {
                            // Render text or code conditionally
                            if (val.type === "text") {
                              return (
                                <ReactMarkdown key={i}>
                                  {val.context}
                                </ReactMarkdown>
                              );
                            } else if (val.type === "code") {
                              return (
                                <div key={i} className=" p-2 rounded mt-2">

                                  <SyntaxHighlighter language={val.context.language} style={vs}>
                                    {val.context.code}
                                  </SyntaxHighlighter>
                                </div>
                              );
                            }
                            return null; // Fallback in case of unexpected data type
                          })}
                        </div>
                      </div>
                    );
                  } else {
                    // For non-model messages
                    return (
                      <div className="text-end mb-3" key={index}>
                        <div className="p-2 bg-secondary  rounded w-75 ms-auto">
                          <ReactMarkdown>{message.message}</ReactMarkdown>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
              :

              <div className="p-3  col-md-6 h-100 d-flex align-items-center justify-content-center flex-column">
                <img src={geminiLogo} alt="" />
                <h2 className='text-center'>This Chat Ai is powered with Gemini flash 1.5 </h2>
                <h6>None :  This  Chat App is created for learning purpose.</h6>
              </div>
       } 
            </div>

            {/* Input Area */}
            <div className="row d-flex align-center justify-content-center">
              <div className="border-top p-3 d-flex align-center justify-content-center  col-md-6">
                <input
                  type="text"
                  onChange={(e) => setPromt(e.target.value)}
                  className="form-control me-2"
                  onKeyDown={(e)=>{if(e.key=="Enter")send()}}
                  value={prompt}
                  placeholder="Type a message"
                />
                <span className=" mt-2">
                  <SendIcon
                    width={20}
                    color={"white"}
                    onClick={send}
                  />
                </span>
                {/* <button className="btn btn-secondary" onClick={send}>
                Send
              </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
