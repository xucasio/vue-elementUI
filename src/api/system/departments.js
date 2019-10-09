import request from '@/utils/request'
export function getList(query) {
  return request({
    url: 'system/sysDept/list',
    method: 'get',
    params: query
  })
}
export function add(data) {
  return request({
    url: 'system/sysDept/save',
    method: 'POST',
    data
  })
}
export function update(data) {
  return request({
    url: 'system/sysDept/save',
    method: 'POST',
    data
  })
}
export function remove(data) {
  return request({
    url: 'system/sysDept/remove',
    method: 'POST',
    data
  })
}
