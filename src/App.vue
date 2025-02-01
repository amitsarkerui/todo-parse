<script>
import LeftSideNav from "./components/LeftSideNav.vue";
export default {
  name: "App",
  components: {
    LeftSideNav,
  },
};
</script>

<template>
  <LeftSideNav />
  <RouterView class="mr-[50px] ml-[300px] my-[50px]" />
</template>

<style scoped></style>
