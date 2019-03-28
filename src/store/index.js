import Vue from 'vue'
import Vuex from 'vuex'
// import goods

Vue.use(Vuex);

const shopping = {
  state: {
    goodsItem: [],
    Num: 0,
    allGoodsNum:0,
    allGoodsPrice:0,
    detailNum:0,
    detailNowShopping:0,
    carIsShow:false
    // itemsNum:[]
  },
  mutations: {
    changeNum(state,i){
      state.Num=i;
      // console.log(state.Num);
    },
    goodsItem(state,obj){
      state.carIsShow=true;
      state.allGoodsNum+=1;
      var time=setTimeout(function () {
        state.carIsShow=false;
      },3000);
      // Vue.set(obj,'shopNum',1);
      console.log(obj.shopNum);
      state.allGoodsPrice+=(obj.price)*(obj.shopNum);
      // let huo_id=obj.sku_id;
      // console.log(huo_id);
      // console.log(state.goodsItem);
      // console.log(obj);
      // for(let i of state.goodsItem){
      //   if(i.shopNum>=2){
      //     obj.shopNum+=1;
      //     state.detailNum=Number(obj.shopNum);
      //   }else{
      //     state.goodsItem.push(obj);
      //     console.log(state.goodsItem);
      //     obj.shopNum+=1;
      //     state.detailNum=Number(obj.shopNum);
      //   }
      // }
      if(state.goodsItem.indexOf(obj)===-1){
        state.goodsItem.push(obj);
        // console.log(obj.shopNum);
      }else{
        // console.log(obj.shopNum);
           obj.limit_num=Number(obj.limit_num)
        state.detailNum=Number(obj.shopNum);
        // console.log(state.detailNum)
      }
      // console.log(state.goodsItem.length);
      // if(state.goodsItem.length<0){
      //   for(let i of state.goodsItem){
      //     let id=i.sku_id
      //     console.log(id)
      //     if(id===huo_id){
      //       obj.shopNum+=1;
      //     }else{
      //       state.goodsItem.push(obj);
      //     }
      //   }
      // }else{
      //   state.goodsItem.push(obj);
      // }
    },
    shoppingNow(state,obj){
      // state.detailNowShopping=[]
      // state.detailNowShopping.push(obj)
      state.allGoodsPrice+=(obj.price)*(obj.shopNum);
      state.goodsItem=[];
      state.goodsItem.push(obj);
      console.log(state.goodsItem)
    },
    addNum(state,obj){
      console.log(obj)
      // Vue.set(obj,'shopNum',0);
      if(obj.limit_num>obj.shopNum){
        obj.shopNum+=1;
      }else{
        alert("已经达到最大购买数")
      }

      console.log(obj)

      // state.allGoodsNum+=Number(obj.shopNum)
      state.detailNum=Number(obj.shopNum);
      state.allGoodsNum+=1;
      console.log(state.detailNum);
    },
    delNum(state,obj){
      console.log(obj)
      // Vue.set(obj,'shopNum',0)
      // state.allGoodsNum+=Number(obj.shopNum)；
      if(obj.shopNum>0){
        obj.shopNum-=1;
      }
      // obj.shopNum-=1;
      state.allGoodsNum-=1;
      state.detailNum=Number(obj.shopNum);
      console.log(state.detailNum)
    },
    clearNum(state,obj){
      let index=state.goodsItem.indexOf(obj);
      state.goodsItem.splice(index,1);
      state.allGoodsNum-=obj.shopNum;
      obj.shopNum=0;

    }
  }
};

const sanJiLianDong = {
  state: {
   qvArr:[],
    addressMessage:[
      {
        name:"光头强",
        teleApp:"138111111",
        cityApp:"北京市",
        qvApp:"市辖区",
        disApp:"朝阳区",
        dateilApp:"建国路sohu现代城A座",
        isChecked:true
      },
      {
        name:"熊大",
        teleApp:"138111111",
        cityApp:"北京市",
        qvApp:"市辖区",
        disApp:"朝阳区",
        dateilApp:"建国路sohu现代城A座",
        isChecked:false
      }
      ],
    isIndex2:0
  },
  mutations: {
   qvArr(state,qvArr){
     state.qvArr=qvArr;
     console.log(state.qvArr);
   },
    addressItem(state,addressItem){
      state.addressMessage.push(addressItem)
    },
    delEidtor(state,index2){
      state.addressMessage.splice(index2,1)
    },
    eidtor(state,index2){
      state.isIndex2=index2;
    },
    addressEidtorItem(state,addressItem){
      state.addressMessage.splice(state.isIndex2,1,addressItem)
    }
  }
};
const store = new Vuex.Store({
    state: {
      // count: [0,0,0,0]

    },
    mutations: {

    },
  modules: {
      shopping,
    sanJiLianDong
  }
  }
);
export default store
