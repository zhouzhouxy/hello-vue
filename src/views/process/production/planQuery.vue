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
          <span>计划单编号</span>
        </el-col>
        <el-col :span="4">
          <el-input v-model="condition.applyId">
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
          <span>请选择设计单状态</span>
        </el-col>
        <el-col :span="14">
          <el-select v-model="condition.state" placeholder="设计单状态">
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
      <div v-if="!vis">
      <el-table :data="applyList"
                stripe
                ref="multipleTable"
                style="width:100%">
        <el-table-column label="生产计划编号">
          <template slot-scope="scope">
            <router-link :to="{name:'QueryApplyDetail',params:{applyId:scope.row.applyId}}">{{scope.row.applyId}}</router-link>
          </template>
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
        <el-table-column label="计划状态">
          <template slot-scope="scope">
            <span v-if="scope.row.checkTag==0">等待</span>
            <span v-if="scope.row.checkTag==1">通过</span>
            <span v-if="scope.row.checkTag==2">未通过</span>
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
    </div>
</template>

<script>
    export default {
        name: "planQuery",
      data(){
          return{
            vis:true,
            condition:{
              pageNum:1,
              pageSize:5
            },
            applyList:[],
            total:0,
          }
      },
      methods:{
        handleCurrentChange(){

        },
        onSubmit(){
          this.axios.post("http://localhost:1217/enxin/m-apply/queryApplyByCondition",
          this.condition,
            {headers:{'Content-Type':'application/json'}})
            .then((response)=>{
                this.applyList= response.data.list;
                this.total= response.data.total;
            })
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
