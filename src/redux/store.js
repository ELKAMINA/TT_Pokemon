import { persistStore, persistReducer } from 'redux-persist';
import { rootPersistConfig, rootReducer } from './rootReducer';
import { configureStore } from '@reduxjs/toolkit'

const persistedReducer = persistReducer(rootPersistConfig, rootReducer )

export const store = configureStore({
    reducer: 
    {
        persistedReducer,
    },
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: false,
        }),
    devTools: true
})

export const persistor = persistStore(store);