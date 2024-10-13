import { createSlice } from "@reduxjs/toolkit";

type themeItem = string;

const initialState: themeItem = "dark";

const dataSlice = createSlice({
  name: "themeSlice",
  initialState,
  reducers: {
    setTheme: (state) => {
      return state === "dark" ? "light" : "dark";
    },
  },
});


export const { setTheme } = dataSlice.actions;
export default dataSlice.reducer;
