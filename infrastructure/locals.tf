locals {
  client = {
    domain_name = var.client_domain_name
    site_name   = "client-web-app"
  }
  local_dev_server_url = var.local_dev_server_url
  service_bus = {
    namespace_name = "notifbus"
  }
  signalr = {
    name = "notifsignalr"
  }
  app_settings = {
    COSMOS_DB_ENDPOINT            = module.cosmos-db.db-endpoint
    COSMOS_DB_DATABASE_ID         = module.cosmos-db.db-name
    COSMOS_DB_KEY                 = module.cosmos-db.db-key
    remarkcosmosdb_DOCUMENTDB     = module.cosmos-db.connection-string
    JWT_PRIVATE_KEY               = var.jwt_private_key
    SERVICE_BUS_CONNECTION_STRING = module.service-bus.service-bus-connection-string
    SERVICE_BUS_QUEUE_NAME        = module.service-bus.service-bus-queue-name
    SIGNALR_CONNECTION_STRING     = module.signalr.connection-string
    STORAGE_ACCOUNT_KEY           = azurerm_storage_account.images.primary_access_key
    STORAGE_ACCOUNT_NAME          = azurerm_storage_account.images.name
  }
}
