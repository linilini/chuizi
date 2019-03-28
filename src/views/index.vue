<template>
  <div id="content">
    <div class="cont">
      <p>
        <a href="#">综合排列</a>
        <a href="#">综合排列</a>
        <a href="#">综合排列</a>
      </p>
      <div class="con1">
       <list-item></list-item>
      </div>
    </div>

  </div>
</template>

<script>
  // import suoYin from '../components/suoYin'
  import listItem from '../components/list-item'
    export default {
        name: "index",
      components:{
          listItem
      }
    }
</script>

<style scoped>
  .layout-content{
    min-height: 200px;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
  }
  .layout-content-main{
    padding: 10px;
  }

</style>
