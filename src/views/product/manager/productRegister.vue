<template>
  <div class="info">
    <el-form ref="DFile" :inline="true" :rules="rules" :model="DFile" class="demo-form-inline">
    <div class="mainInfo">
      <span>主信息</span>
      <el-form-item>
        <el-button type="primary" @click="onSubmit()">提交</el-button>
      </el-form-item>
      <br>
        <el-form-item label="产品名称">
          <el-input v-model="DFile.productName" placeholder="产品名称"></el-input>
        </el-form-item>
        <el-form-item label="制造商">
          <el-input v-model="DFile.factoryName" placeholder="制造商"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="一级分类">
          <el-select v-model="DFile.firstKindId" placeholder="一级分类">
              <el-option v-for="firstKindId in L1" :label="firstKindId.kindName" :value="firstKindId.id"  :key="firstKindId.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select v-model="DFile.secondKindId" placeholder="二级分类">
            <el-option v-for="secondKindId in L2" :label="secondKindId.kindName" :value="secondKindId.id" :key="secondKindId.id"></el-option>
          </el-select>
        </el-form-item>
        <br>
        <el-form-item label="三级分类">
          <el-select v-model="DFile.thirdKindId" placeholder="三级分类">
            <el-option v-for="thirdKindId in L3" :label="thirdKindId.kindName" :value="thirdKindId.id" :key="thirdKindId.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品简称">
          <el-input v-model="DFile.productNick" placeholder="产品简称"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="用途类型">
          <el-select v-model="DFile.type" placeholder="用途类型">
            <el-option v-for="type in useType" :value="type" :key="type.id">{{type}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="档次级别">
          <el-select v-model="DFile.productClass" placeholder="档次级别">
            <el-option v-for="productClass in grade" :value="productClass" :key="productClass.id">{{productClass}}</el-option>
          </el-select>
        </el-form-item>
        <br>
        <el-form-item label="计量单位">
          <el-input v-model="DFile.personalUnit" placeholder="产品名称"></el-input>
        </el-form-item>
        <el-form-item label="计量值">
          <el-input v-model="DFile.personalValue" placeholder="计量值"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="市场单价">
          <el-input v-model="DFile.listPrice" placeholder="市场单价"></el-input>
        </el-form-item>
        <el-form-item label="计划成本单价">
          <el-input v-model="DFile.costPrice" placeholder="计划成本单价"></el-input>
        </el-form-item>
    </div>
    <div class="assistInfo">
      <p>辅助信息</p>
      <el-form-item label="保修期">
        <el-input v-model="DFile.warranty" placeholder="保修期"></el-input>
      </el-form-item>
      <el-form-item label="替代品名称">
        <el-input v-model="DFile.twinName" placeholder="替代品名称"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="替代者编号">
        <el-input v-model="DFile.twinId" placeholder="替代者编号"></el-input>
      </el-form-item>
      <el-form-item label="生命周期(年)">
        <el-input v-model="DFile.lifecycle" placeholder="生命周期"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="单位">
        <el-input v-model="DFile.amountUnit" placeholder="单位"></el-input>
      </el-form-item>
      <el-form-item label="产品经理">
        <el-input v-model="DFile.responsiblePerson" placeholder="产品经理"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="供应商集合">
        <el-input v-model="DFile.providerGroup" placeholder="供应商集合"></el-input>
      </el-form-item>
      <el-form-item label="产品描述">
        <el-input v-model="DFile.productDescribe" placeholder="产品描述"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="登记人">
        <el-input v-model="DFile.register"   placeholder="登记人"></el-input>
      </el-form-item>
      <el-form-item label="建档时间">
        <span>{{DFile.registerTime}}</span>
      </el-form-item>
    </div>
    </el-form>
  </div>
</template>

<script>
    export default {
      name: "productRegister",
      data() {
        return {
          L1:[],
          L2:[],
          L3:[],
          useType:[],
          grade:[],
          DFile: {
            productName:'',
            factoryName:'',
            firstKindId:'',
            secondKindId:'',
            thirdKindId:'',
            productNick:'',
            type:'',
            productClass:'',
            personalUnit:'',
            personalValue:'',
            listPrice:'',
            costPrice:'',
            warranty:'',
            twinName:'',
            twinId:'',
            lifecycle:'',
            amountUnit:'',
            responsiblePerson:'',
            productDescribe:'',
            providerGroup:'',
            register: this.$store.getters.getUser.username ,
            registerTime:''
          },
          rules: {
            productName: [
              {required: true, message: '请输入产品名称', trigger: 'blur'}
            ],
            firstKindId: [
              {required: true, message: '请输入一级分类', trigger: 'blur'}
            ],
            secondKindId: [
              {required: true, message: '请输入二级分类', trigger: 'blur'}
            ],
            thirdKindId: [
              {required: true, message: '请输入三级分类', trigger: 'blur'}
            ],
            listPrice:[
              {required: true, message: '请输入市场单价', trigger: 'blur'}
            ],
            costPrice:[
              {required: true, message: '请输入计划成本', trigger: 'blur'}
            ],
          }
        }
      },
      methods: {
        onSubmit() {
          const that=this;
          //提交数据
          this.axios
            .post("http://localhost:1217/enxin/d-file/add-d-file",this.DFile,{
              headers: {
                'Content-Type': 'application/json'
              }
            })
            .then(function (response) {
              console.log(response);
               if(response.data.success){
                alert(response.data.message)
                //this.$store.dispatch('asyncUpdateUser', {username: this.form.username})
                //编程式导航
                that.$router.push("/Main")
              }else{
                alert(response.data.message)
                this.$message({
                  message: response.data.message,
                  type: 'error'
                });
              }

            })
            .catch(function (error) {
              console.log(error);
              alert("内部错误，请稍后再试")
              // this.$message({
              //   message: '插入失败',
              //   type: 'error'
              // });
            });
         },

        queryByPId(pid){

          //根据父Id查询一级分类
          this.axios
            .get("http://localhost:1217/enxin/d-config-file-kind/queryFileKindByPId?pid="+pid)
            .then(response =>{
                  return response.data;
            })
            .catch(function(error){
              //请求失败处理
              console.log(error)
            });
        }
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
          vm.DFile.registerTime = new Date().Format("yyyy-MM-dd hh:mm:ss");
         });
      },
      created:function(){
        //根据父Id查询一级分类
        this.axios
          .get("http://localhost:1217/enxin/d-config-file-kind/queryFileKindByPId?pid=0")
          .then(response =>{
              this.L1=response.data;
              console.log(this.L1)
          })
          .catch(function(error){
            //请求失败处理
            console.log(error)
          });
          //查询用途类型和档次
          this.axios
            .get("http://localhost:1217/publicChar/queryGradeAndUseType")
            .then(response=>{
              this.useType=response.data.useType;
              this.grade=response.data.grade;
            })
            .catch(function(error){
              console.log(error);
            });
      },
      computed:{
        firstKindId:function(){
          return this.DFile.firstKindId;
        },
        secondKindId:function(){
          return this.DFile.secondKindId;
        }
      },
      watch:{
        //一级分类
        firstKindId(newVal,oldVal){
          this.axios
            .get("http://localhost:1217/enxin/d-config-file-kind/queryFileKindByPId?pid="+newVal)
            .then(response =>{
              this.L2=response.data;
            })
            .catch(function(error){
              //请求失败处理
              console.log(error)
            });
        },
        secondKindId(newVal,oldVal){
          console.log("点击二级分类加载")
          this.axios
            .get("http://localhost:1217/enxin/d-config-file-kind/queryFileKindByPId?pid="+newVal)
            .then(response =>{
              this.L3=response.data;
            })
            .catch(function(error){
              //请求失败处理
              console.log(error)
            });
        }
      }
    }
</script>

<style scoped>
  .info{
    margin-top: -20px;
    margin-left: 100px;
    border: 1px solid black;
  }
</style>
