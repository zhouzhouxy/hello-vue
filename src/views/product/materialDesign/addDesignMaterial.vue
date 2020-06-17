<template>
  <div>
     <el-form ref="DFile" :model="DFile" label-width="80px"   class="login-box">
    <h4 class="login-title">物料组成设计单</h4>
    <el-row :gutter="24">
        <el-col :span="10" :offset="16">
          <el-button-group>
            <el-button
              type="primary"
              v-if="!vis"
              @click="addMaterial()">
              <i class="el-icon-plus"></i>
            </el-button>
            <el-button
              type="danger"
              v-if="!vis"
              @click="delMaterial()">
              <i class="el-icon-delete"></i>
            </el-button>
            <el-button
              type="success"
              @click="viewTable()">
              <i v-if="!vis" class="el-icon-search"></i>
              <i v-else class="el-icon-back"></i>
            </el-button>
            <el-button
              type="primary"
              v-if="vis"
              @click="commit()"
            >
              确认
            </el-button>
          </el-button-group>
        </el-col>
    </el-row>


     <el-row :gutter="20">
      <el-col :span="8">
        <span class="t1">产品名称</span>
        <span class="t1">{{DFile.productName}}</span>
      </el-col>
      <el-col :span="10" :offset="4">
        <span class="t1">产品编号</span>
        <span class="t1">{{DFile.productId}}</span>
      </el-col>
    </el-row>
<el-row :gutter="24">
  <el-col :span="3">
    <span style="margin-left: 18px">设计人</span>
  </el-col>
  <el-col :span="4" class="inp">
    <el-input type="text" v-model="designer" />
  </el-col>
</el-row>

     <el-table :data="list"
              stripe
              ref="multipleTable"
              :header-cell-style="{background:'#409EFF',color:'#FFFFFF'}"
              @selection-change="changeFun" >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="productId"
        label="产品编号"
        width="180px">
      </el-table-column>
      <el-table-column prop="productName"
                       label="物料名称"
                       width="80px">
      </el-table-column>
      <el-table-column prop="type"
                       label="用途类型"
                       width="80px">
      </el-table-column>
      <el-table-column prop="productDescribe"
                       label="描述"   width="90px">
      </el-table-column>
      <el-table-column label="数量"
                       width="160px">
        <template slot-scope="scope">
          <el-input-number size="mini" v-if="!vis" :min="1" v-model="scope.row.amount"
                           @change="changeInput(scope.row)">
          </el-input-number>
          <span v-if="vis">{{scope.row.amount}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="amountUnit"
                       label="单位"   width="80px">
      </el-table-column>
      <el-table-column prop="costPrice"
                       label="单价(元)"   width="80px">
      </el-table-column>
      <el-table-column prop="subtotal"
                       label="小计(元)" v-if="vis"   width="80px">
      </el-table-column>
    </el-table>
    <el-form-item label="登记人">
      <el-col :span="2" class="inp">
        <el-input type="text"  v-model="DFile.register" />
      </el-col>
    </el-form-item>
    <span>登记时间：</span>
    <span>{{registerTime}}</span>
    <br>
    <el-form-item label="设计要求">
      <el-col :span="8" >
        <el-input type="textarea" v-model="moduleDescribe" :rows="2" ></el-input>
      </el-col>
    </el-form-item>
  </el-form>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
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
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="queryMaterial">确 定</el-button>
       </span>

    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible2"
      width="60%"
      :before-close="handleClose">
      <el-table :data="materials"
                style="width:100%">
        <el-table-column
          prop="productId"
          label="产品编号"
          width="180">
        </el-table-column>
        <el-table-column prop="productName"
                         label="物料名称"
                         width="180">
        </el-table-column>
        <el-table-column prop="type"
                         label="用途类型"
                         width="180px">
        </el-table-column>
        <el-table-column prop="productDescribe"
                         label="物料描述"
                         width="180px">
        </el-table-column>
        <el-table-column prop="realCostPrice"
                         label="计划成本单价"   width="180px">
        </el-table-column>

        <el-table-column label="添加">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              @click="handleEdit(scope.$index, scope.row,materials[scope.$index].id)"><i class="el-icon-plus"></i></el-button>
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
    </el-dialog>
  </div>
</template>

<script>
    export default {
      name: "addDesignMaterial",
      props:['id'],

      data(){
          return{
            designer:'',
            registerTime:'',
            moduleDescribe:'',
            vis:false,
            list:[],
            checkBoxData:[],
            materials:[],
            total:0,
            L1:[],
            L2:[],
            L3:[],
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
            condition: {
              firstKindId: '',
              secondKindId: '',
              thirdKindId: '',
              pageNum:1,
              pageSize:5,
            },
            dialogVisible: false,
            dialogVisible2:false
          }
      },


      methods:{
        changeInput(data){
          //this.list[v1].subtotal=v2.amount*v2.costPrice;
         // data.value = this.input_number_value;
          //this.numChange( data );
          data.subtotal=data.amount*data.costPrice;
        },
        //确认提交
        commit(){
            // console.log(this.DFile+"--->"+this.list)
          this.DFile.registerTime2=this.registerTime;
          this.DFile.designer=this.designer;
          this.DFile.moduleDescribe=this.moduleDescribe;
          this.list.push(this.DFile);
          var that=this;
          console.log(this.list)
          this.axios.post("http://localhost:1217/enxin/d-module-details/addMaterialDesign",
            this.list, {
            headers: {
              'Content-Type': 'application/json'
            }
          }).then((response) => {
              if(response.data.success){
                this.$notify({
                  title: '成功',
                  message: response.data.message,
                  type: 'success'
                });
                //跳转页面
                that.$router.push("/Main")
              }
              else{
                this.list=[];
                this.$notify.error({
                  title: '错误',
                  message: response.data.message,
                  type:'error'
                });

              }
          })
        },
        changeFun(val){
          this.checkBoxData=val;
        },
        //删除物料
        delMaterial(){
          if(this.$refs.multipleTable.selection.length<=0){
            this.$notify({
              title: '警告',
              message: '请选择对应的物料',
              type: 'warning'
            });
            return ;
          }
           for(let i=0;i<this.$refs.multipleTable.selection.length;i++){
               for(let j=0;j<this.list.length;j++) {
                 if(this.$refs.multipleTable.selection[i]['id']==this.list[j]['id']){
                  this.list.splice(j,1)
                }
              }
          }
        },
        //切换页面
        handleCurrentChange(val){
          this.condition.pageNum=val;
          this.loadTables();
        },
        //添加
        handleEdit(v1,v2,v3){
             var repeat=false;
             for(var j=0;j<this.list.length;j++){
                if(this.materials[v1]['id']==this.list[j]['id']){
                  repeat=true;
                }
             }
             if(!repeat){
               this.materials[v1].amount=1;
               this.materials[v1].subtotal=1*this.materials[v1].costPrice;
               this.list.push(this.materials[v1])
             }
         },
        //点击添加物料显示条件查询物料
        addMaterial(){
           this.dialogVisible=true;
        },
        //关闭模态框
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },
        //根据条件查询物料
        queryMaterial(){
         this.loadTables();
        },
        loadTables(){
          this.axios
            .post('http://localhost:1217/enxin/d-file/queryMaterial', this.condition, {
              headers: {
                'Content-Type': 'application/json'
              }
            }).then((response) => {
            this.materials = response.data.list;
            this.total = response.data.total;
            this.dialogVisible = false;
            this.dialogVisible2=true;
          })
            .catch(function (error) {
            })
        },
        viewTable(){
            if(this.list.length==0){
              this.$notify({
                title: '警告',
                message: '你没有选择物料',
                type: 'warning'
              });
              return;
            }
            this.vis=!this.vis;
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
          vm.registerTime = new Date().Format("yyyy-MM-dd hh:mm:ss");
        });
      },
      created(){
        this.axios
          .get("http://localhost:1217/enxin/d-file/querySimple?id="+this.id)
          .then(response=>{
            this.DFile=response.data;
          })
          .catch(function(error){console.log(error)}),
          //根据父Id查询一级分类
          this.axios
            .get("http://localhost:1217/enxin/d-config-file-kind/queryFileKindByPId?pid=0")
            .then(response =>{
              this.L1=response.data;
            })
            .catch(function(error){
              //请求失败处理
              console.log(error)
            });
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
  .login-box{
    width:800px;
    margin:10px auto;
    border:1px solid #0c0c0c;
    padding: 35px;
    border-radius:5px;
    box-shadow:0 0 10px #0c0c0c;
  }
  .login-title{
    text-align:center;
  }
  .t1{
    margin-left: 20px;
  }
  .inp >>>  .el-input__inner{
    border: none;
    border-bottom: 1px solid gray;
    /*margin-left: -40px;*/
    height: 25px !important;
    width: 100px !important;
    background-color: lightgoldenrodyellow;
  }
</style>
