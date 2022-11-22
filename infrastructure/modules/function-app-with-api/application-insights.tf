resource "azurerm_application_insights" "insights" {
  name                = "remark-dev-${var.name}-insights"
  location            = var.location
  resource_group_name = var.resource_group_name
  application_type    = "Node.JS"
}
