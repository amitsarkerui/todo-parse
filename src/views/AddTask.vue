<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-700 mb-10">Add Todo</h2>
    <form @submit.prevent="handleSubmit">
      <div class="">
        <div class="mb-5">
          <label
            for="title"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Title</label
          >
          <input
            type="text"
            v-model="formData.title"
            id="title"
            class="w-full block p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div class="mb-5">
          <label
            for="description"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Description</label
          >
          <textarea
            v-model="formData.description"
            type="text"
            id="description"
            class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          ></textarea>
        </div>
        <div class="mb-5">
          <label
            for="large-input"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Due Date</label
          >
          <input
            v-model="formData.dueDate"
            type="date"
            id="large-input"
            class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <label class="inline-flex items-center mb-5 cursor-pointer">
          <input
            type="checkbox"
            v-model="formData.priority"
            class="sr-only peer"
          />
          <div
            class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
          ></div>
          <span
            class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
            >High Priority</span
          >
        </label>
      </div>
      <button type="submit" class="bg-blue-600 text-white px-4 py-2 mt-10">
        Add Todo
      </button>
    </form>
  </div>
</template>

<script>
import Parse from "parse/dist/parse.min.js";
export default {
  name: "AddTask",
  data() {
    return {
      formData: {
        title: "",
        description: "",
        dueDate: "",
        priority: false,
      },
      currentUser: null,
    };
  },
  methods: {
    async handleSubmit() {
      await this.$store.dispatch("addTodo", {
        todoData: this.formData,
        router: this.$router,
      });
    },
  },
  mounted() {
    const currentUser = Parse.User.current();
    if (currentUser) {
      this.currentUser = currentUser;
    } else {
      this.$router.push("/login");
    }
  },
};
</script>

<style scoped></style>
