output "db-id" {
  value = azurerm_cosmosdb_sql_database.db.id
}

output "db-endpoint" {
  value = azurerm_cosmosdb_account.db-account.endpoint
}

output "db-key" {
  value = azurerm_cosmosdb_account.db-account.primary_key
}

output "db-name" {
  value = azurerm_cosmosdb_sql_database.db.name
}

output "connection-string" {
  value = azurerm_cosmosdb_account.db-account.primary_sql_connection_string
}
