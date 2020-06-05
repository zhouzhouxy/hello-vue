<template>
  <div>
    <el-table :data="list"
              style="width:100%">
      <el-table-column
        prop="designId"
        label="设计单编号"
        width="220">
      </el-table-column>
      <el-table-column
        prop="productId"
        label="产品编号"
        width="180">
      </el-table-column>
      <el-table-column prop="productName"
                       label="产品名称"
                       width="180px">
      </el-table-column>
      <el-table-column prop="designer"
                       label="设计人"
                       width="180px">
      </el-table-column>
      <el-table-column prop="registerTime"
                       label="登记时间"   width="180px">
      </el-table-column>
      <el-table-column prop="costPriceSum"
                       label="工时总成本"   width="180px">
      </el-table-column>
      <el-table-column label="审核">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row,list[scope.$index].id)">审核</el-button>
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

    <!--  点击审核显示物料组成设计单-->
    <el-dialog title="生产工序设计单" width="1200px" :visible.sync="dialogFormVisible">
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
        <el-radio-group v-model="pcRadio">
          <el-radio  label="未通过" ch></el-radio>
          <el-radio label="通过"></el-radio>
        </el-radio-group>
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
        <el-col :span="6">
          <span>审核人</span>
          <span>{{designProcedure.checker}}</span>
        </el-col>
        <el-col :span="6" :offset="6">
          <span>审核时间</span>
          <span>{{checkTime}}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="2">
          <span>设计要求</span>
        </el-col>
        <el-col :span="8">
          <el-input type="textarea" v-model="designProcedure.procedureDescribe" rows="2"/>
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
    name: "processCheck",
    data() {
      return {
        pcRadio:'pass',
        checkTime:'',
        dialogFormVisible:false,
        list:[],
        pageNum:1,
        pageSize:5,
        total:0,
        details:[],
        dModule:{},
        designProcedure:{},
        checkParam:{}
      }
    },
    methods:{
      //确定
      passCheck(){
        console.log(this.pcRadio)
        if(this.pcRadio=="通过"){
          this.designProcedure.checkTag="1";
        }else{
          this.designProcedure.checkTag="2";
        }
        this.designProcedure.checkTime=this.checkTime;
        this.checkParam={designProcedure:this.designProcedure,list:this.details}
              console.log(this.checkParam)
              //提交审核
              this.axios.post("http://localhost:1217/enxin/m-design-procedure/passCheck",
                this.checkParam,
                {headers:{
                    'Content-Type': 'application/json'
                  }})
                .then((response)=>{
                  if(response.data.success){
                    this.$message({
                        message: '审核成功',
                        type: 'success'
                      },
                      //隐藏模态框，重新加载表格
                      this.dialogFormVisible=false
                    );
                  }else{
                    this.$message({
                      message: '审核失败',
                      type: 'error'
                    });
            }
            this.loadTable();
          }).catch(function(error){
          console.log(error)
        })
      },
      handleChange( data ) {
         data.subtotal=data.labourHourAmount*data.costPrice;
        // console.log(data)
        //修改总价
        var totalPrice=0;
        for(let i=0;i<this.details.length;i++){
          totalPrice+=this.details[i].subtotal;
        }
        this.designProcedure.costPriceSum=totalPrice;
      },
      //审核
      handleEdit(v1,v2,v3){
        this.axios.get("http://localhost:1217/enxin/m-design-procedure/queryProcedureById?id="+v3)
          .then((response)=>{
            this.details=response.data.list;
            this.designProcedure=response.data.designProcedure;
            this.dialogFormVisible=true;
            this.designProcedure.checker=this.$store.getters.getUser.username;
          })
      },
      handleCurrentChange(val){
        this.pageNum=val;
        this.loadTable();
      },
      loadTable:function (){
        this.axios.get('http://localhost:1217/enxin/m-design-procedure/checkModule',
          {params:{pageNum:this.pageNum,pageSize:this.pageSize}})
          .then((response)=>{
            this.list=response.data.list;
            this.total=response.data.total;  })
          .catch(function(error){
            console.log(error);
          })
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
        vm.checkTime = new Date().Format("yyyy-MM-dd hh:mm:ss");
        console.log(vm.checkTime)
      });
    },
    created(){
      this.loadTable();
    }
  }
</script>

<style scoped>

</style>

