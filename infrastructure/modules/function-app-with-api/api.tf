resource "azurerm_api_management_api" "api" {
  name                  = "remark-dev-${var.name}-api"
  resource_group_name   = var.resource_group_name
  api_management_name   = var.apim_name
  revision              = "1"
  display_name          = "${var.display_name} API"
  path                  = var.path
  protocols             = ["https"]
  subscription_required = false
}

data "azurerm_function_app_host_keys" "keys" {
  name                = azurerm_windows_function_app.function-app.name
  resource_group_name = var.resource_group_name
}

resource "azurerm_api_management_backend" "backend" {
  name                = "remark-dev-${var.name}-backend"
  resource_group_name = var.resource_group_name
  api_management_name = var.apim_name
  protocol            = "http"
  url                 = "https://${azurerm_windows_function_app.function-app.default_hostname}/api/"
  credentials {
    header = {
      "x-functions-key" = "${data.azurerm_function_app_host_keys.keys.default_function_key}"
    }
  }
}

resource "azurerm_api_management_api_policy" "api-policy" {
  api_name            = azurerm_api_management_api.api.name
  api_management_name = var.apim_name
  resource_group_name = var.resource_group_name

  xml_content = templatefile("${path.module}/xmls/api-policy.xml", {
    local_dev_server_url = var.local_dev_server_url
    custom_domain        = var.custom_domain
    web_app_hostname     = var.web_app_hostname
    backend_id           = azurerm_api_management_backend.backend.name
  })
}
