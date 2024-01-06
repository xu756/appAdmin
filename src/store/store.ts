import { configureStore } from '@reduxjs/toolkit';
import { systemStore } from './hooks/system';
import { menuStore } from './hooks/menu';
const store = configureStore({
    reducer: {
        system: systemStore.reducer,
        menu: menuStore.reducer,
    },
});

export default store;

// 从 store 本身推断出 `RootState` 和 `AppDispatch` 类型
export type RootState = ReturnType<typeof store.getState>;
// 推断出类型: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
