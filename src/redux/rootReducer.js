import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import pokemonReducer from "./slices/pokemonSlice";
import cartReducer from "./slices/cartSlice";

const rootPersistConfig = {
 key: "root",
 storage,
 keyPrefix: "redux-",
};

const rootReducer = combineReducers({
 pokemon: pokemonReducer,
 cart: cartReducer,
});

export { rootPersistConfig, rootReducer };
