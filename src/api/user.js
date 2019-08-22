import request from '@/utils/request'
import { proxyPrex } from '@/settings'
export function login(data) {
  return request({
    url: proxyPrex + 'login',
    method: 'post',
    headers: { crossDomain: true, xhrFields: '{ withCredentials: true }' }, // 设置header信息
    data
  })
}

export function getInfo() {
  return request({
    url: proxyPrex + 'sys/user/personal',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: proxyPrex + 'logout',
    method: 'get'
  })
}
export function updatePeronal(data) {
  return request({
    url: proxyPrex + 'sys/user/updatePeronal',
    method: 'post',
    data
  })
}
export function resetPwd(data) {
  return request({
    url: proxyPrex + 'sys/user/resetPwd',
    method: 'post',
    data
  })
}
export function menuInfo() {
  return request({
    url: proxyPrex + 'menus',
    method: 'get'
  })
}
