import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://e926-2a0c-5a81-8103-5e00-e116-c489-86af-d46d.ngrok.io'
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