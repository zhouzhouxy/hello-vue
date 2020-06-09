<template>
  <div>
    <div v-show="vis">
      <el-row :gutter="20">
        <el-col :offset="8" :span="4">
          <el-button type="primary" @click="onSubmit">立即查询</el-button>
        </el-col>

      </el-row>
      <el-row :gutter="20" class="el-row" >
        <el-col :span="6" class="leftCol">
          <span>请选择产品I级分类</span>
        </el-col>
        <el-col :span="14">
          <el-select v-model="condition.firstKindId" placeholder="一级分类">
            <el-option v-for="firstKindId in L1" :label="firstKindId.kindName" :value="firstKindId.id"  :key="firstKindId.id"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="20"  >
        <el-col :span="6" class="leftCol">
          <span>请选择产品II级分类</span>
        </el-col>
        <el-col :span="14">
          <el-select v-model="condition.secondKindId" placeholder="二级分类">
            <el-option v-for="secondKindId in L2" :label="secondKindId.kindName" :value="secondKindId.id" :key="secondKindId.id"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="20"  >
        <el-col :span="6" class="leftCol">
          <span>请选择产品III级分类</span>
        </el-col>
        <el-col :span="14">
          <el-select v-model="condition.thirdKindId" placeholder="三级分类">
            <el-option v-for="thirdKindId in L3" :label="thirdKindId.kindName" :value="thirdKindId.id" :key="thirdKindId.id"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="20"  >
        <el-col :span="6" class="leftCol">
          <span>请选择产品</span>
        </el-col>
        <el-col :span="14">
          <el-select v-model="condition.goodsId" placeholder="商品">
            <el-option v-for="goods in goodsList" :label="goods.productName" :value="goods.id" :key="goods.id">{{goods.productName}}</el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="20"  >
        <el-col :span="6" class="leftCol">
          <span>请输入登记时间</span>
        </el-col>
        <el-col :span="4">
          <el-date-picker type="date" placeholder="选择日期" v-model="condition.date1"></el-date-picker>
        </el-col>
        <el-col class="line" :span="1">-</el-col>
        <el-col :span="4">
          <el-date-picker type="date" placeholder="选择日期" v-model="condition.date2"></el-date-picker>
        </el-col>
      </el-row>
    </div>
    <div v-show="!vis">
      <el-table :data="list"
                style="width:100%">
        <el-table-column
          prop="storeId"
          label="设计单编号"
          width="200">
        </el-table-column>
        <el-table-column prop="productId"
                         label="产品编号"
                         width="180">
        </el-table-column>
        <el-table-column prop="productName"
                         label="产品名称"
                         width="180px">
        </el-table-column>

        <el-table-column prop="firstKindName"
                         label="I级分类"
                         width="180px">
        </el-table-column>
        <el-table-column prop="secondKindName"
                         label="二级分类"   width="180px">
        </el-table-column>
        <el-table-column prop="thirdKindName"
                         label="三级分类"   width="180px">
        </el-table-column>
        <el-table-column prop="registerTime"
                         label="登记时间"   width="180px">
        </el-table-column>
        <el-table-column
          label="变更"   width="180px">
          <template slot-scope="scope">
              <router-link :to="{name:'ChangeStock',params:{id:list[scope.$index].id}}">变更</router-link>
           </template>
        </el-table-column>

      </el-table>
      <el-pagination
        background
        :page-size="5"
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "stockChange",
    data(){
      return{
        vis:true,
        L1:[],
        L2:[],
        L3:[],
        demand:'',
        goodsList:[],
        condition:{
          pageNum:1,
          pageSize:5,
          checkTag:'1'
        },
        list:[],
        total:0,
        dialogFormVisible:false,
        sCell:{},
        details:[],
        dModule:{},
        designProcedure:{},
      }
    },
    methods:{

      handleCurrentChange(val){
        this.condition.pageNum=val;
        this.loadTable();
      },
      onSubmit(){
        console.log(this.condition)
        this.loadTable();
        this.vis=false;
      },
      loadTable(){
        this.axios.post("http://localhost:1217/enxin/s-cell/queryScellByCondition",
          this.condition, {
            headers: {
              'Content-Type': 'application/json'
            }
          }).then((response) => {
          this.list = response.data.list;
          this.total = response.data.total;
        })
          .catch(function (error) {
          })
      },
    },
    created:function(){
      //根据父Id查询一级分类
      this.axios
        .get("http://localhost:1217/enxin/d-config-file-kind/queryFileKindByPId?pid=0")
        .then(response =>{
          this.L1=response.data;
          console.log(this.L1)
        })
        .catch(function(error){
          //请求失败处理
          console.log(error)
        }),
        //查询用途类型和档次
        this.axios
          .get("http://localhost:1217/publicChar/queryGradeAndUseType")
          .then(response=>{
            this.useType=response.data.useType;
            this.grade=response.data.grade;
          })
          .catch(function(error){
            console.log(error);
          }),
        //查询所有的商品
        this.axios.
        get("http://localhost:1217/enxin/m-design-procedure/queryAllGoods")
          .then((response)=>{
            // console.log(response)
            this.goodsList=response.data;
          })
          .catch(function(error){console.log(error)})
    },
    computed:{
      firstKindId:function(){
        return this.condition.firstKindId;
      },
      secondKindId:function(){
        return this.condition.secondKindId;
      }
    },
    watch:{
      //一级分类
      firstKindId(newVal,oldVal){
        this.axios
          .get("http://localhost:1217/enxin/d-config-file-kind/queryFileKindByPId?pid="+newVal)
          .then(response =>{
            this.L2=response.data;
          })
          .catch(function(error){
            //请求失败处理
            console.log(error)
          });
      },
      secondKindId(newVal,oldVal){
        console.log("点击二级分类加载")
        this.axios
          .get("http://localhost:1217/enxin/d-config-file-kind/queryFileKindByPId?pid="+newVal)
          .then(response =>{
            this.L3=response.data;
          })
          .catch(function(error){
            //请求失败处理
            console.log(error)
          });
      },
    }
  }
</script>

<style scoped>
  .leftCol{
    background-color: rgb(217, 236, 255);
    padding: 10px;
    text-align: center;
  }
  .el-row{
    border: 1px solid white;
  }
</style>

