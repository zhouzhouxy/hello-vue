<template>
  <div>
    <el-table :data="list"
              :header-cell-style="{background:'#409EFF',color:'#FFFFFF'}"
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
                       label="物料总成本"   width="180px">
      </el-table-column>
      <el-table-column label="审核">
        <template slot-scope="scope">
          <el-button
            type="primary" icon="el-icon-search"
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
    <el-dialog title="物料组成设计单" width="1200px" :visible.sync="dialogFormVisible"  center>
      <el-row :gutter="20">
          <el-col :span="5" :offset="18">
             <el-radio-group v-model="pcRadio">
              <el-radio :label="0">未通过</el-radio>
              <el-radio :label="1">通过</el-radio>
            </el-radio-group>
           </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <span>设计单编号:</span>
          <span class="yl">{{dModule.designId}}</span>
        </el-col>
        <el-col :span="2" :offset="4" >
          <span>设计人</span>
        </el-col>
        <el-col :span="3" class="inp">
            <el-input v-model="dModule.designer"></el-input>
         </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <span>产品名称:</span>
          <span class="yl"> {{dModule.productName}}</span>
        </el-col>
        <el-col :span="8" :offset="4">
          <span>产品编号:</span>
          <span class="yl">{{dModule.productId}}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-table :data="details"
                  :header-cell-style="{background:'#409EFF',color:'#FFFFFF'}"
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
        </el-table>
      </el-row>
      <el-row :gutter="20">
          <el-col :span="6">
            <span>物料总成本</span>
            <span class="yl">{{dModule.costPriceSum}}</span>
          </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <span>审核人</span>
          <span class="yl">{{dModule.checker}}</span>
        </el-col>
        <el-col :span="6" :offset="6">
          <span>审核时间</span>
          <span class="yl">{{dModule.registerTime}}</span>
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
        name: "makeMaterialDesignCheck",
        data() {
          return {
            pcRadio:0,
            dialogFormVisible:false,
             list:[],
             pageNum:1,
             pageSize:5,
             total:0,
             details:[],
             dModule:{},
             checkParam:{}
          }
        },
      methods:{
          //确定
        passCheck(){
          console.log(this.pcRadio)
          if(this.pcRadio==1){
            this.dModule.checkTag="1";
          }else{
            this.dModule.checkTag="2";
          }
          console.log(this.pcRadio)
          this.checkParam={dModule:this.dModule,details:this.details}
          console.log(this.checkParam)
          //提交审核
          this.axios.post("http://localhost:1217/enxin/d-module/passCheck",
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
        //审核
        handleEdit(v1,v2,v3){
            this.axios.get("http://localhost:1217/enxin/d-module/queryDesignById?id="+v3)
              .then((response)=>{
                  this.details=response.data.details;
                  this.dModule=response.data.dModule;
                  this.dialogFormVisible=true;
                  this.dModule.checker=this.$store.getters.getUser.username;
              })
        },
        handleCurrentChange(val){
           this.pageNum=val;
           this.loadTable();
        },
        loadTable:function (){
          this.axios.get('http://localhost:1217/enxin/d-module/checkModule',
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
          vm.dModule.registerTime = new Date().Format("yyyy-MM-dd hh:mm:ss");
        });
      },
      created(){
          this.loadTable();
      }
    }
</script>

<style scoped>
.yl{
  background-color: #ffffaa;
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
