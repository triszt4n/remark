resource "azurerm_cosmosdb_sql_container" "sql-containers" {
  for_each = var.containers

  name                = each.key
  resource_group_name = var.resource_group_name
  account_name        = azurerm_cosmosdb_account.db-account.name
  database_name       = azurerm_cosmosdb_sql_database.db.name
  partition_key_path  = each.value.partition_key_path

  indexing_policy {
    indexing_mode = "consistent"

    included_path {
      path = "/*"
    }
  }
}
