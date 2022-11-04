output "client" {
  value = {
    web_app_api_key  = module.static-web-app.client-web-app-api-key
    web_app_hostname = module.static-web-app.client-web-app-hostname
  }
}

output "service-bus" {
  value = {
    connection_string = module.service-bus.service-bus-connection-string
    queue_name        = module.service-bus.service-bus-queue-name
  }
  sensitive = true
}

output "signalr" {
  value = {
    connection_string = module.signalr.connection-string
    hostname          = module.signalr.hostname
  }
  sensitive = true
}

output "storage" {
  value = {
    account_key                = azurerm_storage_account.images.primary_access_key
    account_name               = azurerm_storage_account.images.name
    post_images_container_name = azurerm_storage_container.post-images.name
    user_images_container_name = azurerm_storage_container.user-images.name
  }
  sensitive = true
}
