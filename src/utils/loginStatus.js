import store from "../store/store";

export function removeLogin() {
  localStorage.removeItem("user");
  store.commit("increment", "");
}
