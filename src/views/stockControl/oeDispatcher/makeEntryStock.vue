<template>
  <div>
    <el-table :header-cell-style="tableHeaderStyle"
              :data="gatherList" stripe
              width="100%" >
      <el-table-column
        prop="gatherId"
        label="申请单编号">
      </el-table-column>
      <el-table-column
        label="入库理由">
        <template slot-scope="scope">
          <span v-if="scope.row.reason==1">生产入库</span>
          <span v-else-if="scope.row.reason==2">库存初始</span>
          <span v-else-if="scope.row.reason==3">赠送</span>
          <span v-else-if="scope.row.reason==4">内部归还</span>
          <span v-else>其他归还</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="reasonexact"
        label="入库详细理由">
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
        label="入库调度">
        <template slot-scope="scope">
          <router-link :to="{name:'EntryDispatcher',params:{id:scope.row.id}}">入库调度</router-link>
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
    name: "makeEntryStock",
    data(){
      return{
        gatherList:[],
        condition:{
          pageNum:1,
          pageSize:5,
          checkTag:"1"
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
        this.axios.post("http://127.0.0.1:1217/enxin/s-gather/query-s-gather",this.condition,
          {headers:{'Content-Type':'application/json'}})
          .then((response)=>{
            this.gatherList=response.data.list;
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
