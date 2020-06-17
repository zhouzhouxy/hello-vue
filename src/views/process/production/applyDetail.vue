<template>
  <div class="box">
    <el-row :gutter="24">
      <el-col :span="12">
        <el-radio-group v-model="pcRadio">
          <el-radio  label="未通过" ch></el-radio>
          <el-radio label="通过"></el-radio>
        </el-radio-group>
      </el-col>
      <el-col :span="8" :offset="4">
        <el-button-group>
          <el-button type="primary" @click="confirm()">确认</el-button>
          <el-button type="warning" @click="ret()">返回</el-button>
        </el-button-group>
      </el-col>

    </el-row>
    <h4 class="box-title">生产计划单</h4>
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
        登记人：
      </el-col>
      <el-col :span="4" class="inp">
        <el-input v-model="file.register"></el-input>
      </el-col>
      <el-col :span="8" :offset="6">
        <span>登记时间：</span>
        <span>{{file.registerTime}}</span>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="2">
        审核人：
      </el-col>
      <el-col :span="4" class="inp">
        <el-input v-model="file.checker"></el-input>
      </el-col>
      <el-col :span="8" :offset="6">
        <span>审核时间：</span>
        <span>{{checkerTime}}</span>
      </el-col>
    </el-row>
    <span>备注：</span>
    <el-input label="备注：" v-model="file.remark" aria-placeholder="备注" type="textarea"></el-input>
  </div>
</template>

<script>
    export default {
        name: "applyDetail",
        props:['applyId'],
        data(){
            return{
              pcRadio:'未通过',
              checkerTime:'',
              fileList:[],
              file:{}
            }
        },
      methods:{
          //返回
        ret(){
          this.$router.push('/pm/ppc');
        },
        //提交
        confirm(){
          console.log(this.pcRadio)
          var checkTag="0";
          if(this.pcRadio=="通过"){
            checkTag="1";
          }else{
            checkTag="2";
          }
          for(let i=0;i<this.fileList.length;i++){
            this.fileList[i].checker=this.file.checker;
            this.fileList[i].checkTime=this.checkerTime;
            this.fileList[i].remark=this.file.remark;
            this.fileList[i].checkTag=checkTag;
          }
          console.log(this.fileList)
          //发送
          this.axios.put("http://127.0.0.1:1217/enxin/m-apply/upApply",this.fileList,
            {headers:{'Content-Type':'application/json'}})
            .then((response)=>{
              if(response.data.success){
                this.$message({
                  message: '变更成功',
                  type: 'success'
                })
                this.$router.push('/pm/ppc')
              }else{
                this.$message({
                  message: '变更失败',
                  type: 'error'
                })
              }
            })
        },
      },
      created(){

          this.axios.get("http://127.0.0.1:1217/enxin/m-apply/queryApplyByApplyId",
            {params:{"applyId":this.applyId}})
            .then((response)=>{
              this.fileList=response.data;
              this.file={applyId:this.fileList[0].applyId,remark:this.fileList[0].remark,
                registerTime:this.fileList[0].registerTime,register:this.fileList[0].register,
                checker:this.$store.getters.getUser.username}
            })
        Date.prototype.Format = function (fmt) { // author: meizz
          var o = {
            "M+": this.getMonth() + 1, // 月份
            "d+": this.getDate(), // 日
            "h+": this.getHours(), // 小时
            "m+": this.getMinutes(), // 分
            "s+": this.getSeconds(), // 秒
            "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
            "S": this.getMilliseconds() // 毫秒
          };
          if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
          for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
          return fmt;
        }
        this.checkerTime = new Date().Format("yyyy-MM-dd hh:mm:ss");

      },
      beforeRouteEnter:(to,from,next)=>{
        next(vm => {

        });
      },
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

  .inp >>>  .el-input__inner{
    border: none;
    border-bottom: 1px solid gray;
    /*margin-left: -40px;*/
    height: 25px !important;
    width: 85% !important;
    background-color: lightgoldenrodyellow;
  }
</style>
