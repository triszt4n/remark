module "service-bus" {
  source              = "./modules/service-bus"
  namespace_name      = local.service_bus.namespace_name
  resource_group_name = azurerm_resource_group.remark-dev-rg.name
  location            = azurerm_resource_group.remark-dev-rg.location
}
