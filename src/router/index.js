import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home/Home.vue";
import AddTask from "../views/AddTask.vue";
import EditTodo from "../views/EditTodo.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/add-todo",
      name: "AddTodo",
      component: AddTask,
    },
    {
      path: "/edit-todo/:id",
      name: "EditTodo",
      component: EditTodo,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/signup",
      name: "Signup",
      component: Signup,
    },
  ],
});

export default router;
