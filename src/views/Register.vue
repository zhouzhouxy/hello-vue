<template>
   <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm login-box">
     <el-form-item label="用户名" prop="username">
       <el-input v-model.number="ruleForm.username"></el-input>
     </el-form-item>
     <el-form-item label="密码" prop="pass">
      <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
      <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
      <el-button type="success" @click="back()"><i class="el-icon-back"></i></el-button>
    </el-form-item>
  </el-form>
</template>

<script>
    export default {
        name: "Register",
      data() {
        var checkUserName = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('用户名不能为空'));
          }
          setTimeout(() => {
                callback();
          }, 1000);
        };
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          }else if(value.length<6){
            callback(new Error('密码长度不能小于六位'));
          } else {
            if (this.ruleForm.checkPass !== '') {
              this.$refs.ruleForm.validateField('checkPass');
            }
            callback();
          }
        };
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.ruleForm.pass) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };
        return {
          user:{},
          ruleForm: {
            username:'',
            pass: '',
            checkPass: '',
            age: ''
          },
          rules: {
            pass: [
              { validator: validatePass, trigger: 'blur' }
            ],
            checkPass: [
              { validator: validatePass2, trigger: 'blur' }
            ],
            username: [
              { validator: checkUserName, trigger: 'blur' }
            ]
          }
        };
      },
      methods: {
        back(){
          this.$router.push("/login")
        },
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            console.log(valid);
            if (valid) {
              this.user.username=this.ruleForm.username;
              this.user.loginName=this.ruleForm.username;
              this.user.password=this.ruleForm.pass;
              this.axios.put("http://127.0.0.1:1217/user/register",this.user,
                {headers:{'Content-Type':'application/json'}})
                .then((response)=>{
                  if(response.data.success){
                      this.$message({
                        message: response.data.message,
                        type: 'success'
                      });
                      this.$router.push("/login")
                    }else{
                      this.$message({
                        message: response.data.message,
                        type: 'error'
                      });
                    }
                })
                .catch((error)=>{
                  this.$message({
                    message: error,
                    type: 'error'
                  });
                })
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        }
      }
    }
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
</style>
