resource "azurerm_api_management_api" "api" {
  name                  = "remark-dev-${var.name}-api"
  resource_group_name   = var.resource_group_name
  api_management_name   = var.apim_name
  revision              = "1"
  display_name          = "${var.display_name} API"
  path                  = var.path
  protocols             = ["https"]
  subscription_required = false
}

resource "azurerm_api_management_api_policy" "api-policy" {
  api_name            = azurerm_api_management_api.api.name
  api_management_name = var.apim_name
  resource_group_name = var.resource_group_name

  xml_content = <<XML
<policies>
    <inbound>
        <base />
        <cors allow-credentials="false">
            <allowed-origins>
                <origin>${var.local_dev_server_url}</origin>
                <origin>https://${var.custom_domain}</origin>
                <origin>https://${var.web_app_hostname}</origin>
            </allowed-origins>
            <allowed-methods>
                <method>GET</method>
                <method>POST</method>
                <method>DELETE</method>
                <method>PATCH</method>
            </allowed-methods>
            <allowed-headers>
                <header>*</header>
            </allowed-headers>
            <expose-headers>
                <header>*</header>
            </expose-headers>
        </cors>
    </inbound>
    <backend>
        <base />
    </backend>
    <outbound>
        <base />
    </outbound>
    <on-error>
        <base />
    </on-error>
</policies>
XML
}
