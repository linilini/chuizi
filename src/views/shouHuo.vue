<template>
  <div id="content">
    <div class="cont">
      <div class="con2">
       收货信息
      </div>
      <div class="con3">
       <ul>
         <li v-for="(addItem,index2) in messageArr" :key="index2" :class="{'borderli':addItem.isChecked}">
           <!--<div :class="{'borderli':addItem.isChecked}>-->
           <p>{{addItem.name}}</p>
           <p>{{addItem.teleApp}}</p>
           <p>{{addItem.cityApp}} {{addItem.qvApp}} {{addItem.disApp}}</p>
           <p>{{addItem.dateilApp}}</p>
           <!--</div>-->
         </li>
         <li>
         <p @click="showAddress">+</p>
         <p>使用新地址</p>
       </li>
       </ul>
      </div>
      <div class="con4">
        发票信息
      </div>
      <div class="con5">
        <p>发票类型： 电子发票</p>
        <p>发票抬头： <input type="checkbox"/>个人 <input type="checkbox"/> 单位</p>
        <p>发票内容： 购买商品明细</p>
        <hr>
        <p>电子发票是税务局认可的有效收付款凭据。 电子发票打印后可以用于企业报销。</p>
      </div>
      <div class="con4">
        购物清单
      </div>
      <div class="con6">
        <table class="layui-table" lay-skin="line" style="margin-top: 0">
          <tr style="background: #FBFBFB"><th colspan="3">商品名称</th><th>单价</th><th>数量</th><th>小计</th></tr>
          <tr v-for="(item,index) in addGoods" :key="index" v-if="item.cartChecked">
            <td style="text-align: center"><el-checkbox style="border-radius: 50%" checked/></td>
            <td style="width: 120px"><span style="border: 1px solid #F0F0F0;display: block"><img :src="item.ali_image"></span></td>
            <td><span>{{ item.title }}<span style="display: block">{{ item.spec_json.show_name }}</span></span></td>
            <td>¥ {{ item.price }}</td>
            <td><el-button size="mini" round circle="true" @click="delNum(item)">-</el-button>
              <span>{{ item.shopNum }}</span>
              <!--{{ item.sureNum }}-->
              <el-button size="mini" round circle="true" @click="addNum(item)">+</el-button></td>
            <td>¥ {{ (item.price)*(item.shopNum) }}</td>
          </tr>
          <tr><td colspan="5"></td><td>
            商品总计： ￥<span>{{ allGoodsPrice }}</span>
            <br>
            运费： +￥<span>8.00</span>
          </td></tr>
          <tr style="background: #FBFBFB">
            <td colspan="4"></td>
            <td>应付总额：￥<span>{{ allGoodsPrice+8 }}</span></td>
            <td><el-button type="primary" @click="giveOffer">提交订单</el-button></td>
          </tr>
        </table>
      </div>
    </div>
    <div class="con9" :class="{address:isAdd}">
      <div class="con7">
        <p>管理收货地址<span @click="addressGood">X</span></p>
        <div class="con8">

          <p><input type="text" placeholder="收货人姓名" v-model="name" @blur="check_name()"/>
            <span class="yanZhen">{{ nameYan }}</span>
          </p>
          <p>
            <input type="text" placeholder="手机号" v-model="teleApp" class="telephnoneNumber" @blur="check_phone()">
            <span class="yanZhen">{{ telYan }}</span>
            <!--<input type="tel" placeholder="手机号" v-model="teleApp" class="telephnoneNumber" required>-->
            <!--<span v-for="error in errors" class="yanZhen">{{ error }}</span>-->
            <!--<input type="text" lay-verify="phone" placeholder="手机号" v-model="teleApp" class="telephnoneNumber">-->
            <!--<input type="text" placeholder="手机号" v-model="teleApp" class="telephnoneNumber" >-->
          </p>
          <p>
            <span><input type="text" placeholder="区号（可选）"></span>
            <span><input type="text" placeholder="固定电话（可选）"></span>
          </p>
          <p>
            <select name="" v-model="areaId" @change="isCity(areaId)">
              <option value="请选择省份">请选择省份</option>
              <option v-for="(city,index) in cityData" :key="index"
                      :value="city.area_id">{{ city.area_name }}</option>
            </select>
          </p>
          <p>
          <span><select name="" v-model="qvId" @change="isQv(qvId)">
          <option value="请选择城市">请选择城市</option>
          <option v-for="(qvItem,index1) in qvArr" :key="index1"
                  :value="qvItem.area_id">{{ qvItem.area_name }}</option>
        </select></span>
            <span>
              <select name="" id="" v-model="disId" @change="isDis(disId)">
                              <option value="请选择区县">请选择区县</option>
          <option v-for="(disItem,index1) in districtArr" :key="index1"
                  :value="disItem.area_id">{{ disItem.area_name }}</option>
        </select></span></p>
          <p><input type="text" placeholder="详细地址，如街道名称，楼层，门牌号码等" v-model="dateilApp" @keyup="allTest"></p>
          <p><input type="checkbox" @click="sheMoRen" v-model="isChecked">设为默认</p>
            <div v-if="errors.length" class="yanZhen">
              <!--<b>Please correct the following error(s):</b>-->

              <!--<p v-for="error in errors">{{ error }}</p>-->

            </div>
          <button type="submit" value="Submit" @click="addApp" :class="[{'baoButton':isYun},{'baocun':isBaocun}]">保存</button>


          </div>
      </div>
    </div>

  </div>
</template>

<script>
  import Axios from 'axios'

  export default {
    name: 'shouHuo',
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
    data(){
      return {
        isYun:true,
        errors: [],
        isBaocun:false,
        isChecked:false,
        isAdd:false,
        cityData:[],
        areaId:0,
        erCity:[],
        qvArr:[],
        qvId:0,
        districtArr:[],
        disId:0,
        name:"",
        teleApp:"",
        cityApp:"",
        qvApp:"",
        disApp:"",
        dateilApp:"",
        addressMessageItem:{},
        isSuccess:false,
        telYan:null,
        nameYan:null
      }
    },
  created(){
      Axios.get('https://www.easy-mock.com/mock/5a6ac7882d33bf493f881505/hammer/address')
        .then( res => {
          console.log(res);
          let { data }=res;
          console.log(data);
          this.cityData=data;
        })
        .catch( errors => {
          console.log(errors)
        })
      this.areaId = "请选择省份";
    this.qvId = "请选择城市";
    this.disId = "请选择区县";

    },
    watch:{
      addApp(){
        this.isAdd=false;
        this.addressMessageItem={
          name:this.name,
          teleApp:this.teleApp,
          cityApp:this.cityApp,
          qvApp:this.qvApp,
          disApp:this.disApp,
          dateilApp:this.dateilApp,
          isChecked:this.isChecked
        };
        // function allChecked() {
        if(this.name!==""&&this.teleApp!==""&&this.dateilApp!==""&&this.areaId!=="请选择省份"&&this.qvId!=="请选择城市"&&this.disId!=="请选择区县"){
          this.isYun=false;
          this.isBaocun=true;
          this.isSuccess=true;
        }else{
          // this.isYun=true;
          this.isAdd=true;
          // alert("请补全信息");
          this.isYun=true;
          this.isBaocun=false;
        }
        if(this.isSuccess){

          this.$store.commit('addressItem',this.addressMessageItem);
          this.isYun=true;
          this.isBaocun=false;
        }
      },
      isCity(areaId){
        console.log(areaId);
        this.areaId=areaId;
        for(let i in this.cityData){
          console.log(i);
          console.log(this.cityData[i]);
          let cityDataId=Number(this.cityData[i].area_id)
          if(cityDataId===Number(this.areaId)){
            this.qvArr=this.cityData[i].city_list
            console.log(this.qvArr);
            this.cityApp=this.cityData[i].area_name;
            if(this.name!==""&&this.teleApp!==""&&this.dateilApp!==""&&this.areaId!=="请选择省份"&&this.qvId!=="请选择城市"&&this.disId!=="请选择区县"){
              this.isYun=false;
              this.isBaocun=true;
              this.isSuccess=true;
            }else{
              // this.isYun=true;
              this.isAdd=true;
              // alert("请补全信息");
              this.isYun=true;
              this.isBaocun=false;
            }
            this.$store.commit('qvArr',this.qvArr)
          }
        }
      },
      isQv(areaId){
        console.log(areaId);
        console.log(this.qvArr);
        this.qvId=areaId;
        for(let i in this.qvArr){
          console.log(i);
          console.log(this.qvArr[i]);
          let qvArrId=Number(this.qvArr[i].area_id)
          if(qvArrId===Number(this.qvId)){
            this.districtArr=this.qvArr[i].county_list;
            this.qvApp=this.qvArr[i].area_name;
            if(this.name!==""&&this.teleApp!==""&&this.dateilApp!==""&&this.areaId!=="请选择省份"&&this.qvId!=="请选择城市"&&this.disId!=="请选择区县"){
              this.isYun=false;
              this.isBaocun=true;
              this.isSuccess=true;
            }else{
              // this.isYun=true;
              this.isAdd=true;
              // alert("请补全信息");
              this.isYun=true;
              this.isBaocun=false;
            }
            console.log(this.districtArr)
          }
        }
      },
      isDis(disId){
        this.disId=disId;
        for(let i in this.districtArr){
          let districtId=Number(this.districtArr[i].area_id)
          if(districtId===Number(this.disId)){
            this.disApp=this.districtArr[i].area_name;
            if(this.name!==""&&this.teleApp!==""&&this.dateilApp!==""&&this.areaId!=="请选择省份"&&this.qvId!=="请选择城市"&&this.disId!=="请选择区县"){
              this.isYun=false;
              this.isBaocun=true;
              this.isSuccess=true;
            }else{
              // this.isYun=true;
              this.isAdd=true;
              // alert("请补全信息");
              this.isYun=true;
              this.isBaocun=false;
            }
            // this.isYun=false;
            // this.isBaocun=true;
          }
        }
      },
    },
    methods:{
      check_phone() {
        if (!/^1[34578]\d{9}$/.test(this.teleApp)) {
          this.telYan="格式错误";
          this.isSuccess=false;
          this.teleApp = "";
        } else {
          this.telYan=null;
          // alert("格式正确");
          this.isSuccess=false;
          // this.isYun=false;
          // this.isBaocun=true;

        }
      },
      check_name(){
        if (! /^[\u4E00-\u9FA5A-Za-z]+$/.test(this.name)) {
          this.nameYan="名字格式错误";
        } else {
          this.nameYan=null;
        }
      },
      // checkForm: function (e) {
      //   this.errors = [];
      //   if (!this.teleApp) {
      //     this.errors.push('电话号码正确');
      //     this.isSuccess=true
      //   } else if (!this.validEmail(this.teleApp)) {
      //     this.errors.push('电话号码错误');
      //     this.isSuccess=false
      //     this.isAdd=true;
      //   }
      //   e.preventDefault();
      // },
      // validEmail: function (teleApp) {
      //   var re = /[0,9]{11}/;
      //   return re.test(teleApp);
      // },
      // teleInput(){
      //   console.log(this.teleAp);
      //   var reg=/[0,9]{11}/;
      //   // reg.test()
      // },
      allTest(){
        if(this.name!==""&&this.teleApp!==""&&this.dateilApp!==""&&this.areaId!=="请选择省份"&&this.qvId!=="请选择城市"&&this.disId!=="请选择区县"){
          this.isYun=false;
          this.isBaocun=true;
          this.isSuccess=true;
        }else{
          // this.isYun=true;
          this.isAdd=true;
          // alert("请补全信息");
          this.isYun=true;
          this.isBaocun=false;
        }
      },
      sheMoRen(){
        this.isChecked=!this.isChecked;
      },
      addressGood(){
        this.isAdd=false;
      },
      showAddress(){
        this.isAdd=true;
      },
      isCity(areaId){
        console.log(areaId);
        this.areaId=areaId;
        for(let i in this.cityData){
          console.log(i);
          console.log(this.cityData[i]);
          let cityDataId=Number(this.cityData[i].area_id)
          if(cityDataId===Number(this.areaId)){
            this.qvArr=this.cityData[i].city_list
            console.log(this.qvArr);
            this.cityApp=this.cityData[i].area_name;
            if(this.name!==""&&this.teleApp!==""&&this.dateilApp!==""&&this.areaId!=="请选择省份"&&this.qvId!=="请选择城市"&&this.disId!=="请选择区县"){
              this.isYun=false;
              this.isBaocun=true;
              this.isSuccess=true;
            }else{
              // this.isYun=true;
              this.isAdd=true;
              // alert("请补全信息");
              this.isYun=true;
              this.isBaocun=false;
            }
            this.$store.commit('qvArr',this.qvArr)
          }
        }
      },
          isQv(areaId){
        console.log(areaId);
            console.log(this.qvArr);
            this.qvId=areaId;
        for(let i in this.qvArr){
          console.log(i);
          console.log(this.qvArr[i]);
          let qvArrId=Number(this.qvArr[i].area_id)
          if(qvArrId===Number(this.qvId)){
            this.districtArr=this.qvArr[i].county_list;
            this.qvApp=this.qvArr[i].area_name;
            if(this.name!==""&&this.teleApp!==""&&this.dateilApp!==""&&this.areaId!=="请选择省份"&&this.qvId!=="请选择城市"&&this.disId!=="请选择区县"){
              this.isYun=false;
              this.isBaocun=true;
              this.isSuccess=true;
            }else{
              // this.isYun=true;
              this.isAdd=true;
              // alert("请补全信息");
              this.isYun=true;
              this.isBaocun=false;
            }
            console.log(this.districtArr)
          }
        }
      },
      isDis(disId){
         this.disId=disId;
         for(let i in this.districtArr){
           let districtId=Number(this.districtArr[i].area_id)
           if(districtId===Number(this.disId)){
             this.disApp=this.districtArr[i].area_name;
             if(this.name!==""&&this.teleApp!==""&&this.dateilApp!==""&&this.areaId!=="请选择省份"&&this.qvId!=="请选择城市"&&this.disId!=="请选择区县"){
               this.isYun=false;
               this.isBaocun=true;
               this.isSuccess=true;
             }else{
               // this.isYun=true;
               this.isAdd=true;
               // alert("请补全信息");
               this.isYun=true;
               this.isBaocun=false;
             }
             // this.isYun=false;
             // this.isBaocun=true;
           }
         }
      },
      addApp(){
        this.isAdd=false;
        this.addressMessageItem={
          name:this.name,
          teleApp:this.teleApp,
          cityApp:this.cityApp,
          qvApp:this.qvApp,
          disApp:this.disApp,
          dateilApp:this.dateilApp,
          isChecked:this.isChecked
        };
        // function allChecked() {
          if(this.name!==""&&this.teleApp!==""&&this.dateilApp!==""&&this.areaId!=="请选择省份"&&this.qvId!=="请选择城市"&&this.disId!=="请选择区县"){
            this.isYun=false;
            this.isBaocun=true;
            this.isSuccess=true;
          }else{
            // this.isYun=true;
            this.isAdd=true;
            alert("请补全信息");
            this.isYun=true;
            this.isBaocun=false;
          }
        // }
        // if(this.name!==""&&this.teleApp!==""&&this.dateilApp!==""&&this.areaId!=="请选择省份"&&this.qvId!=="请选择城市"&&this.disId!=="请选择区县"){
        //   this.isYun=false;
        //   this.isBaocun=true;
        //   this.isSuccess=true;
        // }else{
        //   // this.isYun=true;
        //   this.isAdd=true;
        //   alert("请补全信息");
        //   this.isYun=true;
        //   this.isBaocun=false;
        // }
        if(this.isSuccess){
          this.$store.commit('addressItem',this.addressMessageItem);
          this.isYun=true;
          this.isBaocun=false;
        }
        // this.$store.commit('addressItem',this.addressMessageItem)
      },
      giveOffer(){
        this.$router.push("/giveTable");
      }
    }
  }
</script>

<style scoped lang="scss">
  .yanZhen{
    color: red;
    &>ul{
      li{
        color: red;

      }
    }
  }
  .baoButton{
    width: 100%;
    height: 50px;
    background: #BCCCED;
    color: white;
    text-align: center;
    line-height: 50px;
  }
.baocun{
  width: 100%;
  height: 50px;
  color: white;
  text-align: center;
  line-height: 50px;
  background: #638DE0;
}
  .boderli{
    border:1px solid #6A8FE5;
  }
</style>
