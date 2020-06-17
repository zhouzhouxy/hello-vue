<template>
  <div>
    <span>产品档案查询</span>

    <div v-show="see">
     <el-form ref="condition" :model="condition" label-width="80px">
      <el-form-item label="一级分类">
        <el-select v-model="condition.firstKindId" placeholder="一级分类">
          <el-option v-for="firstKindId in L1" :label="firstKindId.kindName" :value="firstKindId.id"  :key="firstKindId.kindName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select v-model="condition.secondKindId" placeholder="二级分类">
          <el-option v-for="secondKindId in L2" :label="secondKindId.kindName" :value="secondKindId.id" :key="secondKindId.id"></el-option>
        </el-select>
      </el-form-item>
      <br>
      <el-form-item label="三级分类">
        <el-select v-model="condition.thirdKindId" placeholder="三级分类">
          <el-option v-for="thirdKindId in L3" :label="thirdKindId.kindName" :value="thirdKindId.id" :key="thirdKindId.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用途类型">
        <el-select v-model="condition.type" placeholder="用途类型">
          <el-option v-for="type in useType" :value="type" :key="type.id">{{type}}</el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col :span="5">
            <el-date-picker type="date" v-model="condition.date1" placeholder="选择日期"  style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="5">
            <el-date-picker type="date" v-model="condition.date2" placeholder="选择时间" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button>取消</el-button>
        </el-form-item>

    </el-form>
    </div>
    <div v-show="!see">
      <el-table :data="list"
                :row-class-name="tableRowClassName"
                :header-cell-style="{background:'#409EFF',color:'#FFFFFF'}"
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
        <el-table-column label="查看">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row,list[scope.$index].id)" type="success">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        :page-size="10"
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="total">
      </el-pagination>

      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :row-class-name="tableRowClassName"
        :before-close="handleClose">
        <el-form ref="DFile" :inline="true"  :model="DFile" class="demo-form-inline">
          <div class="mainInfo">
            <span>主信息</span>
            <br>
            <el-form-item label="档案编号">
              <span class="showInfo">{{DFile.productId}}</span>
            </el-form-item>
            <br>
            <el-form-item label="产品名称">
              <span class="showInfo">{{DFile.productName}}</span>
            </el-form-item>
            <el-form-item label="制造商">
              <span class="showInfo">{{DFile.factoryName}}</span>
            </el-form-item>
            <br>
            <el-form-item label="一级分类">
              <span class="showInfo">{{DFile.firstKindName}}</span>
            </el-form-item>
            <el-form-item label="二级分类">
              <span class="showInfo">{{DFile.secondKindName}}</span>
            </el-form-item>
            <br>
            <el-form-item label="三级分类">
              <span class="showInfo">{{DFile.thirdKindName}}</span>
            </el-form-item>
            <el-form-item label="产品简称">
              <span class="showInfo">{{DFile.productNick}}</span>
            </el-form-item>
            <br>
            <el-form-item label="用途类型">
               <span class="showInfo">{{DFile.type}}</span>
            </el-form-item>
            <el-form-item label="档次级别">
                <span class="showInfo">{{DFile.productClass}}</span>
            </el-form-item>
            <br>
            <el-form-item label="计量单位" class="success-row">
              <span class="showInfo">{{DFile.personalUnit}}</span>
             </el-form-item>
            <el-form-item label="计量值">
              <span class="showInfo">{{DFile.personalValue}}</span>
            </el-form-item>
            <br>
            <el-form-item label="市场单价">
              <span class="showInfo">{{DFile.listPrice}}</span>
            </el-form-item>
            <el-form-item label="计划成本单价">
              <span class="showInfo"> {{DFile.costPrice}}</span>
            </el-form-item>
          </div>
          <div class="assistInfo">
            <p>辅助信息</p>
            <el-form-item label="保修期">
              <span class="showInfo">{{DFile.warranty}}</span>
             </el-form-item>
            <el-form-item label="替代品名称">
              <span class="showInfo">{{DFile.twinName}}</span>
             </el-form-item>
            <br>
            <el-form-item label="替代者编号">
              <span class="showInfo">{{DFile.twinId}}</span>
             </el-form-item>
            <el-form-item label="生命周期(年)">
              <span class="showInfo">{{DFile.lifecycle}}</span>
             </el-form-item>
            <br>
            <el-form-item label="单位">
              <span class="showInfo">{{DFile.amountUnit}}</span>
             </el-form-item>
            <el-form-item label="产品经理">
              <span class="showInfo">{{DFile.responsiblePerson}}</span>
             </el-form-item>
            <br>
            <el-form-item label="供应商集合">
              <span class="showInfo">{{DFile.providerGroup}}</span>
             </el-form-item>
            <el-form-item label="产品描述">
              <span class="showInfo">{{DFile.productDescribe}}</span>
             </el-form-item>
            <br>
            <el-form-item label="登记人">
              <span class="showInfo">{{DFile.register}}</span>
             </el-form-item>
            <el-form-item label="建档时间">
              <span class="showInfo">{{DFile.registerTime}}</span>
            </el-form-item>
          </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">返  回</el-button>
  </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
    export default {
        name: "conditionQuery",
      data(){
          return {
            see:true,
            dialogVisible:false,
            L1: [],
            L2: [],
            L3: [],
            list:[],
            useType: [],
            condition: {
              firstKindId: '',
              secondKindId: '',
              thirdKindId: '',
              deleteTag:'0',
              type: '',
              date1: '',
              date2: '',
              pageNum:1,
              pageSize:10
            },
            total:0,
            DFile: {
              id:'',
              firstKindName:'',
              secondKindName:'',
              thirdKindName:'',
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
          }
      },
      methods: {
        tableRowClassName({row, rowIndex}) {
          console.log(rowIndex%2==0)
          if (rowIndex === 1) {
            return 'warning-row';
          } else if (rowIndex === 3) {
            return 'success-row';
          }
          return '';
        },
        //点击审核，查询当前的编号的DFile
        handleEdit(v1, v2, v3) {
          this.axios
            .get("http://localhost:1217/enxin/d-file/querySimple?id=" + v3)
            .then(response => {
              this.DFile = response.data;
              this.dialogVisible = true;
            })
            .catch(function (error) {
              console.log(error)
            })
        },
        tableRowClassName({row, rowIndex}) {
          if (rowIndex === 1) {
            return 'warning-row';
          } else if (rowIndex === 3) {
            return 'success-row';
          }
          return '';
        },
        //关闭模态框
        handleClose() {
          this.dialogVisible = false;
        },
        //切换页
        handleCurrentChange(val) {
          // this.getTables();
          this.condition.pageNum = val;
          this.loadTables();
        },
        loadTables() {
          this.axios.post("http://localhost:1217/enxin/d-file/searchDFileByCondition",
          this.condition, {
            headers: {
              'Content-Type': 'application/json'
            }
          }).then((response) => {
            console.log(response.data)
            this.list = response.data.list;
            this.total = response.data.total;
            this.see = false;
          })
            .catch(function (error) {
            })
        },
        //查询
        onSubmit() {
          this.loadTables();
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
          });
        //查询用途类型和档次
        this.axios
          .get("http://localhost:1217/publicChar/queryGradeAndUseType")
          .then(response=>{
            this.useType=response.data.useType;
          })
          .catch(function(error){
            console.log(error);
          })
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
        }
      }
    }
</script>

<style scoped>
  .el-table .warning-row {
    background: oldlace;
  }
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  .el-table .success-row {
    background: #f0f9eb;
  }
  .showInfo{
    width: 40px;
    color: #67C23A;
  }
</style>
