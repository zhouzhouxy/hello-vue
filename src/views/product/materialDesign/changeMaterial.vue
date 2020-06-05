<template>
    <div class="change-box">
      <el-row :gutter="20">
          <el-col :span="8" :offset="12">
            <el-button-group>
              <el-button  @click="addMaterial()" >
                 添加物料
              </el-button>
              <el-button  @click="commit()" >
                重新提交
              </el-button>
              <el-button>
                <router-link to="/product/dc">返回</router-link>
              </el-button>
            </el-button-group>
          </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <span>设计单编号:</span>
          <span>{{dModule.designId}}</span>
        </el-col>
        <el-col :span="2" :offset="3">设计人
        </el-col>
        <el-col :span="3" >
          <el-input v-model="dModule.designer"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <span>产品名称:</span>
          <span>{{dModule.productName}}</span>
        </el-col>
        <el-col :span="8" :offset="3">
          <span>产品编号:</span>
          <span>{{dModule.productId}}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-table :data="details"
                  style="width:100%">
          <el-table-column
            prop="detailsNumber"
            label="序号"
            width="20">
          </el-table-column>
          <el-table-column
            prop="productName"
            label="物料名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="productId"
            label="物料编号"
            width="180px">
          </el-table-column>
          <el-table-column prop="type"
                           label="用途类型"
                           width="180px">
          </el-table-column>
          <el-table-column prop="productDescribe"
                           label="描述"   width="100px">
          </el-table-column>
          <el-table-column label="数量" width="180">
            <template slot-scope="scope">
              <el-input-number size="mini" :min="1" v-model="scope.row.amount"
                               @change="handleChange( scope.row )">
              </el-input-number>
            </template>
          </el-table-column>
          <el-table-column prop="amountUnit"
                           label="单位"   width="50px">
          </el-table-column>
          <el-table-column prop="costPrice"
                           label="单价"   width="50px">
          </el-table-column>
          <el-table-column prop="subtotal"
                           label="小计"   width="80px">
          </el-table-column>
          <el-table-column
            label="删除"   width="80px">
            <template slot-scope="scope">
              <el-button @click="del(scope.$index)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <span>物料总成本</span>
          <span>{{dModule.costPriceSum}}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <span>变更人</span>
          <span>{{dModule.changer}}</span>
        </el-col>
        <el-col :span="6" :offset="6">
          <span>审核时间</span>
          <span>{{dModule.changeTime}}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="2">
          <span>设计要求</span>
        </el-col>
        <el-col :span="8">
          <el-input type="textarea" v-model="dModule.moduleDescribe" rows="2"/>
        </el-col>
      </el-row>
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
          <el-table-column prop="amountUnit"
                           label="计划成本单价"   width="180px">
          </el-table-column>

          <el-table-column label="添加">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row,materials[scope.$index].id)">添加</el-button>
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
        name: "changeMaterial",
        props:['id'],
        data(){
            return{
              L1:[],
              L2:[],
              L3:[],
              goodsList:[],
              condition:{
                pageNum:1,
                pageSize:5
              },
              material:{},
              list:[],
              total:0,
              dialogVisible: false,
              dialogVisible2:false,
              details:[],
              dModule:{},
              materials:{},
              changeTime:'',
              changeParam:{}
            }
        },
        methods:{
          //重新提交
          commit(){
            //判断是否选中物料
            if(this.details.length==0){
              this.$notify.error({
                  title: '错误',
                  message:"请选择物料",
                  type:'error'
              });
            }
            var that=this;
            this.changeParam={dModule:this.dModule,details:this.details}
            this.axios.post("http://localhost:1217/enxin/d-module/changeDesign",this.changeParam, {
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
          //添加
          handleEdit(v1,v2,v3){
            var repeat=false;
             for(var j=0;j<this.details.length;j++){
              if(this.materials[v1]['productId']==this.details[j]['productId']){
                repeat=true;
                this.$message({
                  showClose: true,
                  message: '不能重复添加哦',
                  type: 'warning'
                });
              }
            }
            if(!repeat){
              this.materials[v1].amount=1;
              this.materials[v1].subtotal=1*this.materials[v1].costPrice;
               this.details.push(
                {
                amount:this.materials[v1]['amount'],
                amountUnit:this.materials[v1]['amountUnit'],
                costPrice:this.materials[v1]['costPrice'],
                productDescribe:this.materials[v1]['productDescribe'],
                productId:this.materials[v1]['productId'],
                productName:this.materials[v1]['productName'],
                residualAmount:this.materials[v1]['residualAmount'],
                subtotal:this.materials[v1]['subtotal'],
                type:this.materials[v1]['type']},

              )
              var subTotal=0;
              //重新计算价格  循环details
              for(let i=0;i<this.details.length;i++){
                subTotal+=this.details[i]['subtotal']
              }
              //重新复制
              this.dModule.costPriceSum=subTotal;
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
          handleCurrentChange(val){
            this.condition.pageNum=val;
            this.loadTables();
          },
          //删除
          del(index){
            this.details.splice(index,1);

            var subTotal=0;
            //重新计算价格  循环details
            for(let i=0;i<this.details.length;i++){
              subTotal+=this.details[i]['subtotal']
            }
            //重新复制
            this.dModule.costPriceSum=subTotal;
          },
          //改变数量
          handleChange( data ) {
            data.value = this.input_number_value;
            //this.numChange( data );
            data.subtotal=data.amount*data.costPrice;

            //修改总价
            var totalPrice=0;
            for(let i=0;i<this.details.length;i++){
              totalPrice+=this.details[i].subtotal;
            }
            this.dModule.costPriceSum=totalPrice;
          },
          //加载表格
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
          //根据条件查询物料
          queryMaterial(){
            this.loadTables();
          },
        },
        created(){
          //跳转页面
          // 根据id查询设计单
          this.axios.get("http://localhost:1217/enxin/d-module/queryDesignById?id="+this.id)
          .then((response)=>{
            this.details=response.data.details;
            console.log(this.details)
            this.dModule=response.data.dModule;
            this.dModule.changer=this.$store.getters.getUser.username;
            this.dModule.changeTime=this.changeTime;
          })
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
          vm.changeTime = new Date().Format("yyyy-MM-dd hh:mm:ss");
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
  .change-box{
    width:1200px;
    margin:10px auto;
    border:1px solid #0c0c0c;
    padding: 35px;
    border-radius:5px;
    box-shadow:0 0 10px #0c0c0c;
  }
</style>
