<template>
    <div>
      <el-table :data="list"  stripe
                style="width:100%">
        <el-table-column
          prop="productId"
          label="产品编号"
          width="180"></el-table-column>
        <el-table-column prop="productName"
                         label="产品名称"
                         width="180">
        </el-table-column>
        <el-table-column prop="firstKindName"
                         label="I级分类"
                         width="180px">
        </el-table-column>
        <el-table-column prop="secondKindName"
                         label="二级分类"   width="180px">
        </el-table-column>
        <el-table-column prop="thirdKindName"
                         label="三级分类"   width="180px">
        </el-table-column>
        <el-table-column prop="registerTime"
                         label="登记时间"   width="180px">
        </el-table-column>
        <el-table-column label="审核">
          <template slot-scope="scope">
            <router-link :to="{name:'CheckSecurityStock',params:{id:list[scope.$index].id}}">审核</router-link>
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
        name: "stockCheck",
      data(){
          return{
            list:[],
            total:0,
            condition:{
              pageNum:1,
              pageSize:5,
              checkTag:'0'
            }
          }
      },
      methods:{
        handleCurrentChange(val){
          this.condition.pageNum=val;
        }
      },
      created(){
          this.axios.post('http://127.0.0.1:1217/enxin/s-cell/queryScellByCondition',this.condition,
            {headers:{'Content-Type':'application/json'}}
          ).then((response)=>{
              this.list=response.data.list;
              this.total=response.data.total;
          })
      }
    }
</script>

<style scoped>

</style>
