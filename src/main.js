import { createApp } from "vue";
import "./style.css";
import "primeicons/primeicons.css";
import App from "./App.vue";
import router from "./router";

import Parse from "parse/dist/parse.min.js";
import store from "./store";
Parse.initialize("amit_todo");
Parse.serverURL = "http://localhost:1337/parse";

const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");
