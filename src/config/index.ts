interface IConfig {
  serverHost: string
  versionType: string
  versionTypeName: string
}

const baseConfig: IConfig = {
  serverHost: import.meta.env.VITE_APP_SERVER_HOST,
  versionType: import.meta.env.VITE_APP_VERSION_TYPE,
  versionTypeName: import.meta.env.VITE_APP_VERSION_TYPE_NAME
}

export default baseConfig
