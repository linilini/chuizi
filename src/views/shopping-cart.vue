<template>
  <div id="content">
    <div class="cont">
      <div class="con1" style="padding: 20px">
        <table class="layui-table" lay-skin="line">
          <tr style="background: #FBFBFB"><td colspan="7">购物清单</td></tr>
          <tr style="background: #FBFBFB"><th colspan="3">商品信息</th><th>单价</th><th>数量</th><th>小计</th><th>操作</th></tr>
          <!--<tr><td>¥ 49.00</td><td>¥ 49.00</td><td>¥ 49.00</td><td>¥ 49.00</td><td>¥ 49.00</td></tr>-->
          <tr v-for="(item,index) in addGoods" :key="index">
            <td style="text-align: center"><input type="checkbox" :checked="item.cartChecked" @change="ischecked(item)"/></td>
            <td style="width: 120px"><span style="border: 1px solid #F0F0F0;display: block"><img :src="item.ali_image"></span></td>
            <td><span>{{ item.title }}<span style="display: block">{{ item.spec_json.show_name }}</span></span></td>
            <td>¥ {{ item.price }}</td>
            <td><el-button size="mini" round circle="true" @click="delNum(item)">-</el-button>
           <span>{{ item.shopNum }}</span>
              <!--{{ item.sureNum }}-->
              <el-button size="mini" round circle="true" @click="addNum(item)">+</el-button></td>
            <td>¥ {{ (item.price)*(item.shopNum) }}</td>
            <td><el-button size="mini" round circle="true" @click="clearItem(item)">X</el-button></td>
          </tr>
          <tr style="background: #FBFBFB">
            <td colspan="3"><input type="checkbox" style="border-radius: 50%" checked v-model="isChecked" @change="allchecked"/> 全选 删除选中的商品</td>
            <td>已选择 {{ addGoods.length }} 件商品<br>共计 {{ allGoodsNum }} 件商品</td>
            <td>|</td>
            <td>应付总额：￥{{ allGoodsPrice }}<br>应付总额不含运费</td>
            <td><el-button type="primary"><router-link to="/overShopping">现在结算</router-link></el-button></td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
        // props:['shopNum','allPrice'],
      computed:{
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
      data(){
        return {
          addGoods,
        isChecked:true
        }
      },

      methods:{
        addNum(obj){
          this.$store.commit('addNum',obj)
        },
        delNum(obj){
          this.$store.commit('delNum',obj)
        },
        clearItem(obj){
          this.$store.commit('clearNum',obj)
        },
        allchecked(e){

       this.isChecked=e.target.checked;
          console.log(this.addGoods);
          if(this.isChecked){
            // this.isChecked=false;
          for(let i of this.addGoods){
            i.cartChecked=this.isChecked;
            // this.$store.commit("oneChecked",i.cartChecked)
          }
          }else{
            // this.isChecked=false;
            for(let i of this.addGoods){
              i.cartChecked=this.isChecked;
              // this.$store.commit("oneChecked",i.cartChecked)

            }
          }
        },

        ischecked(item){
          // console.log(e.target.checked);
          item.cartChecked=!item.cartChecked;
          for(let i of this.addGoods){
                  if(!i.cartChecked){
                    this.isChecked=false;
                  }
          }
          let j=0;
          for(let i of this.addGoods){
            if(i.cartChecked){
              j++
            }
          }
          var length=this.addGoods.length;
          if(j===length){
            this.isChecked=true;
            // e.target.checked=this.isChecked;
          }
        }
      }

    }
</script>

<style scoped>

</style>
