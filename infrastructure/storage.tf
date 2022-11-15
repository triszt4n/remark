# Terraform remote state backend
resource "azurerm_storage_account" "remark-dev-tfstate" {
  name                            = "remarkdevtfstate"
  resource_group_name             = azurerm_resource_group.remark-dev-rg.name
  location                        = azurerm_resource_group.remark-dev-rg.location
  account_tier                    = "Standard"
  account_replication_type        = "LRS"
  allow_nested_items_to_be_public = true
}

resource "azurerm_storage_container" "remark-dev-tfstate" {
  name                  = "remarkdevtfstate"
  storage_account_name  = azurerm_storage_account.remark-dev-tfstate.name
  container_access_type = "blob"
}

# Function App storage
resource "azurerm_storage_account" "function-apps-storage" {
  name                     = "remarkdevfunctionapps"
  resource_group_name      = azurerm_resource_group.remark-dev-rg.name
  location                 = azurerm_resource_group.remark-dev-rg.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

# Image Blob storage
resource "azurerm_storage_account" "images" {
  name                            = "remarkdevimages"
  resource_group_name             = azurerm_resource_group.remark-dev-rg.name
  location                        = azurerm_resource_group.remark-dev-rg.location
  account_tier                    = "Standard"
  account_replication_type        = "LRS"
  allow_nested_items_to_be_public = true
}

resource "azurerm_storage_container" "post-images" {
  name                  = "remark-dev-post-images"
  storage_account_name  = azurerm_storage_account.images.name
  container_access_type = "blob"
}

resource "azurerm_storage_container" "user-images" {
  name                  = "remark-dev-user-images"
  storage_account_name  = azurerm_storage_account.images.name
  container_access_type = "blob"
}
