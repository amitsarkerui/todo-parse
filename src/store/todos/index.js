import Parse from "parse/dist/parse.min.js";
let Todo = Parse.Object.extend("Todo");
const getCurrentUser = () => {
  return Parse.User.current();
};

const state = () => ({
  todos: [],
});
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
  deleteTodo: (state, todoId) => {
    const index = state.todos.findIndex((todo) => todo.id === todoId);
    if (index !== -1) {
      state.todos.splice(index, 1);
      console.log("Deleting Todo ID:", todoId);
    }
  },
  addTodo: (state, newTodo) => {
    console.log("nt", newTodo);
    console.log("st", state.todos);
    state.todos.push(newTodo);
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
      await context.commit("setTodos", todos);
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
  async deleteTodo(context, todoId) {
    try {
      const todosQuery = new Parse.Query("Todo");
      const todo = await todosQuery.get(todoId);
      await todo.destroy();
      context.commit("deleteTodo", todoId);
    } catch (error) {
      console.error(error);
    }
  },
  async addTodo(context, { todoData, router }) {
    const todo = new Todo();
    const currentUser = await getCurrentUser();
    console.log(todoData, router);
    const dataToSave = {
      ...todoData,
      dueDate: todoData.dueDate ? new Date(todoData.dueDate) : null,
      priority: Boolean(todoData.priority),
      relatedUser: currentUser,
    };
    todo.set(dataToSave);
    const res = await todo.save();
    // console.log(res);
    if (res.id) {
      await context.commit("addTodo", res);
      router.push("/");
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
