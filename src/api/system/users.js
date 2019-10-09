import request from '@/utils/request'
export function getList(query) {
  return request({
    url: 'sys/user/list',
    method: 'get',
    params: query
  })
}
export function add(data) {
  return request({
    url: 'sys/role/save',
    method: 'POST',
    data
  })
}
export function update(data) {
  return request({
    url: 'sys/role/update',
    method: 'POST',
    data
  })
}
export function remove(data) {
  return request({
    url: 'sys/role/remove',
    method: 'POST',
    data
  })
}
export function menuTree(str) {
  return request({
    url: 'system/sysDept/tree' + str,
    method: 'Get'
  })
}
