export default function ({store, redirect}) {
    if(store.state.user) { // 如果已登录返回到 首页
        return redirect('/')
    }
}