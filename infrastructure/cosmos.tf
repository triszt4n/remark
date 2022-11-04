module "cosmos-db" {
  source              = "./modules/cosmos-db"
  resource_group_name = azurerm_resource_group.remark-dev-rg.name
  location            = azurerm_resource_group.remark-dev-rg.location
  account_name        = local.cosmos.account_name
  containers          = local.cosmos.containers
}
