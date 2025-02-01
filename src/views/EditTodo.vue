<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-700 mb-10">Edit Todo</h2>
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
            v-model="fromData.title"
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
            v-model="fromData.description"
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
            v-model="fromData.dueDate"
            type="date"
            id="large-input"
            class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <label class="inline-flex items-center mb-5 cursor-pointer">
          <input
            type="checkbox"
            v-model="fromData.priority"
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
        Edit Todo
      </button>
    </form>
  </div>
</template>

<script>
import Parse from "parse/dist/parse.min.js";
export default {
  name: "EditTodo",
  data() {
    return {
      fromData: {
        title: "",
        description: "",
        dueDate: "",
        priority: false,
      },
      todoId: null,
    };
  },
  methods: {
    fetchCurrentTodo() {
      const Todos = Parse.Object.extend("Todo");
      const query = new Parse.Query(Todos);
      query
        .get(this.todoId)
        .then((res) => {
          this.fromData.title = res.get("title");
          this.fromData.description = res.get("description");
          const dueDate = res.get("dueDate");
          this.fromData.dueDate = dueDate
            ? new Date(dueDate).toISOString().split("T")[0]
            : "";
          this.fromData.priority = res.get("priority");
        })
        .catch((err) => console.log(err));
    },
    handleSubmit() {
      const Todos = Parse.Object.extend("Todo");
      const query = new Parse.Query(Todos);
      const dataToSave = {
        ...this.fromData,
        dueDate: this.fromData.dueDate ? new Date(this.fromData.dueDate) : null,
        priority: Boolean(this.fromData.priority),
      };
      query
        .get(this.todoId)
        .then((todo) => {
          todo.set(dataToSave);
          todo.save();
          this.$router.push("/");
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    this.fetchCurrentTodo();
  },
  created() {
    this.todoId = this.$route.params.id;
    // console.log(this.todoId);
  },
};
</script>
