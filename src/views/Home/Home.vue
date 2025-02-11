<template>
  <div>
    <div class="flex justify-between">
      <RouterLink to="/add-todo" class="bg-blue-600 text-white px-4 py-2"
        >+ Add a Task</RouterLink
      >
      <div class="flex items-center gap-4">
        <span class="text-right">
          <p class="font-medium text-gray-700">{{ fullname }}</p>
          <p class="text-sm text-gray-600">
            {{ currentUser?.attributes.email }}
          </p>
        </span>
        <i class="pi pi-user text-3xl"></i>
        <button
          @click="handleLogout"
          class="bg-cyan-400 text-white px-4 py-2 cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
    <TodosCard
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      @handleDone="handleDone"
      @deleteTodo="deleteTodo"
    />
  </div>
</template>

<script>
import Parse from "parse/dist/parse.min.js";
import TodosCard from "../../components/TodosCard.vue";

export default {
  name: "Home",
  components: {
    TodosCard,
  },
  data() {
    return {
      todos: [],
      currentUser: null,
    };
  },
  computed: {
    fullname() {
      return (
        this.currentUser?.attributes.firstName +
        " " +
        this.currentUser?.attributes.lastName
      );
    },
  },
  methods: {
    fetchTodos() {
      console.log("Getters", this.$store.getters.allTodos);
      this.todos = this.$store.getters.allTodos;
    },

    handleDone(id) {
      // console.log(id);
      const Todo = Parse.Object.extend("Todo");
      const query = new Parse.Query(Todo);
      query
        .get(id)
        .then((todo) => {
          todo.set("isCompleted", true);
          return todo.save();
        })
        .then((updatedTodo) => {
          this.todos = this.todos.map((todo) =>
            todo.id === id ? updatedTodo : todo
          );
        })
        .catch((err) => {
          console.log(err);
        });
      // console.log(this.todos);
    },
    deleteTodo(id) {
      const Todo = Parse.Object.extend("Todo");
      const query = new Parse.Query(Todo);

      query
        .get(id)
        .then((todo) => {
          return todo.destroy();
        })
        .then(() => {
          this.todos = this.todos.filter((todo) => todo.id !== id);
          console.log("Todo deleted successfully");
        })
        .catch((err) => console.log(err));
    },

    handleLogout() {
      Parse.User.logOut()
        .then(() => {
          console.log("User logout Successfully");
          this.$router.push("/login");
        })
        .catch((err) => {
          console.error("Error logging out:", err);
        });
    },
  },
  mounted() {
    const currentUser = Parse.User.current();
    if (currentUser) {
      this.currentUser = currentUser;
      this.$store.dispatch("fetchAllTodos", currentUser.id).then(() => {
        this.fetchTodos();
      });
    } else {
      this.$router.push("/login");
    }
  },
};
</script>

<style scoped></style>
