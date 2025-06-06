import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  urls: [],
  userId: null,
};

const UrlSlice = createSlice({
  name: "url",
  initialState,
  reducers: {
    getUrls(state) {
      return state.urls;
    },
    setUrlData(state, action) {
      state.userId = action.payload.id;
      state.urls = action.payload.urls;
    },
  },
});

const UrlReducer = UrlSlice.reducer;
const { getUrls, setUrlData } = UrlSlice.actions;

export { getUrls, setUrlData, UrlReducer };
