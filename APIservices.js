import AuthServices from './AuthServices'
import axios from 'axios'
import { resolveHref } from 'next/dist/next-server/lib/router/router';
import Router from "next/router";



class APIservices {
url;
headers;
    authService = new AuthServices();
    constructor() {
        this.url=process.env.baseUrl
        this.headers=this.authService.getAuth()
    }
    post = async ({ body, api }) => {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}${api}`, body).
                then((res) => {
                    const { headers, data } = res
                    if (headers.authorization != 'true') {
                        this.authService.clearSession();
                        resolve({})
                    }
                    if (headers['refresh-token'] && headers['x-access-token']) {
                        this.authService.setAuth({ headers })
                    }
                    resolve(data)
                }).catch((err) => {
                    reject(err)

                })
        })

    }
    update = async ({ api, body }) => {
        return new Promise((resolve, reject) => {
            const { access, refresh } = this.authService.getAuth()
            if (access && refresh) {
                axios.patch(api, body, { headers: { 'x-access-token': access, 'refresh-token': refresh } }).
                    then((res) => {
                        const { headers, data } = res
                        if (headers.authorization != 'true') {
                            this.authService.clearSession();
                            resolve({})
                        }
                        resolve(data)
                    }).catch((err) => {
                        reject(err)
                    })
            }
            else {
                Router.push("/login")
            }
        })

    }
    get(api, { refreshToken, accessToken }) {
        return new Promise((resolve, reject) => {
            const{access,refresh}=this.headers
            const url = this.baseURL
            axios.get(api, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': accessToken,
                    'refresh-token': refreshToken
                }
            })
                .then((response) => {
                    resolve(response.data)
                }, (err) => {
                    reject(err)
                })
        })
    }


    deleted = async ({ api }) => {
        return new Promise((resolve, reject) => {
            const { access, refresh } = this.authService.getAuth()
            if (access && refresh) {
                axios.delete(api, { headers: { 'x-access-token': access, 'refresh-token': refresh } }).
                    then((res) => {
                        const { headers, data } = res
                        if (headers.authorization != 'true') {
                            this.authService.clearSession();
                            resolve({})
                        }
                        resolve(data)
                    }).catch((err) => {
                        reject(err)
                    })
            }
            else {
                Router.push("/login")
            }
        })

    }




}






export default APIservices