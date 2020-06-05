<template>
    <div class="box">
      <el-row :gutter="20">
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
                  <el-button v-if="scope.row.designModuleTag==0" @click="queryMaterial(scope.row.id)">设计</el-button>
                  <el-button v-if="scope.row.designModuleTag==1"  @click="viewDesign(scope.row.id)">重新设计</el-button>
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
          <span>{{designProcedure.checkTime}}</span>
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

      <el-dialog title="工序物料设计单"
                 :visible.sync="dialogTableVisible"
                 :before-close="handleClose"
                 width="1200px">

        <el-button-group>
            <el-button @click="preview(pId)">预览</el-button>
            <el-button @click="rt1()">返回</el-button>
        </el-button-group>
        <el-table :data="cpmaterials" >
          <el-table-column property="detailsNumber" label="序号" width="50"></el-table-column>
          <el-table-column property="productName" label="物料名称" width="80"></el-table-column>
          <el-table-column property="productId" label="物料编号" width="180"></el-table-column>
          <el-table-column property="productDescribe" label="描述" width="100"></el-table-column>
          <el-table-column property="amount" label="设计数量" width="80"></el-table-column>
          <el-table-column property="residualAmount" label="可用数量"></el-table-column>
          <el-table-column property="amountUnit" label="单位"></el-table-column>
          <el-table-column property="costPrice" label="单价(元)"></el-table-column>
          <el-table-column label="本工序数量" width="150">
              <template slot-scope="scope">
                <el-input-number size="mini" :max="scope.row.residualAmount" :min="0"  v-model="scope.row.pamount">
                </el-input-number>
              </template>
          </el-table-column>
        </el-table>
      </el-dialog>
      <el-dialog title="工序物料设计单"
                 :visible.sync="dialogTableVisible2"
                 :before-close="handleClose"
                 width="1200px">

        <el-button-group>
          <el-button @click="rt2()">返回</el-button>
          <el-button @click="commit(pId)">确认</el-button>
        </el-button-group>
        <el-table :data="procedureModule" >
          <el-table-column property="detailsNumber" label="序号" width="50"></el-table-column>
          <el-table-column property="productName" label="物料名称" width="80"></el-table-column>
          <el-table-column property="productId" label="物料编号" width="180"></el-table-column>
          <el-table-column property="productDescribe" label="描述" width="100"></el-table-column>
          <el-table-column label="本工序数量" prop="amount" width="150">
          </el-table-column>
          <el-table-column property="amountUnit" label="单位"></el-table-column>
          <el-table-column property="costPrice" label="单价(元)"></el-table-column>
          <el-table-column property="subtotal" label="小计(元)"></el-table-column>

        </el-table>
      </el-dialog>
      <el-dialog :visible.sync="dialogTableVisible3">
        <el-row :gutter="20">
          <span style="color: red">重新设计将首先清除原有本工序物料的设计，您确认进行重新设计吗？</span>
          <el-button-group>
              <el-button @click="confirmDel()">确认</el-button>
              <el-button @click="rt3()">返回</el-button>
          </el-button-group>
        </el-row>
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
      name: "addProcessMaterials",
      props:['id'],
      data(){
          return{
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
        //返回页面
        retu(){
          this.$router.push("/pm/mpm")
        },
        confirm(){
            //判断是否都已经设计了
            for(let i=0;i<this.details.length;i++){
                if(this.details[i]['designModuleTag']==0){
                  this.$message({
                    message: '警告哦，对不起，尚有工序未完成物料设计，需要继续进行设计，请返回！',
                    type: 'warning'
                  });
                  return;
                }

            }
            //先判断剩余物料是否都用完了
            this.axios.
            get("http://localhost:1217/enxin/d-module-details/queryMaterialByProductId?productId="+this.designProcedure.productId)
              .then((response)=>{
                  //循环判断是否可用数量为0
                  var j=0;
                  for(let i=0;i<response.data.length;i++){
                      j+=j+response.data[i]['residualAmount'];
                  }
                  if(j>0){
                    this.$alert('对不起，尚有可用物料，请您仔细检查工序物料设计，请返回！', '提示', {
                      confirmButtonText: '确定',
                      callback: action => {
                        this.$message({
                          type: 'info',
                          message: `action: ${ action }`
                        });
                      }
                    });
                  }else{
                    //提交
                    this.axios.post("http://127.0.0.1:1217/enxin/m-design-procedure/upProcedure",
                      this.designProcedure,
                      {headers:{'Content-Type':'application/json'}}
                    ).then((response)=>{
                      console.log(response)
                      if(response.data.success){
                        this.$message({
                          message: '提交成功',
                          type: 'success'
                        });
                        this.$router.push("/pm/mpm");
                      }
                    })
                  }
              })

        },
        rt3(){
          //
          this.procedureModule=[],
          this.dialogTableVisible3=false;
          this.loadTable();
        },
        rt2(){
          this.procedureModule=[],
          this.dialogTableVisible2=false;
          this.loadTable();
        },
        rt1(){
          this.procedureModule=[],
            this.dialogTableVisible=false;
            this.loadTable();
        },
        //确认重新设计
        confirmDel(){
            this.axios.get("http://localhost:1217/enxin/m-design-procedure-details/confirmDel?id="+this.pId)
              .then((response)=>{
                    if(response.data.success){
                      //隐藏
                      this.dialogTableVisible3=false;
                      this.queryMaterialsByPId(this.pId);
                      //显示
                      this.dialogTableVisible=true;

                    }else{
                      this.$message.error('系统错误，操作失败');
                    }
              })
        },
        //点击重新设计 查询当前工序的工序物料
        viewDesign(id){
                this.pId=id;
              //根据id查询
              this.axios.get("http://localhost:1217/enxin/m-design-procedure-details/queryProcedureDetails?pId="+id)
                .then((response)=>{
                    this.dialogTableVisible3=true;
                    console.log(response)
                     this.procedureDetail=response.data.details;
                     this.procedureDetailModule=response.data.list;
                })
                .catch(function(error){
                  console.log(error)
                })

        },
        //关闭的时候要处理当前的Pid
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              this.procedureModule=[],
                //重新加载表格
                this.loadTable();
              done();
            })
            .catch(_ => {});
        },
        //如果点击确认表示该工序物料设计未已设计  designModuleTag=1
        commit(pId){
           var params={id:pId,list:this.procedureModule,productId:this.designProcedure.productId};
           console.log(params)
          //传一个工序的设计编号和该工序需要的物料数组
          this.axios.post("http://localhost:1217/enxin/m-design-procedure-details/upProcedure",
            params,
            {headers:{
                'Content-Type': 'application/json'
              }}
          )
            .then((response)=>{
                console.log(response)
              if(response.data.success){
                //清空当前的procedureModule
                this.procedureModule=[];
                //重新加载表
                this.loadTable();
                this.dialogTableVisible2=false;
                this.$message({
                  message: '确认成功',
                  type: 'success'
                });
              }else{
                this.$message.error('系统错误，操作失败');
              }
            })
        },
        //根据工序查询对应的物料
        queryMaterialsByPId(pId){
          this.axios.get("http://localhost:1217/enxin/d-module-details/queryMaterialByPId",
            {params:{productId:this.designProcedure.productId,pageNum:1,pageSize:5}})
            .then((response)=>{
              if(!response.data.aBoolean){
                this.$alert('物料组成设计尚未完成，不能进行工序物料设计', '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    this.$message({
                      type: 'info',
                      message: `action: ${ action }`
                    });
                  }
                });
                return;
              }
              this.materials=response.data.list;
              this.cpmaterials=this.materials
              this.dialogTableVisible=true;
              this.pId=pId;
            })
            .catch(function(error){
              console.log(error)
            })
        },
        //点击预览
        preview(pId){
       for(let i=0;i<this.cpmaterials.length;i++){
              //如果没有选择工序数量则移除
              if(this.cpmaterials[i]['pamount']==null||this.cpmaterials[i]['pamount']==0){
                  //this.cpmaterials.splice(this.cpmaterials[i],1)
              }else{
                //否则添加到procedureModule中去显示
                  this.procedureModule.push({
                    parentId:pId,
                    detailsNumber:i+1,
                    productId:this.cpmaterials[i]['productId'],
                    productName:this.cpmaterials[i]['productName'],
                    type:this.cpmaterials[i]['type'],
                    amount:this.cpmaterials[i]['pamount'],
                    productDescribe:this.cpmaterials[i]['productDescribe'],
                    amountUnit:this.cpmaterials[i]['amountUnit'],
                    costPrice:this.cpmaterials[i]['costPrice'],
                    subtotal:this.cpmaterials[i]['costPrice']*this.cpmaterials[i]['pamount']
                  })
              }
          }
            this.dialogTableVisible=false;
            this.dialogTableVisible2=true;
        },
        //查询该产品拥有物料
        queryMaterial(pId){
          this.queryMaterialsByPId(pId)
        },
        //加载表格
        loadTable(){
          this.axios.get("http://localhost:1217/enxin/m-design-procedure/queryProcedureById?id="+this.id)
            .then((response)=>{
              this.details=response.data.list;
              this.designProcedure=response.data.designProcedure;
              var s=0;
              for(let i=0;i<this.details.length;i++){
                  if(this.details[i]['moduleSubtotal']==null||this.details[i]['moduleSubtotal']==0){

                  }else{
                    this.designProcedure.moduleCostPriceSum+=this.details[i]['moduleSubtotal'];
                  }
              }
            })
        }
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
