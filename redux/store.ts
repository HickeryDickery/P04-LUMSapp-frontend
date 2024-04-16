import { configureStore } from "@reduxjs/toolkit";
<<<<<<< Updated upstream
import { authReducer, postsReducer, eventsReducer } from "./reducer";
=======
<<<<<<< Updated upstream
import { authReducer, postsReducer } from "./reducer";
>>>>>>> Stashed changes

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    events: eventsReducer,
  },
=======
import {
    authReducer,
    postsReducer,
    eventsReducer,
    notifReducer,
} from "./reducer";

const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: postsReducer,
        events: eventsReducer,
        notifs: notifReducer,
    },
>>>>>>> Stashed changes
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
