import request from '@/utils/request'
import { proxyPrex } from '@/settings'
export function getArea(data) {
  return request({
    url: proxyPrex + 'area/getArea',
    method: 'post',
    data
  })
}
