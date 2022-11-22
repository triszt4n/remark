resource "azurerm_api_management_api_operation" "operations" {
  for_each = var.api_ops_config

  operation_id        = each.key
  api_name            = azurerm_api_management_api.api.name
  api_management_name = var.apim_name
  resource_group_name = var.resource_group_name
  display_name        = each.value.display_name
  method              = each.value.method
  url_template        = each.value.url_template

  dynamic "template_parameter" {
    for_each = each.value.template_parameters

    content {
      name     = template_parameter.value
      type     = "string"
      required = true
    }
  }
}

resource "azurerm_api_management_api_operation_policy" "operation-policies" {
  for_each = var.api_ops_config

  operation_id        = azurerm_api_management_api_operation.operations[each.key].operation_id
  api_name            = azurerm_api_management_api.api.name
  api_management_name = var.apim_name
  resource_group_name = var.resource_group_name
  xml_content         = <<XML
<policies>
    <inbound>
        <base />
        <set-backend-service backend-id="${azurerm_api_management_backend.backend.name}" />
    </inbound>
    <backend>
        <base />
    </backend>
    <outbound>
        <base />
    </outbound>
    <on-error>
        <base />
    </on-error>
</policies>
XML
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
  url                 = "https://${azurerm_windows_function_app.function-app.default_hostname}"
  credentials {
    header = {
      "x-functions-key" = "${data.azurerm_function_app_host_keys.keys.default_function_key}"
    }
  }
}
