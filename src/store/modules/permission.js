import { constantRoutes } from '@/router'
import Layout from '@/layout'
const _import = require('@/router/_import')
// import _import from '@/store/modules/importFile'
import { menuInfo } from '@/api/user'
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}
function importComponent(data) {
  try {
    for (let i = 0; i < data.length; i++) {
      // data[i].path = data[i].attributes.url.slice(data[i].attributes.url.lastIndexOf('/'))
      if (data[i].childrens.length > 0) {
        data[i].children = data[i].childrens
      }
      data[i].name = data[i].attributes.url.slice(data[i].attributes.url.lastIndexOf('/') + 1)
      data[i].hidden = false
      data[i].meta = {
        title: data[i].text,
        icon: data[i].attributes.icon
      }
      if (!data[i].hasParent) {
        data[i].component = Layout
        data[i].path = data[i].attributes.url.slice(data[i].attributes.url.lastIndexOf('/'))
        data[i].redirect = data[i].children[0].attributes.url
      } else if (data[i].hasParent && data[i].hasChildren) {
        data[i].path = data[i].attributes.url.slice(data[i].attributes.url.lastIndexOf('/') + 1)
        data[i].redirect = data[i].childrens[0].attributes.url
        data[i].component = _import(data[i].attributes.url + '/index')
      } else if (data[i].hasChildren && !data[i].hasParent) {
        data[i].redirect = data[i].children[0].attributes.url
      } else if (!data[i].hasChildren && data[i].hasParent) {
        data[i].component = _import(data[i].attributes.url)
      }
      if (data[i].children && data[i].children.length) {
        importComponent(data[i].children)
      } else {
        data[i].name = data[i].attributes.url.slice(data[i].attributes.url.lastIndexOf('/') + 1)
        data[i].hidden = false
        data[i].meta = {
          title: data[i].text,
          icon: data[i].attributes.icon
        }
        if (!data[i].hasParent) {
          data[i].component = Layout
          data[i].path = data[i].attributes.url.slice(data[i].attributes.url.lastIndexOf('/'))
        } else if (data[i].hasParent && !data[i].hasChildren) {
          data[i].path = data[i].attributes.url.slice(data[i].attributes.url.lastIndexOf('/') + 1)
          data[i].component = _import(data[i].attributes.url)
          console.log('layout', Layout)
        } else if (data[i].hasParent && data[i].hasChildren) {
          data[i].path = data[i].attributes.url.slice(data[i].attributes.url.lastIndexOf('/') + 1)
        }
      }
    }
  } catch (error) {
    console.log(error)
  }
  return data
}

const actions = {
  generateRoutes({ commit }) {
    return new Promise(resolve => {
      let accessedRoutes = []
      console.log(accessedRoutes)
      menuInfo().then((res) => {
        // console.log(res)
        accessedRoutes = importComponent(res.menus || []) || []
        console.log(accessedRoutes)
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
      // if (roles.includes('admin')) {
      //   accessedRoutes = asyncRoutes || []
      // } else {
      //   accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      // }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
