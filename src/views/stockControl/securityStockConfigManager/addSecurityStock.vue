<template class="bg">
    <div class="all">
        <el-row :gutter="14">
          <el-col :span="8" :offset="15">
              <el-button-group>
                <el-button @click="confirm()">提交</el-button>
                <el-button @click="retu()">返回</el-button>
              </el-button-group>
          </el-col>
        </el-row>
        <div class="box">
          <h4 class="title">安全库存配置单</h4>
          <el-row :gutter="24">
              <el-col :span="12">
                  <span>产品名称:</span>
                  <span>{{DFile.productName}}</span>
              </el-col>
            <el-col :span="12">
              <span>产品编号:</span>
              <span>{{DFile.productId}}</span>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="5">
              <span>库存报警下线数:</span>
            </el-col>
            <el-col :span="3">
                <el-input class="input" v-model="sCell.minAmount"></el-input>
            </el-col>
            <el-col :span="5" :offset="4">
              <span>库存报警上线数:</span>
            </el-col>
            <el-col :span="3">
              <el-input class="input" v-model="sCell.maxAmount"></el-input>
            </el-col>
          </el-row>
          <el-row :gutter="24">
              <el-col :span="4">
                  <span>设置B/N或S/N</span>
              </el-col>
              <el-col :span="8">
                <el-select v-model="demand" placeholder="请选择">
                  <el-option label="否" value="shanghai"></el-option>
                  <el-option label="设置B/N" value="beijing"></el-option>
                  <el-option label="设置S/N" value="beijing"></el-option>
                </el-select>
              </el-col>
            <el-col :span="4">
              <span>设计人</span>
            </el-col>
            <el-col :span="8">
              <el-input class="input" v-model="designer"></el-input>
            </el-col>
          </el-row>

          <el-table :header-cell-style="tableHeaderStyle" :data="tableData" style="width: 100%">
                <el-table-column label="库号" prop="number"></el-table-column>
                <el-table-column label="库房名称" prop="name"></el-table-column>
                <el-table-column label="存储地址编号" prop="siteNumber"></el-table-column>
                <el-table-column label="存储地址名称" >
                  <template slot-scope="scope">
                      <span>{{DFile.firstKindName}}-{{DFile.secondKindName}}-{{DFile.thirdKindName}}</span>
                  </template>
                </el-table-column>

              <el-table-column label="存储单元简称" >
                <template slot-scope="scope">
                  <el-input class="input"  v-model="demand"></el-input>
                </template>
              </el-table-column>
                <el-table-column label="最大存储量" >
                  <template slot-scope="scope">
                    <el-input class="input"  v-model="sCell.maxCapacityAmount"></el-input>
                  </template>
                </el-table-column>
                <el-table-column  label="存储单位">
                  <template slot-scope="scope">
                    <el-input class="input"  v-model="demand"></el-input>
                  </template>
                </el-table-column>
          </el-table>
          <el-row :gutter="24">
              <el-col :span="3">
                  <span>登记人</span>

              </el-col>
            <el-col :span="9">
              <el-input class="input" v-model="sCell.register"></el-input>
            </el-col>
            <el-col :span="3">
              <span>登记时间</span>

            </el-col>
            <el-col :span="9">
              <el-input class="input" v-model="sCell.registerTime"></el-input>
            </el-col>
          </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: "addSecurityStock",
      props:['id'],
        data(){
            return{
              demand:'',
              designer:'',
              tableData:[{
                number:'1',
                name:'成品库',
                siteNumber:'01-01-01',
              }
              ],
              tableHeaderStyle:{
                  'background':'skyblue',
                  'color':'#fff'
              },
              DFile:{},
              sCell:{},
            }
        },
      methods:{
        confirm(){
              if(this.sCell.minAmount==null||this.sCell.minAmount<0){
                this.$notify.error({
                  title: '错误',
                  message:"库存下限不能为空",
                  type:'error'
                });
                return;
              }
            if(this.sCell.maxAmount==null){
              this.$notify.error({
                title: '错误',
                message:"库存上限不能为空",
                type:'error'
              });
              return;
            }
          if(this.sCell.maxCapacityAmount==null){
            this.$notify.error({
              title: '错误',
              message:"库存最大存储量不能为空",
              type:'error'
            });
            return;
          }
          //提交
          var param={"sCell":this.sCell,"fileId":this.DFile.id};
          this.axios.put("http://127.0.0.1:1217/enxin/s-cell/addScell",
            param,{headers:{'Content-Type':'application/json'}})
            .then((response)=>{
              if(response.data.success){
                this.$message({
                  message: '添加成功',
                  type: 'success'
                });
                this.$router.push("/stock/ssc")
              }else{
                this.$message({
                  message: '添加失败，请检查',
                  type: 'error'
                });
              }
            })

        },
        retu(){
          this.$router.push("/stock/ssc")
        }
      },
      created(){
          this.sCell.register=this.$store.getters.getUser.username
        this.axios
          .get("http://localhost:1217/enxin/d-file/querySimple?id="+this.id)
          .then(response => {
            this.DFile = response.data;
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      beforeRouteEnter:(to,from,next)=>{
        next(vm => {
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
          vm.sCell.registerTime = new Date().Format("yyyy-MM-dd hh:mm:ss");
        });
      },
    }
</script>

<style scoped>
.box{
  width: 800px;
  margin: 0px auto;
  border: 1px solid black;
}
input::-webkit-input-placeholder {
  /* placeholder颜色  */
  color: #aab2bd;
  /* placeholder字体大小  */
  font-size: 12px;
}
.all {
  font-size: 14px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
.box  >>>  .el-input__inner{
  border: none;
  border-bottom: 1px solid gray;
  margin-left: -40px;
  height: 25px !important;
  width: 85% !important;
}

.test >>>  .el-input__inner{
  height: 25px !important;
  width: 85% !important;
}
  .title{
    text-align: center;
  }
</style>
