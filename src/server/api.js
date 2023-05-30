import service from "./http";

export const getJson = (data) => {
  return service({
    url: '/api/getData',
    method: 'get',
    data
  }) 
}
export const postJson = (data) => {
  return service({
    url: '/api/saveData',
    method: 'post',
    data
  }) 
}
