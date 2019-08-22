import { constantRoutes } from '@/router'
import Layout from '@/layout'
const _import = require('@/router/_import')
// import _import from '@/store/modules/importFile'
// import { menuInfo } from '@/api/user'
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
var resData = {
  'msg': '操作成功',
  'code': 0,
  'name': 'admin',
  'menus': [
    {
      'id': '184',
      'text': '我的工作空间',
      'state': null,
      'checked': false,
      'attributes': {
        'icon': 'example',
        'url': '/myworkspace'
      },
      'children': [{
        'id': '185',
        'text': '我的申请',
        'state': null,
        'checked': false,
        'attributes': {
          'icon': '',
          'url': '/myworkspace/application'
        },
        'children': [],
        'childrens': [],
        'parentId': '184',
        'hasParent': true,
        'hasChildren': false
      }, {
        'id': '186',
        'text': '我的待办',
        'state': null,
        'checked': false,
        'attributes': {
          'icon': '',
          'url': '/myworkspace/todo'
        },
        'children': [],
        'childrens': [],
        'parentId': '184',
        'hasParent': true,
        'hasChildren': false
      }, {
        'id': '187',
        'text': '我的已办',
        'state': null,
        'checked': false,
        'attributes': {
          'icon': '',
          'url': '/myworkspace/done'
        },
        'children': [],
        'childrens': [],
        'parentId': '184',
        'hasParent': true,
        'hasChildren': false
      }, {
        'id': '188',
        'text': '所有申请查询',
        'state': null,
        'checked': false,
        'attributes': {
          'icon': '',
          'url': '/myworkspace/aquery'
        },
        'children': [],
        'childrens': [],
        'parentId': '184',
        'hasParent': true,
        'hasChildren': false
      }],
      'childrens': [],
      'parentId': '0',
      'hasParent': false,
      'hasChildren': true
    }, {
      'id': '268',
      'text': '贷后管理',
      'state': null,
      'checked': false,
      'attributes': {
        'icon': 'documentation',
        'url': '/loanback'
      },
      'children': [{
        'id': '269',
        'text': '还款管理',
        'state': null,
        'checked': false,
        'attributes': {
          'icon': '',
          'url': '/loanback/retrun'
        },
        'children': [],
        'childrens': [{
          'id': '306',
          'text': '待还款列表',
          'state': null,
          'checked': false,
          'attributes': {
            'icon': '',
            'url': '/loanback/retrun/tfCollectionManagement'
          },
          'children': [],
          'childrens': [],
          'parentId': '269',
          'hasParent': true,
          'hasChildren': false
        }, {
          'id': '308',
          'text': '还款明细',
          'state': null,
          'checked': false,
          'attributes': {
            'icon': '',
            'url': '/loanback/retrun/tfReceiptsDetails'
          },
          'children': [],
          'childrens': [],
          'parentId': '269',
          'hasParent': true,
          'hasChildren': false
        }],
        'parentId': '268',
        'hasParent': true,
        'hasChildren': true
      }, {
        'id': '271',
        'text': '提前还款',
        'state': null,
        'checked': false,
        'attributes': {
          'icon': '',
          'url': '/loanback/tiqian'
        },
        'children': [],
        'childrens': [{
          'id': '310',
          'text': '提前还款查询',
          'state': null,
          'checked': false,
          'attributes': {
            'icon': '',
            'url': '/loanback/tiqian/havetqPay'
          },
          'children': [],
          'childrens': [],
          'parentId': '271',
          'hasParent': true,
          'hasChildren': false
        }],
        'parentId': '268',
        'hasParent': true,
        'hasChildren': true
      }],
      'childrens': [],
      'parentId': '0',
      'hasParent': false,
      'hasChildren': true
    }],
  'username': 'admin'
}
var menu = resData.menus
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
      const accessedRoutes = importComponent(menu)
      console.log(accessedRoutes)
      // menuInfo().then((res) => {
      //   debugger
      //   console.log(res)
      //   accessedRoutes = asyncRoutes || []
      // })
      // if (roles.includes('admin')) {
      //   accessedRoutes = asyncRoutes || []
      // } else {
      //   accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      // }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
