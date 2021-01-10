import axios from 'axios'

const apiPreifx = "/api"

export const listAllBooks = () => axios.get(`${apiPreifx}/books`)
export const readBook = (id) => axios.get(`${apiPreifx}/books/${id}`)
export const search = (params) => axios.get(`${apiPreifx}/search`, { params })
export const getCurrentUser = () => axios.get(`/currentuser`)