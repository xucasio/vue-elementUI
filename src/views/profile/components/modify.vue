<template>
  <el-form :model="pwd" :rules="rules" label-width="100px">
    <el-form-item label="旧密码" prop="pwdOld">
      <el-input v-model="pwd.pwdOld" type="password" />
    </el-form-item>
    <el-form-item label="新密码" prop="pwdNew">
      <el-input v-model="pwd.pwdNew" type="password" />
    </el-form-item>
    <el-form-item label="确认密码" prop="confirm_password">
      <el-input v-model="pwd.confirm_password" type="password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
// pwdOld pwdNew confirm_password
import { mapGetters } from 'vuex'
import { resetPwd } from '@/api/user'
export default {
  data() {
    // validatePass
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.pwd.pwdNew) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      pwd: {
        pwdOld: '',
        pwdNew: '',
        confirm_password: '',
        userDO: {
          userId: ''
        }
      },
      rules: {
        pwdOld: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        pwdNew: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        confirm_password: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  created() {
    this.pwd.userDO.userId = this.userId
  },
  methods: {
    submit() {
      resetPwd(this.pwd).then((res) => {
        if (res.code === 0) {
          this.$message({
            message: res.msg || '密码修改成功！',
            type: 'success',
            duration: 3 * 1000
          })
        }
      })
    }
  }
}
</script>
