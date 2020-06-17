<template>
  <div>
      <el-row :gutter="20">
            <el-col :span="8" :offset="8">
              <el-button @click="dialogVisible=true">添加新工序</el-button>
              <el-button @click="commit()">重新提交</el-button>
              <el-button @click="back()">
                返回
              </el-button>
            </el-col>
      </el-row>
      <div class="box">
          <h3 class="title">生产工序设计单</h3>
        <el-row :gutter="20">
          <el-col :span="8">
            <span>设计单编号:</span>
            <span>{{designProcedure.designId}}</span>
          </el-col>
          <el-col :span="2" :offset="3">设计人
          </el-col>
          <el-col :span="3" >
            <el-input v-model="designProcedure.designer"></el-input>
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

            <el-table-column
              label="工时数"   width="160px">
              <template slot-scope="scope">
                <el-input-number size="mini" :min="1" v-model="scope.row.labourHourAmount"
                                 @change="handleChange(scope.row)">
                </el-input-number>
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
                <el-input v-model="scope.row.costPrice" size="mini"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="subtotal"
                             label="小计(元)"   width="80px">
            </el-table-column>
          </el-table>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <span>工时总成本</span>
            <span>{{designProcedure.costPriceSum}}</span>
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
        <el-row :gutter="20">
          <el-col :span="6">
            <span>变更人</span>
            <span>{{designProcedure.changer}}</span>
          </el-col>
          <el-col :span="8" :offset="4">
            <span>变更时间</span>
            <span>{{changeTime}}</span>
          </el-col>
        </el-row>
      </div>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose">
      <el-table :data="processList"
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
        layout="prev, pager, next"
        :total="total">
      </el-pagination>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "changeProcedure",
        props:['id'],
        data(){
            return{
              total:0,
              dialogVisible:false,
              details:[],
              designProcedure:{},
              changeTime:'',
              processList:[
                {"procedureId":"01","procedureName":"组装","procedureDescribe":""},
                {"procedureId":"02","procedureName":"测试","procedureDescribe":""},
                {"procedureId":"03","procedureName":"包装","procedureDescribe":""}
              ],
            }
        },
      methods:{
          back(){
              this.$router.push("/process/proc")
          },
        handleClose(){
          this.dialogVisible=false;
        },
        //添加
        handleEdit(data){
          var repeat=false;
          for(var j=0;j<this.details.length;j++){
            if(data['procedureId']==this.details[j]['procedureId']){
              repeat=true;
              this.$notify({
                title: '警告',
                message: '你已经添加了该工序',
                type: 'warning'
              });
            }
          }
          if(!repeat){
            this.details.push(data)
          }

        },
        commit(){
          //重新提交
            this.designProcedure.changeTag="1";
            this.designProcedure.checkTag="0";
            this.checkParam={designProcedure:this.designProcedure,list:this.details}
            console.log(this.checkParam)
          var that=this;
            //提交审核
            this.axios.post("http://localhost:1217/enxin/m-design-procedure/passCheck",
              this.checkParam,
              {headers:{
                  'Content-Type': 'application/json'
                }})
              .then((response)=>{
                if(response.data.success){
                  this.$message({
                      message: '变更成功',
                      type: 'success'
                    },
                    //隐藏模态框，重新加载表格
                    that.$router.push("/Main")
                  );
                }else{
                  this.$message({
                    message: '审核失败',
                    type: 'error'
                  });
                }
              })
        },
        //改变
        handleChange( data ) {
          if(data.labourHourAmount==null){
              data.labourHourAmount=0;
          }
          if(data.costPrice==null){
            data.costPrice=0;
          }
          data.subtotal=data.labourHourAmount*data.costPrice;
          // console.log(data)
          //修改总价
          var totalPrice=0;
          for(let i=0;i<this.details.length;i++){
            if(this.details[i].subtotal==null){
                this.details[i].subtotal=0;
            }
            totalPrice+=this.details[i].subtotal;
          }
          this.designProcedure.costPriceSum=totalPrice;
        }
      },
       created:function(){

          console.log(this.$store.getters.getUser.username)
          this.axios.get("http://localhost:1217/enxin/m-design-procedure/queryProcedureById?id="+this.id)
            .then((response)=>{
              this.details=response.data.list;
              this.designProcedure=response.data.designProcedure;
              this.designProcedure.changer=this.$store.getters.getUser.username;
             })

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
    }
</script>

<style scoped>
  .box{
    width:800px;
    margin: auto;
    border:1px solid  #40D2FF;
    padding: 35px;
    border-radius:5px;
    box-shadow:0 0 25px #40D2FF;
  }
  .title{
    text-align:center;
  }
</style>
