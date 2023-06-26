import { createStore } from "vuex";

export default createStore({
  state: { overlayVisible: false, snakbar: false, snakbarcontent: null },
  getters: {
    getOverlayVisible(state) {
      return state.overlayVisible;
    },
    getSnakBar(state) {
      return state.snakbar;
    },
    getSnakBarContent(state) {
      return state.snakbarcontent;
    },
  },
  mutations: {
    setOverlayVisible(state, value) {
      state.overlayVisible = value;
    },
    setSnackBar(state, value) {
      state.snakbar = value;
    },
    setSnackBarContent(state, value) {
      state.snakbar = true;
      state.snakbarcontent = value;
      setTimeout(() => {
        state.snakbar = false;
      }, 5000);
    },
  },
  actions: {},
  modules: {},
});
