export default function ({store, redirect}) {
    if(!store.state.user) { // 如果未登录返回到 登录页
        return redirect('/login')
    }
}