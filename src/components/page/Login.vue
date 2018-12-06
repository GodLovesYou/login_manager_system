<template>
  <div class="login-wrap">
    <div clsss="ms-title">登录管理系统</div>
    <div class="ms-login">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
        <div v-if="errorInfo">
          <span>{{errorInfo}}</span>
        </div>
        <el-form-item prop="name">
          <el-input v-model="ruleForm.name" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
        <p class="register" @click="handleCommand()">注册</p>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      errorInfo: false,
      ruleForm: {
        name: '',
        password: '',
        validate: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      const self = this
      self.$refs[formName].validate((valid) => {
        if (valid) {
          self.$axios.post('/api/user/login', JSON.stringify(self.ruleForm))
            .then((response) => {
              if (response.data === -1) {
                self.errorInfo = true
                self.errInfo = '该用户不存在'
              } else if (response.data === 0) {
                self.errorInfo = true
                self.errInfo = '密码错误'
              } else if (response.status === 200) {
                self.$router.push('/readme')
                sessionStorage.setItem('ms_username', self.ruleForm.name)
                sessionStorage.setItem('ms_user', JSON.stringify(self.ruleForm))
              }
            }).then((error) => {
              console.log(error)
            })
        } else {
          return false
        }
      })
    },
    handleCommand () {
      this.$router.push('/register')
    }
  }
}
</script>

<style scoped>
  .login-wrap{
    position: relative;
    width:100%;
    height:100%;
  }
  .ms-login{
    position: absolute;
    left:50%;
    top:50%;
    width:300px;
    height:200px;
    margin:-150px 0 0 -190px;
    padding:40px;
    border-radius: 5px;
    background: #fff;
  }
  .ms-login span {
    color: red;
  }
  .login-btn{
    text-align: center;
  }
  .login-btn button{
    width:100%;
    height:36px;
  }
  .code {
    width: 112px;
    height: 35px;
    border: 1px solid #ccc;
    float: right;
    border-radius: 2px;
  }
  .validate-code {
    width: 136px;
    float: left;
  }
  .register {
    font-size:14px;
    line-height:30px;
    color:#999;
    cursor: pointer;
    float:right;
  }
</style>
