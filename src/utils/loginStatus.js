import store from "../store/index";

export function Logout() {
  store.commit("LOGOUT");
}
