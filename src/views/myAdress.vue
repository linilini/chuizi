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
        <p>收货信息</p>
        <div class="co3">
          <div class="co4">
            <table class="layui-table addressTable" lay-skin="line" style="margin: 0">
              <tr v-for="(addItem,index2) in messageArr" :key="index2" style="height: 131px;padding: 54px 28px;">
              <td>{{addItem.name}}</td>
              <td colspan="3">{{addItem.cityApp}} {{addItem.qvApp}} {{addItem.disApp}}{{addItem.dateilApp}}</td>
              <td>{{addItem.teleApp}}</td>
              <td>设为默认</td>
              <td><button @click="showAddress(index2)">编辑</button><button @click="delEidtor(index2)">X</button></td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="con9" :class="{address:isAdd}">
      <div class="con7">
        <p>管理收货地址<span @click="addressGood">X</span></p>
        <div class="con8">

          <p><input type="text" placeholder="收货人姓名" v-model="name"></p>
          <p><input type="text" placeholder="手机号" v-model="teleApp"></p>
          <p>
            <span><input type="text" placeholder="区号（可选）"></span>
            <span><input type="text" placeholder="固定电话（可选）"></span>
          </p>
          <p>
            <select name="" v-model="areaId" @change="isCity(areaId)">
              <option value="请选择省份">请选择省份</option>
              <option v-for="(city,index) in cityData" :key="index"
                      :value="city.area_id">{{ city.area_name }}</option>
            </select></p>
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
          <p><input type="text" placeholder="详细地址，如街道名称，楼层，门牌号码等" v-model="dateilApp"></p>
          <p><input type="checkbox">设为默认</p>
          <button @click="addApp" :class="[{'baoButton':isYun},{'baocun':isBaocun}]">保存</button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Axios from 'axios'

  export default {

      computed: {
        qvArr11 () {
          return Number(this.$store.state.sanJiLianDong.qvArr)
        },
        messageArr () {
          return this.$store.state.sanJiLianDong.addressMessage
        },
        addGoods () {
          return this.$store.state.shopping.goodsItem
        },
        allGoodsNum () {
          return this.$store.state.shopping.allGoodsNum
        },
        allGoodsPrice () {
          return this.$store.state.shopping.allGoodsPrice
        }
      },
      data () {
        return {
          isYun:true,
          isBaocun:false,
          isAdd: false,
          cityData: [],
          areaId: 0,
          erCity: [],
          qvArr: [],
          qvId: 0,
          districtArr: [],
          disId: 0,
          name: "",
          teleApp: "",
          cityApp: "",
          qvApp: "",
          disApp: "",
          dateilApp: "",
          addressMessageItem: {}
        }
      },
      created () {
        Axios.get('https://www.easy-mock.com/mock/5a6ac7882d33bf493f881505/hammer/address')
          .then(res => {
            console.log(res);
            let {data} = res;
            console.log(data);
            this.cityData = data;
          })
          .catch(errors => {
            console.log(errors)
          })
        this.areaId = "请选择省份";
        this.qvId = "请选择城市";
        this.disId = "请选择区县";
      },
      methods: {
        addressGood () {
          this.isAdd = false
        },
        showAddress (index2) {
          this.isAdd = true;
          this.$store.commit('eidtor',index2)
        },
        delEidtor(index2){
          this.$store.commit('delEidtor',index2)
        },
        isCity (areaId) {
          console.log(areaId);
          this.areaId = areaId;
          for (let i in this.cityData) {
            console.log(i);
            console.log(this.cityData[i]);
            let cityDataId = Number(this.cityData[i].area_id)
            if (cityDataId === Number(this.areaId)) {
              this.qvArr = this.cityData[i].city_list
              console.log(this.qvArr);
              this.cityApp = this.cityData[i].area_name
              this.$store.commit('qvArr', this.qvArr)
            }
          }
        },
        isQv (areaId) {
          console.log(areaId);
          console.log(this.qvArr);
          this.qvId = areaId;
          for (let i in this.qvArr) {
            console.log(i);
            console.log(this.qvArr[i]);
            let qvArrId = Number(this.qvArr[i].area_id)
            if (qvArrId === Number(this.qvId)) {
              this.districtArr = this.qvArr[i].county_list;
              this.qvApp = this.qvArr[i].area_name
              console.log(this.districtArr)
            }
          }
        },
        isDis (disId) {
          this.disId = disId;
          for (let i in this.districtArr) {
            let districtId = Number(this.districtArr[i].area_id)
            if (districtId === Number(this.disId)) {
              this.disApp = this.districtArr[i].area_name
            }
          }
        }
        ,
        addApp () {
          this.isAdd = false;
          this.addressMessageItem = {
            name: this.name,
            teleApp: this.teleApp,
            cityApp: this.cityApp,
            qvApp: this.qvApp,
            disApp: this.disApp,
            dateilApp: this.dateilApp
          };
          // this.$store.commit('addressEidtorItem', this.addressMessageItem)
          if(this.name!==""&&this.teleApp!==""&&this.dateilApp!==""&&this.areaId!=="请选择省份"&&this.qvId!=="请选择城市"&&this.disId!=="请选择区县"){
            this.isYun=false;
            this.isBaocun=true;
            this.isSuccess=true;
            this.$store.commit('addressEidtorItem', this.addressMessageItem)
          }else{
            // this.isYun=true;
            this.isAdd=true;
            alert("请补全信息");
            this.isYun=true;
            this.isBaocun=false;
          }
        }
        // ,
        // giveOffer () {
        //   this.$router.push("/giveTable");
        // }
      }

    }
</script>

<style scoped>
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
</style>
