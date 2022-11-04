resource "azurerm_signalr_service" "signalr" {
  name                = "remark-dev-${var.name}"
  location            = var.location
  resource_group_name = var.resource_group_name
  sku {
    name     = "Free_F1"
    capacity = 1
  }
  cors {
    allowed_origins = ["*"]
  }
  connectivity_logs_enabled = true
  messaging_logs_enabled    = true
  service_mode              = "Serverless"
}
