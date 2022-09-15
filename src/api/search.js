import reqeust from '@/utils/request'
/**
 *
 * @param {*} q  搜索关键词
 * @returns Promise
 */
export const getSuggestionsAPI = (q) => {
  return reqeust({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}
/**
 * 获取搜索结果
 * @param {Number} page 分页页数，非必填，不填默认值1
 * @param {Number} per_page 每一页的数据数量
 * @param {String} q 搜索关键词
 * @returns
 */
export const getResultAPI = (/* eslint-disable-line */ page, per_page, q) => {
  return reqeust({
    url: '/v1_0/search',
    params: {
      page,
      per_page,
      q
    }
  })
}
