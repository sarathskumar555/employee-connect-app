import Cookies from 'js-cookie'
import Router from "next/router";





class AuthServices {
    constructor() { }
    getAuth = () => {
       const access = Cookies.get('accessToken')
      const  refresh = Cookies.get('refreshToken')
      console.log(access,refresh,"ggggg")
        if (access && refresh) {
            return {
                access,
                refresh
            }
        }
        else {
            return {}
        }
    }
    setAuth = ({headers}) => {
        Cookies.set("refreshToken", headers['refresh-token']);
        Cookies.set("accessToken", headers['x-access-token']);
    }
    clearSession = () => {
        Cookies.remove('accessToken')
        Cookies.remove('refreshToken')
        Router.push("/login")
    }
}

export default AuthServices;