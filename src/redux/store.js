// src/redux/store.js

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import cartSlice from './slices/cartSlices';
import authSlice from './slices/authSlice';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
};

// Combine reducers
const rootReducer = combineReducers({
  auth: authSlice,
  cart: cartSlice,
});

// Apply persistence to the root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create Redux store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
});

// Create persistor to manage Redux persistence
export const persistor = persistStore(store);
