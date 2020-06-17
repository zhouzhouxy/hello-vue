<template>
    <div>
      <span>产品档案登记复核</span>
        <el-table :data="list"
        :header-cell-style="{background:'#409EFF',color:'#FFFFFF'}"
         :row-class-name="tableRowClassName"
        style="width:100%">
        <el-table-column
        prop="productId"
        label="产品编号"
        width="180"></el-table-column>
        <el-table-column prop="productName"
        label="产品名称"
        width="180">
        </el-table-column>
        <el-table-column prop="type"
        label="用途类型"
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
          <el-table-column prop="responsiblePerson"
                           label="产品经理"   width="180px">
          </el-table-column>
          <el-table-column label="复核">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row,list[scope.$index].id)" type="primary">复核</el-button>
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

      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
         :before-close="handleClose">
        <el-form ref="DFile" :inline="true"  :model="DFile" class="demo-form-inline">
          <div class="mainInfo">
            <span>主信息</span>
            <br>
            <el-form-item label="档案编号">
              <span>{{DFile.productId}}</span>
            </el-form-item>
            <br>
            <el-form-item label="产品名称">
              <el-input v-model="DFile.productName" placeholder="产品名称"></el-input>
            </el-form-item>
            <el-form-item label="制造商">
              <el-input v-model="DFile.factoryName" placeholder="制造商"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="一级分类">
              <el-select v-model="DFile.firstKindId"  placeholder="一级分类">
                <el-option v-for="(firstKindId,index) in L1" :label="firstKindId.kindName" :value="firstKindId.id"  :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="二级分类">
              <el-select v-model="DFile.secondKindId" placeholder="二级分类">
                <el-option v-for="secondKindId in L2" :label="secondKindId.kindName" :value="secondKindId.id" :key="secondKindId.id"> </el-option>
              </el-select>
            </el-form-item>
            <br>
            <el-form-item label="三级分类">
              <el-select v-model="DFile.thirdKindId" placeholder="三级分类">
                <el-option v-for="thirdKindId in L3" :label="thirdKindId.kindName" :value="thirdKindId.id" :key="thirdKindId.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="产品简称">
              <el-input v-model="DFile.productNick" placeholder="产品简称"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="用途类型">
              <el-select v-model="DFile.type" placeholder="用途类型">
                <el-option v-for="type in useType" :value="type" :key="type.id">{{type}}</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="档次级别">
              <el-select v-model="DFile.productClass" placeholder="档次级别">
                <el-option v-for="productClass in grade" :value="productClass" :key="productClass.id">{{productClass}}</el-option>
              </el-select>
            </el-form-item>
            <br>
            <el-form-item label="计量单位">
              <el-input v-model="DFile.personalUnit" placeholder="产品名称"></el-input>
            </el-form-item>
            <el-form-item label="计量值">
              <el-input v-model="DFile.personalValue" placeholder="计量值"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="市场单价">
              <el-input v-model="DFile.listPrice" placeholder="市场单价"></el-input>
            </el-form-item>
            <el-form-item label="计划成本单价">
              <el-input v-model="DFile.costPrice" placeholder="计划成本单价"></el-input>
            </el-form-item>
          </div>
          <div class="assistInfo">
            <p>辅助信息</p>
            <el-form-item label="保修期">
              <el-input v-model="DFile.warranty" placeholder="保修期"></el-input>
            </el-form-item>
            <el-form-item label="替代品名称">
              <el-input v-model="DFile.twinName" placeholder="替代品名称"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="替代者编号">
              <el-input v-model="DFile.twinId" placeholder="替代者编号"></el-input>
            </el-form-item>
            <el-form-item label="生命周期(年)">
              <el-input v-model="DFile.lifecycle" placeholder="生命周期"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="单位">
              <el-input v-model="DFile.amountUnit" placeholder="单位"></el-input>
            </el-form-item>
            <el-form-item label="产品经理">
              <el-input v-model="DFile.responsiblePerson" placeholder="产品经理"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="供应商集合">
              <el-input v-model="DFile.providerGroup" placeholder="供应商集合"></el-input>
            </el-form-item>
            <el-form-item label="产品描述">
              <el-input v-model="DFile.productDescribe" placeholder="产品描述"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="登记人">
              <el-input v-model="DFile.register"   placeholder="登记人"></el-input>
            </el-form-item>
            <el-form-item label="建档时间">
              <span>{{DFile.registerTime}}</span>
            </el-form-item>
          </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="updateDFile()">确 定</el-button>
  </span>
      </el-dialog>
    </div>

</template>

<script>
     export default {
        name: "productRegisterCheck",
      data(){
          return {
            L1:[],
            L2:[],
            L3:[],
            useType:[],
            grade:[],
            list:[],
            total:0,
            pageNum:1,
            pageSize:5,
            DFile: {
              id:'',
              productId:'',
              productName:'',
              factoryName:'',
              firstKindId:'',
              secondKindId:'',
              thirdKindId:'',
              productNick:'',
              type:'',
              productClass:'',
              personalUnit:'',
              personalValue:'',
              listPrice:'',
              costPrice:'',
              warranty:'',
              twinName:'',
              twinId:'',
              lifecycle:'',
              amountUnit:'',
              responsiblePerson:'',
              productDescribe:'',
              providerGroup:'',
              register:'' ,
              registerTime:''
            },
            dialogVisible: false
          }
      },
      methods:{
        tableRowClassName({row, rowIndex}) {
          if (rowIndex === 1) {
            return 'warning-row';
          } else if (rowIndex === 3) {
            return 'success-row';
          }
          return '';
        },
        //关闭模态框
        handleClose(){
          this.dialogVisible=false;
        },
        //点击审核，查询当前的编号的DFile
        handleEdit(v1,v2,v3){
          this.axios
            .get("http://localhost:1217/enxin/d-file/querySimple?id="+v3)
            .then(response=>{
              this.DFile=response.data;
              this.dialogVisible=true;
            })
            .catch(function(error){console.log(error)})
        },
        //切换页
        handleCurrentChange(val){
           // this.getTables();
          this.pageNum=val;
          this.axios
            .get("http://localhost:1217/enxin/d-file/queryCheckDFile"
              ,{params: {pageNum:this.pageNum,pageSize:this.pageSize}
              })
            .then(response =>{
              this.list=response.data.list;
              this.total=response.data.total;
            })
            .catch(function(error){
              //请求失败处理
              console.log(error)
            });
        },

        //审核通过
        updateDFile(){
          var that=this;
          this.axios
            .post("http://localhost:1217/enxin/d-file/passCheck",this.DFile,{
              headers: {
                'Content-Type': 'application/json'
              }
            }).then((response)=>{
            {
              if(response.data.success){
                this.$message({
                  message: response.data.message,
                  type: 'success'
                });
                this.loadTable();
                this.dialogVisible=false;
              }else{
                this.$message({
                  message: response.data.message,
                  type: 'error'
                });
              }
            }
          }).catch(error=>{
            this.loadTable();
          })
        },
        //getData()
        loadTable:function (){
          this.axios
            .get("http://localhost:1217/enxin/d-file/queryCheckDFile"
              ,{params: {pageNum:this.pageNum,pageSize:this.pageSize}
              })
            .then(response =>{
              this.list=response.data.list;
              this.total=response.data.total;
            })
            .catch(function(error){
              //请求失败处理
              console.log(error)
            });
        },
      },
      //加载页面之前初始化
      beforeRouteEnter:(to,from,next)=>{
          const that=this;
        next(vm => {
            console.log("页面初始化")
        })
      },
      //创建时
      created:function() {
        //查询所有复核的产品
        //根据父Id查询一级分类
        this.axios
          .get("http://localhost:1217/enxin/d-file/queryCheckDFile"
            , {
              params: {pageNum: 1, pageSize: 5}
            })
          .then(response => {
            this.list = response.data.list;
            this.total = response.data.total;
          })
          .catch(function (error) {
            //请求失败处理
            console.log(error)
          });


        //根据父Id查询一级分类
        this.axios
          .get("http://localhost:1217/enxin/d-config-file-kind/queryFileKindByPId?pid=0")
          .then(response => {
            this.L1 = response.data;
          })
          .catch(function (error) {
            //请求失败处理
            console.log(error)
          });
        //查询用途类型和档次
        this.axios
          .get("http://localhost:1217/publicChar/queryGradeAndUseType")
          .then(response => {
            this.useType = response.data.useType;
            this.grade = response.data.grade;
          })
          .catch(function (error) {
            console.log(error);
          })
      },
       computed:{
         firstKindId:function(){
           return this.DFile.firstKindId;
         },
         secondKindId:function(){
           return this.DFile.secondKindId;
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
         }
       }
    }
</script>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
