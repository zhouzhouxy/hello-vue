<template >
  <div class="cen">
    <el-row :gutter="24">
        <el-col :span="10" :offset="16">
            <el-button-group>
                <el-button type="primary" @click="dialogVisible=!dialogVisible" v-if="show">添加产品</el-button>
                <el-button type="danger" @click="remove()" v-if="show">删除产品</el-button>
                <el-button type="success" @click="preview()" v-if="show">预览</el-button>
                <el-button type="warning" v-if="!show" @click="shows()">返回</el-button>
                <el-button type="primary" v-if="!show" @click="commit()">确认</el-button>
            </el-button-group>
        </el-col>
    </el-row>
    <div class="order">
        <el-row :gutter="24">
            <h4 style="text-align: center">入库申请单</h4>
        </el-row>
        <el-row :gutter="24" class="header">
            <el-col :span="3">
              <span>入库人:</span>
            </el-col>
            <el-col :span="4">
              <el-input v-model="gather.storer"></el-input>
            </el-col>
          <el-col :span="3" :offset="5">
            <span>入库理由:</span>
          </el-col>
          <el-col :span="4">
            <el-select v-model="gather.reason" placeholder="入库理由">
              <el-option label="生产入库" value="1"></el-option>
              <el-option label="库存初始" value="2"></el-option>
              <el-option label="赠送" value="3"></el-option>
              <el-option label="内部归还" value="4"></el-option>
              <el-option label="其他归还" value="5"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-table :header-cell-style="tableHeaderStyle"
                      :data="realDetails" stripe
                      ref="multipleTable"
                      @selection-change="changeFun" >
              <el-table-column
                 label="点选"
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                 prop="productName"
                 label="产品名称">
              </el-table-column>
              <el-table-column
                prop="productId"
                 label="产品编号">
              </el-table-column>
              <el-table-column
                prop="productDescribe"
                 label="描述">
              </el-table-column>
              <el-table-column
                 label="数量">
                <template slot-scope="scope">
                  <el-input-number v-if="previews" size="mini" :min="1" v-model="scope.row.amount">
                  </el-input-number>
                  <span v-else>{{scope.row.amount}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="amountUnit"
                 label="单位">
              </el-table-column>
              <el-table-column
                prop="costPrice"
                label="成本单价（元）">
              </el-table-column>
              <el-table-column
                label="小计">
                <template slot-scope="scope">
                  <span v-if="previews"></span>
                  <span v-else>{{scope.row.subtotal}}</span>
                </template>
              </el-table-column>
            </el-table>
      <el-row :gutter="24">
      <el-col :span="3">
        <span>总计数:</span>
      </el-col>
      <el-col :span="4">
        <span v-if="previews"> </span>
        <span v-else>{{gather.amountSum}}</span>
      </el-col>
      <el-col :span="3" :offset="5">
        <span>总金额:</span>
      </el-col>
      <el-col :span="4">
        <span v-if="previews"> </span>
        <span v-else>{{gather.costPriceSum}}</span>
      </el-col>
    </el-row>
      <el-row :gutter="24">
        <el-col :span="3">
          <span>登记人:</span>
        </el-col>
        <el-col :span="4">
          <span>{{gather.register}}</span>
        </el-col>
        <el-col :span="3" :offset="5">
          <span>登记时间:</span>
        </el-col>
        <el-col :span="8">
          <span>{{gather.registerTime}}</span>
        </el-col>
      </el-row>
      <el-row :gutter="24">
          <el-col :span="2">
              <span >备注：</span>
          </el-col>
          <el-col :span="22">
              <textarea v-model="gather.remark" rows="4" cols="40"></textarea>
          </el-col>
      </el-row>
    </div>
    <!--查询diaglog-->
    <el-dialog
      title="查询"
      :visible.sync="dialogVisible">
      <el-row :gutter="20">
        <el-col :offset="8" :span="4">
          <el-button type="primary" @click="onSubmit">立即查询</el-button>
        </el-col>

      </el-row>
      <el-row :gutter="20" class="el-row" >
        <el-col :span="6" class="leftCol">
          <span>请选择产品I级分类</span>
        </el-col>
        <el-col :span="14">
          <el-select v-model="condition.firstKindId" placeholder="一级分类">
            <el-option v-for="firstKindId in L1" :label="firstKindId.kindName" :value="firstKindId.id"  :key="firstKindId.id"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="20"  >
        <el-col :span="6" class="leftCol">
          <span>请选择产品II级分类</span>
        </el-col>
        <el-col :span="14">
          <el-select v-model="condition.secondKindId" placeholder="二级分类">
            <el-option v-for="secondKindId in L2" :label="secondKindId.kindName" :value="secondKindId.id" :key="secondKindId.id"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="20"  >
        <el-col :span="6" class="leftCol">
          <span>请选择产品III级分类</span>
        </el-col>
        <el-col :span="14">
          <el-select v-model="condition.thirdKindId" placeholder="三级分类">
            <el-option v-for="thirdKindId in L3" :label="thirdKindId.kindName" :value="thirdKindId.id" :key="thirdKindId.id"></el-option>
          </el-select>
        </el-col>
      </el-row>
    </el-dialog>
    <!--显示产品diagLog-->
    <el-dialog
      title="复核条件的产品档案"
      :visible.sync="dialogVisible2">
        <el-table :data="dFiles" stripe>
          <el-table-column
            prop="productId"
            label="产品编号"
            width="180">

          </el-table-column>
          <el-table-column prop="productName"
                           label="产品名称"
                           width="80">
          </el-table-column>
          <el-table-column prop="type"
                           label="用途类型"
                           width="80px">
          </el-table-column>
          <el-table-column prop="type"
                           label="用途类型"
                           width="140px">
          </el-table-column>
          <el-table-column prop="amountUnit"
                           label="单位"
                           width="80px">
          </el-table-column>
          <el-table-column prop="realCostPrice"
                           label="单位"
                           width="140px">
          </el-table-column>
          <el-table-column  label="入库">
            <template slot-scope="scope">
                  <el-button @click="entry(scope.row)">入库</el-button>
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
        name: "entryRegister",
      data(){
          return{
              previews:true,
              L1:[],
              L2:[],
              L3:[],
              gather:{},
              tableHeaderStyle:{
              'background':'skyblue',
              'color':'#fff'
              },
              realDetails:[],
              allDetails:[],
              checkBoxData:[],
              condition:{
                pageNum:1,
                pageSize:5
              },
              dialogVisible:false,
              dialogVisible2:false,
              show:true,
              dFiles:[],
              total:0,
          }
      },
      methods:{

          //确认提交
          commit(){
            var params={sGather:this.gather,list:this.realDetails}
            console.log(params)
            //添加
            this.axios.put("http://127.0.0.1:1217/enxin/s-gather/add-s-gather",params,
              {headers:{'Content-Type':'application/json'}})
              .then((response)=>{
                console.log(response.data)
                if(response.data.success){
                  this.$notify({
                    title: '成功',
                    message: response.data.message,
                    type: 'success'
                  });
                  this.$router.push("/entry/erc");
                }else{
                  this.$notify({
                    title: '失败',
                    message: response.data.message,
                    type: 'error'
                  });
                }
              })
          },
          //返回
          shows(){
              this.show=true;
              this.previews=true;
          },
          //点击预览
        preview(){

          if(this.realDetails.length==0){
            this.$message({
              message: '你还没有选择产品',
              type: 'warning'
            });
          }else{
              this.show=false;
              var amountSum=0;  //总件数
              var costPriceSum=0;

              for(let i=0;i<this.realDetails.length;i++){
                  if(this.realDetails[i].amount==null){
                    this.realDetails[i].amount=1;
                  }

                this.realDetails[i]['subtotal']= this.realDetails[i]['amount']*this.realDetails[i]['costPrice'];
                 amountSum+=this.realDetails[i]['amount'];
                costPriceSum+=this.realDetails[i]['subtotal'];
              }
              this.previews=false;
              this.show=false;
              this.gather.amountSum=amountSum;
              this.gather.costPriceSum=costPriceSum;
          }
        },
          //点击入库
        entry(data){
            //先判断realDetails中是否包含该对象
            var flag=false;
            for(let i=0;i<this.realDetails.length;i++){
                if(this.realDetails[i]['id']==data.id){
                  this.$message({
                    message: '你已经入库了该产品',
                    type: 'warning'
                  });
                  flag=true;
                }
            }
            if(!flag){
                this.realDetails.push(data);
            }
        },
        //删除产品
        remove(){
            if(this.checkBoxData.length==0){
                this.$message({
                  message: '你还没有选择产品',
                  type: 'warning'
                });
            }else{
              for(let i=0;i<this.$refs.multipleTable.selection.length;i++){
                for(let j=0;j<this.realDetails.length;j++) {
                  if(this.$refs.multipleTable.selection[i]['id']==this.realDetails[j]['id']){
                    this.realDetails.splice(j,1)
                  }
                }
              }
              }
        },
        handleCurrentChange(val){
            this.condition.pageNum=val;
            this.loadTables();
        },
        changeFun(val){
          this.checkBoxData=val;
        },
        onSubmit(){
            this.loadTables();
            this.dialogVisible=false;
            this.dialogVisible2=true;
        },
        loadTables(){
          this.axios.post('http://localhost:1217/enxin/d-file/searchDFileByCondition',
            this.condition,{headers:{'Content-Type':'application/json'}})
            .then((response)=>{
              this.dFiles=response.data.list;
              this.total=response.data.total;
            })
        }
      },
      created(){
        this.gather.register=this.$store.getters.getUser.username;
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
        this.gather.registerTime = new Date().Format("yyyy-MM-dd hh:mm:ss");
        //根据父Id查询一级分类
        this.axios
          .get("http://localhost:1217/enxin/d-config-file-kind/queryFileKindByPId?pid=0")
          .then(response =>{
            this.L1=response.data;
          })
          .catch(function(error){
            //请求失败处理
            console.log(error)
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
.bg{
  background-color: #0a76a4;
}
.cen{
  width: 70%;
  margin: 0 auto;
}
.order{
  background-color: white;
  border: 1px solid black;
  box-shadow:0 0 10px #091e25;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}

.header  >>>  .el-input__inner{
  height: 25px !important;
  width: 85% !important;
  margin-left: -20px;
  border: none;
  border-bottom: 1px solid black;
}
</style>
