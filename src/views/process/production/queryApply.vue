<template>
  <div class="box">
    <h4 class="box-title">生产计划单</h4>
    <el-row :gutter="20">
        <el-col :span="4" :offset="15">
            <el-button type="warning" @click="ret()">返回</el-button>
        </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="9">
        <span >计划单编号：{{file.applyId}}</span>
      </el-col>
    </el-row>
    <!--表格-->
    <el-table :data="fileList"
              :header-cell-style="{background:'#409EFF',color:'#FFFFFF'}"
              stripe
              width="800px"
    >
      <el-table-column label="产品编号"
                       prop="productId">
      </el-table-column>
      <el-table-column label="产品名称"
                       prop="productName">
      </el-table-column>
      <el-table-column label="描述"
                       prop="productDescribe">
      </el-table-column>
      <el-table-column label="数量" prop="amount" >

      </el-table-column>
      <el-table-column label="出库单编号集合">
      </el-table-column>

    </el-table>
    <el-row :gutter="24">
      <el-col :span="2">
        审核人：
      </el-col>
      <el-col :span="2">
        <span>{{file.checker}}</span>
       </el-col>
      <el-col :span="8" :offset="6">
        <span>审核时间：</span>
        <span>{{file.checkTime}}</span>
      </el-col>
    </el-row>
    <span>备注：</span>
    <span>{{file.remark}}</span>
   </div>
</template>

<script>
  export default {
    name: "applyDetail",
    props:['applyId'],
    data(){
      return{
        pcRadio:'pass',
        checkerTime:'',
        fileList:[],
        file:{}
      }
    },
    methods:{
      //返回
      ret(){
        this.$router.push('/pm/ppq');
      }
    },
    created(){

      this.axios.get("http://127.0.0.1:1217/enxin/m-apply/queryApplyByApplyId",
        {params:{"applyId":this.applyId}})
        .then((response)=>{
          this.fileList=response.data;
          this.file={applyId:this.fileList[0].applyId,remark:this.fileList[0].remark,
            checkTime:this.fileList[0].checkTime,register:this.fileList[0].register,
            checker:this.fileList[0].checker}
        })

    }
  }
</script>

<style scoped>
  .box{
    width:1217px;
    margin:0px auto;
    border:1px solid #0c0c0c;
    padding: 35px;
    border-radius:5px;
    box-shadow:0 0 25px #091e25;
  }
</style>

