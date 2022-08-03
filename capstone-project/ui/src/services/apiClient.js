import axios from "axios"

class ApiClient {

    constructor(remoteHostUrl) {
        this.remoteHostUrl = remoteHostUrl
        this.token = null
        this.tokenName = "capstone_token"
    }

    setToken(token) {
        this.token = token
        localStorage.setItem(this.tokenName, token)
    }

    async request({endpoint, method ='GET', data= {}}) {
        const url = `${this.remoteHostUrl}/${endpoint}`

        const headers = {
            "Content-Type": "application/json",
            Authorization: this.token ? `Bearer ${this.token}` : "",
        }

        try {
            const res = await axios({ url, method, data, headers })
            return { data: res.data, error: null }
        } catch (err) {
            console.error({ errorResponse: err.response })
            const message = err?.response?.data?.error?.message
            return { data: null, error: message || String(err) }
        }
    }

    async fetchUserFromToken() {
        return await this.request({ endpoint: `auth/me`, method: `GET` })
    }

    async loginUser(credentials) {
        return await this.request({ endpoint: `auth/login`, method: `POST`, data: credentials })
    }

    async signupUser(credentials) {
        return await this.request({ endpoint: `auth/register`, method: `POST`, data: credentials })
    }

    async updateUserInfo(credentials) {
        return await this.request({ endpoint: `auth/update-account`, method: `PUT`, data: credentials })
    }

    async updateUserEmail(credentials) {
        return await this.request({ endpoint: `auth/update-email`, method: `PUT`, data: credentials })
    }

    async updateUserPassword(credentials) {
        return await this.request({ endpoint: `auth/update-password`, method: `PUT`, data: credentials })
    }

    async deleteUser(credentials) {
        return await this.request({ endpoint: `auth/delete-account`, method: `DELETE`, data: credentials })
    }

    async logoutUser() {
        this.setToken(null)
        localStorage.setItem(this.tokenName, "")
    }
}

export default new ApiClient("https://collabutest.herokuapp.com")