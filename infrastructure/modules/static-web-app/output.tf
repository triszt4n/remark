output "client-web-app-api-key" {
  value = azurerm_static_site.client-web-app.api_key
  description = "API key for the static web app (used by GitHub Actions)"
}

output "client-web-app-hostname" {
  value = azurerm_static_site.client-web-app.default_host_name
  description = "Default hostname for the static web app"
}
