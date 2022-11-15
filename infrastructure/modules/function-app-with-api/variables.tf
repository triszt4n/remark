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

variable "backend_function_name" {
  type        = string
  description = "Backend Function App name"
}

variable "api_ops_config" {
  type = list(object({
    op_id        = string
    display_name = string
    path         = string
  }))
  description = "API operations config"
}
