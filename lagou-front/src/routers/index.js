import SMERouter from 'sme-router'
import { login, index } from "../controllers/index.js"

//把模板渲染到id等于root的标签内
const router = new SMERouter('root')

// router.route('/', (req, res, next) => {
//     res.render(loginHtml)
// })

// router.route('/index', (req, res, next) => {
//     res.render(index)
// })

//login()会返回 (req, res, next) => {
//     res.render(index)
// }这样一个函数

//该页面只做路由操作,根据给定的路径执行对应的函数
router.route('/', login(router))

router.route('/index', index(router))

export default router;