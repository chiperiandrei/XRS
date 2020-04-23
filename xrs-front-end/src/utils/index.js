import jwt from "jwt-decode";

export const isOperator = () => {
    console.log(localStorage.getItem("user_info"))
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