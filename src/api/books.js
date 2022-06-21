import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://e6e0-2a0c-5a81-8103-5e00-7139-db70-d91-e04a.ngrok.io'
})

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token')
    if(token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default instance