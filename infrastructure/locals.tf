locals {
  client = {
    domain_name = var.client.domain_name
    site_name   = "client-web-app"
  }
  service_bus = {
    namespace_name = "notifbus"
  }
  signalr = {
    name = "notifsignalr"
  }
}
