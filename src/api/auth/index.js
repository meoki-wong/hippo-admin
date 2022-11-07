import request from "../../utils/request/axios.module";

/**登录 */
export function login(data){
    return request({
        url: "/login",
        method: "post",
        data
    })
}