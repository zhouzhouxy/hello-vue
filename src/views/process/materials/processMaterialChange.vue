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
          <span>请选择商品I级分类</span>
        </el-col>
        <el-col :span="14">
          <el-select v-model="condition.firstKindId" placeholder="一级分类">
            <el-option v-for="firstKindId in L1" :label="firstKindId.kindName" :value="firstKindId.id"  :key="firstKindId.id"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="20"  >
        <el-col :span="6" class="leftCol">
          <span>请选择商品II级分类</span>
        </el-col>
        <el-col :span="14">
          <el-select v-model="condition.secondKindId" placeholder="二级分类">
            <el-option v-for="secondKindId in L2" :label="secondKindId.kindName" :value="secondKindId.id" :key="secondKindId.id"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="20"  >
        <el-col :span="6" class="leftCol">
          <span>请选择商品III级分类</span>
        </el-col>
        <el-col :span="14">
          <el-select v-model="condition.thirdKindId" placeholder="三级分类">
            <el-option v-for="thirdKindId in L3" :label="thirdKindId.kindName" :value="thirdKindId.id" :key="thirdKindId.id"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="20"  >
        <el-col :span="6" class="leftCol">
          <span>请选择商品</span>
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
          prop="designId"
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
        <el-table-column prop="designer"
                         label="产品名称"
                         width="180px">
        </el-table-column>
        <el-table-column prop="registerTime"
                         label="产品名称"
                         width="180px">
        </el-table-column>
        <el-table-column prop="costPriceSum"
                         label="工时总成本"
                         width="180px">
        </el-table-column>
        <el-table-column
          label="变更"   width="180px">
          <template slot-scope="scope">
            <router-link :to="{name:'ChangeProcessMaterial',params:{id:list[scope.$index].id}}">变更</router-link>
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
    <!--  点击 显示物料组成设计单-->
    <el-dialog title="生产工序设计单" width="1200px" :visible.sync="dialogFormVisible">
      <el-row :gutter="20">
        <el-col :span="8">
          <span>设计单编号:</span>
          <span>{{designProcedure.designId}}</span>
        </el-col>
        <el-col :span="2" :offset="3">设计人
        </el-col>
        <el-col :span="3" >
          <span>{{designProcedure.designer}}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <span>产品名称:</span>
          <span>{{designProcedure.productName}}</span>
        </el-col>
        <el-col :span="8" :offset="3">
          <span>产品编号:</span>
          <span>{{designProcedure.productId}}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-table :data="details"
                  stripe
                  ref="multipleTable"
                  style="width:100%">
          <el-table-column
            prop="detailsNumber"
            label="序号"
            width="55">
          </el-table-column>
          <el-table-column
            prop="procedureName"
            label="工序名称"
            width="120px">

          </el-table-column>
          <el-table-column prop="procedureId"
                           label="工序编号"
                           width="80px">
          </el-table-column>
          <el-table-column prop="procedureDescribe"
                           label="描述"
                           width="80px">
          </el-table-column>

          <el-table-column
            prop="labourHourAmount"
            label="工时数"   width="160px">

          </el-table-column>
          <el-table-column prop="amountUnit"
                           label="工价单位"   width="80px">

          </el-table-column>
          <el-table-column prop="costPrice"
                           label="单位工时成本小计(元)"   width="160px">

          </el-table-column>
          <el-table-column prop="subtotal"
                           label="小计(元)"   width="80px">
          </el-table-column>
        </el-table>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <span>工时总成本</span>
          <span>{{designProcedure.costPriceSum}}</span>
        </el-col>
        <el-col :span="6" :offset="6">
          <span>物料总成本</span>
          <span>{{designProcedure.moduleCostPriceSum}}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <span>审核人</span>
          <span>{{designProcedure.checker}}</span>
        </el-col>
        <el-col :span="6" :offset="6">
          <span>审核时间</span>
          <span>{{designProcedure.checkTime}}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="2">
          <span>设计要求</span>
        </el-col>
        <el-col :span="8">
          <span>{{designProcedure.procedureDescribe}}</span>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">确  定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "processMaterialChange",
    data(){
      return{
        vis:true,
        L1:[],
        L2:[],
        L3:[],
        goodsList:[],
        condition:{
          pageNum:1,
          pageSize:5,
          state:"4"
        },
        list:[],
        total:0,
        dialogFormVisible:false,
        details:[],
        dModule:{},
        designProcedure:{},
      }
    },
    methods:{
      //查看设计单详情
      viewMaterial(id){
        // 根据id查询设计单
        this.axios.get("http://localhost:1217/enxin/m-design-procedure/queryProcedureById?id="+id)
          .then((response)=>{
            this.details=response.data.list;
            this.designProcedure=response.data.designProcedure;
            this.dialogFormVisible=true;
          })
      },
      handleCurrentChange(val){
        this.condition.pageNum=val;
        this.loadTable();
      },
      onSubmit(){
        this.loadTable();
        this.vis=false;
      },
      loadTable(){
        this.axios.post("http://localhost:1217/enxin/m-design-procedure/queryProcedureByCondition2",
          this.condition, {
            headers: {
              'Content-Type': 'application/json'
            }
          }).then((response) => {
          this.list = response.data.list;
          this.total = response.data.total;
          console.log(response.data)
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


