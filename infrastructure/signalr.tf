module "signalr" {
  source              = "./modules/signalr-service"
  name                = local.signalr.name
  resource_group_name = azurerm_resource_group.remark-dev-rg.name
  location            = azurerm_resource_group.remark-dev-rg.location
}
