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
          <span>请输入申请单编号</span>
        </el-col>
        <el-col :span="4">
          <el-input v-model="condition.sGatherId"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20"  >
        <el-col :span="6" class="leftCol">
          <span>请输入关键字</span>
        </el-col>
        <el-col :span="4">
          <el-input v-model="condition.keyword" placeholder="请输入关键字"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20"  >
        <el-col :span="6" class="leftCol">
          <span>请选择申请单状态</span>
        </el-col>
        <el-col :span="8">
          <el-select v-model="condition.checkTag" placeholder="申请单状态">
            <el-option label="等待" value="0"></el-option>
            <el-option label="未通过" value="2"></el-option>
            <el-option label="执行" value="3"></el-option>
            <el-option label="完成" value="1"></el-option>
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
      <div v-show="!vis">
        <el-table :header-cell-style="tableHeaderStyle"
                  :data="sPayList" stripe
                  width="100%" >
          <el-table-column
            prop="payId"
            label="申请单编号">
          </el-table-column>
          <el-table-column
            label="入库理由">
            <template slot-scope="scope">
              <span v-if="scope.row.reason==1">生产领料</span>
              <span v-else-if="scope.row.reason==2">赠送</span>
              <span v-else-if="scope.row.reason==3">内部借领</span>
              <span v-else>其他借领</span>
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
            label="申请单状态">
            <template slot-scope="scope">
              <span v-if="scope.row.checkTag==0">等待</span>
              <span v-else-if="scope.row.reason==1">执行</span>
              <span v-else-if="scope.row.reason==2">等待</span>
              <span v-else>等待</span>
            </template>
          </el-table-column>
          <el-table-column
            label="审核状态">
            <template slot-scope="scope">
              <span v-if="scope.row.checkTag==0">等待</span>
              <span v-else-if="scope.row.reason==1">通过</span>
              <span v-else-if="scope.row.reason==2">未通过</span>
              <span v-else>等待</span>
            </template>
          </el-table-column>
          <el-table-column
            label="查看">
            <template slot-scope="scope">
              <router-link type="primary" :to="{name:'ViewOut',params:{id:scope.row.id}}">查看</router-link>
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
      </div></div>
</template>

<script>
    export default {
        name: "entryQuery",
        data(){
          return{
            vis:true,
            gatherList:[],
            sPayList:[],
            condition:{
              pageNum:1,
              pageSize:5,
            },
            tableHeaderStyle:{
              'background':'skyblue',
              'color':'#fff'
            },
            total:0,
          }
        },
      methods:{
        onSubmit(){
            this.loadTables();
            this.vis=false;
        },
        handleCurrentChange(val){
          this.condition.pageNum=val;
          this.loadTables();
        },
        loadTables(){
          this.axios.post("http://127.0.0.1:1217/enxin/s-pay/query-s-pay-by-condition",this.condition,
            {headers:{'Content-Type':'application/json'}})
            .then((response)=>{
              this.sPayList=response.data.list;
              this.total=response.data.total;
            })
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
