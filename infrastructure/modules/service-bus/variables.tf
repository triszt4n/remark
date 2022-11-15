variable "resource_group_name" {
  type        = string
  description = "Resource group name"
}

variable "location" {
  type        = string
  description = "Location"
  default     = "West Europe"
}

variable "namespace_name" {
  type        = string
  description = "Namespace name"
}
