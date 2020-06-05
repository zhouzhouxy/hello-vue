<template>
    <div>
      <el-row :gutter="24" v-if="vis">
        <el-col :span="8" :offset="14">
            <el-button-group>
                <el-button @click="makeOrder()">生成设计单</el-button>
                <el-button @click="searchBox=!searchBox">搜索</el-button>
            </el-button-group>
        </el-col>
      </el-row>
      <el-row :gutter="24" v-if="vis">
        <el-col :span="18" :offset="3">
          <el-table :data="applyList"
                    row-key="id"
                    border fit highlight-current-row
                    @selection-change="changeFun"
                    ref="multipleTable"
                    style="width:100%">
            <el-table-column
              label="点选"
              type="selection"
              :reserve-selection="true"
              width="55">
            </el-table-column>
            <el-table-column label="计划单编号"
                             prop="applyId"
                            width="189x">
            </el-table-column>
            <el-table-column label="产品编号" width="185px"
                             prop="productId">
            </el-table-column>
            <el-table-column label="产品名称"
                             prop="productName">
            </el-table-column>
            <el-table-column label="描述" prop="productDescribe" >
            </el-table-column>
            <el-table-column label="数量"
                             prop="amount">
            </el-table-column>
            <el-table-column label="出库单编号集合">
            </el-table-column>
            <el-table-column label="审核时间"
                             prop="checkTime">
            </el-table-column>
          </el-table>
          <el-pagination
            background
            :page-size="5"
            @current-change="handleCurrentChange"
            layout="prev, pager, next"
            :total="total">
          </el-pagination>
        </el-col>

      </el-row>


      <div style="border: 1px solid black; text-align: center;width: 800px"  v-if="box2">

          <el-row :gutter="24">
            <el-col :span="6" :offset="8">
               <el-button-group>
                  <el-button @click="preview()">预览</el-button>
                  <el-button @click="ret2()">返回</el-button>
                </el-button-group>
            </el-col>
          </el-row>
          <el-row :gutter="24">
              <el-col :span="4"  class="leftCol">
                <span>工单制定人</span>
              </el-col>
              <el-col :span="6">
                <el-input v-model="manufacture.designer">
                </el-input>
              </el-col>
              <el-col :span="4" class="leftCol">
                <span>出库单编号集合</span>
              </el-col>
              <el-col :span="4">
                  <span></span>
              </el-col>
            </el-row>
          <el-row :gutter="24">
          <el-col :span="4" class="leftCol">
            <span>登记人</span>
          </el-col>
          <el-col :span="6">
            <el-input v-model="manufacture.register">
            </el-input>
          </el-col>
          <el-col :span="4" class="leftCol">
            <span>登记时间</span>
          </el-col>
          <el-col :span="8">
            <span>{{manufacture.registerTime}}</span>
          </el-col>
        </el-row>
          <el-row :gutter="24">
            <el-col :span="4" class="leftCol">
              <span>产品编号</span>
            </el-col>
            <el-col :span="6">
              <span>{{manufacture.productId}}</span>
            </el-col>
            <el-col :span="4" class="leftCol">
              <span>产品名称</span>
            </el-col>
            <el-col :span="4">
              <span>{{manufacture.productName}}</span>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="4" class="leftCol">
              <span>描述</span>
            </el-col>
            <el-col :span="6">
              <span>{{manufacture.productDescribe}}</span>
            </el-col>
            <el-col :span="4" :offset="6" class="leftCol">
              <span>数量</span>
            </el-col>
            <el-col :span="4">
              <span>{{manufacture.amount}}</span>
            </el-col>
          </el-row>
          <el-row :gutter="24">
              <el-col :span="4" class="leftCol">
                备注
              </el-col>
              <el-col :span="6">
                <el-input v-model="manufacture.remark" type="textarea"></el-input>
              </el-col>
          </el-row>
        </div>

    <!--生产派工单-->
      <div class="box" v-if="box3">
        <el-row :gutter="20">
          <el-col :span="6" :offset="13">
            <el-button-group>
              <el-button @click="confirm()">提交</el-button>
              <el-button @click="retu()">返回</el-button>
            </el-button-group>
          </el-col>

        </el-row>
        <h4 style="text-align: center">生产派工单</h4>
        <el-row :gutter="20">
          <el-col :span="4">
            <span>工单制定人:</span>
          </el-col>
          <el-col :span="4">
            <el-input v-model="manufacture.designer">
            </el-input>
          </el-col>
          <el-col :span="4" :offset="3">出库单编号：
          </el-col>
          <el-col :span="3" >
            <span></span>
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
            <span>数量:</span>
            <span>{{manufacture.amount}}</span>
          </el-col>
          <el-col :span="8" :offset="3">
            <span>描述：:</span>
            <span>{{manufacture.productDescribe}}</span>
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
                <el-button  @click="viewDesign(scope.row.id)">查看物料</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <span>登记人</span>
            <span>{{manufacture.register}}</span>
          </el-col>
          <el-col :span="8" :offset="6">
            <span>登记时间</span>
            <span>{{manufacture.registerTime}}</span>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="2">
            <span>备注</span>
          </el-col>
          <el-col :span="8">
            <el-input type="textarea" v-model="manufacture.remark" rows="2"/>
          </el-col>
        </el-row>
        <el-dialog :visible.sync="dialogTableVisible3">

          <h3 style="text-align: center;">工序物料单</h3>
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
      <el-dialog :visible.sync="searchBox">

          <el-row :gutter="20">
            <el-col :offset="8" :span="4">
              <el-button type="primary" @click="onSubmit">立即查询</el-button>
            </el-col>

          </el-row>
          <el-row :gutter="20" class="el-row" >
            <el-col :span="6" class="leftCol">
              <span>计划单编号</span>
            </el-col>
            <el-col :span="4">
              <el-input v-model="condition.applyId">
              </el-input>
            </el-col>
          </el-row>
          <el-row :gutter="20"  >
            <el-col :span="6" class="leftCol">
              <span>请输入关键字</span>
            </el-col>
            <el-col :span="4">
              <el-input v-model="condition.keyword"></el-input>
            </el-col>
          </el-row>
          <el-row :gutter="20"  >
            <el-col :span="6" class="leftCol">
              <span>请输入审核时间</span>
            </el-col>
            <el-col :span="4">
              <el-date-picker type="date" placeholder="选择日期" v-model="condition.date1"></el-date-picker>
            </el-col>
            <el-col class="line" :span="1">-</el-col>
            <el-col :span="4">
              <el-date-picker type="date" placeholder="选择日期" v-model="condition.date2"></el-date-picker>
            </el-col>
          </el-row>
      </el-dialog>

    </div>
</template>

<script>
    import ElSlPanel from "element-ui/packages/color-picker/src/components/sv-panel";
    export default {
        name: "formulateProductionWorkOrder",
      components: {ElSlPanel},
      data(){
          return{
            searchBox:false,
            condition:{
              pageNum:1,
              pageSize:5
            },
            details:[],
            dialogTableVisible3:false,
            box3:false,
            box2:false,
            vis:true,
            dialogVisible:false,
            applyList:[],
            total:0,
            checkBoxData:'',
            pageNum: 1,
            pageSize: 5,
            manufacture:{},
            procedureDetail:{},
            designProcedure:{},
            procedureDetailModule:[],
          }
        },
        methods:{
          //搜索
          onSubmit(){
            this.axios.post("http://localhost:1217/enxin/m-apply/queryApplyByCondition2",
              this.condition,
              {headers:{'Content-Type':'application/json'}})
              .then((response)=>{
                this.applyList=response.data.list;
                this.total=response.data.total;
                this.searchBox=false;
              })
          },
          //查看物料
          viewDesign(id){
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
          //点击提交
          confirm() {
            console.log(this.manufacture)
            this.axios.put("http://127.0.0.1:1217/enxin/m-manufacture/addManufacture",
            this.manufacture,
              {headers:{'Content-Type':'application/json'}})
              .then((response)=>{
                  if(response.data.success){
                    this.$message({
                      message: response.data.message,
                      type: 'success'
                    });
                    //重新加载表格
                    this.loadTables();
                    //隐藏
                    this.box3=false;
                      this.vis=true;
                  }else{
                    this.$message({
                      message: response.data.message,
                      type: 'error'
                    });
                  }
              })
          },
          ret2(){
              this.box2=false;
              this.vis=true;
          },
          retu(){
                //隐藏
                this.box3=false;
                this.box2=true;
          },
          //预览
          preview(){
                //根据productId查询
                this.axios.get("http://127.0.0.1:1217/enxin/m-design-procedure/queryStateByPId?pId="+this.manufacture.productId)
                  .then((response)=>{
                      if(response.data.success){
                          //根据产品Id查询 产品工序细节
                        this.axios.get("http://localhost:1217/enxin/m-design-procedure/queryProcedureByPId?pId="+this.manufacture.productId)
                          .then((response)=>{
                            this.details=response.data.list;
                            this.designProcedure=response.data.designProcedure;
                            this.box2=false;
                            this.box3=true;
                          })
                       }else{
                        this.$message({
                          message: response.data.message,
                          type: 'warning'
                        });
                      }
                  })
          },

          handleClose(){

          },
          //判断选中的产品id是否一致
          makeOrder(){
              //是否选中
              if(this.checkBoxData.length==0){
                this.$message({
                  message: '你没有选择',
                  type: 'warning'
                });
                return
              }
              //选中的产品是否是同一个产品
              var s='';
              var amount=0;
                for(let i=0;i<this.checkBoxData.length;i++){
                  s=s+this.checkBoxData[i]['id']+',';
                  amount+=this.checkBoxData[i]['amount'];
                    for(let j=0;j<this.checkBoxData.length;j++){
                      if(this.checkBoxData[i]['productId']!=this.checkBoxData[j]['productId']){
                        this.$message({
                          message: '只能选择同一个产品',
                          type: 'warning'
                        });
                        return;
                      }
                    }
                }
              //跳转页面
              s=s.substr(0,s.length-1);
              this.manufacture.register=this.$store.getters.getUser.username;
              this.manufacture.productName=this.checkBoxData[0].productName;
              this.manufacture.productId=this.checkBoxData[0].productId;
              this.manufacture.amount=amount;
              this.manufacture.productDescribe=this.checkBoxData[0].productDescribe;
              this.manufacture.applyIdGroup=s;

              this.vis=false;
              this.box2=true;
          },
          //切换页
          handleCurrentChange(val){
            this.pageNum=val;
            this.loadTables();
          },
          //点击复选框
          changeFun(val){
            this.checkBoxData=val;
          },
          loadTables(){
            this.axios.get("http://127.0.0.1:1217/enxin/m-apply/queryAllByPassCheck",
              {params:{pageNum:this.pageNum,pageSize:this.pageSize}})
              .then((response)=>{
                this.applyList=response.data.list;
                this.total=response.data.total;
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
          vm.manufacture.registerTime = new Date().Format("yyyy-MM-dd hh:mm:ss");
        });
      },
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
  .box{
    width:1000px;
    margin:10px auto;
    border:1px solid #0c0c0c;
    padding: 35px;
    border-radius:5px;
    box-shadow:0 0 10px #0c0c0c;
  }
</style>
