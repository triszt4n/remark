variable "resource_group_name" {
  type        = string
  description = "Resource group name"
}

variable "location" {
  type        = string
  description = "Location"
  default     = "West Europe"
}

variable "site_name" {
  type        = string
  description = "Site name"
}

variable "domain_name" {
  type        = string
  description = "Domain name"
}
