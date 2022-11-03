resource "azurerm_static_site" "client-web-app" {
  name                = "remark-dev-${var.site_name}"
  resource_group_name = var.resource_group
  location            = "West Europe"
}
