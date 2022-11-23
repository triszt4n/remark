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
