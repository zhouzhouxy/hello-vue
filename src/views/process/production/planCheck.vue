<template>
    <div class="box">生产计划审核
      <el-table :data="applyList"
                stripe
                ref="multipleTable"
                style="width:100%">
        <el-table-column label="生产计划编号"
                         prop="applyId">
        </el-table-column>
        <el-table-column label="计划指定人"
                         prop="designer">
        </el-table-column>
        <el-table-column label="登记人"
                         prop="register">
        </el-table-column>
        <el-table-column label="登记时间" prop="registerTime" >
        </el-table-column>
        <el-table-column label="备注"
                         prop="remark">
        </el-table-column>
        <el-table-column label="审核">
          <template slot-scope="scope">
            <router-link :to="{name:'ApplyDetail',params:{applyId:scope.row.applyId}}">审核</router-link>
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
        name: "planCheck",
        data(){
            return{
              passRadio:'',
              checkerTime:'',
              fileList:[],
              dialogVisible:false,
              applyList:[],
              total:0,
              pageNum: 1,
              pageSize:5
            }
        },
        methods:{

          handleClose(){

          },
          handleCurrentChange(val){
              this.pageNum=val;
              this.loadTables();
          },
          loadTables(){
            this.axios.get("http://127.0.0.1:1217/enxin/m-apply/queryApplyByCheck",
              {params:{pageNum:this.pageNum,pageSize:this.pageSize}})
              .then((response)=>{
                this.total=response.data.total;
                this.applyList=response.data.list;
              })
          }
        },
        created(){
          this.loadTables();
        }
    }
</script>

<style scoped>
  .box{
    width:800px;
    margin: auto;
    border:1px solid #091e25;
    padding: 35px;
    border-radius:5px;
    box-shadow:0 0 25px #0c0c0c;
  }
</style>
