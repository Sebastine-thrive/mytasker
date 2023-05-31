import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { UserReducer } from "./components/features/users/UserSlice";
import { TaskReducer } from "./components/features/tasks/TasksSlice";
import { CurrentUserReducer } from "./components/features/currentuser/CurrentUser";
import { CategoryReducer } from "./components/features/categories/CategoriesSlice";

const rootReducer = combineReducers({
  UserReducer,
  TaskReducer,
  CurrentUserReducer,
  CategoryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
export default store;
