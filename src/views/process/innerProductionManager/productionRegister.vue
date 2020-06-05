<template>
    <div>
      <el-row  :gutter="24">
        <el-col :span="18" :offset="3">
          <el-table :data="manufactureList"
                    row-key="id"
                    border fit highlight-current-row
                    ref="multipleTable"
                    style="width:100%">
            <el-table-column label="生产派工单编号"
                             prop="manufactureId"
                             width="189x">
            </el-table-column>
            <el-table-column label="产品编号" width="185px"
                             prop="productId">
            </el-table-column>
            <el-table-column label="产品名称"
                             prop="productName">
            </el-table-column>
            <el-table-column label="数量"
                             prop="amount">
            </el-table-column>
            <el-table-column label="出库单编号集合">
            </el-table-column>
            <el-table-column label="登记时间"
                             prop="registerTime">
            </el-table-column>
            <el-table-column label="登记">
              <template slot-scope="scope">
                <router-link :to="{name:'ViewManufacture2',params:{id:scope.row.id}}">查看</router-link>
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
        </el-col>

      </el-row>
    </div>
</template>

<script>
    export default {
        name: "productionRegister",
        data(){
          return{
              condition:{
                state:"1",
                pageNum:1,
                pageSize:5
              },
            manufactureList:[],
            total:0
          }
        },
        methods:{
          handleCurrentChange(val){
              this.condition.pageNum=val;
              this.loadTables();
          },
          //加载表格
          loadTables(){
            this.axios.post("http://127.0.0.1:1217/enxin/m-manufacture/queryByCondition",this.condition,
              {headers:{'Content-Type':'application/json'}})
              .then((response)=>{
                this.manufactureList=response.data.list;
                this.total=response.data.total;
              })
          }
        },
        //查询通过审核的mManufacture
        created(){
            this.loadTables();
        }
    }
</script>

<style scoped>

</style>
