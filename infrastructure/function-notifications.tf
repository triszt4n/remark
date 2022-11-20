module "notifications-function" {
  source               = "./modules/function-app-with-api"
  resource_group_name  = azurerm_resource_group.remark-dev-rg.name
  location             = azurerm_resource_group.remark-dev-rg.location
  apim_name            = azurerm_api_management.apim.name
  name                 = "notifications"
  display_name         = "Notifications"
  path                 = "notifications"
  web_app_hostname     = module.static-web-app.client-web-app-hostname
  custom_domain        = local.client.domain_name
  local_dev_server_url = local.local_dev_server_url

  function_apps_storage = {
    name               = azurerm_storage_account.function-apps-storage.name
    primary_access_key = azurerm_storage_account.function-apps-storage.primary_access_key
  }

  api_ops_config = local.api_configs["notifications"]
  app_settings   = local.app_settings
}

resource "azurerm_function_app_function" "notifications-cosmos-trigger-functions" {
  for_each = local.cosmos_trigger_configs["notifications"]

  name            = "remark-dev-${each.key}-trigger"
  function_app_id = module.notifications-function.function-app-id
  language        = "TypeScript"
  config_json = jsonencode({
    "bindings" = [
      {
        "type"                             = "cosmosDBTrigger",
        "name"                             = "documents",
        "direction"                        = "in",
        "leaseCollectionName"              = "leases",
        "connectionStringSetting"          = "remarkcosmosdb_DOCUMENTDB",
        "databaseName"                     = "${module.cosmos-db.db-name}",
        "collectionName"                   = "${each.value.collection_name}",
        "createLeaseCollectionIfNotExists" = true
      }
    ]
  })
}

resource "azurerm_function_app_function" "service-bus-trigger-functions" {
  for_each = local.service_bus_trigger_configs

  name            = "remark-dev-${each.key}-trigger"
  function_app_id = module.notifications-function.function-app-id
  language        = "TypeScript"
  config_json = jsonencode({
    "bindings" = [
      {
        "name"       = "queueItem",
        "type"       = "serviceBusTrigger",
        "direction"  = "in",
        "queueName"  = "${module.service-bus.service-bus-queue-name}",
        "connection" = "SERVICE_BUS_CONNECTION_STRING"
      },
      {
        "type"                    = "signalR",
        "name"                    = "signalRMessages",
        "hubName"                 = "remark",
        "connectionStringSetting" = "SIGNALR_CONNECTION_STRING",
        "direction"               = "out"
      }
    ]
  })
}
