import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { teamSlice } from '../features/teamSlice';
import { newsSlice } from '../features/newsSlice';
import { articleSlice } from '../features/articleSlice';


const rootReducer = combineReducers({
  news: newsSlice.reducer,
  team: teamSlice.reducer,
  article: articleSlice.reducer
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeStore(preloadedState?: any) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
