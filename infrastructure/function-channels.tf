module "channels-function" {
  source               = "./modules/function-app-with-api"
  resource_group_name  = azurerm_resource_group.remark-dev-rg.name
  location             = azurerm_resource_group.remark-dev-rg.location
  apim_name            = azurerm_api_management.apim.name
  name                 = "channels"
  display_name         = "Channels"
  path                 = "channels"
  web_app_hostname     = module.static-web-app.client-web-app-hostname
  custom_domain        = local.client.domain_name
  local_dev_server_url = local.local_dev_server_url

  function_apps_storage = {
    name               = azurerm_storage_account.function-apps-storage.name
    primary_access_key = azurerm_storage_account.function-apps-storage.primary_access_key
  }

  api_ops_config = local.api_configs["channels"]
  app_settings   = local.app_settings
}

resource "azurerm_function_app_function" "channels-cosmos-trigger-functions" {
  for_each = local.cosmos_trigger_configs["channels"]

  name            = "remark-dev-${each.key}"
  function_app_id = module.channels-function.function-app-id
  language        = "TypeScript"
  config_json = jsonencode({
    "bindings" = [
      {
        "type"                    = "cosmosDBTrigger",
        "name"                    = "documents",
        "direction"               = "in",
        "leaseCollectionName"     = "leases",
        "connectionStringSetting" = "remarkcosmosdb_DOCUMENTDB",
        "databaseName"            = "${module.cosmos-db.db-name}",
        "collectionName" : "${each.value.collection_name}",
        "createLeaseCollectionIfNotExists" : true
      }
    ]
  })
}
