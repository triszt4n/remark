resource "azurerm_service_plan" "function-app-service-plan" {
  name                = "remark-dev-${var.name}-fapp-servplan"
  resource_group_name = var.resource_group_name
  location            = var.location
  os_type             = "Linux"
  sku_name            = "Y1"
}

resource "azurerm_linux_function_app" "function-app" {
  name                = "remark-dev-${var.name}-function-app"
  resource_group_name = var.resource_group_name
  location            = var.location

  storage_account_name       = var.function_apps_storage.name
  storage_account_access_key = var.function_apps_storage.primary_access_key
  service_plan_id            = azurerm_service_plan.function-app-service-plan.id

  site_config {}
}
