import request from '@/utils/request'

export function getCourse() {
  return request({
    url: 'api/course',
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: 'api/course',
    method: 'post',
    data: data
  })
}

export function del(ids) {
  return request({
    url: 'api/course/',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/course',
    method: 'put',
    data: data
  })
}

export default { getCourse, add, edit, del }
