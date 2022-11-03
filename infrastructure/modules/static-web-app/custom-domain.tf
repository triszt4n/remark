resource "azurerm_static_site_custom_domain" "example" {
  static_site_id  = azurerm_static_site.client-web-app.id
  domain_name     = var.domain_name
  validation_type = "cname-delegation"
}
