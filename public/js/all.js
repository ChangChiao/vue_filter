'use strict';

//分頁組件
// let pageStr =` <ul class="pagination" >
//             <li v-show="current != 1" @click="current-- && goto(current)" ><a href="#">上一页</a></li>
//             <li v-for="index in pages" @click="goto(index)" :class="{'active':current == index}" :key="index">
//               <a href="#" >{{index}}</a>
//             </li>
//             <li v-show="allpage != current && allpage != 0 " @click="current++ && goto(current++)"><a href="#" >下一页</a></li>
//         </ul>`;
//  Vue.component("page",{
//       template:pageStr,
//       props:['list'],
//         data:function(){
//           return{
//             // listData:[],
//             current:1,
//             showItem:5,
//           }
//         },
//         computed:{
//           pages:function(){
//                 var pag = [];
//                   if( this.current < this.showItem ){ //如果当前的激活的项 小于要显示的条数
//                        //总页数和要显示的条数那个大就显示多少条
//                        var i = Math.min(this.showItem,this.allpage);
//                        while(i){
//                            pag.unshift(i--);
//                        }
//                    }else{ //当前页数大于显示页数了
//                        var middle = this.current - Math.floor(this.showItem / 2 ),//从哪里开始
//                            i = this.showItem;
//                        if( middle >  (this.allpage - this.showItem)  ){
//                            middle = (this.allpage - this.showItem) + 1
//                        }
//                        while(i--){
//                            pag.push( middle++ );
//                        }
//                    }
//                  return pag
//                }  ,
//           allpage(){
//             return Math.ceil(this.list / 5);
//           }
//       },
//       methods:{
//         goto(index){
//           if(index == this.current) return;
//             this.current = index;
//             this.$emit('goto',index);
//              console.log('allpage' + this.list);
//             console.log('allpage' + Math.ceil(this.list.length / 5));
//         }
//       },mounted(){

//       }
//     })


var vm = new Vue({
  el: '.wrapper',
  data: {
    nowType: 'location',
    arr: [],
    current: 1,
    countOfPage: 5,
    placeName: '',
    mainContentShow: true,
    selectLocation: '',
    dataList: [],
    pageShow: [],
    ifFree: [],
    singleData: {},
    zoneList: ['三民區', '內門區', '美濃區', '小港區', '楠梓區', '左營區', '鼓山區', '鹽埕區', '前金區', '新興區', '苓雅區', '前鎮區', '旗津區', '小港區', '鳳山區', '大寮區', '鳥松區', '林園區', '仁武區', '大樹區', '大社區', '岡山區', '路竹區', '橋頭區', '梓官區', '彌陀區', '永安區', '燕巢區', '田寮區', '阿蓮區', '茄萣區', '湖內區', '旗山區', '內門區', '杉林區', '甲仙區', '六龜區', '茂林區', '桃源區', '那瑪夏區']
  },
  watch: {
    // dataList:{
    //   immediate: true,
    // }
  },
  computed: {
    filteredRows: function filteredRows() {
      var filter_name = this.placeName;
      var location = this.selectLocation;
      var entranceFee = this.ifFree;
      var temp = [],
          temp2 = [],
          temp3 = [];
      if (filter_name !== '') {
        temp = this.dataList.filter(function (item) {
          return item.Name.indexOf(filter_name) > -1;
        });
      } else {
        temp = this.dataList;
      }

      if (location !== '') {
        temp2 = temp.filter(function (d) {
          return d.Zone.indexOf(location) > -1;
        });
      } else {
        temp2 = temp;
      }

      if (entranceFee.length != 0) {
        temp3 = temp2.filter(function (d) {
          return entranceFee.includes(d.Ticketinfo);
        });
      } else {
        temp3 = temp2;
      }

      return temp3;
    },
    pageStart: function pageStart() {
      return (this.current - 1) * this.countOfPage;
    },
    totalPage: function totalPage() {
      return Math.ceil(this.filteredRows.length / this.countOfPage);
    },
    tagData: function tagData() {
      // let array = this.arr;
      var array = this.ifFree;
      //         let location = this.selectLocation;
      //         let entranceFee = this.ifFree;
      //         array = entranceFee;
      //         let index = array.indexOf('');

      //         if (index !== -1) {
      //              array[index] = '門票入場';
      //         }
      //          array.push(location);
      //         let index = arr.indexOf('temp');

      //         if (index !== -1) {
      //              arr[index] = location;
      //         }
      //         if(entranceFee.length != 0 && this.ifCategoriesExist == false){
      //           arr = entranceFee;
      //           this.ifCategoriesExist =!this.ifCategoriesExist; 
      //         }

      //         if(location!='' &&  this.ifLocationExist == false){
      //             arr.push(location);
      //           this.ifLocationExist = !this.ifLocationExist;
      //         }
      console.log('array' + array);
      return array;
    },
    ifCategoriesExist: function ifCategoriesExist() {
      var entranceFee = this.ifFree;
      if (entranceFee.length == 0) {
        return false;
      } else {
        return true;
      }
    },
    ifLocationExist: function ifLocationExist() {
      var location = this.selectLocation;
      if (location == '') {
        return false;
      } else {
        return true;
      }
      console.log(location);
    }
  },
  methods: {
    removeTag: function removeTag(index) {
      this.tagData.splice(index, 1);
    },

    setPage: function setPage(idx) {
      if (idx <= 0 || idx > this.totalPage) {
        return;
      }
      this.current = idx;
    },
    changeFilter: function changeFilter(param) {
      this.nowType = param;
    },
    goBack: function goBack() {
      this.mainContentShow = true;
    },
    toSinglePage: function toSinglePage(item) {
      this.mainContentShow = false;
      this.singleData = item;
      console.log('ss' + JSON.stringify(this.singleData));
    },
    showNowPage: function showNowPage(index) {
      if (index == undefined) {
        index = 1;
      }
      var arr = this.dataList;
      var newArr = this.newCutArray(arr, 5);
      // let i = Number(index);
      this.pageShow = newArr[index];
    },
    cutArray: function cutArray(old, star, end) {
      var newArray = [];
      for (var i = star; i <= end; i++) {
        newArray.push(old[i]);
      }
      return newArray;
    },
    newCutArray: function newCutArray(oldArray, size) {
      var newArray = [];
      var j = 1;
      for (var i = 0; i < oldArray.length; i++) {
        console.log(i == 0 || j == size);
        j++;

        if (i == 0 || j == size) {
          console.log(i);
          console.log(i + (size - 1));
          newArray.push(this.cutArray(oldArray, i, i + (size - 1)));
          j = 0;
        }
      }
      return newArray;
    }
  },
  created: function created() {
    var link = 'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97';
    var self = this; //陷阱
    axios.get(link).then(function (response) {
      console.log(response);
      console.log(response.data.result.records);
      self.dataList = response.data.result.records;
      self.$nextTick(function () {
        return self.showNowPage();
      }); //callback
    }).catch(function (error) {
      console.log('error');
    });
  },
  mounted: function mounted() {
    // this.showNowPage();

  },
  updated: function updated() {}
  //   Filters(){

  //   }

});

//axios


// 資料格式
//# sourceMappingURL=all.js.map
