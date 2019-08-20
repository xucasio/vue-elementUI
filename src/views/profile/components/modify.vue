<template>
  <el-form>
    <el-form-item label="旧密码">
      <el-input v-model="pwd.pwdOld" />
    </el-form-item>
    <el-form-item label="新密码">
      <el-input v-model="pwd.pwdNew" />
    </el-form-item>
    <el-form-item label="确认密码">
      <el-input v-model="pwd.confirm_password" />
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
    return {
      pwd: {
        pwdOld: '',
        pwdNew: '',
        confirm_password: '',
        userId: this.userId
      }
    }
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  methods: {
    submit() {
      resetPwd(this.pwd).then((res) => {
        debugger
      })
    }
  }
}
</script>
