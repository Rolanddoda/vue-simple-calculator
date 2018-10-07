<template>
  <div id="app">
    <calculator />
    <sidebar />
	  <who-am-i />
  </div>
</template>

<script>
  import Calculator from './components/Calculator.vue'
  import Sidebar from '@/components/Sidebar/Sidebar.vue'
  import WhoAmI from '@/components/WhoAmI.vue'

  export default {
    name: 'app',
    components: { Calculator, Sidebar, WhoAmI }
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
	  background: url('./assets/background.jpg') center center no-repeat;
	  background-size: cover;
	  perspective: 1000px;
	  overflow: hidden;
  }

  kbd { //style for keyboard keys
    padding:0.1em 0.6em;
    border:1px solid #ccc;
    font-size:11px;
    font-family:Arial,Helvetica,sans-serif;
    background-color:#f7f7f7;
    color:#333;
    -moz-box-shadow:0 1px 0 rgba(0, 0, 0, 0.2),0 0 0 2px #ffffff inset;
    -webkit-box-shadow:0 1px 0 rgba(0, 0, 0, 0.2),0 0 0 2px #ffffff inset;
    box-shadow:0 1px 0 rgba(0, 0, 0, 0.2),0 0 0 2px #ffffff inset;
    -moz-border-radius:3px;
    -webkit-border-radius:3px;
    border-radius:3px;
    display:inline-block;
    margin:0 0.1em;
    text-shadow:0 1px 0 #fff;
    line-height:1.4;
    white-space:nowrap;
  }
</style>
