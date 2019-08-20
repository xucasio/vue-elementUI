<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">
        <el-col :span="6" :xs="24">
          <user-card :user="user" />
        </el-col>
        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="基础资料" name="baseInfo">
                <base-info />
              </el-tab-pane>
              <el-tab-pane label="头像修改" name="avatar">
                <avatar />
              </el-tab-pane>
              <el-tab-pane label="修改密码" name="account">
                <modify />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
import BaseInfo from './components/baseInfo'
import Avatar from './components/avatar'
import Modify from './components/modify'

export default {
  name: 'Profile',
  components: { UserCard, BaseInfo, Avatar, Modify },
  data() {
    return {
      user: {},
      activeTab: 'baseInfo'
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles',
      'roleName'
    ])
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.user = {
        name: this.name,
        email: this.email,
        avatar: this.avatar,
        roleName: this.roleName
      }
    }
  }
}
</script>
