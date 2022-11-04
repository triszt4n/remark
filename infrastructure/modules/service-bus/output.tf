output "service-bus-connection-string" {
  value = azurerm_servicebus_namespace.namespace.default_primary_connection_string
  description = "Service bus connection string"
}

output "service-bus-primary-key" {
  value = azurerm_servicebus_namespace.namespace.default_primary_key
  description = "Service bus primary key"
}

output "service-bus-queue-name" {
  value = azurerm_servicebus_queue.queue.name
  description = "Service bus queue name"
}
