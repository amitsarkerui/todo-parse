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
    <TodosCard v-for="todo in todos" :key="todo.id" :todo="todo" />
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
      // todos: [],
      currentUser: null,
    };
  },
  computed: {
    todos() {
      return this.$store.getters.allTodos;
    },
    fullname() {
      return (
        this.currentUser?.attributes.firstName +
        " " +
        this.currentUser?.attributes.lastName
      );
    },
  },
  methods: {
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
      this.$store.dispatch("fetchAllTodos", currentUser.id).then(() => {});
    } else {
      this.$router.push("/login");
    }
  },
};
</script>

<style scoped></style>
