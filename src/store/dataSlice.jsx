import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



export const sendPrompt=createAsyncThunk("sendprompt",
    async ({ prompt, chats }) => {
        console.log(chats)
        // Include the complete chat context in the API request
        const context = chats
        .map((msg) => `${msg.sender}: ${msg.message}`)
        .join("\n");
        const response = await axios.post("https://chatai-server-l0ve.onrender.com/guestUser/messages", {"prompt": JSON.stringify(
         `${context}\nUser: ${prompt}`
        )  });
        console.log(response.data);
        return response.data;
}

)

const dataSlice = createSlice({
    name: 'data',
    initialState: {
      chats: [], // Ensure this is initialized
      status: 'idle',
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
      
        .addCase(sendPrompt.pending, (state,action) => {
          state.status = 'loading';
          state.chats.push({ message: action.meta.arg.prompt, sender: "user" });
        })
        .addCase(sendPrompt.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.chats.push({ message: action.payload.text, sender: "model" });
          state.items = action.payload;
        })
        .addCase(sendPrompt.rejected, (state, action) => {
          state.status = 'failed';
          state.chats.push({ message:"Error: something went wrong", sender: "model" });
          state.error = action.error.message;
          console.log(action.error.message)
        });
    },
  });
  

export default dataSlice.reducer;
