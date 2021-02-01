/**
 * 请求统一管理
 */
import Request from '../api/axios'

/* Common */
const rankGender = data => Request.get('/ranking/gender', data)

export default {
    rankGender
}
