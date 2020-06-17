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
                stripe
                ref="multipleTable"
                style="width:100%">
        <el-table-column
          prop="procedureName"
          label="工序名称"
          width="80">
        </el-table-column>
        <el-table-column
          prop="labourHourAmount"
          label="设计工时数"
          width="120px">
        </el-table-column>
        <el-table-column
          prop="realLabourHourAmount"
          label="实际工时数"
          width="120px">
        </el-table-column>

        <el-table-column prop="subtotal"
                         label="设计工时成本"
                         width="120px">
        </el-table-column>
        <el-table-column prop="realSubtotal"
                         label="实际工时成本"
                         width="120px">
        </el-table-column>
        <el-table-column prop="moduleSubtotal"
                         label="设计物料成本(元)"   width="160px">
        </el-table-column>
        <el-table-column prop="realModuleSubtotal"
                         label="实际物料成本(元)"   width="160px">
        </el-table-column>
        <el-table-column label="工序登记"   width="120px">
            <template slot-scope="scope">
                <el-button type="primary" plain v-if="scope.row.procedureFinishTag==0" @click="viewDesign(scope.row,scope.$index)">登记</el-button>
                <el-button type="info" plain v-else-if="scope.row.procedureFinishTag==1">等待复核</el-button>
                <el-button type="info" plain v-else-if="scope.row.procedureFinishTag==2">等待复核</el-button>
                <el-button type="success" v-else>完成</el-button>
            </template>
        </el-table-column>
        <el-table-column width="120px">
            <template slot-scope="scope">
               <div v-if="scope.row.procedureFinishTag==3">
                 <el-button type="primary" round v-if="scope.row.procedureTransferTag==0" @click="handWorkRegister(scope.row.id)">交接登记</el-button>
                 <el-button type="info" round v-else-if="scope.row.procedureTransferTag==1">等待复核</el-button>
                 <el-button type="success" round v-else>完成</el-button>
               </div>
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
        <span>实际物料总成本</span>
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
    <el-dialog :visible.sync="dialogTableVisible3" id="dialog">

      <h3 style="text-align: center;">工序物料单</h3>
      <el-row :gutter="20">
        <el-col :span="8">
          <span>派工单编号：</span>
          <span>{{manufacture.manufactureId}}</span>
        </el-col>
        <el-col :span="8" :offset="4">
          <span>工序名称：</span>
          <span>{{mProcedure.procedureName}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3">
            <span>负责人</span>
        </el-col>
        <el-col :span="5" >
            <el-input v-model="mProceduring.procedureResponsiblePerson"></el-input>
        </el-col>
        <el-col :span="8" :offset="4">
          <span>设计工时数：</span>
           <span>{{mProcedure.labourHourAmount}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3">
          <span>已用工时数</span>
        </el-col>
        <el-col :span="5">
          <span>{{mProcedure.realLabourHourAmount}}</span>
          <!--<el-input v-model="mProceduring.principal"></el-input>-->
        </el-col>
        <el-col :span="3" :offset="4">
          <span>本次工时数：</span>
        </el-col>
        <el-col :span="5" :offset="1">
          <el-input v-model="mProceduring.labourHourAmount"></el-input>
        </el-col>
      </el-row>
      <el-table
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        :data="mProcedureModule">
        <el-table-column prop="detailsNumber"
                         width="48px" label="序号">
        </el-table-column>
        <el-table-column prop="productName" label="物料名称">
        </el-table-column>
        <el-table-column prop="productId" label="物料编号">
        </el-table-column>
        <el-table-column prop="amount" label="设计数量">
        </el-table-column>
        <el-table-column prop="renewAmount" label="补充数量">
        </el-table-column>
        <el-table-column  label="已使用数量">
          <template slot-scope="scope">
              <span>{{scope.row.realAmount==null?0.0:scope.row.realAmount}}</span>
          </template>
         </el-table-column>
        <el-table-column  label="本次数量">
            <template slot-scope="scope">
                <el-input v-model="scope.row.thisAmount"></el-input>
            </template>
        </el-table-column>
      </el-table>
      <el-row :gutter="20">
          <el-col :span="3">
              <span>登记人</span>
          </el-col>
          <el-col :span="5">
            <el-input v-model="mProceduring.register"></el-input>
          </el-col>
        <el-col :span="3" :offset="4">
          <span>登记时间</span>
        </el-col>
        <el-col :span="5">
          <span style="background-color: #C0C4CC">{{mProceduring.registerTime}}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
          <el-col :offset="20">
              <el-button type="primary" @click="confirm()">提交</el-button>
          </el-col>
      </el-row>
    </el-dialog>
    <el-dialog
      title="生产管理-内部生产管理-生产登记"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
          <el-row :gutter="24">
              <el-col :span="12">
                  <span>请输入本工序合格品数量</span>
              </el-col>
              <el-col :span="12">
                  <el-input v-model="quliafyAmount"></el-input>
              </el-col>
          </el-row>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">返  回</el-button>
          <el-button type="primary" @click="handOver()">确 定</el-button>
      </span>
     </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "operationSimpleProduction",
    props:['id'],
    data(){
      return{
        quliafyAmount:0,
        dialogVisible: false,
        dialogTableVisible3:false,
        manufacture: {},
        details:[],
        procedureDetail:{},
        designProcedure:{},
        mProcedureModule:[],
        mProcedureModule2:[],
        checkTime:'',
        checker:'',
        data:{},
        index:0,
        mProcedure:{},
        mProceduring:{},
        mProcedureId:0,
      }
    },
    methods:{
      handWorkRegister(id){
        this.dialogVisible=true;
        this.mProcedureId=id;
      },
      //确认交接
      handOver(){
        //向后台发送请求
        this.axios.get('http://127.0.0.1:1217/enxin/m-procedure/hand-work',
          {params:{mProcedureId:this.mProcedureId,quliafyAmount:this.quliafyAmount}})
          .then((response)=>{
            console.log(response);
            if(response.data.success){
              this.$message({
                message: response.data.message,
                type: 'success'
              });
              this.loadTables();
            }else{
              this.$message({
                message: response.data.message,
                type: 'error'
              });
            }
        });
        this.dialogVisible=false;
        //重新加载表格
        this.loadTables();
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.quliafyAmount=0;
            done();
          })
          .catch(_ => {});
      },
      //确认
      async confirm(){
        if(this.mProceduring.labourHourAmount==null){
          this.$message({
            message: '请选择工时数',
            type: 'error'
          });
          return ;
        }
        //判断本次数量加已使用数量是否大于数量
        for(let i=0;i<this.mProcedureModule.length;i++){
            let s=this.mProcedureModule[i];
            s.realAmount=s.realAmount==null?0:s.realAmount;
            s.renewAmount=s.renewAmount==null?0:s.renewAmount;
            s.thisAmount=s.thisAmount==null?0:s.thisAmount;
           if(parseInt(s.thisAmount)+s.realAmount>s.amount+s.renewAmount){
            this.$message({
              message: '警告哦，物料登记数量有误，请返回确认。 ',
              type: 'warning'
            });
            return;
          }
        }
        //用户选择该工序是否已经完成 完成字段procedureFinishTag为2没完成为1
       await this.$confirm('本次登记成功，需要复核！您确认本工序完成了吗？', '提示', {
        confirmButtonText: '完成',
        cancelButtonText: '未完成',
        type: 'warning'
       }).then(() => {
        //判断前面的工序是否已经完成了
         if(this.index>0){
          let flag=false;
            //表示该工序已经完成
            if(this.details[this.index-1]['procedureFinishTag']==3
                  &&this.details[this.index-1]['procedureTransferTag']==2) {
                flag=true;
            }
          if(!flag){
            //表示上一个工序没有完成，弹出提示信息
            this.$message({
              message: '警告哦,上一个工序还没有完成',
              type: 'warning'
            });
            this.mProcedure.procedureFinishTag=1;
          }else{
            this.mProcedure.procedureFinishTag=2;
          }
        }else{
          this.mProcedure.procedureFinishTag=2;
        }
       }).catch(() => {
        this.mProcedure.procedureFinishTag=1;
       });
         var params={mProcedure:this.mProcedure,
                    mProceduring:this.mProceduring,
                    mProcedureModule:this.mProcedureModule};
        console.log(params)
        //将数据提交到后台数据中
       this.axios.put("http://127.0.0.1:1217/enxin/m-proceduring/add-proceduring-and-module"
          ,params,{headers:{'Content-Type':'application/json'}})
        .then((response)=>{
          console.log(response)
          if(response.data.success){
            this.$message({
              message: '登记成功,请复核',
              type: 'success'
            });
            this.mProceduring={};
            this.loadTables();
            this.dialogTableVisible3=false;
          }else{
            this.$message({
              message: '登记失败,请重新检查',
              type: 'error'
            });
          }
        }).catch((error)=>{
          console.log(error)
        })
      },
      //返回
      retu(){
        this.$router.push('/pm/pg');
      },
      //查看物料
      viewDesign(data,index){
        this.index=index;
        this.data=data;         //根据id查询
        this.axios.get("http://localhost:1217/enxin/m-procedure-module/queryPMByPId?pId="+data.id)
          .then((response)=>{
            this.dialogTableVisible3=true;
            this.mProcedure=response.data.mProcedure;
            this.mProcedureModule=response.data.list;
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
            this.mProceduring.registerTime= new Date().Format("yyyy-MM-dd hh:mm:ss");
            this.mProceduring.register=this.$store.getters.getUser.username;
          })
          .catch(function(error){
            console.log(error)
          })
      },
      loadTables(){
        //根据id查询工序详情
         this.axios.get('http://127.0.0.1:1217/enxin/m-procedure/queryProcedureByPId?pId='+this.id).then((response)=>{
          this.manufacture=response.data.mManufacture;
          this.details=response.data.list;
        })
      }
    },
    created(){
      this.loadTables();
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

  #dialog  >>>  .el-input__inner{
    border: none;
    border-bottom: 1px solid gray;
    /*margin-left: -40px;*/
    height: 25px !important;
    width: 85% !important;
    background-color: lightgoldenrodyellow;
  }
</style>

