export default class TokenManager {
    static getToken() {
        const token = localStorage.getItem('user_id');
        if (token) return token;
        return false;
    }

    static setToken(token) {
        localStorage.setItem('user_id', token);
    }

    static removeToken() {
        localStorage.removeItem('user_id');
    }

    static isAdmin() {
        const user_id = localStorage.getItem('user_id');
        if (!user_id) return false;
        const adminIds = ["0a2c63e5-8f44-4ef4-9bb7-62216aca6298"];
        if (adminIds.includes(user_id)) return true;
        return false;
    }
}