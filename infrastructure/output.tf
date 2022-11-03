output "client" {
  value = {
    web_app_api_key = module.static-web-app.client-web-app-api-key
    web_app_hostname = module.static-web-app.client-web-app-hostname
  }
}
