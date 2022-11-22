resource "azurerm_function_app_function" "function-app-functions" {
  for_each = var.api_ops_config

  name            = "remark-dev-${each.key}-func"
  function_app_id = azurerm_windows_function_app.function-app.id
  language        = var.function_settings.language
  config_json = jsonencode({
    "bindings" = concat([
      {
        "authLevel" = "function"
        "direction" = "in"
        "methods" = [
          each.value.method,
        ]
        "name"  = "req"
        "type"  = "httpTrigger",
        "route" = replace(each.value.url_template, "/^/+/", ""),
      },
      {
        "direction" = "out"
        "name"      = "res"
        "type"      = "http"
      },
    ], each.value.extra_bindings != null ? each.value.extra_bindings : [])
  })
}
