import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default local storage for web
import {thunk} from 'redux-thunk'; // Middleware for API calls
import rootReducer from './dataSlice'; // Combine your reducers

// Configure persistence
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk), // Add thunk middleware
});

// Persistor
const persistor = persistStore(store);

export { store, persistor };
