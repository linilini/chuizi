<template>
  <header>
    <a href="#"><img src="../assets/img/img/img1.png"/></a>
    <ul>
      <li>在线商城</li>
      <li>在线商城</li>
      <li>在线商城</li>
      <li>在线商城</li>
      <li>在线商城</li>
      <li>在线商城</li>
      <li>在线商城</li>
    </ul>
    <div class="div1">
      <i class="layui-icon layui-icon-username" style="font-size: 20px; color: #999999;"></i>
      <router-link to="/Shopper"><i class="layui-icon layui-icon-cart" style="font-size: 20px; color: #999999;"></i></router-link>
      <div class="div2" v-show="carIsShow">
        <div class="div2-1" v-if="addGoods.length<=0">
          <p>购物车为空</p>
          <p>您还没有选购任何商品，现在前往商城选购吧!</p>
        </div>
        <table class="layui-table" lay-skin="line" v-if="addGoods.length>0">
          <tr v-for="(item,index) in addGoods" :key="index">
            <td>
              <p><span style="border: 1px solid #F0F0F0;display: block"><img :src="item.ali_image"></span></p>
            </td>
            <td style="width: 120px">
              <p>{{ item.title }}</p>
              <p><span style="display: block">{{ item.spec_json.show_name }}</span></p>
              <p>¥ {{ item.price }}X{{ item.shopNum }}</p>
            </td>
          </tr>
          <tr style="background: #FBFBFB">
            <td>共{{ allGoodsNum }}件商品 <br>合计：￥{{ allGoodsPrice }}</td>
            <td><el-button type="primary"><router-link to="/Shopper">去购物车</router-link></el-button></td>
          </tr>
        </table>
      </div>
    </div>
    <dao-hang></dao-hang>

  </header>
</template>

<script>
  import daoHang from './daohang'

  export default {
    data(){
      return {
        shoppingCar:false
      }
    },
    // props:['shopNum','allPrice'],
    components:{
      daoHang
    },
    computed:{
      carIsShow(){
        return this.$store.state.shopping.carIsShow
      },
      addGoods(){
        return this.$store.state.shopping.goodsItem
      },
      allGoodsNum(){
        return this.$store.state.shopping.allGoodsNum
      },
      allGoodsPrice(){
        return this.$store.state.shopping.allGoodsPrice
      }
    },
    methods:{
      addNum(obj){
        this.$store.commit('addNum',obj);
      },
      delNum(obj){
        this.$store.commit('delNum',obj);
      }
    }
  }
</script>

<style scoped>

</style>
