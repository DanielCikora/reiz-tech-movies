import { createSlice } from "@reduxjs/toolkit";
import { DarkModeDataTypes } from "@/types";

const getInitialDarkMode = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("darkMode") || "false");
  }
  return false;
};

const initialState: DarkModeDataTypes = {
  isDarkMode: getInitialDarkMode(),
};

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    toggleDarkMode(state) {
      state.isDarkMode = !state.isDarkMode;
      if (typeof window !== "undefined") {
        localStorage.setItem("darkMode", JSON.stringify(state.isDarkMode));
      }
    },
  },
});

export const { toggleDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
