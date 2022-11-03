terraform {
  backend "azurerm" {
    resource_group_name  = "remark-dev-rg"
    storage_account_name = "remarkdevtfstate"
    container_name       = "remarkdevtfstate"
    key                  = "terraform.tfstate"
  }
}
