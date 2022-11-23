module "signalr" {
  source              = "./modules/signalr-service"
  name                = local.signalr.name
  resource_group_name = azurerm_resource_group.remark-dev-rg.name
  location            = azurerm_resource_group.remark-dev-rg.location
  allowed_origins = [
    local.local_dev_server_url,
    "https://${local.client.domain_name}",
    "https://${module.static-web-app.client-web-app-hostname}"
  ]
}
