

module "users-function" {
  source               = "./modules/function-app-with-api"
  resource_group_name  = azurerm_resource_group.remark-dev-rg.name
  apim_name            = azurerm_api_management.apim.name
  name                 = "users"
  display_name         = "Users"
  path                 = "users"
  web_app_hostname     = module.static-web-app.client-web-app-hostname
  custom_domain        = local.client.domain_name
  local_dev_server_url = local.local_dev_server_url

  api_configs = local.apim.api_configs
}
