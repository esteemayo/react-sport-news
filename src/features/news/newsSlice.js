import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as newsAPI from 'services/sportService';

export const getNews = createAsyncThunk(
  'news/getNews',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await newsAPI.getSports();
      return data.sports;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getSingleNews = createAsyncThunk(
  'async/getSingleNews',
  async (slug, { rejectWithValue }) => {
    try {
      const { data } = await newsAPI.getSportBySlug(slug);
      return data.sport;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getUserNews = createAsyncThunk(
  'async/getUserNews',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await newsAPI.getUserSports();
      return data.sports;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const searchNews = createAsyncThunk(
  'async/searchNews',
  async (query, { rejectWithValue }) => {
    try {
      const { data } = await newsAPI.searchSport(query);
      return data.sports;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getEditNewsItem = createAsyncThunk(
  'async/getEditNewsItem',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await newsAPI.getSportById(id);
      return data.sport;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createNews = createAsyncThunk(
  'async/createNews',
  async ({ newsObj, toast }, { rejectWithValue }) => {
    try {
      const { data } = await newsAPI.createSport({ ...newsObj });
      toast.success('News added successfully');
      return data.sport;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const editNews = createAsyncThunk(
  'async/editNews',
  async ({ id, updatedNews, toast }, { rejectWithValue }) => {
    try {
      const { data } = await newsAPI.updateSport(id, updatedNews);
      toast.success('News edited successfully');
      return data.sport;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteNews = createAsyncThunk(
  'news/deleteNews',
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      await newsAPI.deleteSport(id);
      toast.success('News deleted successfully');
      return;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  news: [],
  userNews: [],
  singleNews: {},
  editNewsItem: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNews.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.news = payload;
      })
      .addCase(getNews.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = payload;
      })
      .addCase(getUserNews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserNews.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userNews = payload;
        state.isSuccess = false;
      })
      .addCase(getUserNews.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = payload;
      })
      .addCase(searchNews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchNews.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.news = payload;
      })
      .addCase(searchNews.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = payload;
      })
      .addCase(getSingleNews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleNews.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.singleNews = payload;
      })
      .addCase(getSingleNews.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = payload;
      })
      .addCase(getEditNewsItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEditNewsItem.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.editNewsItem = payload;
      })
      .addCase(getEditNewsItem.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = payload;
      })
      .addCase(createNews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNews.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.news.unshift(payload);
        state.userNews.unshift(payload);
      })
      .addCase(createNews.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = payload;
      })
      .addCase(editNews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editNews.fulfilled, (state, { meta, payload }) => {
        state.isLoading = false;
        state.isSuccess = true;

        const {
          arg: { id },
        } = meta;

        if (id) {
          state.news.map((item) => (item._id === id ? payload : item));
          state.userNews.map((item) => (item._id === id ? payload : item));
        }
      })
      .addCase(editNews.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = payload;
      })
      .addCase(deleteNews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteNews.fulfilled, (state, { meta }) => {
        state.isLoading = false;
        state.isSuccess = true;

        const {
          arg: { id },
        } = meta;

        if (id) {
          state.news.splice(
            state.news.findIndex((item) => item._id === id),
            1
          );
          state.userNews.splice(
            state.userNews.findIndex((item) => item._id === id),
            1
          );
        }
      })
      .addCase(deleteNews.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = payload;
      });
  },
});

export const { reset } = newsSlice.actions;

export default newsSlice.reducer;
