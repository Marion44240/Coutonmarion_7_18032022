<template>
  <div id="app">
    <router-view/>
    <FooterPage/>
  </div>
</template>

<script>
import FooterPage from '@/components/Footer.vue'

export default {
  name: "App",
  components: {
    FooterPage
  }
}
</script>

<style lang="scss">
* { 
  -webkit-box-sizing: border-box; 
  box-sizing: border-box;
  overflow-x: hidden;
  margin: 0; 
  padding: 0;
}
#app { 
  font-family: Arial, Helvetica, sans-serif;
  background: rgb(250, 231, 234);
}
</style>
