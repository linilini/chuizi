<template>
  <div id="content">
    <div class="cont">
      <div class="con2">
        支付订单
      </div>
      <div class="con11">
        <div class="con11-1">
       <h1>提交订单成功</h1>
        <p>请在24小时内完成支付，超时订单将自动取消</p>
        <p>我们将在您完成支付后的72小时</p></div>
        <p>应付金额：￥{{ allGoodsPrice }} <el-button type="primary" @click="nowPay(allGoodsPrice)">现在支付</el-button></p>
      </div>
      <div class="con10">
        <hr>
        <p>订单编号</p>
        <p>1552907748800</p>
      </div>

      <div class="con10" v-for="(addItem,index2) in messageArr" :key="index2" v-if="index2===0">
      <hr>
      <p>收货信息</p>
      <p>姓名：{{addItem.name}}</p>
      <p>联系电话：{{addItem.teleApp}}</p>
      <p>详细地址：{{addItem.cityApp}} {{addItem.qvApp}} {{addItem.disApp}}{{addItem.dateilApp}}</p>
    </div>
      <div class="con10">
        <hr>
        <p>发票信息</p>
        <p>发票类型：电子发票</p>
        <p>发票抬头：个人</p>
        <p>发票内容：购买商品明细</p>
      </div>
      <div class="con12">
        <table class="layui-table" lay-skin="line" style="margin-top: 0">
          <tr style="background: #FBFBFB"><th colspan="3">商品名称</th><th>单价</th><th>数量</th><th>小计</th></tr>
          <tr v-for="(item,index) in addGoods" :key="index">
            <td><span>{{ item.title }}<span style="display: block">{{ item.spec_json.show_name }}</span></span></td>
            <td>¥ {{ item.price }}</td>
            <td>
              <span>{{ item.shopNum }}</span>
            </td>
            <td>¥ {{ (item.price)*(item.shopNum) }}</td>
          </tr>
          <tr><td colspan="3"></td><td>
            商品总计： ￥<span>{{ allGoodsPrice }}</span>
            <br>
            运费： +￥<span>8.00</span>
          </td></tr>
        </table>
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
      nowPay(allGoodsPrice){
        var a=alert(`成功支付${ allGoodsPrice }元`);
          this.$router.push('/myOffer')
      }
    }
  }
</script>

<style scoped>

</style>
