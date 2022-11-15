module "function-app-api" {
  source                = "../apim-api"
  resource_group_name   = var.resource_group_name
  apim_name             = var.apim_name
  name                  = var.name
  display_name          = var.display_name
  path                  = var.path
  web_app_hostname      = var.web_app_hostname
  custom_domain         = var.custom_domain
  local_dev_server_url  = var.local_dev_server_url
  api_ops_config        = var.api_ops_config
  backend_function_name = "remark-dev-${var.name}-function-app"
}
