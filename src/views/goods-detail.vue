<template>
  <div id="content">
    <div class="cont">
      <p>
        <a href="#">综合排列</a>
        <a href="#">综合排列</a>
        <a href="#">综合排列</a>
      </p>
      <div class="con1">
        <div class="goodsDetail">
          <div class="allSide">
            <div v-for="(item,index) in data.ali_images" :key="index" class="oneSide"  @click="anySide(index)" :class="{'clickSide':item===goodImg}">
              <img :src="item" alt=""></div>
          </div>
          <div class="oneGoods"><img :src="goodImg" alt=""></div>
          <div>
            <p>{{ data.title }}</p>
            <p>{{ data.sub_title }}<span>￥{{ data.price }}</span></p>
            <hr>
            <p>颜色<br><br>
              <span v-for="(item,index) in data.sku_list" :key="index" class="likeColor" @click="changeColor(index)"><img :src="item.image" alt=""></span></p>
            <p>数量
              <br><br>
              <el-button size="mini" round circle="true" @click="delNum(data)">-</el-button>
              <span>{{ detailNum }}</span>
              <!--{{ item.sureNum }}-->
              <el-button size="mini" round circle="true" @click="addNum(data)">+</el-button></p>
            <hr>
            <p>
              <el-button type="primary" @click.stop="addShopping(data)">加入购物车</el-button>
              <el-button @click="shoppingNow(data)">现在购买</el-button></p>

          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
  // import suoYin from '../components/suoYin'
  // import detailGoods from '../components/detailGoods'
  import Axios from 'axios'
  import Vue from 'vue'

  export default {
    data(){
      return{
        data:{},
        allData:{},
        goodImg:'',
        // detailNum
        // showBorder:true
        // clickColorId:''
      }
    },
    computed:{
      detailNum(){
        return this.$store.state.shopping.detailNum
      }
    },
    created(){
      let { id }=this.$route.query;
      console.log(id);
      Axios.get(' https://www.easy-mock.com/mock/5a6ac7882d33bf493f881505/hammer/goods-detail')
        .then( res => {
          console.log(res);
          // console.log(res.data[0].sku_id);
          let shuJv=res.data;
          this.allData=res.data;
          // console.log(shuJv)
          for(let i of shuJv){
            // console.log(i);
            // let item=res.data
            if(i.sku_id===id){
              // console.log(i);
              Vue.set(i,'shopNum',0);
              this.data=i;
                if(!this.data.cartChecked){
                  Vue.set(this.data,'cartChecked',true);
                }
              // console.log()
              this.goodImg=this.data.ali_image;
              console.log(this.data)
            }
          }

        })
    }
    ,
    methods:{
      changeColor(index){
        // this.detailNum=0;
        let { id }=this.data.sku_list[index];
        console.log(id);
        let shuJv=this.allData;
        console.log(shuJv);

        for(let j of shuJv){
          console.log(j);
          if(j.sku_id===id){
            Vue.set(j,'shopNum',0);
            this.data=j;
            this.goodImg=this.data.ali_image;
            console.log(this.data)
          }
        }
      },
      anySide(index){
        let obj=this.data;
        this.goodImg= obj.ali_images[index];
        // this.showBorder=!this.showBorder
      },
      addShopping(objItem){
        console.log(objItem);
        if(objItem.shopNum>0){
          this.$store.commit('goodsItem',objItem)
        }

      },
      addNum(obj){
        this.$store.commit('addNum',obj)
      },
      delNum(obj){
        this.$store.commit('delNum',obj)
      },
      shoppingNow(data){
        console.log(data);
        this.$router.push('/overshopping');
        this.$store.commit('shoppingNow',data)

      }
    }
  }
</script>

<style scoped lang="scss">
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
  .goodsDetail{
    width: 100%;
    height: 560px;
    display: flex;
    padding: 60px;
    .allSide{
      .oneSide{
        border: 1px solid rgba(0,0,0,.06);
        /*border: 3px solid rgba(0,0,0,.2);*/
        padding: 10px;
        margin-top: 10px;
        img{
          width: 54px;
        }
      }
      .clickSide{
        border: 3px solid rgba(0,0,0,.2);
      }
    }
    .oneGoods{
      img{
        width: 440px;
      }
    }
    div{
      padding: 20px;
      p:nth-of-type(1){
        font-size: 24px;
        line-height: 1.25;
        color: #000;
      }
      p:nth-of-type(2){
        font-size: 14px;
        line-height: 1.5;
        color: #bdbdbd;
        span{
          display: inline-block;
          color: #de4037;
          font-weight: 700;
          font-size: 16px;
          line-height: 20px;
          text-align: right;
          float: right;
          margin-right: 50px;
        }
      }
      p:nth-of-type(3){
        vertical-align: middle;
      }
      p{
        padding-bottom: 10px;
        width: 450px;
        .likeColor{
          display: inline-block;
          width: 33px;
          height: 33px;
          padding: 3px;
          /*border-color: #b2b2b2;*/
          box-shadow: inset 0 0 0 1px #b2b2b2;
          border: 2px solid #e5e5e5;
          border-radius: 50%;
          overflow: hidden;
          line-height: 0;
          /*text-align: center;*/

          img{
            width: 23px;
            border-radius: 50%;

          }
        }
      }
    }
  }
</style>
