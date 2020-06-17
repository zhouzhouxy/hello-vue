<template>
  <div>
    <el-row :gutter="20" class="group">
          <el-col :span="8" :offset="12">
              <el-button-group>
                  <el-button  type="primary" @click="dialogVisible2=true" v-show="!vis">   <i class="el-icon-plus"></i></el-button>
                  <el-button  type="danger" @click="delProcedure"  v-show="!vis"><i class="el-icon-delete"></i></el-button>
                  <el-button type="success" @click="preview">
                    <i v-if="!vis" class="el-icon-search"></i>
                    <i v-else class="el-icon-back"></i></el-button>
                  <el-button type="primary" @click="commit" v-show="vis">确认</el-button>
                  <el-button type="success" @click="back()">
                    <i  class="el-icon-back"></i>
                  </el-button>
              </el-button-group>
          </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-form ref="DFile" :model="DFile" label-width="80px"   class="login-box">
        <h4 class="login-title">生产工序设计单</h4>
        <div>
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

          <el-col :span="3" :offset="1">
            <span>设计人</span>
          </el-col>
          <el-col :span="4" class="inp">
            <el-input  type="text" v-model="designer" />
          </el-col>
        </div>
        <el-table :data="list"
                  :header-cell-style="{background:'#409EFF',color:'#FFFFFF'}"
                  stripe
                  ref="multipleTable"
                  @selection-change="changeFun"
                  style="width:100%">
          <el-table-column
            type="selection"
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

          <el-table-column
            label="工时数"   width="160px">
            <template slot-scope="scope">
              <el-input-number  v-if="!vis"  size="mini" :min="1" v-model="scope.row.labourHourAmount"
                               @change="changeInput(scope.row)">
              </el-input-number>
              <span v-else>{{scope.row.labourHourAmount}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="amountUnit"
                           label="工价单位"   width="80px">
            <template slot-scope="scope">
                 <el-input v-model="scope.row.amountUnit" size="mini"></el-input>
            </template>
          </el-table-column>
          <el-table-column
                           label="单位工时成本小计(元)"   width="160px">
            <template slot-scope="scope">
              <el-input v-if="!vis" v-model="scope.row.costPrice" size="mini"></el-input>
              <span v-else>{{scope.row.costPrice}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="subtotal"
                           label="小计(元)" v-if="vis"   width="80px">
          </el-table-column>
        </el-table>
        <el-form-item label="登记人">
          <el-col :span="4" class="inp">
            <el-input type="text"  v-model="DFile.register" />
          </el-col>
        </el-form-item>
        <span>登记时间：</span>
        <span>{{registerTime}}</span>
        <br>
        <el-form-item label="设计要求">
          <el-col :span="8">
            <el-input type="textarea" v-model="procedureDescribe" :rows="2" ></el-input>
          </el-col>
        </el-form-item>
      </el-form>
    </el-row>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible2"
      width="60%"
      :before-close="handleClose">
      <el-table :data="processList"
                :header-cell-style="{background:'#409EFF',color:'#FFFFFF'}"
                style="width:100%">
        <el-table-column
          prop="procedureId"
          label="工序编号"
          width="180">
        </el-table-column>
        <el-table-column prop="procedureName"
                         label="工序名称"
                         width="180">
        </el-table-column>
        <el-table-column prop="procedureDescribe"
                         label="工序描述"
                         width="180px">
        </el-table-column>
        <el-table-column label="添加">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">添加</el-button>
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
    name: "addProcessDesign",
    props:['id'],

    data(){
      return{
        designer:'',
        registerTime:'',
        procedureDescribe:'',
        vis:false,
        list:[],
        checkBoxData:[],
        total:0,
        L1:[],
        L2:[],
        L3:[],
        pageNum:1,
        pageSize:5,
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
        designProcedure:{},
        condition: {
          firstKindId: '',
          secondKindId: '',
          thirdKindId: '',
        },
        dialogVisible: false,
        dialogVisible2:false,
        processList:[
          {"procedureId":"01","procedureName":"组装","procedureDescribe":""},
          {"procedureId":"02","procedureName":"测试","procedureDescribe":""},
          {"procedureId":"03","procedureName":"包装","procedureDescribe":""}
        ],
        commitParam:{}
      }
    },
    methods:{
      //返回
      back(){
          this.$router.push('/process/mpd')
      },
      //预览
      preview(){
          if(this.list.length==0){
            if(this.$refs.multipleTable.selection.length<=0){
              this.$notify({
                title: '警告',
                message: '请选择工序',
                type: 'warning'
              });
              return ;
            }
          }
          for(let i=0;i<this.list.length;i++){
              if(this.list[i]['labourHourAmount']==null){
                this.list[i]['labourHourAmount']=0;
              }
            if(this.list[i]['costPrice']==null){
              this.list[i]['costPrice']=0;
            }
             //计算工时成本小计
             this.list[i]['subtotal']=this.list[i]['labourHourAmount']*this.list[i]['costPrice'];
            //显示总成本
            this.vis=!this.vis;
          }
      },
      changeInput(data){
        //this.list[v1].subtotal=v2.amount*v2.costPrice;
        // data.value = this.input_number_value;
        //this.numChange( data );
        data.subtotal=data.amount*data.costPrice;
      },
      //确认提交
      commit(){
        if(this.list.length==0){
          if(this.$refs.multipleTable.selection.length<=0){
            this.$notify({
              title: '警告',
              message: '请选择工序',
              type: 'warning'
            });
            return ;
          }
        }
        var cps=0;
        for(let i=0;i<this.list.length;i++){
            cps+=this.list[i]['subtotal'];
        }
        this.designProcedure=
          {firstKindId:this.DFile.firstKindId,
           firstKindName:this.DFile.firstKindName,
           secondKindId:this.DFile.secondKindId,
           secondKindName: this.DFile.secondKindName,
            thirdKindId:this.DFile.thirdKindId,
            thirdKindName: this.DFile.thirdKindName,
            productId:this.DFile.productId,
            productName:this.DFile.productName,
            procedureDescribe:this.procedureDescribe,
            costPriceSum:cps,
            designer:this.designer,
            register:this.DFile.register,
            registerTime:this.registerTime,
            checkTag:"0",
            changeTag:"0",
            designModuleTag:"0",
           designModuleChangeTag:"0"
          }
        var that=this;
        this.commitParam={designProcedure:this.designProcedure,list:this.list}

        this.axios.post("http://localhost:1217/enxin/m-design-procedure/addProcedure",
          this.commitParam, {
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
      delProcedure(){
        if(this.$refs.multipleTable.selection.length<=0){
          this.$notify({
            title: '警告',
            message: '请选择对应的工序',
            type: 'warning'
          });
          return ;
        }
        for(let i=0;i<this.$refs.multipleTable.selection.length;i++){
          for(let j=0;j<this.list.length;j++) {
            if(this.$refs.multipleTable.selection[i]['procedureId']==this.list[j]['procedureId']){
             this.list.splice(j,1)
            }
          }
        }
      },
      //切换页面
      handleCurrentChange(val){this.pageNum=val},
      //添加
      handleEdit(data){
        var repeat=false;
        for(var j=0;j<this.list.length;j++){
          if(data['procedureId']==this.list[j]['procedureId']){
            repeat=true;
            this.$notify({
              title: '警告',
              message: '你已经添加了该工序',
              type: 'warning'
            });
          }
        }
        if(!repeat){
          this.list.push(data)
        }
      },
      //关闭模态框
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
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
      this.registerTime = new Date().Format("yyyy-MM-dd hh:mm:ss");
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
  .group{
    margin:10px auto;
  }
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
    width: 85% !important;
    background-color: lightgoldenrodyellow;
  }
</style>

