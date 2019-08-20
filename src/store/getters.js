const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  roleName: state => state.user.roleName,
  sex: state => state.user.sex,
  birth: state => state.user.birth,
  mobile: state => state.user.mobile,
  email: state => state.user.email,
  userId: state => state.user.userId,
  liveAddress: state => state.user.liveAddress,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs
}
export default getters
