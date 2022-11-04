resource "azurerm_servicebus_namespace" "namespace" {
  name                = "remark-dev-${var.namespace_name}"
  location            = var.location
  resource_group_name = var.resource_group_name
  sku                 = "Basic"
}

resource "azurerm_servicebus_queue" "queue" {
  name         = "remark-dev-${var.namespace_name}-queue"
  namespace_id = azurerm_servicebus_namespace.namespace.id
}
