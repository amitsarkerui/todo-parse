<template>
  <div
    class="mt-6 bg-gray-50 px-8 py-4 rounded-xl flex justify-between items-center"
  >
    <div>
      <p
        :class="[
          'inline px-2 py-1 rounded-full text-white text-xs',
          todo?.attributes.isCompleted ? 'bg-green-500' : 'bg-yellow-400',
        ]"
      >
        {{ todo?.attributes.isCompleted ? "Done" : "Pending" }}
        <!-- Conditional text -->
      </p>

      <h2 class="text-xl font-medium mt-2">{{ todo?.attributes.title }}</h2>
      <p class="text-gray-500 max-w-[500px]">
        {{ todo?.attributes.description }}
      </p>
    </div>
    <div class="flex items-center gap-20">
      <span>
        <p
          v-if="todo?.attributes.priority"
          class="bg-orange-400 text-center px-4 text-white text-sm rounded-full"
        >
          High
        </p>
        <p class="text-sm text-gray-500 mt-1 font-bold">
          Due: {{ dueDate }}
        </p></span
      >
      <div>
        <button
          @click="handleDone(todo?.id)"
          :class="[
            ' px-3 py-2 rounded-full cursor-pointer',
            todo.attributes.isCompleted
              ? 'bg-green-600 opacity-35'
              : 'bg-blue-600',
          ]"
        >
          <i class="pi pi-check text-white"></i>
        </button>
        <RouterLink
          :to="`/edit-todo/${todo.id}`"
          class="ml-2 bg-blue-500 px-3 py-2 rounded-full"
        >
          <i class="pi pi-pencil text-white"></i>
        </RouterLink>
        <button
          @click="deleteTodo(todo.id)"
          title="Delete Todo"
          class="ml-2 bg-red-500 px-3 py-2 rounded-full cursor-pointer"
        >
          <i class="pi pi-trash text-white"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Parse from "parse/dist/parse.min.js";
export default {
  name: "TodosCard",
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  methods: {
    handleDone(id) {
      this.$store.dispatch("todoDone", id);
    },
    deleteTodo(id) {
      this.$store.dispatch("deleteTodo", id);
    },
  },
  computed: {
    dueDate() {
      const date = new Date(this.todo?.attributes.dueDate);
      //   if (isNaN(date.getTime())) return "Invalid Date";
      const options = {
        weekday: "short",
        day: "2-digit",
        month: "long",
        year: "numeric",
      };
      const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
        date
      );
      return formattedDate;
    },
  },
  mounted() {
    // console.log(this.todo.attributes);
    // console.log(this.todo);
  },
};
</script>
