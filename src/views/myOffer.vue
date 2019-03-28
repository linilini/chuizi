<template>
  <div id="content">
    <div class="co">
      <div class="co1">
        <div class="co1-1">
          <img src="../assets/img/img/img.png" alt="">
        </div>
        <p><router-link to="/myOffer">我的订单</router-link></p>
        <p><router-link to="/myAdress">收货地址</router-link></p>
      </div>
      <div class="co2">
        <p>我的订单</p>
        <div class="co3">
          <div class="co4">
            <table class="layui-table" lay-skin="line" style="margin-top: 0">
              <tr style="background: #FBFBFB"><th>2019-03-19</th><th colspan="2">订单号：1552957845934</th><th>单价</th><th>数量</th><th>商品操作</th><th>应付金额</th><th>查看详情></th></tr>
              <tr v-for="(item,index) in addGoods" :key="index">
                <td style="width: 120px"><span style="border: 1px solid #F0F0F0;display: block"><img :src="item.ali_image"></span></td>
                <td colspan="2"><span>{{ item.title }}<span style="display: block">{{ item.spec_json.show_name }}</span></span></td>
                <td>¥ {{ item.price }}</td>
                <td>
                  <span>{{ item.shopNum }}</span>
                </td>
                <td>11111</td>
                <td>￥<span>{{ allGoodsPrice }}</span></td>
                <td>已完成</td>
                <!--<td>¥ {{ (item.price)*(item.shopNum) }}</td>-->
              </tr>
              <!--<tr><td colspan="3"></td><td>-->
                <!--商品总计： ￥<span>{{ allGoodsPrice }}</span>-->
                <!--<br>-->
                <!--运费： +￥<span>8.00</span>-->
              <!--</td></tr>-->
            </table>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import Axios from 'axios'

  export default {
    computed:{
      qvArr11 () {
        return Number(this.$store.state.sanJiLianDong.qvArr)
      },
      messageArr () {
        return this.$store.state.sanJiLianDong.addressMessage
      },
      addGoods(){
        return this.$store.state.shopping.goodsItem
      },
      // shoppingNow(){
      //   return Number(this.$store.state.shopping.detailNowShopping)
      // },
      allGoodsNum(){
        return this.$store.state.shopping.allGoodsNum
      },
      allGoodsPrice(){
        return this.$store.state.shopping.allGoodsPrice
      }
    },
    methods:{
      // qiehuan(){
      //   this.isQie=false
      // }
    },
    data(){
      return {
        // isQie:true
      }}

  }
</script>

<style scoped>
.qieHuan{
  background: #98AFEE;
  color: white;
}
</style>
