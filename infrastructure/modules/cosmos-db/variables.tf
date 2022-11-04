variable "resource_group_name" {
  type = string
  description = "Resource group name"
}

variable "location" {
  type = string
  description = "Location"
  default = "West Europe"
}

variable "account_name" {
  type = string
  description = "Account name"
}

variable "containers" {
  type = map(object({
    partition_key_path = string
    unique_key_paths = list(string)
  }))
  description = "Containers defined in objects with name, partition_key_path and unique_key_paths"
}
