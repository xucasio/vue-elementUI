import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import userImg from '@/assets/img/user.png'
import { Message } from 'element-ui'
const state = {
  token: getToken(),
  name: '',
  userId: '',
  avatar: userImg,
  introduction: '',
  roles: [],
  roleName: '',
  sex: 154,
  birth: '',
  mobile: '',
  email: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_ROLENAME: (state, roleName) => {
    state.roleName = roleName
  },
  SET_SEX: (state, sex) => {
    state.sex = sex
  },
  SET_BIRTH: (state, birth) => {
    state.birth = birth
  },
  SET_MOBILE: (state, mobile) => {
    state.mobile = mobile
  },
  SET_EMAIL: (state, email) => {
    state.email = email
  },
  SET_USERID: (state, userId) => {
    state.userId = userId
  },
  SET_LIVEADDRESS: (state, liveAddress) => {
    state.liveAddress = liveAddress
  },
  SET_PROVINCE: (state, province) => {
    state.province = province
  },
  SET_CITY: (state, city) => {
    state.city = city
  },
  SET_DISTRICT: (state, district) => {
    state.district = district
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password, verify } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password, verify: verify }).then(response => {
        const data = response
        if (data.code !== 200) {
          Message({
            message: data.msg || '网络连接失败',
            type: 'error',
            duration: 5 * 1000
          })
        } else {
          commit('SET_TOKEN', data.username + ';' + data.token)
          setToken(data.username + ';' + data.token)
          resolve()
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const user = response.user || {}
        if (!user) {
          reject('Verification failed, please Login again.')
        }
        const { username, name, sex, birth, mobile, email, liveAddress, userId, province, city, district } = user
        commit('SET_ROLES', ['admin'])
        commit('SET_NAME', username)
        commit('SET_AVATAR', userImg)
        commit('SET_ROLENAME', name)
        commit('SET_SEX', sex)
        commit('SET_BIRTH', birth)
        commit('SET_MOBILE', mobile)
        commit('SET_EMAIL', email)
        commit('SET_USERID', userId)
        commit('SET_LIVEADDRESS', liveAddress)
        commit('SET_PROVINCE', province)
        commit('SET_CITY', city)
        commit('SET_DISTRICT', district)
        resolve(user)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
