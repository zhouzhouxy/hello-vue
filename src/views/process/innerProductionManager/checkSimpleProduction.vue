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
        <el-table-column label="登记复核"   width="120px">
          <template slot-scope="scope">
            <el-link type="primary"v-if="scope.row.procedureFinishTag==1||scope.row.procedureFinishTag==2"
                     @click="viewDesign(scope.row)">复核</el-link>
            <el-button type="success" v-if="scope.row.procedureFinishTag==3" round>完成</el-button>
          </template>
        </el-table-column>
        <el-table-column width="120px" label="交接复核">
          <template slot-scope="scope">
               <el-button type="primary" round v-if="scope.row.procedureTransferTag==1" @click="showDialog(scope.row,scope.$index)">交接复核</el-button>
              <el-button type="success" v-if="scope.row.procedureTransferTag==2" round >完成</el-button>
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

      <h3 style="text-align: center;">生产登记单</h3>
      <el-row :gutter="20">
        <el-col :span="8">
          <span>派工单编号：</span>
          <span>{{manufacture.manufactureId}}</span>
        </el-col>
        <el-col :span="8" :offset="4">
          <span>工序名称：</span>
          <span>{{mProceduring.procedureName}}</span>
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
          <span>{{mProceduring.labourHourAmount}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3">
          <span>已用工时数</span>
        </el-col>
        <el-col :span="5">
          <span>{{data.realLabourHourAmount}}</span>
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
        <el-table-column prop="mProcedureModule.detailsNumber"
                         width="48px" label="序号">
        </el-table-column>
        <el-table-column prop="mProcedureModule.productName" label="物料名称">
        </el-table-column>
        <el-table-column prop="mProcedureModule.productId" label="物料编号">
        </el-table-column>
        <el-table-column prop="mProcedureModule.amount" label="设计数量">
        </el-table-column>
        <el-table-column prop="mProcedureModule.renewAmount" label="补充数量">
        </el-table-column>
        <el-table-column  label="已使用数量">
          <template slot-scope="scope">
            <span>{{scope.row.mProcedureModule.realAmount==null?0.0:scope.row.mProcedureModule.realAmount}}</span>
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
          <span>复核人</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="mProceduring.checker"></el-input>
        </el-col>
        <el-col :span="3" :offset="4">
          <span>复核时间</span>
        </el-col>
        <el-col :span="5">
          <span style="background-color: #C0C4CC">{{mProceduring.checkTime}}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :offset="20">
          <el-button type="primary" @click="confirm()">提交</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose" >
        <el-row :gutter="24" class="el-row">
            <el-col :span="12" class="leftCol">
                <span>本工序投产数量</span>
            </el-col>
            <el-col :span="12"  >
                <span>{{data.demandAmount}}</span>
            </el-col>
        </el-row>
      <el-row :gutter="24" class="el-row">
        <el-col :span="12" class="leftCol">
          <span>本工序合格品数量</span>
        </el-col>
        <el-col :span="12"  >
            <el-input v-model="data.realAmount"></el-input>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="handOverCheck()">确 定</el-button>
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
        dialogTableVisible3:false,
        manufacture: {},
        details:[],
        procedureDetail:{},
        designProcedure:{},
        mProcedureModule:[],
        checkTime:'',
        checker:'',
        mProcedure:{},
        mProceduring:{},
        data:{},
        index:-1,
      }
    },
    methods:{
      showDialog(data,index){
          this.index=index;
          this.data=data;
        console.log(data);
        //获取到下一个mProcedure
        //显示复核框
          this.dialogVisible=true;
      },
      //确定复核交接
      handOverCheck(){
        //发送到后台
        console.log(this.data);
        //判断是否有下一个工序
        let mprocedure =this.details[this.index+1];
        let nextId=null;
        console.log(mprocedure==null)
        if(mprocedure!=null){
            nextId=mprocedure.id;
        }
        //传递到后台进行修改
        var params={mProcedure:this.data,nextId:nextId};
        console.log(params);
        this.axios.put('http://127.0.0.1:1217/enxin/m-procedure/hand-over-check',
          params,
          {headers:{'Content-Type':'application/json'}})
          .then((response)=>{
               if (response.data.success) {
                this.$message({
                  message: '登记成功,请复核',
                  type: 'success'
                });
                //重新加载表格
                 this.loadTables();
              }else {
                 this.$message({
                   message: '操作失败,请检查',
                   type: 'error'
                 });
               }
         })

        this.dialogVisible = false;
        this.index=-1;
        this.data={};
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.data={}
            done();
          })
          .catch(_ => {});
      },
      //确认
      async confirm(){
        //判断本次数量加已使用数量是否大于数量
        for(let i=0;i<this.mProcedureModule.length;i++){
          let s=this.mProcedureModule[i]['mProcedureModule'];
          s.realAmount=s.realAmount==null?0:s.realAmount;
          s.renewAmount=s.renewAmount==null?0:s.renewAmount;
          // this.mProcedureModule[i].thisAmount= this.mProcedureModule[i].thisAmount.trim().size()==0?0: this.mProcedureModule[i].thisAmount;
          this.mProcedureModule[i].thisAmount= this.mProcedureModule[i].thisAmount==null?0: this.mProcedureModule[i].thisAmount;
          console.log(this.mProcedureModule[i].thisAmount);
          if(parseInt( this.mProcedureModule[i].thisAmount)+s.realAmount>s.amount+s.renewAmount){
            this.$message({
              message: '警告哦，物料登记数量有误，请返回确认。 ',
              type: 'warning'
            });
            return;
          }
        }
        //用户选择该工序是否已经完成 完成字段procedureFinishTag为2没完成为1

        var params={
        mProcedure:this.data,
        mProceduring:this.mProceduring,
        mProcedureModule:this.mProcedureModule};
         console.log(params);
        //将数据提交到后台数据中
          this.axios.put("http://127.0.0.1:1217/enxin/m-proceduring/check-proceduring-and-module"
          ,params,{headers:{'Content-Type':'application/json'}})
          .then((response)=>{
            console.log(response)
            if(response.data.success){
              this.$message({
                message: '登记成功,请复核',
                type: 'success'
              });
              this.dialogTableVisible3=false;
              this.loadTables();
            }else{
              this.$message({
                message: '登记失败,请重新检查',
                type: 'error'
              });
            }
          }).catch(function(error){
          console.log(error)
        })
      },
      //返回
      retu(){
        this.$router.push('/pm/pg');
      },
      //查看物料
      viewDesign(data){
        console.log(data)
        this.data=data;
        this.axios.post("http://localhost:1217/enxin/m-procedure-moduling/query-proceduring-and-moduling",data
          ,{headers:{'Content-Type':'application/json'}})
          .then((response)=>{
            console.log(response.data);

            this.dialogTableVisible3=true;
            this.mProceduring=response.data.mProceduring;
            this.mProcedureModule=response.data.mProcedureModule;
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
            this.mProceduring.checkTime= new Date().Format("yyyy-MM-dd hh:mm:ss");
            this.mProceduring.checker=this.$store.getters.getUser.username;
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
          //如果所有的都已经审核或者未开始返回审核页面
          let flag=true;
          for(let i=0;i<this.details.length;i++){
              let r=this.details[i];
              if(r.procedureFinishTag==1||r.procedureFinishTag==2 ||r.procedureTransferTag==1){
                flag=false;
              }
          }
          if(flag){
              //返回页面
              this.$router.push('/pm/pgc')
          }
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
  .leftCol{
    background-color: rgb(217, 236, 255);
    padding: 10px;
    text-align: center;
  }
</style>

