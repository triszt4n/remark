variable "resource_group_name" {
  type        = string
  description = "Resource group name"
}

variable "location" {
  type        = string
  description = "Location"
}

variable "apim_name" {
  type        = string
  description = "API Management name"
}

variable "name" {
  type        = string
  description = "Function App name"
}

variable "display_name" {
  type        = string
  description = "API display name"
}

variable "path" {
  type        = string
  description = "API path (without leading slash)"
}

variable "web_app_hostname" {
  type        = string
  description = "Web app hostname"
}

variable "custom_domain" {
  type        = string
  description = "Custom domain name"
}

variable "local_dev_server_url" {
  type        = string
  description = "Local dev server URL"
}

variable "function_apps_storage" {
  type = object({
    name               = string
    primary_access_key = string
  })
  description = "Function Apps storage account details (name, primary access key)"
}

variable "function_settings" {
  type = object({
    language = string
  })
  description = "Function App Functions' settings"
  default = {
    language = "TypeScript"
  }
}

variable "api_ops_config" {
  type = map(object({
    display_name        = string
    url_template        = string
    method              = string
    template_parameters = list(string)
    extra_bindings      = list(map(any))
  }))
  description = "API operations config"
}

variable "app_settings" {
  type        = map(string)
  description = "Function App env vars (Application Settings)"
}
