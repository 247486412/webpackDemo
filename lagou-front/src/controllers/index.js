import indexTPL from "../views/index.art";
import loginTPL from "../views/login.art";
//引入的文件,webpack编译后是一个module.exports = function暴露出来的函数,返回该文件的页面内容
const indexHtml = indexTPL();
const loginHtml = loginTPL();
// $("#root").html(html)
// $("#root").html(login);

const loginSubmit = (router)=>{
    return(event)=>{
        //阻止表单提交的默认事件
        event.preventDefault();
        //跳转到自定义的路径
        router.go("/index")
    }
}


//根据不同的路径做不同的处理并返回结果
const login = (router) => {
    return (req, res, next) => {
        res.render(loginHtml)
        $("#login").on("submit",loginSubmit(router))
    }
}

const index = (router) => {
    return (req, res, next) => {
        res.render(indexHtml)
        //跳转index页面时调用resize方法,因为页面中是窗口resize时页面大小才和窗口一样大
        $(".wrapper").resize()
    }
}
//把函数暴露出去
export {
    login, index
}