<template>
  <div class="box" >
    <h4 style="text-align: center">生产派工单</h4>
    <el-row :gutter="20">
      <el-col :span="8">
        <span>派工单编号:</span>
        <span>{{manufacture.manufactureId}}</span>
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
        <span>投产数量:</span>
        <span>{{manufacture.amount}}</span>
      </el-col>
      <el-col :span="3" :offset="3">
        <span>合格数量：</span>
      </el-col>
      <el-col :span="3">
        <span v-if="manufacture.testedAmount==null">生产中</span>
        <span v-else>{{manufacture.testedAmount}}</span>
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
          label="工序状态"
          width="55">
          <template slot-scope="scope">
              <span v-if="scope.row.procedureFinishTag==0">等待</span>
              <span v-if="scope.row.procedureFinishTag==1">等待</span>
              <span v-if="scope.row.procedureFinishTag==2">已完成</span>
              <span v-if="scope.row.procedureFinishTag==3">完成</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="procedureName"
          label="工序名称"
          width="120px">

        </el-table-column>
        <el-table-column prop="subtotal"
                         label="设计工时成本"
                         width="80px">
        </el-table-column>
        <el-table-column prop="realSubtotal"
                         label="实际工时成本"
                         width="80px">
        </el-table-column>
        <el-table-column prop="moduleSubtotal"
                         label="设计物料成本(元)"   width="120px">
        </el-table-column>
        <el-table-column prop="realModuleSubtotal"
                         label="实际物料成本(元)"   width="120px">
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
      <el-col :span="8" :offset="10">
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
    <el-dialog :visible.sync="dialogTableVisible3">

      <h3 style="text-align: center;">工序物料单</h3>
      <el-row :gutter="20">
        <el-col :span="8">
          <span>派工单编号：</span>
          <span>{{manufacture.manufactureId}}</span>
        </el-col>
        <el-col :span="8">
          <span>工序名称：</span>
          <span>{{mProcedure.procedureName}}</span>
        </el-col>
      </el-row>
      <el-table :data="mProcedureModule">
        <el-table-column prop="detailsNumber"
                         width="40px" label="序号">
        </el-table-column>
        <el-table-column prop="productName" label="物料名称">
        </el-table-column>
        <el-table-column prop="productId" label="物料编号">
        </el-table-column>
        <el-table-column prop="productDescribe" label="描述">
        </el-table-column>
        <el-table-column prop="type" label="用途类型">
        </el-table-column>
        <el-table-column prop="amount" label="本工序数量">
        </el-table-column>
        <el-table-column  label="单位">
        </el-table-column>
        <el-table-column prop="costPrice" label="单价">
        </el-table-column>
        <el-table-column prop="subtotal" label="小计(元)">
        </el-table-column>
      </el-table>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: "viewManufacture2",
    props:['id'],
    data(){
      return{
        dialogTableVisible3:false,
        manufacture: {},
        details:[],
        procedureDetail:{},
        designProcedure:{},
        mProcedureModule:[],
        checkTime:'',
        checker:'',
        mProcedure:{}

      }
    },
    methods:{
      //确认
      confirm(){
        console.log(this.pcRadio)
        if(this.pcRadio=="通过"){
          this.manufacture.checkTag="1"
        }else{
          this.manufacture.checkTag="2"
        }
        this.manufacture.checkTime=this.checkTime;
        this.manufacture.checker=this.checker;
        //提交
        this.axios.put('http://127.0.0.1:1217/enxin/m-manufacture/upManufacture',this.manufacture,
          {headers:{'Content-Type':'application/json'}})
          .then((response)=>{
            if(response.data.success){
              this.$message({
                message: '变更成功',
                type: 'success'
              });
              this.$router.push('/pm/pwoc');
            }else{
              this.$message({
                message: '系统错误',
                type: 'error'
              });
            }
          })
      },
      //返回
      retu(){
        this.$router.push('/pm/pwoc');
      },
      //查看物料
      viewDesign(id){
        //根据id查询
        this.axios.get("http://localhost:1217/enxin/m-procedure-module/queryPMByPId?pId="+id)
          .then((response)=>{
            this.dialogTableVisible3=true;
            this.mProcedure=response.data.mProcedure;
            this.mProcedureModule=response.data.list;
          })
          .catch(function(error){
            console.log(error)
          })
      },
    },
    created(){

      //根据id查询工序详情
      this.axios.get('http://127.0.0.1:1217/enxin/m-procedure/queryProcedureByPId?pId='+this.id).then((response)=>{
        console.log(response.data)
        this.manufacture=response.data.mManufacture;
        this.details=response.data.list;
      })
    },
    beforeRouteEnter:(to,from,next)=>{
      next(vm => {
        Date.prototype.Format = function (fmt) { // author: meizz
          var o = {
            "M+": this.getMonth() + 1, // 月份
            "d+": this.getDate(), // 日
            "h+": this.getHours(), // 小时
            "m+": this.getMinutes(), // 分
            "s+": this.getSeconds(), // 秒
            "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
            "S": this.getMilliseconds() // 毫秒
          };
          if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
          for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
          return fmt;
        }
        vm.checkTime = new Date().Format("yyyy-MM-dd hh:mm:ss");

      });
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
</style>

