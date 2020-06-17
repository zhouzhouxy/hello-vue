<template>
    <div>
      <!--表格-->
      <el-row :gutter="24">
        <el-col :span="18" :offset="3">
          <el-table :data="manufactureList"
                    :header-cell-style="{background:'#409EFF',color:'#FFFFFF'}"
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
                             prop="registerTime"
                              width="180px">
            </el-table-column>
            <el-table-column label="审核">
                <template slot-scope="scope">
                  <router-link :to="{name:'ViewManufacture',params:{id:scope.row.id}}">审核</router-link>
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
        name: "productionWorkOrderCheck",
        data(){
          return{
            manufactureList:[],
            pageNum:1,
            pageSize:5,
            total:0,
          }
      },
      methods:{

          //切换分页
          handleCurrentChange(val){
              this.pageNum=val;
              this.loadTables();
          },
          //加载表格
          loadTables(){
            //  查询等待审核生产总表
            this.axios.get("http://127.0.0.1:1217/enxin/m-manufacture/queryCheck"
            ,{params:{pageNum:this.pageNum,pageSize:this.pageSize}})
              .then((response)=>{
                this.manufactureList=response.data.list;
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
