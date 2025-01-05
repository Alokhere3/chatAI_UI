import { combineReducers } from '@reduxjs/toolkit';
import dataReducer from './dataSlice'; // Replace with your slice file

const rootReducer = combineReducers({
  data: dataReducer,
  // Add more slices here
});

export default rootReducer;
