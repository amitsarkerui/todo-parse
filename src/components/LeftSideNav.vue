<template>
  <aside
    id="logo-sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
    aria-label="Sidebar"
  >
    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
      <RouterLink to="/" class="flex items-center ps-2.5 mb-5">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          class="h-6 me-3 sm:h-7"
          alt=" Logo"
        />
        <span
          class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
          >Todos</span
        >
      </RouterLink>
      <ul class="space-y-2 font-medium">
        <li>
          <button
            @click="$emit('handleAllTask')"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <i class="pi pi-server"></i>
            <span class="ms-3">All Task</span>
          </button>
        </li>
        <li>
          <button
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <i class="pi pi-spinner-dotted"></i>
            <span class="ms-3">Pending</span>
          </button>
        </li>
        <li>
          <button
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <i class="pi pi-check"></i>
            <span class="ms-3">Done</span>
          </button>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
export default {
  name: "LeftSideNav",
};
</script>
