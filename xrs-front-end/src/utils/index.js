import jwt from "jwt-decode";

export const isOperator = () => {
    if (localStorage.getItem("user_info") == null) {
        return false
    }
    else {
        try {
            const isAdmin = jwt(localStorage.getItem("user_info")).isOperator;
            return isAdmin;

        } catch (error) {
            return false
        }
    }
}
export const isLogged = () => {
    if (localStorage.getItem("user_info") == null) {
        return false
    }
    else {
        try {
            const isLogged = jwt(localStorage.getItem("user_info")).iat;
            if (isLogged !== undefined || isLogged !== null)
                return true;

        } catch (error) {
            return false
        }
    }
}