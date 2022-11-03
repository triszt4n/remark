module "static-web-app" {
  source         = "./modules/static-web-app"
  site_name      = local.client.site_name
  resource_group = azurerm_resource_group.remark-dev-rg.name
  domain_name    = local.client.domain_name
}
