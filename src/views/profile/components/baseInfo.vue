<template>
  <div class="baseInfo">
    <el-row>
      <el-col :span="12">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="ruleForm.name" />
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="ruleForm.sex">
              <el-radio :label="154">男</el-radio>
              <el-radio :label="155">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="出生日期" required>
            <el-col :span="11">
              <el-form-item prop="birth">
                <el-date-picker v-model="ruleForm.birth" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" style="width: 100%;" />
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="ruleForm.mobile" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm.email" />
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <areas :areas="areaData" />
          </el-form-item>
          <el-form-item label="详细地址" prop="liveAddress">
            <el-input v-model="ruleForm.liveAddress" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { updatePeronal } from '@/api/user'
import Areas from '@/components/Areas'
export default {
  components: {
    Areas
  },
  data() {
    // validatePass
    var _this = this
    var validateAddress = (rule, value, callback) => {
      if (!_this.areaData.province) {
        callback(new Error('请选择省'))
      } else if (!_this.areaData.city) {
        callback(new Error('请选择市!'))
      } else if (!_this.areaData.district) {
        callback(new Error('请选择区!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        name: '',
        sex: '',
        email: '',
        mobile: '',
        birth: '',
        liveAddress: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        birth: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        mobile: [
          { required: true, message: '请输入手机', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        liveAddress: [
          { required: true, message: '请输入联系地址', trigger: 'blur' }
        ],
        address: [
          { required: true, validator: validateAddress }
        ]
      },
      areaData: {}
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'sex',
      'email',
      'mobile',
      'birth',
      'liveAddress',
      'userId',
      'province',
      'city',
      'district'
    ])
  },
  created() {
    this.ruleForm = {
      name: this.name,
      sex: this.sex,
      email: this.email,
      mobile: this.mobile,
      birth: this.birth,
      liveAddress: this.liveAddress
    }
    this.areaData = {
      province: this.province,
      city: this.city,
      district: this.district
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let obj = Object.assign({}, this.ruleForm)
          obj = { ...obj, ...this.areaData, userId: this.userId }
          updatePeronal(obj).then((res) => {
            this.$message({
              message: res.msg || '操作成功！',
              type: 'success',
              duration: 3 * 1000
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
