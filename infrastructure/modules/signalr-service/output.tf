output "connection-string" {
  value       = azurerm_signalr_service.signalr.primary_connection_string
  description = "Connection string"
}

output "hub-name" {
  value       = azurerm_signalr_service.signalr.name
  description = "Hub name"
}

output "primary-access-key" {
  value       = azurerm_signalr_service.signalr.primary_access_key
  description = "Primary key"
}

output "hostname" {
  value       = azurerm_signalr_service.signalr.hostname
  description = "Hostname, FQDN"
}
