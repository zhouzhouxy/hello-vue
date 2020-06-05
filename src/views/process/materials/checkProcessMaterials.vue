<template>
  <div class="box">
    <el-row :gutter="20">
      <el-col :span="4">
             <el-radio-group v-model="pcRadio">
              <el-radio  label="未通过" ch></el-radio>
              <el-radio label="通过"></el-radio>
           </el-radio-group>
      </el-col>
      <el-col :span="6" :offset="13">
        <el-button-group>
          <el-button @click="confirm()">确认</el-button>
          <el-button @click="retu()">返回</el-button>
        </el-button-group>
      </el-col>

    </el-row>
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

        <el-table-column prop="labourHourAmount"
                         label="工时数(小时)"   width="160px">
        </el-table-column>
        <el-table-column prop="costPrice"
                         label="工时成本小计(元)"   width="160px">
        </el-table-column>
        <el-table-column prop="moduleSubtotal"
                         label="物料成本小计"   width="120px">
        </el-table-column>
        <el-table-column label="设计"   width="120px">
          <template slot-scope="scope">
             <el-button v-if="scope.row.designModuleTag==1"  @click="viewDesign(scope.row.id)">审核</el-button>
          </template>
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
      <el-col :span="8" :offset="6">
        <span>审核时间</span>
        <span>{{checkTime}}</span>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="4">
        <span>设计要求</span>
      </el-col>
      <el-col :span="8">
        <el-input type="textarea" v-model="designProcedure.procedureDescribe" rows="2"/>
      </el-col>
    </el-row>

    <el-dialog :visible.sync="dialogTableVisible3">
       <h3 style="text-align: center;">工序物料设计单</h3>
      <el-row :gutter="20">
        <el-col :span="8">
          <span>设计单编号：</span>
          <span>{{designProcedure.designId}}</span>
        </el-col>
        <el-col :span="8">
          <span>工序名称：</span>
          <span>{{procedureDetail.procedureName}}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <span>登记人：</span>
          <span>{{designProcedure.checker}}</span>
        </el-col>
        <el-col :span="8">
          <span>登记时间：</span>
          <span>{{procedureDetail.registerTime}}</span>
        </el-col>
      </el-row>
      <el-table :data="procedureDetailModule">
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
        <el-table-column prop="amountUnit" label="单位">
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
    name: "checkProcessMaterials",
    props:['id'],
    data(){
      return{
        checkTime:'',
        pcRadio:"pass",
        details:[],
        designProcedure:{},
        materials:[],
        dialogTableVisible:false,
        dialogTableVisible2:false,
        dialogTableVisible3:false,
        cpmaterials:[],
        procedureModule:[],
        pId:'',
        procedureDetail:{},
        procedureDetailModule:[]
      }
    },
    methods:{
      //点击确认
      confirm(){
          if(this.pcRadio=="通过"){
              this.designProcedure.designModuleTag="2";
          }else{
            this.designProcedure.designModuleTag="9";
          }
          this.designProcedure.checkTime=this.checkTime;
          console.log(this.designProcedure)
          this.axios.post("http://localhost:1217/enxin/m-design-procedure/upProcedure2",this.designProcedure,
            {headers:{'Content-Type':'application/json'}})
            .then((response)=>{
              console.log(response)
              if(response.data.success){
                this.$message({
                    message: '审核成功',
                    type: 'success'
                  })
                this.$router.push("/pm/pmc")
              }else{
                this.$message({
                  message: '审核失败',
                  type: 'error'
                })
              }
            })
       },
      //返回页面
      retu(){
        this.$router.push("/pm/pmc")
      },


      //点击重新设计 查询当前工序的工序物料
      viewDesign(id){
        this.pId=id;
        //根据id查询
        this.axios.get("http://localhost:1217/enxin/m-design-procedure-details/queryProcedureDetails?pId="+id)
          .then((response)=>{
            this.dialogTableVisible3=true;
            this.procedureDetail=response.data.details;
            this.procedureDetailModule=response.data.list;
          })
          .catch(function(error){
            console.log(error)
          })

      },
      queryMaterial(pId){
        this.queryMaterialsByPId(pId)
      },
      //加载表格
      loadTable(){
        this.axios.get("http://localhost:1217/enxin/m-design-procedure/queryProcedureById?id="+this.id)
          .then((response)=>{
            this.details=response.data.list;
            this.designProcedure=response.data.designProcedure;
          })
      }
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
    created:function () {
      this.loadTable();
    }
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



