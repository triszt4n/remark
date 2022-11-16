variable "client" {
  type = object({
    domain_name = string
  })
  description = "Client configuration"
}

variable "local_dev_server_url" {
  type        = string
  description = "Local dev server URL"
}

variable "jwt_private_key" {
  type        = string
  description = "JWT private key"
}
