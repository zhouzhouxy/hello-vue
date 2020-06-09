<template>
  <div class="cen">
    <el-row :gutter="24">
      <el-col :span="10" :offset="16">
        <el-button-group>
          <el-button @click="back()">返回</el-button>
        </el-button-group>
      </el-col>
    </el-row>
    <div class="order">
      <el-row :gutter="24">
        <h4 style="text-align: center">出库调度单</h4>
      </el-row>
      <el-row :gutter="24">
          <el-col :span="3">
              出库单编号：
          </el-col>
          <el-col :span="8">
              <span>{{sPay.payId}}</span>
          </el-col>
      </el-row>
      <el-row :gutter="24" class="header">
        <el-col :span="3">
          <span>出库理由:</span>
        </el-col>
        <el-col :span="4">
          <span v-if="sPay.reason==1">生产领料</span>
          <span v-else-if="sPay.reason==2">赠送</span>
          <span v-else-if="sPay.reason==3">内部借领</span>
          <span v-else>其它借领</span>
        </el-col>
        <el-col :span="3" :offset="5">
          <span>出库详细理由:</span>
        </el-col>
        <el-col :span="4">
          <span>{{sPay.reasonexact}}</span>

        </el-col>
      </el-row>
      <el-table :header-cell-style="tableHeaderStyle"
                :data="list" stripe  >
        <el-table-column label="序号">
          <template slot-scope="scope">
            <span>{{scope.$index+1}}</span>
          </template>
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
          prop="amount"
          label="应出库件数">
        </el-table-column>
        <el-table-column
          label="已出库件数">
          <template slot-scope="scope">
            <span v-if="scope.row.paidAmount!=null">{{scope.row.paidAmount}}</span>
            <span>0.0</span>
          </template>
        </el-table-column>
        <el-table-column
          label="存放地址集合">

        </el-table-column>
        <el-table-column
          label="调度">
            <template slot-scope="scope">
              <el-button type="primary" v-if="scope.row.payTag==1"
                         @click="dispatch(scope.row)">调度</el-button>
              <el-button type="success" v-else>完成</el-button>
            </template>
        </el-table-column>
      </el-table>
      <el-row :gutter="24">
        <el-col :span="3">
          <span>应出库总计数:</span>
        </el-col>
        <el-col :span="4">
          <span>{{sPay.amountSum}}</span>
        </el-col>
        <el-col :span="3" :offset="5">
          <span>已出库总件数:</span>
        </el-col>
        <el-col :span="4">
          <span>{{sPay.paidAmountSum==null?"0.00":sPay.paidAmountSum}}</span>
        </el-col>
      </el-row>
    </div>
    <el-dialog width="1200px" :visible.sync="dialogFormVisible">

      <div class="box">
        <h4 style="text-align: center">出库调度单</h4>
        <el-row :gutter="24">
          <el-col :span="12">
            <span>入库单编号:</span>
            <span>{{sPay.payId}}</span>
          </el-col>
          <el-col :span="12">
            <span>产品编号:</span>
            <span>{{sPayDetails.productId}}</span>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <span>产品名称:</span>
            <span>{{sPayDetails.productName}}</span>
          </el-col>
          <el-col :span="12">
            <span>成本单价:</span>
            <span>{{sPayDetails.costPrice}}</span>
          </el-col>
        </el-row>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="库号" prop="number"></el-table-column>
          <el-table-column label="库房名称" prop="name"></el-table-column>
          <el-table-column label="存储地址编号" prop="siteNumber"></el-table-column>
          <el-table-column label="存储地址名称" >
            <template slot-scope="scope">
              <span>{{sCell.firstKindName}}-{{sCell.secondKindName}}-{{sCell.thirdKindName}}</span>
            </template>
          </el-table-column>

          <el-table-column label="存储单元简称" >
            <template slot-scope="scope">
              <span></span>
            </template>
          </el-table-column>
          <el-table-column label="当前库存量" >
            <template slot-scope="scope">
              <span>{{sCell.amount==null?"0.0":sCell.amount}}</span>
            </template>
          </el-table-column>
          <el-table-column  label="本次出库数量">
            <template slot-scope="scope">
              <el-input v-model="outAmount"></el-input>
            </template>
          </el-table-column>
        </el-table>
        <el-row :gutter="24">
          <el-col :span="3">
            <span>应出库数</span>
          </el-col>
          <el-col :span="9">
            <span>{{sPayDetails.amount}}</span>
          </el-col>
          <el-col :span="3">
            <span>已出库数</span>
          </el-col>
          <el-col :span="9">
            {{sPayDetails.paidAmount==null?"0.0":sPayDetails.paidAmount}}
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="3">
            <span>登记人</span>
          </el-col>
          <el-col :span="9">
            <span>{{sPayDetails.storer}}</span>
          </el-col>
          <el-col :span="3">
            <span>登记时间</span>
          </el-col>
          <el-col :span="9">
              <span>{{sPayDetails.checkTime}}</span>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="commit()">提交</el-button>
        <el-button @click="dialogFormVisible = false">返回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "outDisPatcher",
    props:['id'],
    data(){
      return{
        outAmount:'',
        dialogFormVisible:false,
        sCell:{},
        sPay:{},
        list:[],
         sPayDetails:{},
        tableData:[{
          number:'1',
          name:'成品库',
          siteNumber:'01-01-01',
        }
        ],
        tableHeaderStyle:{
          'background':'skyblue',
          'color':'#fff'
        },
      }
    },
    methods:{
      commit(){
          if(this.outAmount!=this.sPayDetails.amount){
            this.$message({
              message: '出库数量有误，请重新确认。',
              type: 'warning'
            });
            return;
          }
          let amount=this.sCell.amount;
          if(amount==null){
              amount=0;
          }
          if(this.outAmount>amount){
            this.$message({
              message: '出库量大于可用库存,请先入库',
              type: 'warning'
            });
            return;
          }
          // console.log(this.outAmount+"--->"+this.sPayDetails.id+"--->"+this.sCell.id)
         this.axios.get("http://127.0.0.1:1217/enxin/s-cell/out-dispatcher",
            {params:{outAmount:this.outAmount,sdId:this.sPayDetails.id,sCellId:this.sCell.id}})
            .then((response)=>{
                if(response.data.success){
                  this.$notify({
                    title: '成功',
                    message: '提交成功',
                    type: 'success'
                  });
                  //重新加载表格
                  this.loadTables();

                  //隐藏模态框
                  this.dialogFormVisible=false;
                }else{
                  this.$notify({
                    title: '错误',
                    message: '提交失败',
                    type: 'error'
                  });
                }
            })
      },
      dispatch(data){
          //查询  判断该产品是否制定了安全库存配置单
          this.axios("http://127.0.0.1:1217/enxin/s-cell/query-s-cell-by-productId?productId="+data.productId)
            .then((response)=>{
                /* if(response.data.id==null){
                  this.$message({
                    message: '对不起，该产品尚未分配存储空间 ',
                    type: 'warning'
                  });
                  return;
                }
                this.gatherDetails=data;*/
                this.sPayDetails=data;
                this.dialogFormVisible=true;
                this.sCell=response.data;
            })

      },
      back(){
        this.$router.push('/oe/mos');
      },
      //加载表格
      loadTables(){
        this.axios.get("http://127.0.0.1:1217/enxin/s-pay-details/query-by-p-id?pId="+this.id)
          .then((response)=>{
            this.sPay=response.data.sPay;
            this.list=response.data.list;
            //循环判断是否所有的入库明细都已经完成调度
            let flag=false;
            if(this.sPay.payTag=="2"){
              //表示都已经被调度返回页面
              this.$router.push('/oe/mos');
            }
            /*
            if(!flag){
              //表示所有的产品都已经通过
              //所有修改入库表表示已经调度
              this.axios.get("http://127.0.0.1:1217/enxin/s-gather/pass-dispatcher?id="+this.gather.id)
                .then((response)=>{
                  this.$router.push('/oe/mes')
                })
            }*/
          });
      }
    },
    created(){
        this.loadTables();
    }
  }
</script>

<style scoped>

</style>
