import axios from 'axios'

export function post (url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(res => {
        let subCode = res.data.code.split('-').pop()
        if (subCode === 'success') {
          resolve(res.data.data)
        } else {
          // Message.error(res.data.message)
        }
      })
      .catch(error => {
        // Message.error(error.message)
      })
  })
}

export function get (url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {params: params})
      .then(res => {
        let subCode = res.data.code.split('-').pop()
        if (subCode === 'success') {
          resolve(res.data.data)
        } else {
          // Message.error(res.data.message)
        }
      })
      .catch(error => {
        // Message.error(error.message)
      })
  })
}
