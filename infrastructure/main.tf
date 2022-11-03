terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.29.0"
    }
  }

  required_version = ">= 1.1.0"
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "remark-dev-rg" {
  name     = "remark-dev-rg"
  location = "westeurope"
}

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
