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
        <h4 style="text-align: center">入库申请单</h4>
      </el-row>
      <el-row :gutter="24">
          <el-col :span="3">
              入库单编号：
          </el-col>
          <el-col :span="8">
              <span>{{gather.gatherId}}</span>
          </el-col>
      </el-row>
      <el-row :gutter="24" class="header">
        <el-col :span="3">
          <span>入库人:</span>
        </el-col>
        <el-col :span="4">
          <span>{{gather.storer}}</span>
        </el-col>
        <el-col :span="3" :offset="5">
          <span>入库理由:</span>
        </el-col>
        <el-col :span="4">
          <span v-if="gather.reason==1">生产入库</span>
          <span v-else-if="gather.reason==2">库存初始</span>
          <span v-else-if="gather.reason==3">赠送</span>
          <span v-else-if="gather.reason==4">内部归还</span>
          <span v-else>其他归还</span>
        </el-col>
      </el-row>
      <el-table :header-cell-style="tableHeaderStyle"
                :data="gatherList" stripe  >
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
          label="应入库件数">
        </el-table-column>
        <el-table-column
          label="已入库件数">
          <span>0.0</span>
        </el-table-column>
        <el-table-column
          label="存放地址集合">
        </el-table-column>
        <el-table-column
          label="调度">
            <template slot-scope="scope">
              <el-button type="primary" v-if="scope.row.gatherTag==1" @click="dispatch(scope.row)">调度</el-button>
              <el-button type="success" v-else>完成</el-button>
            </template>
        </el-table-column>
      </el-table>
      <el-row :gutter="24">
        <el-col :span="3">
          <span>应入库总计数:</span>
        </el-col>
        <el-col :span="4">
          <span >{{gather.amountSum}}</span>
        </el-col>
        <el-col :span="3" :offset="5">
          <span>已入库总件数:</span>
        </el-col>
        <el-col :span="4">
          <span>0.00</span>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="3">
          <span>应入库总成本:</span>
        </el-col>
        <el-col :span="4">
          <span>{{gather.costPriceSum}}</span>
        </el-col>
        <el-col :span="3" :offset="5">
          <span>已入库总成本:</span>
        </el-col>
        <el-col :span="8">
          <span>0.00</span>
        </el-col>
      </el-row>
    </div>
    <el-dialog width="1200px" :visible.sync="dialogFormVisible">

      <div class="box">
        <h4 style="text-align: center">入库调度单</h4>
        <el-row :gutter="24">
          <el-col :span="12">
            <span>入库单编号:</span>
            <span>{{gather.gatherId}}</span>
          </el-col>
          <el-col :span="12">
            <span>产品编号:</span>
            <span>{{sCell.productId}}</span>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <span>产品名称:</span>
            <span>{{sCell.productName}}</span>
          </el-col>
          <el-col :span="12">
            <span>成本单价:</span>
            <span>{{gatherDetails.costPrice}}</span>
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
          <el-table-column label="当前可存放数量" >
            <template slot-scope="scope">
              <span>{{sCell.maxCapacityAmount-sCell.amount}}</span>
            </template>
          </el-table-column>
          <el-table-column  label="本次入库数量">
            <template slot-scope="scope">
                <el-input v-model="entryAmount"></el-input>
            </template>
          </el-table-column>
        </el-table>
        <el-row :gutter="24">
          <el-col :span="3">
            <span>登记人</span>
          </el-col>
          <el-col :span="9">
            。
              <!--<el-input v-model=""></el-input>-->
          </el-col>
          <el-col :span="3">
            <span>登记时间</span>
          </el-col>
          <el-col :span="9">
            {{sCell.checkTime}}
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="3">
            <span>应入库数</span>
          </el-col>
          <el-col :span="9">
            <span>{{gatherDetails.amount}}</span>
          </el-col>
          <el-col :span="3">
            <span>已入库数</span>
          </el-col>
          <el-col :span="9">
              <span>0.0</span>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="3">
            <span>应入库成本</span>
          </el-col>
          <el-col :span="9">
            <span>{{gatherDetails.subtotal}}</span>
           </el-col>
          <el-col :span="3">
            <span>已入库成本</span>
          </el-col>
          <el-col :span="9">
              <span>0.00</span>
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
    name: "checkEntry",
    props:['id'],
    data(){
      return{
        entryAmount:'',
        dialogFormVisible:false,
        pcRadio:'pass',
        gather:{},
        tableData:[{
          number:'1',
          name:'成品库',
          siteNumber:'01-01-01',
        }
        ],
        sCell:{},
        gatherList:[],
        gatherDetails:{},
        tableHeaderStyle:{
          'background':'skyblue',
          'color':'#fff'
        },
      }
    },
    methods:{
      commit(){
          if(this.entryAmount!=this.gatherDetails.amount){
            this.$message({
              message: '入库数量有误，请重新确认。',
              type: 'warning'
            });
            return;
          }
          this.axios.get("http://127.0.0.1:1217/enxin/s-cell/dispatcher",
            {params:{entryAmount:this.entryAmount,gdId:this.gatherDetails.id,scellId:this.sCell.id}})
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
                 if(response.data.id==null){
                  this.$message({
                    message: '对不起，该产品尚未分配存储空间 ',
                    type: 'warning'
                  });
                  return;
                }
                this.gatherDetails=data;
                this.dialogFormVisible=true;
                this.sCell=response.data;
            })

      },
      back(){
        this.$router.push('/oe/mes');
      },
      //加载表格
      loadTables(){
        this.axios.get("http://127.0.0.1:1217/enxin/s-gather/query-by-id?id="+this.id,
          {headers:{'Content-Type':'application/json'}})
          .then((response)=>{
            this.gatherList=response.data.list;
            this.gather=response.data.sGather;
            //循环判断是否所有的入库明细都已经完成调度
            let flag=false;
            for(let i=0;i<this.gatherList.length;i++){
              if(this.gatherList[i]['gatherTag']=="1"){
                flag=true;
              }
            }
            if(!flag){
              //表示所有的产品都已经通过
              //所有修改入库表表示已经调度
              this.axios.get("http://127.0.0.1:1217/enxin/s-gather/pass-dispatcher?id="+this.gather.id)
                .then((response)=>{
                  this.$router.push('/oe/mes')
                })
            }
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
