# Infrastucture

Managed by Terraform.

Terraform state stored in Azure remote storage, as you can see in `main.tf`

Don't forget to set up environment variable ARM_ACCESS_KEY according to [this tutorial](https://learn.microsoft.com/en-us/azure/developer/terraform/store-state-in-azure-storage?tabs=powershell). Then you can run `terraform init` with remote state backend.
