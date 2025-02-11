import Parse from "parse/dist/parse.min.js";
let Todos = Parse.Object.extend("Todo");

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
};

export default {
  state,
  getters,
  mutations,
  actions,
};
