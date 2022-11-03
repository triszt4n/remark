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

# Universally used resource group in project
resource "azurerm_resource_group" "remark-dev-rg" {
  name     = "remark-dev-rg"
  location = "westeurope"
}
