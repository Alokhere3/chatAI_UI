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
    addChatHistory: (state, action) => {
      let newChat = action.payload;

      // Generate a unique ID if not provided
      if (!newChat.id) {
        newChat = { ...newChat, id: uuidv4() }; // Generate a UUID
      }

      const existingIndex = state.chatHistory.findIndex((chat) => chat.id === newChat.id);

      if (existingIndex !== -1) {
        // If the chat exists, update it and move it to the beginning
        state.chatHistory[existingIndex] = newChat;
        state.chatHistory = [
          state.chatHistory[existingIndex],
          ...state.chatHistory.slice(0, existingIndex),
          ...state.chatHistory.slice(existingIndex + 1),
        ];
      } else {
        // If it doesn't exist, add it to the beginning
        state.chatHistory.unshift(newChat);
      }
    },
    deleteChatHistory: (state) => {
      state.chatHistory = []; // Clear all chat history
    },
    deleteChatById: (state, action) => {
      const chatId = action.payload; // Assume `payload` is the `id` of the chat to delete
      state.chatHistory = state.chatHistory.filter((chat) => chat.id !== chatId);
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
      });
  },
});

// Exporting Actions and Reducer
export const { addChatHistory, deleteChatHistory, deleteChatById } = dataSlice.actions;
export default dataSlice.reducer;
