<template>
  <ul>

    <li class="topicLi" v-for="(item,index) in listData" :key="index" v-if="item.sku_info.length>=(num11+1)" @click="goodsDetail(item.sku_info[num11].sku_id)">
      <img :src="item.sku_info[num11].ali_image" width="200px"/>
      <p>{{ item.sku_info[num11].title }}</p>
      <p>{{ item.sku_info[num11].sub_title }}</p>
      <p>
        <a v-for="(itemIn,index1) in item.sku_info" :key="index1" @click.stop="changeItem(index1)">
          <img :src="`http://img01.smartisanos.cn/`+itemIn.spec_json.image+`20X20.jpg`"
          ></a>
      </p>
      <p class="priceShow">￥{{ item.sku_info[num11].price }}</p>
      <p class="btnShow"><el-button size="small">查看详情</el-button>
        <el-button type="primary"  size="small" @click.stop="addShopping(item.sku_info[num11])" >加入购物车</el-button></p>
      <div class="cart" style="">{{count}}</div>
      <div class="ball-container"><!--小球-->
        <div v-for="(ball,index) in balls" :key="index">
          <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"><img :src="ballImg"/></div>
            </div>
          </transition>
        </div>
      </div>
    </li>
    <!--<li>22</li>-->
    <li v-for="(item,index) in listData" :key="index" v-if="item.sku_info.length<(num11+1)" @click="goodsDetail(item.sku_info[num11].sku_id)">
    <img :src="item.sku_info[0].ali_image" width="200px"/>
    <p>{{ item.sku_info[0].title }}</p>
    <p>{{ item.sku_info[0].sub_title }}</p>
    <p>
      <a v-for="(itemIn,index1) in item.sku_info" :key="index1" @click.stop="changeItem(index1)">
        <img :src="`http://img01.smartisanos.cn/`+itemIn.spec_json.image+`20X20.jpg`"></a>
    </p>
    <p class="priceShow">￥{{ item.sku_info[0].price }}</p>
      <p class="btnShow"><el-button size="small">查看详情</el-button>
        <el-button type="primary" size="small" @click.stop="addShopping(item.sku_info[0])">加入购物车</el-button></p>
      <div class="cart" style="">{{count}}</div>
      <div class="ball-container"><!--小球-->
        <div v-for="ball in balls">
          <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"><img :src="ballImg"/></div>
            </div>
          </transition>
        </div>
      </div>
    </li>

  </ul>
</template>

<script>
  import Axios from 'axios'
  import Vue from 'vue'

  export default {
      computed:{
        num11 () {
          return Number(this.$store.state.shopping.Num)
        }
      },
      data(){
          return {
            ballImg:'',
            listData:[],
            itemData:[],
            count: 0,
            balls: [ //小球 设为3个
              {
                show: false
              },
              {
                show: false
              },
              {
                show: false
              },
            ],
            dropBalls: []
            // changeNum:0
          }
      },

      created() {
          Axios.get('http://m.xyucd.com:7000/goods-list')
            .then( res => {
              console.log(res);
              this.listData=res.data.data;
              console.log(this.listData);
              // this.itemData=
            })
            .catch( errors => {
              console.log(errors);
            })

      },
      methods:{
          changeItem(index1){
            console.log(index1);
            this.$store.commit('changeNum',index1)
            // this.changeNum=index1
            // console.log(this.changeNum)
          },
        addShopping(objItem){
          this.count ++;
          this.drop(event.target);
          this.ballImg=objItem.ali_image;
          // console.log(event)
              if(objItem.shopNum){
                if(objItem.shopNum<objItem.limit_num){
                  objItem.shopNum+=1;
                }else{
                  if(objItem.shopNum===objItem.limit_num){
                    alert("以达到最大购买数量")
                  }
                  objItem.shopNum=objItem.limit_num
                }

              }else{
                Vue.set(objItem,'shopNum',1);
                Vue.set(objItem,'cartChecked',true);
              }
              console.log(objItem);
             this.$store.commit('goodsItem',objItem)
        },
        goodsDetail(id){
          // event.preventDefault();
          // event.stopPropagation();
          // this.$router.push({name: '/editorTopic',params:{ topic_id:this.topic_id}});
          this.$router.push({path:'/goodsDetail',query:{id:id}});
          // return false;
        },
        drop(el){ //抛物
          for(let i=0;i<this.balls.length;i++){
            let ball= this.balls[i];
            if(!ball.show){
              ball.show = true;
              ball.el=el;
              this.dropBalls.push(ball);
              return;
            }
          }
        }
        ,
        beforeDrop(el) {/* 购物车小球动画实现 */
          let count = this.balls.length;
          while (count--) {

            let ball = this.balls[count];
            if (ball.show) {
              console.log(this.balls)
              console.log(ball)
              console.log(ball.el)
              console.log(ball.el.getBoundingClientRect())
              let rect = ball.el.getBoundingClientRect(); //元素相对于视口的位置
              let x = -(rect.right);
              let y = (window.innerHeight - rect.bottom - 40);  //获取y
              el.style.display = '';
              el.style.webkitTransform = 'translateY('+y+'px)';  //translateY
              el.style.transform = 'translateY('+y+'px)';
              let inner = el.getElementsByClassName('inner-hook')[0];
              inner.style.webkitTransform = 'translateX('+x+'px)';
              inner.style.transform = 'translateX('+x+'px)';
            }
          }
        },
        dropping(el, done) { /*重置小球数量  样式重置*/
          let rf = el.offsetHeight;
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
          el.addEventListener('transitionend', done);
        },
        afterDrop(el) { /*初始化小球*/
          let ball = this.dropBalls.shift();
          if (ball) {
            ball.show=false;
            el.style.display = 'none';
          }
        }
      }
    }
</script>

<style scoped lang="scss">
  .shop{
    position: fixed;
    top: 300px;
    left: 40px;
  }
  .ball{
    position: fixed;
    /*bottom: 22px;*/
    /*left: 32px;*/
    top: 40px;
    right: 252px;
    z-index: 200;
    transition: all 2s cubic-bezier(0, 0, .58, 1); /*贝塞尔曲线*/
  }
  .inner{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    background-color: rgb(0,160,220);
    transition: all 2s linear;
    &>img{
      width: 40px;
    }
  }
  /*.topicLi{*/
    /*position: relative;*/
  /*}*/
  .cart{
    position: fixed;
    top: 40px;
    right: 252px;
    width: 25px;
    height: 25px;
    line-height: 25px;
    border-radius: 50%;
    background-color: #E7665D;
    color: white;
  }
</style>
