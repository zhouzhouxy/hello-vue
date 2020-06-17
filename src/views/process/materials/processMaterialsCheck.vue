<template>
  <div id="tab">
    <el-table  :data="list"
                   stripe
                   :header-cell-style="{background:'#409EFF',color:'#FFFFFF'}"
                   :row-class-name="tableRowClassName"
                   ref="multipleTable"
                   style="width:100%">
    <el-table-column
      prop="designId"
      label="工序设计单编号"
      width="170px">
    </el-table-column>
    <el-table-column
      prop="productId"
      label="产品编号"
      width="180px">

    </el-table-column>
    <el-table-column prop="productName"
                     label="产品名称"
                     width="120px">
    </el-table-column>
    <el-table-column prop="designer"
                     label="设计人"
                     width="80px">
    </el-table-column>
    <el-table-column prop="registerTime"
                     label="登记时间"   width="180px">
    </el-table-column>
    <el-table-column
      label="工时总成本"   width="160px" prop="costPriceSum">
    </el-table-column>

    <el-table-column
      label="审核"   width="160px">
      <template slot-scope="scope">
        <router-link :to="{name:'CheckProcessMaterial',params:{id:list[scope.$index].id}}">审核</router-link>
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
    name: "processMaterialsCheck",
    data(){
      return{
        dialogTableVisible3:false,
        list:[],
        pageNum:1,
        pageSize:5,
        total:0,
        procedureDetail:{},
        procedureDetailModule:[]
      }
    },
    methods:{
      tableRowClassName({row, rowIndex}) {
        console.log(rowIndex);
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      handleCurrentChange(val){
        this.pageNum=val;
        this.loadTables();
      },
      loadTables(){
        this.axios.get("http://127.0.0.1:1217/enxin/m-design-procedure/queryDPCheck",
          {params:{pageNum:this.pageNum,pageSize:this.pageSize}})
          .then((response)=>{
            this.list=response.data.list;
          })
          .catch(function(error){
            console.log(error);
          })
      }
    },
    created:function(){
      //查询已经审核通过的产品生产工序表 和工序物料设计标志为未设计
      this.loadTables();
    }
  }
</script>

<style scoped>
  #tab >>> .el-table .warning-row {
    background: oldlace;
  }

  #tab >>> .el-table .success-row {
    background: #f0f9eb;
  }

</style>

