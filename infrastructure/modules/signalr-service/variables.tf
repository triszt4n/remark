variable "resource_group_name" {
  type        = string
  description = "Resource group name"
}

variable "location" {
  type        = string
  description = "Location"
  default     = "West Europe"
}

variable "name" {
  type        = string
  description = "SignalR service name"
}
