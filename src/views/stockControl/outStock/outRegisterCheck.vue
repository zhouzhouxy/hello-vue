<template>
    <div>
      <el-table :header-cell-style="tableHeaderStyle"
                :data="sPayList" stripe
                width="100%" >
        <el-table-column
          prop="payId"
          label="申请单编号">
        </el-table-column>
        <el-table-column
          label="出库理由">
          <template slot-scope="scope">
            <span v-if="scope.row.reason==1">生产领料</span>
            <span v-else-if="scope.row.reason==2">赠送</span>
            <span v-else-if="scope.row.reason==3">内部借领</span>
            <span v-else>其它借领</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="registerTime"
          label="登记时间">
        </el-table-column>
        <el-table-column
          prop="amountSum"
          label="总件数">
        </el-table-column>
        <el-table-column
          prop="costPriceSum"
          label="总金额">
        </el-table-column>
        <el-table-column
          label="审核">
          <template slot-scope="scope">
            <router-link :to="{name:'CheckOut',params:{id:scope.row.id}}">审核</router-link>
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
</template>

<script>
    export default {
        name: "entryRegisterCheck",
      data(){
          return{
              gatherList:[],
              sPayList:[],
              condition:{
                  pageNum:1,
                  pageSize:5,
                  checkTag:"0"
              },
              tableHeaderStyle:{
                'background':'skyblue',
                'color':'#fff'
              },
              total:0,
          }
      },
      methods:{
        handleCurrentChange(val){
          this.condition.pageNum=val;
          this.loadTables();
        },
        loadTables(){
          this.axios.post("http://127.0.0.1:1217/enxin/s-pay/query-s-pay",this.condition,
            {headers:{'Content-Type':'application/json'}})
            .then((response)=>{
              this.sPayList=response.data.list;
              this.total=response.data.total;
            })
        }
      },
      created(){
          this.loadTables();
      }
    }
</script>

<style scoped>

</style>
