<template>
  <div class="box" >
    <h4 style="text-align: center">生产派工单</h4>
    <el-row :gutter="20">
      <el-col :span="8">
        <span>派工单编号:</span>
        <span>{{manufacture.manufactureId}}</span>
      </el-col>
      <el-col :span="8" :offset="3">
        <span>出库单编号:</span>
        <!--<span>{{manufacture.manufactureId}}</span>-->
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <span>产品编号:</span>
        <span>{{manufacture.productId}}</span>
      </el-col>
      <el-col :span="8" :offset="3">
        <span>产品名称：:</span>
        <span>{{manufacture.productName}}</span>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <span>描述:</span>
        <span></span>
      </el-col>
      <el-col :span="3" :offset="3">
        <span>数量：</span>
      </el-col>
      <el-col :span="3">
        <span>{{manufacture.amount}}</span>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-table :data="details"
                :header-cell-style="{background:'#fdf5e6',color:'#303133'}"
                stripe
                style="width:100%">

        <el-table-column
          prop="detailsNumber"
          label="序号"
          width="80">
        </el-table-column>
        <el-table-column
          label="工序状态"
          width="80">
          <template slot-scope="scope">
              <span  style="color: #E6A23C"  v-if="scope.row.procedureFinishTag==0">等待</span>
              <span style="color: #67C23A" v-else-if="scope.row.procedureFinishTag==1||scope.row.procedureFinishTag==2">执行</span>
              <span style="color: #409EFF" v-else>完成</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="procedureName"
          label="工序名称"
          width="80">
        </el-table-column>
        <el-table-column prop="subtotal"
                         label="设计工时成本"
                         width="120px">
        </el-table-column>
        <el-table-column label="实际工时成本"
                         width="120px">
            <template slot-scope="scope">
              <el-link @click="showProceduring(scope.row)" type="primary">{{scope.row.realSubtotal}}</el-link>
            </template>
        </el-table-column>
        <el-table-column prop="moduleSubtotal"
                         label="设计物料成本(元)"   width="160px">
        </el-table-column>
        <el-table-column prop="realModuleSubtotal"
                         label="实际物料成本(元)"   width="160px">
          <template slot-scope="scope">
            <el-link @click="showProcedureModuling(scope.row)" type="primary">{{scope.row.realModuleSubtotal}}</el-link>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <span>设计工时总成本</span>
        <span>{{manufacture.labourCostPriceSum}}</span>
      </el-col>
      <el-col :span="6" :offset="7">
        <span>设计物料总成本</span>
        <span>{{manufacture.moduleCostPriceSum}}</span>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <span>实际工时总成本</span>
        <span>{{manufacture.realLabourCostPriceSum}}</span>
      </el-col>
      <el-col :span="6" :offset="7">
        <span>设计物料总成本</span>
        <span>{{manufacture.realModuleCostPriceSum}}</span>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="3">
        <span>登记人</span>
      </el-col>
      <el-col :span="4">
        <span>{{manufacture.register}}</span>
      </el-col>
      <el-col :span="8" :offset="6">
        <span>登记时间</span>
        <span>{{manufacture.registerTime}}</span>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="3">
        <span>审核人</span>
      </el-col>
      <el-col :span="4">
        <span>{{manufacture.checker}}</span>
      </el-col>
      <el-col :span="8" :offset="6">
        <span>审核时间</span>
        <span>{{manufacture.checkTime}}</span>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="2">
        <span>备注</span>
      </el-col>
      <el-col :span="8" :offset="1">
        <span>{{manufacture.remark}}</span>
      </el-col>
    </el-row>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="handleClose">
          <h4 style="text-align: center">生产登记单</h4>

          <el-row :gutter="24">
              <el-col :span="12">
                  <span>派工单编号</span>
                  <span>{{manufacture.manufactureId}}</span>
              </el-col>
            <el-col :span="12">
              <span>工序名称</span>
              <span>{{mProcedure.procedureName}}</span>
            </el-col>
          </el-row>
          <el-row :gutter="24">
              <el-col :span="12">
                <span>实际物料成本</span>
                <span>{{mProcedure.realModuleSubtotal}}</span>
              </el-col>
          </el-row>
          <el-table :data="mProcedureModuling"
                      :header-cell-style="{background:'#409EFF',color:'#FFFFFF'}"
                      stripe>
              <el-table-column
                label="序号">
                <template slot-scope="scope">
                  <span>{{scope.$index+1}}</span>
                </template>
              </el-table-column>

              <el-table-column
                prop="mProcedureModuling.productName"
                label="物料名称">
              </el-table-column>
              <el-table-column
                prop="mProcedureModuling.productId"
                label="物料编号">
              </el-table-column>
              <el-table-column
                prop="mProcedureModuling.amount"
                label="本次数量">
              </el-table-column>
              <el-table-column
                prop="mProcedureModuling.costPrice"
                label="单位物料成本">
              </el-table-column>
              <el-table-column
                prop="mProcedureModuling.subtotal"
                label="物料成本">
              </el-table-column>
              <el-table-column
                prop="register"
                label="登记人">
              </el-table-column>
              <el-table-column
                prop="registerTime"
                width="180px"
                label="登记时间">
              </el-table-column>
              </el-table>

       <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible2"
       :before-close="handleClose">
      <h4 style="text-align: center">生产登记单</h4>
      <el-row :gutter="24">
        <el-col :span="12">
          <span>派工单编号</span>
          <span>{{manufacture.manufactureId}}</span>
        </el-col>
        <el-col :span="12">
          <span>工序名称</span>
          <span>{{mProcedure.procedureName}}</span>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <span>实际工时数</span>
          <span>{{mProcedure.realLabourHourAmount}}</span>
        </el-col>
        <el-col :span="12">
          <span>实际工时成本</span>
          <span>{{mProcedure.realSubtotal}}</span>
        </el-col>
      </el-row>
      <el-table :data="mProceduring"
                :header-cell-style="{background:'#409EFF',color:'#FFFFFF'}"
                stripe>
          <el-table-column
            label="序号">
              <template slot-scope="scope">
                  <span>{{scope.$index}}</span>
              </template>
          </el-table-column>
        <el-table-column
          prop="procedureResponsiblePerson"
          label="负责人">
        </el-table-column>
        <el-table-column
          prop="procedureDescribe"
          label="描述">
        </el-table-column>
        <el-table-column
          prop="labourHourAmount"
          label="本次工时数">
        </el-table-column>
        <el-table-column
          prop="costPrice"
          label="单位工时成本">
        </el-table-column>
        <el-table-column
        prop="subtotal"
        label="本次工时成本(元)">
      </el-table-column>
        <el-table-column
          prop="register"
          label="登记人">
        </el-table-column>
        <el-table-column
          prop="registerTime"
          width="180px"
          label="登记时间">
        </el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible2 = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "checkSimpleProduction",
    props:['id'],
    data(){
      return{
        dialogVisible:false,
        dialogVisible2:false,
        manufacture: {},
        details:[],
        procedureDetail:{},
        designProcedure:{},
        mProcedureModuling:[],
        checkTime:'',
        checker:'',
        mProcedure:{},
        mProceduring:[],
       }
    },
    methods:{
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.mProcedure={};
            this.mProceduring=[];
            this.mProcedureModuling=[]
            done();
          })
          .catch(_ => {});
      },
      //显示物料成本详情过程
      showProcedureModuling(data){
         this.axios.get('http://127.0.0.1:1217/enxin/m-procedure-moduling/query-procedure-moduling-by-pid?id='+data.id).
        then((response)=> {
          this.mProcedure=data;
           this.mProcedureModuling=response.data;
           console.log(this.mProcedureModuling);
           this.dialogVisible=true;
          })
      },
      //线程生产过程详情
      showProceduring(data){
        this.axios.get('http://127.0.0.1:1217/enxin/m-proceduring/query-proceduring?id='+data.id).
        then((response)=> {
          this.mProceduring=response.data;
          this.mProcedure=data;
          this.dialogVisible2=true;
        })
      },
      //返回
      retu(){
        this.$router.push('/pm/pq');
      },
      loadTables(){
        //根据id查询工序详情
        this.axios.get('http://127.0.0.1:1217/enxin/m-procedure/queryProcedureByPId?pId='+this.id).then((response)=>{
          this.manufacture=response.data.mManufacture;
          this.details=response.data.list;
          //如果所有的都已经审核或者未开始返回审核页面
         })
      }
    },
    created(){
      this.loadTables();
    },
  }
</script>

<style scoped>

  .box{
    width:1000px;
    margin:10px auto;
    border:1px solid #0c0c0c;
    padding: 35px;
    border-radius:5px;
    box-shadow:0 0 10px #0c0c0c;
  }

  #dialog  >>>  .el-input__inner{
    border: none;
    border-bottom: 1px solid gray;
    /*margin-left: -40px;*/
    height: 25px !important;
    width: 85% !important;
    background-color: lightgoldenrodyellow;
  }
  .leftCol{
    background-color: rgb(217, 236, 255);
    padding: 10px;
    text-align: center;
  }
</style>

