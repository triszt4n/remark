resource "azurerm_cosmosdb_account" "db-account" {
  name                = "remark-dev-${var.account_name}-account"
  location            = var.location
  resource_group_name = var.resource_group_name
  offer_type          = "Standard"
  kind                = "GlobalDocumentDB"
  enable_free_tier    = true
  public_network_access_enabled = true

  backup {
    type                = "Periodic"
    interval_in_minutes = 240
    retention_in_hours  = 8
    storage_redundancy = "Geo"
  }

  consistency_policy {
    consistency_level       = "Session"
    max_interval_in_seconds = 5
    max_staleness_prefix    = 100
  }

  geo_location {
    location          = var.location
    failover_priority = 0
  }

  capacity {
    total_throughput_limit  = 4000
  }

  analytical_storage_enabled = false
  analytical_storage {
    schema_type = "WellDefined"
  }
}
