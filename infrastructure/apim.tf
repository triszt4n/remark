resource "azurerm_api_management" "apim" {
  name                = "remark-dev-apim"
  location            = azurerm_resource_group.remark-dev-rg.location
  resource_group_name = azurerm_resource_group.remark-dev-rg.name
  publisher_name      = "triszt4n"
  publisher_email     = "trisztanpiller@edu.bme.hu"

  sku_name = "Consumption_0"
}
