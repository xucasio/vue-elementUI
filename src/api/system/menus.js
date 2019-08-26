import request from '@/utils/request'
export function getList(query) {
  return request({
    url: 'sys/menu/list',
    method: 'get',
    params: query
  })
}
export function add(data) {
  return request({
    url: 'sys/menu/save',
    method: 'POST',
    data
  })
}
export function update(data) {
  return request({
    url: 'sys/menu/save',
    method: 'POST',
    data
  })
}
export function remove(data) {
  return request({
    url: 'sys/menu/remove',
    method: 'POST',
    data
  })
}
