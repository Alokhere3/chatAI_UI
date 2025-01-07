import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendPrompt } from '../store/dataSlice';
import ReactMarkdown from 'react-markdown';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another
import { docco ,vs ,xcode} from 'react-syntax-highlighter/dist/esm/styles/hljs';
// import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import SyntaxHighlighter from 'react-syntax-highlighter';

function ChatPage() {
  const dispatch = useDispatch();
  const [prompt, setPromt] = useState("")
  const { chats, status, error } = useSelector((state) => state);
  const customVsTheme = {
    ...vs, 
    'hljs-keyword': {
      color: '#007acc', // Adjust keyword color 
    },
    'hljs-comment': {
      color: '#6a737d', // Adjust comment color
    },
    'hljs-background': { 
      backgroundColor: '#282c34 ' // Add this line to change background
    },
    // ... other customizations
  };
  const send = () => {

    dispatch(sendPrompt({ prompt, chats }))
    console.log(prompt)
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
    <div className="container-fluid bg-dark vh-100">
      <div className="row h-100">
        {/* Sidebar */}
        <div className="col-md-3 border-end p-3">
          <h5>Contacts</h5>
          <ul className="list-group bg-dark text-white">
            <li className="list-group-item list-group bg-dark text-white">John Doe</li>
            <li className="list-group-item list-group bg-dark text-white">Jane Smith</li>
            <li className="list-group-item list-group bg-dark text-white">Michael Johnson</li>
          </ul>
        </div>
        {/* Chat Area */}
        <div className="col-md-9 d-flex h-100 align-center justify-content-center">
          <div className="col-md-6 d-flex h-100 flex-column">
            {/* Chat Header */}
            <div className="border-bottom flex-10 p-3">
              <h5 className="text-white">Chat with AI</h5>
            </div>

            {/* Chat Messages */}
            <div className="p-3 bg-dark overflow-auto h-100"> {/* Added height: 100% */}
              {chats.map((message, index) => {
                // Check if the sender is "model"
                if (message.sender === "model") {
                  const formattedData = splitTextAndCode(message.message); // Split message into text and code

                  return (
                    <div className="mb-3" key={index}>
                      <div className="p-2 bg-dark text-white rounded w-100">
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
                                <SyntaxHighlighter language={val.context.language} style={vs }>
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
                      <div className="p-2 bg-secondary text-white rounded w-75 ms-auto">
                        <ReactMarkdown>{message.message}</ReactMarkdown>
                      </div>
                    </div>
                  );
                }
              })}
            </div>

            {/* Input Area */}
            <div className="border-top p-3 d-flex">
              <input
                type="text"
                onChange={(e) => setPromt(e.target.value)}
                className="form-control me-2"
                placeholder="Type a message"
              />
              <button className="btn btn-secondary" onClick={send}>
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
