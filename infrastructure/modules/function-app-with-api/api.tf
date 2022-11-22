module "function-app-api" {
  source               = "../apim-api"
  resource_group_name  = var.resource_group_name
  apim_name            = var.apim_name
  name                 = var.name
  display_name         = var.display_name
  path                 = var.path
  web_app_hostname     = var.web_app_hostname
  custom_domain        = var.custom_domain
  local_dev_server_url = var.local_dev_server_url
  api_ops_config       = var.api_ops_config
  backend_function = {
    name = "remark-dev-${var.name}-backend"
    url  = "https://${azurerm_windows_function_app.function-app.default_hostname}"
  }
}

# data "azurerm_function_app_host_keys" "keys" {
#   name                = azurerm_windows_function_app.function-app.name
#   resource_group_name = var.resource_group_name
# }

resource "azurerm_api_management_backend" "backend" {
  name                = "remark-dev-${var.name}-backend"
  resource_group_name = var.resource_group_name
  api_management_name = var.apim_name
  protocol            = "http"
  url                 = "https://${azurerm_windows_function_app.function-app.default_hostname}"
  # credentials {
  #   header = {
  #     "x-functions-key" = "${data.azurerm_function_app_host_keys.keys.default_function_key}"
  #   }
  # }
}
