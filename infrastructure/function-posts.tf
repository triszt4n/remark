module "posts-function" {
  source               = "./modules/function-app-with-api"
  resource_group_name  = azurerm_resource_group.remark-dev-rg.name
  location             = azurerm_resource_group.remark-dev-rg.location
  apim_name            = azurerm_api_management.apim.name
  name                 = "posts"
  display_name         = "Posts"
  path                 = "posts"
  web_app_hostname     = module.static-web-app.client-web-app-hostname
  custom_domain        = local.client.domain_name
  local_dev_server_url = local.local_dev_server_url

  function_apps_storage = {
    name               = azurerm_storage_account.function-apps-storage.name
    primary_access_key = azurerm_storage_account.function-apps-storage.primary_access_key
  }

  app_settings = local.app_settings
}
