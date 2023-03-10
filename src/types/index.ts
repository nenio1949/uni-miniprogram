interface RootState {
  /** 用户信息 */
  userInfo: any
  /** 登录token */
  token: string
  /** 所有项目 */
  projects: any[]
  /** 当前选中项目 */
  selectedProject: any
}

export { RootState }
