/// <reference types="vite/client" />
interface ImportMetaEnv {
  /** 接口请求地址 */
  VITE_APP_SERVER_HOST: string
  /** 系统版本名称（development、staging、production） */
  VITE_APP_VERSION_TYPE: string
  /** 系统版本名称（开发版、测试版、正式版） */
  VITE_APP_VERSION_TYPE_NAME: string
}
