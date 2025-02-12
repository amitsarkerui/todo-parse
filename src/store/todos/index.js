import Parse from "parse/dist/parse.min.js";
let Todo = Parse.Object.extend("Todo");
const todosQuery = new Parse.Query("Todo");
const getCurrentUser = () => {
  return Parse.User.current();
};

const state = () => ({
  todos: [],
  currentTodo: {},
});
const getters = {
  allTodos: (state) => state.todos,
  getCurrentTodo: (state) => state.currentTodo,
};
const mutations = {
  setTodos: (state, todos) => {
    state.todos = todos;
  },
  UpdatedTodo: (state, updatedTodo) => {
    const index = state.todos.findIndex((todo) => todo.id === updatedTodo.id);
    // console.log(index);
    if (index !== -1) {
      state.todos[index] = updatedTodo;
      console.log("ust", state.todos);
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
  SetCurrentTodo: (state, todo) => {
    state.currentTodo = todo;
    console.log("Current Todo", state.currentTodo);
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

      context.commit("UpdatedTodo", updatedTodo);
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
    try {
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
      if (res.id) {
        await context.commit("addTodo", res);
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  },
  async GET_TODO_BY_ID(context, todoId) {
    try {
      const todosQuery = new Parse.Query("Todo");
      const res = await todosQuery.get(todoId);
      context.commit("SetCurrentTodo", res);
    } catch (error) {
      console.error(error);
    }
  },
  async EDIT_TODO(context, { todoId, todoData, router }) {
    try {
      const currentUser = await getCurrentUser();
      const dataToSave = {
        ...todoData,
        dueDate: todoData.dueDate ? new Date(todoData.dueDate) : null,
        priority: Boolean(todoData.priority),
        relatedUser: currentUser,
      };
      const todo = await todosQuery.get(todoId);
      todo.set(dataToSave);
      const todoUpdated = await todo.save();
      console.log(todoUpdated);
      context.commit("UpdatedTodo", todoUpdated);
      router.push("/");
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
