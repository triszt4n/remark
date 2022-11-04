resource "azurerm_cosmosdb_sql_container" "example" {
  for_each = var.containers

  name                  = each.key
  resource_group_name   = var.resource_group_name
  account_name          = "remark-dev-${var.account_name}-account"
  database_name         = "remark-dev-${var.account_name}-database"
  partition_key_path    = each.value.partition_key_path

  indexing_policy {
    indexing_mode = "consistent"

    included_path {
      path = "/*"
    }

    excluded_path {
      path = "/\"_etag\"/?"
    }
  }

  unique_key {
    paths = each.value.unique_key_paths
  }
}
