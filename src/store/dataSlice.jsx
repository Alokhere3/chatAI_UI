import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; // Import uuid for unique ID generation

// Async Thunk for sending a prompt
export const sendPrompt = createAsyncThunk(
  "sendPrompt",
  async ({ prompt, chats }, { rejectWithValue }) => {
    try {
      console.log(chats);

      // Include the complete chat context in the API request
      const context = chats
        .map((msg) => `${msg.sender}: ${msg.message}`)
        .join("\n");

      const response = await axios.post(
        "https://chatai-server-l0ve.onrender.com/guestUser/messages",
        {
          prompt: `${context}\nUser: ${prompt}`,
        }
      );

      console.log(response.data);
      return response.data; // Ensure payload structure aligns with `extraReducers`
    } catch (error) {
      console.error(error);
      // Return a rejected value for proper error handling in `rejected` case
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


//Async thunk to fetch title and save with in history. 
export const addChatHistory=createAsyncThunk("addChatHistory",async(message,{ rejectWithValue })=>{
  console.log("add history")
     // Include the complete chat context in the API request
     const context = message.slice(0,10)
     .map((msg) => `${msg.sender}: ${msg.message}`)
     .join("\n");
  try{
    const response = await axios.post(
      "http://localhost:3000/guestUser/chatTitle",
      {
        prompt:`${context }`,
      }
    );
    console.log(response);
    return response.data; // Ensure payload structure aligns with `extraReducers`
  } catch(error){
    console.error(error);
    // Return a rejected value for proper error handling in `rejected` case
    return rejectWithValue(error.response?.data || error.message);
  }
})

// Data Slice
const dataSlice = createSlice({
  name: 'data',
  initialState: {
    chats: [],
    chatHistory: [],
    items: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    deleteChatHistory: (state) => {
      state.chatHistory = []; // Clear all chat history
    },
    deleteChatById: (state, action) => {
      const chatId = action.payload; // Assume `payload` is the `id` of the chat to delete
      state.chatHistory = state.chatHistory.filter((chat) => chat.id !== chatId);
    },
    loadChat: (state, action) => {
      const chatId = action.payload; // Assume `payload` is the `id` of the chat to delete
      let recentChat = state.chatHistory.filter((chat) => chat.id === chatId);
      console.log(chatId)
      if(recentChat.length)state.chats=recentChat.chat
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendPrompt.pending, (state, action) => {
        state.status = 'loading';
        state.chats.push({ message: action.meta.arg.prompt, sender: "user" });
      })
      .addCase(sendPrompt.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.chats.push({ message: action.payload.text, sender: "model" });
        state.items = action.payload; // Update state with response data if necessary
      })
      .addCase(sendPrompt.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
        state.chats.push({ message: "Error: something went wrong", sender: "model" });
        console.error(action.error.message);
      })
      .addCase(addChatHistory.pending,(state,action)=>{
      
      })
      .addCase(addChatHistory.fulfilled,(state,action)=>{
        const message={chat:state.chats,id:uuidv4(),title:action.payload.chatTitle}
        state.chatHistory.unshift(message)
        state.chats=[]
        console.log(message)
      })
      .addCase(addChatHistory.rejected,(state,action)=>{
        state.status = 'failed';
        state.error = action.payload || action.error.message;
        state.chats.push({ message: "Error: something went wrong", sender: "model" });
        console.error(action.error.message);
      })
  },
});

// Exporting Actions and Reducer
export const {loadChat,deleteChatHistory, deleteChatById } = dataSlice.actions;
export default dataSlice.reducer;
