import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../pages/Login/userSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

//Cấu hình cho Redux Persist
//Tự động kiểm tra trạng thái của redux khi truy cập
const persistConfig = {
    key: 'root',
    storage,
};
const persistedReducer = persistReducer(persistConfig, userReducer);

//Store
const store = configureStore({
    reducer: { user: persistedReducer },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

const persistor = persistStore(store);

export { store, persistor };
