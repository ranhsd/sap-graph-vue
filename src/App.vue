<template>
  <div id="app">
    <shell-bar class="fixed top-0 w-screen" />
    <router-view />
  </div>
</template>

<script>
import ShellBar from "@/components/ShellBar";

export default {
  name: "App",
  components: {
    ShellBar,
  },
};
</script>

<style lang="scss">
@import "./scss/main.scss";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
