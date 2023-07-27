// import axios from 'axios'

// export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

// const api = ({ apiEndPoint, method, payload }: any) => {
//   const apiUrl = BASE_URL + apiEndPoint
//   const getApiCall = () => {
//     try {const res = axios.get(`${apiUrl}`, {
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Content-Type': 'application/json'
//       }
//     })
//     return res
// }catch((errr:any) => {
//      if(errr.code === 500){
//         console.log(errr)
//      }
//     })
//   }
//   const postApiCall = () => {
//     const res = axios.post(`${apiUrl}`, payload, {
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Content-Type': 'application/json'
//       }
//     })
//     return res
//   }
//   const deleteApiCall = () => {
//     const res = axios.delete(`${apiUrl}`, {
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Content-Type': 'application/json'
//       }
//     })
//     return res

//   }

//   switch (method) {
//     case 'GET':
//       getApiCall()
//     case 'POST':
//       postApiCall()
//     case 'DELETE':
//       deleteApiCall()
//   }
// }

// export default api
