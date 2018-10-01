<template>
  <div id="app">
    <calculator />
  </div>
</template>

<script>
  import Calculator from './components/Calculator.vue'

  export default {
    name: 'app',
    components: {
      Calculator
    }
  }
</script>

<style lang="scss">
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    height: 100vh;
    display: grid;
    justify-content: center;
    align-items: center;
  }
</style>
