import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { News } from '../types/News';
import { publicNews } from '../services/public/publicNews';
import { sort } from '../utils/sortItems';

type InitialState = {
  loading: boolean;
  error: string;
  news: News[];
};

const initialState: InitialState = {
  loading: false,
  error: '',
  news: [],
};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setNews: (state, action: PayloadAction<News[]>) => {
      state.news = action.payload;
    },
    add: (state, action: PayloadAction<News>) => {
      state.news.push(action.payload);
    },
    delete: (state, action: PayloadAction<number>) => {
      state.news = state.news.filter(item => item.id !== action.payload);
    },
    update: (state, action: PayloadAction<News>) => {
      state.news = [
        ...state.news.filter(item => item.id !== action.payload.id),
        action.payload,
      ];
    },
  },
  extraReducers(builder) {
    builder.addCase(loadNews.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      loadNews.fulfilled,
      (state, action: PayloadAction<News[]>) => {
        if (action.payload.length === 0) {
          state.error = 'Currently there are no news!';
        } else {
          const sortedNews = action.payload.sort(sort.newsByDate);

          state.news = sortedNews;
        }
        state.loading = false;
      },
    );

    builder.addCase(loadNews.rejected, (state, action) => {
      state.error = action.error.message || 'Something went wrong!';
      state.loading = false;
    });
  },
});

export const loadNews = createAsyncThunk('fetch/news', async () => {
  return publicNews.get();
});
