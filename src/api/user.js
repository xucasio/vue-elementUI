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

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
