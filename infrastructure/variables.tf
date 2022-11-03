variable "client" {
  type = object({
    domain_name = string
  })
  description = "Client configuration"
}
