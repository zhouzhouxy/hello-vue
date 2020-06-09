<template>
    <div>
      <div v-show="vis">
        <el-row :gutter="20">
          <el-col :offset="8" :span="4">
            <el-button type="primary" @click="onSubmit">立即查询</el-button>
          </el-col>

        </el-row>
        <el-row :gutter="20" class="el-row" >
          <el-col :span="6" class="leftCol">
            <span>请输入派工单编号</span>
          </el-col>
          <el-col :span="4">
            <el-input v-model="condition.manufactureId">
            </el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20"  >
          <el-col :span="6" class="leftCol">
            <span>请输入关键字</span>
          </el-col>
          <el-col :span="4">
            <el-input v-model="condition.keyword"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="8"  >
          <el-col :span="6" class="leftCol">
            <span>请选择派工单状态</span>
          </el-col>
          <el-col :span="14">
            <el-select v-model="condition.state" placeholder="派工单状态">
              <el-option label="等待" value="0"></el-option>
              <el-option label="未通过" value="2"></el-option>
              <el-option label="通过" value="1"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="20"  >
          <el-col :span="6" class="leftCol">
            <span>请输入登记时间</span>
          </el-col>
          <el-col :span="4">
            <el-date-picker type="date" placeholder="选择日期" v-model="condition.date1"></el-date-picker>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="4">
            <el-date-picker type="date" placeholder="选择日期" v-model="condition.date2"></el-date-picker>
          </el-col>
        </el-row>
      </div>
      <el-row  v-if="!vis" :gutter="24">
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
            <el-table-column label="投产数量"
                             prop="amount">
            </el-table-column>
            <el-table-column label="合格数量"
                             prop="testedAmount">
                <template slot-scope="scope">
                    <span v-if="scope.row.testedAmount==null">生产中</span>
                    <span v-else>{{scope.row.testedAmount}}</span>
                </template>
            </el-table-column>
            <el-table-column label="派工单状态">
              <template slot-scope="scope">
                <span v-if="scope.row.manufactureProcedureTag==0">等待</span>
                <span v-if="scope.row.manufactureProcedureTag==1">执行</span>
                <span v-if="scope.row.manufactureProcedureTag==2">等待</span>
              </template>
            </el-table-column>
            <el-table-column label="审核状态">
              <template slot-scope="scope">
                <span v-if="scope.row.checkTag==0">等待</span>
                <span v-if="scope.row.checkTag==1">通过</span>
                <span v-if="scope.row.checkTag==2">未通过</span>
              </template>
            </el-table-column>
              <el-table-column label="生产状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.manufactureProcedureTag==0">等待</span>
                  <span v-if="scope.row.manufactureProcedureTag==1">执行</span>
                  <span v-if="scope.row.manufactureProcedureTag==2">通过</span>
                </template>
            </el-table-column>
            <el-table-column label="查看">
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
        name: "productionWorkOrderQuery",
        data(){
          return{
            vis:true,
            condition:{
              pageNum:1,
              pageSize:5
            },
            manufactureList:[],
            total:0
          }
        },
      methods:{

        handleCurrentChange(vale){
            this.condition.pageNum=vale;
            this.loadTables();
        },
        loadTables(){
          this.axios.post("http://127.0.0.1:1217/enxin/m-manufacture/queryByCondition",this.condition,
            {headers:{'Content-Type':'application/json'}})
            .then((response)=>{
              this.manufactureList=response.data.list;
              this.total=response.data.total;
            })
        },
        onSubmit(){
            this.loadTables();
            this.vis=false;
        }
      }
    }
</script>

<style scoped>
  .leftCol{
    background-color: rgb(217, 236, 255);
    padding: 10px;
    text-align: center;
  }
  .el-row{
    border: 1px solid white;
  }
</style>
