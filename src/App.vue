<template>
  <div id="app">
    <div id="box">

      <header-user></header-user>

      <router-view/>
      <!--<img src="./assets/logo.png">-->
      <!--<i-button type="info">信息按钮</i-button>-->
      <!--<i-button type="success">成功按钮</i-button>-->

    </div>
  </div>
</template>

<script>
  import headerUser from './components/header'
  // import daoHang from './components/daohang'
  export default {
    name: 'App',
    components:{
      headerUser

    }
  }
</script>

<style scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    color: #2c3e50;
    /*margin-top: 60px;*/
  }

</style>
