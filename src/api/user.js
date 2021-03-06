import request from '@/utils/request'
export function login(data) {
  return request({
    url: 'login',
    method: 'post',
    headers: { crossDomain: true, xhrFields: '{ withCredentials: true }' }, // 设置header信息
    data
  })
}

export function getInfo() {
  return request({
    url: 'sys/user/personal',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: 'logout',
    method: 'get'
  })
}
export function updatePeronal(data) {
  return request({
    url: 'sys/user/updatePeronal',
    method: 'post',
    data
  })
}
export function resetPwd(data) {
  return request({
    url: 'sys/user/resetPwd',
    method: 'post',
    data
  })
}
export function menuInfo() {
  return request({
    url: 'menus',
    method: 'get'
  })
}
