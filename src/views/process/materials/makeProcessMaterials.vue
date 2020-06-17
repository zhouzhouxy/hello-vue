<template>
    <div>  <el-table :data="list"
                     stripe
                     ref="multipleTable"
                     :header-cell-style="{background:'#409EFF',color:'#FFFFFF'}"
                     style="width:100%">
      <el-table-column
        prop="designId"
        label="工序设计单编号"
        width="200px">
      </el-table-column>
      <el-table-column
        prop="productId"
        label="产品编号"
        width="200px">

      </el-table-column>
      <el-table-column prop="productName"
                       label="产品名称"
                       width="200px">
      </el-table-column>
      <el-table-column prop="designer"
                       label="设计人"
                       width="200px">
      </el-table-column>
      <el-table-column prop="registerTime"
                       label="登记时间"   width="180px">
      </el-table-column>
      <el-table-column
        label="工时总成本"   width="160px" prop="costPriceSum">
      </el-table-column>

      <el-table-column
        label="制定"   width="160px">
        <template slot-scope="scope">
            <router-link :to="{name:'AddProcessMaterials',params:{id:list[scope.$index].id}}">制定</router-link>
        </template>
      </el-table-column>
    </el-table>
    </div>
</template>

<script>
    export default {
        name: "MakeProcessMaterials",
        data(){
          return{
              list:[],
              pageNum:1,
              pageSize:5,
          }
        },
        methods:{

        },
        created:function(){
          //查询已经审核通过的产品生产工序表 和工序物料设计标志为未设计
          this.axios.get("http://127.0.0.1:1217/enxin/m-design-procedure/queryDP",
            {params:{pageNum:this.pageNum,pageSize:this.pageSize}})
            .then((response)=>{
              this.list=response.data.list;
            })
            .catch(function(error){
              console.log(error);
            })
        }
    }
</script>

<style scoped>

</style>
