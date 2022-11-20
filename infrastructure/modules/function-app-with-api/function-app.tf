resource "azurerm_service_plan" "function-app-service-plan" {
  name                = "remark-dev-${var.name}-fapp-servplan"
  resource_group_name = var.resource_group_name
  location            = var.location
  os_type             = "Windows"
  sku_name            = "Y1"
}

resource "azurerm_windows_function_app" "function-app" {
  name                = "remark-dev-${var.name}-fapp"
  resource_group_name = var.resource_group_name
  location            = var.location

  storage_account_name       = var.function_apps_storage.name
  storage_account_access_key = var.function_apps_storage.primary_access_key
  service_plan_id            = azurerm_service_plan.function-app-service-plan.id

  site_config {}
}

resource "azurerm_windows_function_app_slot" "function-app-slot" {
  name                 = "remark-dev-${var.name}-fapp-slot"
  function_app_id      = azurerm_windows_function_app.function-app.id
  storage_account_name = var.function_apps_storage.name

  app_settings = var.app_settings
  site_config {}
}
