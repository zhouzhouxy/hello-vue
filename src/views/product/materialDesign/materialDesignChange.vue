<template>
    <div>
      <div v-show="vis">
        <el-row :gutter="20">
          <el-col :offset="8" :span="4">
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
          </el-col>

        </el-row>
        <el-row :gutter="20" class="el-row" >
          <el-col :span="6" class="leftCol">
            <span>请选择商品I级分类</span>
          </el-col>
          <el-col :span="14">
            <el-select v-model="condition.firstKindId" placeholder="一级分类">
              <el-option v-for="firstKindId in L1" :label="firstKindId.kindName" :value="firstKindId.id"  :key="firstKindId.id"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="20"  >
          <el-col :span="6" class="leftCol">
            <span>请选择商品II级分类</span>
          </el-col>
          <el-col :span="14">
            <el-select v-model="condition.secondKindId" placeholder="二级分类">
              <el-option v-for="secondKindId in L2" :label="secondKindId.kindName" :value="secondKindId.id" :key="secondKindId.id"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="20"  >
          <el-col :span="6" class="leftCol">
            <span>请选择商品III级分类</span>
          </el-col>
          <el-col :span="14">
            <el-select v-model="condition.thirdKindId" placeholder="三级分类">
              <el-option v-for="thirdKindId in L3" :label="thirdKindId.kindName" :value="thirdKindId.id" :key="thirdKindId.id"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="20"  >
          <el-col :span="6" class="leftCol">
            <span>请选择商品</span>
          </el-col>
          <el-col :span="14">
            <el-select v-model="condition.goodsId" placeholder="商品">
              <el-option v-for="goods in goodsList" :label="goods.productName" :value="goods.id" :key="goods.id">{{goods.productName}}</el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="20"  >
          <el-col :span="6" class="leftCol">
            <span>请输入登记时间</span>
          </el-col>
          <el-col :span="4">
            <el-date-picker type="date" placeholder="选择日期" v-model="condition.date1"></el-date-picker>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="4">
            <el-date-picker type="date" placeholder="选择日期" v-model="condition.date2"></el-date-picker>
          </el-col>
        </el-row>
      </div>
      <div v-show="!vis">
        <el-table :data="list"
                  :header-cell-style="{background:'#409EFF',color:'#FFFFFF'}"
                  style="width:100%">
          <el-table-column
            prop="designId"
            label="设计单编号"
            width="200">
          </el-table-column>
          <el-table-column prop="productId"
                           label="产品编号"
                           width="180">
          </el-table-column>
          <el-table-column prop="productName"
                           label="产品名称"
                           width="180px">
          </el-table-column>
          <el-table-column label="设计人"
                           prop="designer"
                           width="180px">
          </el-table-column>
          <el-table-column label="登记时间"
                           prop="registerTime"
                           width="180px">
          </el-table-column>
          <el-table-column label="物料总成本"
                           prop="costPriceSum"
                           width="180px">
          </el-table-column>

          <el-table-column
            label="变更"   width="180px">
            <template slot-scope="scope">
              <router-link :to="{name:'ChangeMaterial',params:{id:list[scope.$index].id}}">变更</router-link>
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
      </div>
       <!--  点击审核显示物料组成设计单-->
      <el-dialog title="物料组成设计单" width="1200px" :visible.sync="dialogFormVisible">
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
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="passCheck">确定</el-button>
        </div>
      </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "materialDesignChange",
      data(){
          return{
            vis:true,
            changeTime:'',
            L1:[],
            L2:[],
            L3:[],
            goodsList:[],
            condition:{
              state:"1",
              pageNum:1,
              pageSize:5
            },
            material:{},
            list:[],
            total:0,
            dialogFormVisible:false,
            dialogVisible:false,
            details:[],
            dModule:{},
            materials:{}
          }
        },
      methods:{
          //根据条件查询物料
        queryMaterial(){
          this.axios
            .post('http://localhost:1217/enxin/d-file/queryMaterial', this.condition, {
              headers: {
                'Content-Type': 'application/json'
              }
            }).then((response) => {
            this.materials = response.data.list;
            this.total2 = response.data.total;
            this.dialogVisible = false;
            this.dialogVisible2=true;
          })
            .catch(function (error) {
            })
        },
        //查看设计单详情
        viewMaterial(id){
          //跳转页面
          // 根据id查询设计单
          this.axios.get("http://localhost:1217/enxin/d-module/queryDesignById?id="+id)
            .then((response)=>{
              this.details=response.data.details;
              this.dModule=response.data.dModule;
              this.dialogFormVisible=true;
              this.dModule.changer=this.$store.getters.getUser.username;
              this.dModule.changeTime=this.changeTime;
            })
        },
        //分页
        handleCurrentChange(val){
          this.condition.pageNum=val;
          this.loadTable();
        },
        //提交查询
        onSubmit(){
          console.log(this.condition)
          this.loadTable();
          this.vis=false;
        },
        //加载表格
        loadTable(){
          this.axios.post("http://localhost:1217/enxin/d-module/queryDesignByCondition",
            this.condition, {
              headers: {
                'Content-Type': 'application/json'
              }
            }).then((response) => {
            this.list = response.data.list;
            this.total = response.data.total;
            console.log(response.data)
          })
            .catch(function (error) {
            })
        },
        //改变数量
        handleChange( data ) {
          data.value = this.input_number_value;
          //this.numChange( data );
          data.subtotal=data.amount*data.costPrice;
          // console.log(data)
          //修改总价
          var totalPrice=0;
          for(let i=0;i<this.details.length;i++){
            totalPrice+=this.details[i].subtotal;
          }
          this.dModule.costPriceSum=totalPrice;
        },
        //确认变更
        passCheck(){

        },
        //删除
        del(index){
          this.details.splice(index,1);
        }
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
          }),
          //查询用途类型和档次
          this.axios
            .get("http://localhost:1217/publicChar/queryGradeAndUseType")
            .then(response=>{
              this.useType=response.data.useType;
              this.grade=response.data.grade;
            })
            .catch(function(error){
              console.log(error);
            }),
          //查询所有的商品
          this.axios.
          get("http://localhost:1217/enxin/d-file/queryAllGoods")
            .then((response)=>{
              // console.log(response)
              this.goodsList=response.data;
            })
            .catch(function(error){console.log(error)})
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
        },
      }
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
</style>
