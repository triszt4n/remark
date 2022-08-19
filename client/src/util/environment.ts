const fetchEnvVar = (key: string, alternativeValue?: string) => {
  const value = process.env[key] || alternativeValue
  if (!value) throw new Error(`Environment variable ${key} not defined!`)
  return value
}

export const API_HOST = fetchEnvVar('REACT_APP_API_HOST')
export const MY_NODE_ENV = fetchEnvVar('REACT_APP_MY_NODE_ENV', 'production')
export const GOOGLE_AUTH_CLIENT_ID = fetchEnvVar('REACT_APP_GOOGLE_AUTH_CLIENT_ID')
export const UI_VERSION = fetchEnvVar('REACT_APP_UI_VERSION', '0.0.0')
