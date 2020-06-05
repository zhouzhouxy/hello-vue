<template>
  <div>
    <!--<router-link to="/test">测试页面</router-link>-->
    <el-form ref="form" :model="form" label-width="80px" :rules="rules" class="login-box">
      <h3 class="login-title">欢迎登陆</h3>
      <el-form-item label="账号" prop="username">
        <el-input type="text" placeholder="请输入账号" v-model="form.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" placeholder="请输入密码" v-model="form.password"/>
      </el-form-item>
      <el-form-item>
<!--        <el-button type="primary" @click="submitForm('form')">登录</el-button>-->
        <el-button type="primary" @click="submitForm()">登录</el-button>
      </el-form-item>
    </el-form>


  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        form: {
          username: '',
          password: ''
        },
        list: [],
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      // submitForm(){
      //   this.axios.get('http://localhost:8080/SSM_And_Vue_war_exploded/goods/axios.do',
      //     {headers:{
      //         'Content-Type': 'application/json',//设置请求头请求格式为JSON
      //       },
      //     params: {
      //       username: this.form.username,
      //       password: this.form.password
      //     }
      //     }).then((response)=>{
      //       console.log(response)
      //   }).catch(error=>{
      //     console.log(error)
      //   })
      // }
      // submitForm(){
      //   this.axios({
      //     url:'http://localhost:8080/SSM_And_Vue_war_exploded/goods/axios.do',
      //     method:'post',
      //     data:{username:this.form.username,
      //           password:this.form.password,
      //           pageSize:10,
      //           pageNum:5,
      //           brand:'阿'
      //     },
      //     headers:{
      //       'Content-Type':'application/json'
      //     }
      //   }).then(response=>{
      //     this.list=response.data.list;
      //     console.log(this.list)
      //     console.log(response.data)
      //     // sessionStorage.setItem('isLogin','true');
      //     // this.$store.dispatch('asyncUpdateUser',{username:this.form.username})
      //   })
      // }
      submitForm() {
           this.axios({
            url:'http://localhost:1217/user/login',
            method:'post',
             params: {
                   username: this.form.username,
                   password: this.form.password
                    },
            headers:{
              'Content-Type':'application/json'
            }
          }).then(response=>{
            console.log(response.data)
             if(response.data.success){
               this.$refs.form.validate((valid) => {
                 if (valid) {
                   sessionStorage.setItem('isLogin', 'true');
                   this.$store.dispatch('asyncUpdateUser', {username: this.form.username})
                   //编程式导航
                   this.$router.push("/Main")
                   // var params = new URLSearchParams();
                 } else {
                   this.$message({
                     message: '你的用户名密码错误',
                     type: 'warning'
                   });
                   return false;
                 }
               });
             }else{
               this.$message({
                 message: response.data.message,
                 type: 'warning'
               });
               return false;
             }

          }) .catch(function (error) {
             console.log(error);
           });



      }
    }
  }
      //       params.append("username",form.username);
      //       params.append('password',form.password)
      //
      //
      //
      //       // this.axios.post('http://localhost:8080/SSM_And_Vue_war_exploded/goods/axios.do?username='+this.form.username)
      //       //   .then(function(response){
      //       //     console.log(response)
      //       //   }).catch(function(error){
      //       //     console.log(error)
      //       // })
      //       // this.axios.get('http://localhost:8080/SSM_And_Vue_war_exploded/goods/axios.do',{
      //       //   params:{
      //       //       username:form.username,
      //       //       password:form.password
      //       //   }
      //       // }).then(function(res){
      //       //   console.log(res)
      //       //   this.$router.push({name:'Main',params:{username:this.form.username}})
      //       // }).catch(function(error){
      //       //     console.log(error)
      //       // })
      //
      //     } else {
      //       this.$message({
      //         message: '你的用户名密码错误',
      //         type: 'warning'
      //       });
      //       return false;
      //     }
      //   });
      //
      // }
    // }

  // }
</script>

<style scoped>
  .login-box{
    width:350px;
    margin:180px auto;
    border:1px solid  #40D2FF;
    padding: 35px;
    border-radius:5px;
    box-shadow:0 0 25px #40D2FF;
  }
  .login-title{
    text-align:center;
  }
</style>
