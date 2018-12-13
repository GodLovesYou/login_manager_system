<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-edit"></i>个人中心</el-breadcrumb-item>
        <el-breadcrumb-item>修改密码</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="userContent">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item prop="pass" label="密码">
          <el-input v-model="form.pass" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass" label="确认密码">
          <el-input v-model="form.checkPass" type="password" placeholder="请再次输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">确定</el-button>
          <el-button @click="onCanle()">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModifyPassword',
  data () {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.form.checkPass !== '') {
          this.$refs.form.validateField('checkPass')
        }
        callback()
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.pass) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }
    return {
      form: {
        pass: '',
        checkPass: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    getUserData () {
      const self = this
      let username = sessionStorage.getItem('username')
      self.$axios.get('http://127.0.0.1:3000/api/user/getUser', {name: username}).then(function (response) {
        let result = response.data[0]
        sessionStorage.setItem('ms_userId', result.index)
      }).then(function (error) {
        console.log(error)
      })
    },
    onSubmit (formName) {
      const self = this
      let formData = {
        index: parseInt(sessionStorage.getItem('ms_userId')),
        pass: self.form.pass,
        checkPass: self.form.checkPass
      }
      self.$refs[formName].validate((valid) => {
        if (valid) {
          self.$axios.post('http://127.0.0.1:3000/api/user/modifyPassword', formData).then(function (response) {
            self.$router.push('/login')
          }).then(function (error) {
            console.log(error)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    onCancle () {
      this.$router.push('/userCenter')
    }
  },
  mounted () {
    this.getUserData()
  }
}
</script>

<style scoped>
  .userContent {
    width: 400px;
    margin: 0 auto;
  }
</style>
