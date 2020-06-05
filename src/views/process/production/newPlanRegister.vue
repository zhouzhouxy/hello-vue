<template>
    <div>
        <el-row :gutter="24">
          <el-col :span="10" :offset="14">
            <el-button-group>
              <el-button v-if="!vis" @click="addProductDialog" >添加产品</el-button>
              <el-button v-if="!vis" @click="delProduct()">删除产品</el-button>
              <el-button v-if="!vis" @click="preview()">预览</el-button>
              <el-button v-if="!vis">返回</el-button>
              <el-button v-if="vis" @click="vis=!vis">返回</el-button>
              <el-button v-if="vis" @click="confirm()">确定</el-button>
            </el-button-group>
          </el-col>
        </el-row>

        <div class="box">
          <h4 class="box-title">生产计划单</h4>
          <el-row :gutter="20">
              <el-col :span="6">
                生产理由：新发生
              </el-col>
              <el-col :span="3" :offset="6">
                供货时间：
              </el-col>
              <el-col :span="4">
                <el-date-picker class="dt" v-model="cartDate"></el-date-picker>
              </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="3">
                <span>登记人：</span>
            </el-col>
            <el-col :span="4">
              <el-input class="ei" v-model="$store.getters.getUser.username"></el-input>
            </el-col>
            <el-col :span="8" :offset="5">
               <span>登记时间：</span>
               <span>{{registerTime}}</span>
            </el-col>

          </el-row>
          <!--表格-->
          <el-table :data="fileList"
            stripe
            ref="multipleTable"
            @selection-change="changeFun"
            style="width:100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column label="产品名称"
                       prop="productName">
            </el-table-column>
            <el-table-column label="产品编号"
                             prop="productId">
            </el-table-column>
            <el-table-column label="描述"
                             prop="productDescribe">
            </el-table-column>
            <el-table-column label="数量" width="240px">
              <template slot-scope="scope">
                <el-input-number :min="1" v-model="scope.row.amount">
                </el-input-number>
              </template>
            </el-table-column>
            <el-table-column label="单位"
                             prop="amountUnit">
            </el-table-column>
            <el-table-column label="单价(元)"
                             prop="realCostPrice">
            </el-table-column>
            <el-table-column label="小计(元)" v-if="vis"
                             prop="subtotal">
            </el-table-column>
          </el-table>
          <span>备注：</span>
          <el-input label="备注：" v-model="mApply.remark" aria-placeholder="备注" type="textarea"></el-input>
        </div>
        <!--显示查询条件-->
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
      <el-button type="primary" @click="queryProduct()">确 定</el-button>
       </span>

      </el-dialog>

      <el-dialog
         title="提示"
         :visible.sync="dialogVisible2"
         width="60%"
         :before-close="handleClose">
         <el-table :data="products"
                   style="width:100%">
           <el-table-column
             prop="productId"
             label="产品编号"
             width="180">
           </el-table-column>
           <el-table-column prop="productName"
                            label="产品名称"
                            width="180">
           </el-table-column>
           <el-table-column prop="type"
                            label="用途类型"
                            width="180px">
           </el-table-column>
           <el-table-column prop="amountUnit"
                            label="单位"
                            width="180px">
           </el-table-column>
           <el-table-column prop="realCostPrice"
                            label="单价"   width="140px">
           </el-table-column>

           <el-table-column label="生产">
             <template slot-scope="scope">
               <el-button
                 size="mini"
                 @click="handleEdit(scope.row)">生产</el-button>
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
        name: "newPlanRegister",
        data(){
          return{
            vis:false,
            total:0,
            checkBoxData:'',
            dialogVisible:false,
            dialogVisible2:false,
            cartDate:'',
            registerTime:'',
            mApply:{},
            fileList:[],
            condition:{
              pageNum:1,
              pageSize:5
            },
            L1:[],
            L2:[],
            L3:[],
            products:[],
          }
        },
      methods:{
        confirm(){
            this.mApply.register=this.$store.getters.getUser.username;
            this.mApply.registerTime=this.registerTime;

            //删除一个json对象中的key
            /*
            for(let i=0;i<this.fileList.length;i++){
                delete(this.fileList[i]['subtotal'])
            }
            */
            console.log(this.mApply)
            console.log(this.fileList)
            var param={dto:this.fileList,mApply:this.mApply}
            this.axios.post("http://localhost:1217/enxin/m-apply/addApply",param,
              {headers:{'Content-Type':'application/json'}})
              .then((response)=>{
                console.log(response.data)
                if(response.data.success){
                  this.$notify({
                    title: '通知',
                    message: '设计成功',
                    type: 'success'
                  });
                  this.$router.push("/pm/ppc")
                }else{
                  this.$notify({
                    title: '通知',
                    message: '设计失败，请检查是否填写正确',
                    type: 'success'
                  });
                }
              })
              .catch(function(error){
                console.log(response.data)
              })
        },
        delProduct(){
          if(this.$refs.multipleTable.selection.length<=0){
            this.$notify({
              title: '警告',
              message: '请选择对应的物料',
              type: 'warning'
            });
            return ;
          }
          for(let i=0;i<this.$refs.multipleTable.selection.length;i++){
            for(let j=0;j<this.fileList.length;j++) {
              if(this.$refs.multipleTable.selection[i]['id']==this.fileList[j]['id']){
                this.fileList.splice(j,1)
              }
            }
          }
        },
          //切换页
        handleCurrentChange(val){
          this.condition.pageNum=val;
          this.loadTables();
        },
        //预览
        preview(){
          if(this.fileList.length==0){
            this.$message({
              message: '您还没有选择产品',
              type: 'warning'
            });
            return ;
          }
          for(let i=0;i<this.fileList.length;i++){
              if(this.fileList[i]['realCostPrice']==null){
                this.fileList[i]['realCostPrice']=0;
              }
            if(this.fileList[i]['amount']==null){
              this.fileList[i]['amount']=0;
            }
              this.fileList[i]['subtotal']=this.fileList[i]['realCostPrice']*this.fileList[i]['amount'];
          }
         this.vis=true;
        },
        handleEdit(data){
            //添加到显示表格中fileList
            //先判断fileList表中是否已经包含该数据
            let flag=false;
            for(let i=0;i<this.fileList.length;i++){
                if(this.fileList[i]['id']==data.id){
                  //表示该数据已经存在
                  flag=true;
                  this.$message({
                    message: '你选择的已经产品已经添加了',
                    type: 'warning'
                  });
                }
            }
            if(!flag){
              //表示不存在 则添加
              this.fileList.push(data)
            }
        },
        handleClose(){
          this.$confirm('确认关闭？')
            .then(_ => {
              this.dialogVisible=false;
              this.dialogVisible2=false;
              done();

            })
            .catch(_ => {});
        },
        changeFun(val){
          this.checkBoxData=val;
        },
        addProductDialog(){
            this.dialogVisible=true;
        },

        //查询表格
        loadTables(){
          this.axios.post("http://localhost:1217/enxin/d-file/queryProductByCondition",this.condition)
            .then((response)=> {
              this.total = response.data.total;
              this.products = response.data.list;
            })
        },
        queryProduct(){
            this.loadTables();
            //隐藏模态框
            this.dialogVisible=false;
            this.dialogVisible2=true;
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
  .box{
    width:1217px;
    margin:0px auto;
    border:1px solid #0c0c0c;
    padding: 35px;
    border-radius:5px;
    box-shadow:0 0 25px #091e25;
  }
  .box-title{
    text-align:center;
  }
  .dt{
    margin-left: -40px;
    margin-top: -15px;
  }
  .ei{

    margin-left: -40px;
    margin-top: -15px;
    border-bottom-color: white;
  }
</style>
