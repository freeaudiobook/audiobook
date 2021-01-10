import axios from 'axios'

const apiPreifx = ""

export const listAllBooks = () => axios.get(`${apiPreifx}/books`)
export const readBook = (id) => axios.get(`${apiPreifx}/books/${id}`)
export const search = (params) => axios.get(`${apiPreifx}/books`, { params })