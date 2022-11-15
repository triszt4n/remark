resource "azurerm_cosmosdb_sql_database" "db" {
  name                = "remark-dev-${var.account_name}-database"
  resource_group_name = var.resource_group_name
  account_name        = azurerm_cosmosdb_account.db-account.name
  autoscale_settings {
    max_throughput = 1000
  }
}
