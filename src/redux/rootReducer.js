import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import pokemonReducer from "./slices/pokemonSlice";

const rootPersistConfig = {
 key: "root",
 storage,
 keyPrefix: "redux-",
 balcklist: ["pokemon"],
};

const rootReducer = combineReducers({
 pokemon: pokemonReducer,
});

export { rootPersistConfig, rootReducer };
