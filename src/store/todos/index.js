import Parse from "parse/dist/parse.min.js";
let Todo = Parse.Object.extend("Todo");

const state = () => {
  todos: [];
};
const getters = {
  allTodos: (state) => state.todos,
};
const mutations = {
  setTodos: (state, todos) => {
    state.todos = todos;
  },
  todoDone: (state, updatedTodo) => {
    const index = state.todos.findIndex((todo) => todo.id === updatedTodo.id);
    // console.log(index);
    if (index !== -1) {
      state.todos[index] = updatedTodo;
    }
  },
};
const actions = {
  async fetchAllTodos(context, userId) {
    try {
      // console.log(userId);
      const todosQuery = new Parse.Query("Todo");
      todosQuery.equalTo("relatedUser", {
        __type: "Pointer",
        className: "_User",
        objectId: userId,
      });

      const todos = await todosQuery.find();
      console.log("Fetch Todos", todos);
      context.commit("setTodos", todos);
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  },
  async todoDone(context, todoId) {
    try {
      const todosQuery = new Parse.Query("Todo");
      const todo = await todosQuery.get(todoId);
      todo.set("isCompleted", !todo.get("isCompleted"));
      const updatedTodo = await todo.save();

      context.commit("todoDone", updatedTodo);
    } catch (error) {
      console.error(error);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
