# Infrastucture

Managed by Terraform.

Terraform state stored in Azure remote storage, as you can see in `main.tf`

Don't forget to set up environment variable ARM_ACCESS_KEY according to [this tutorial](https://learn.microsoft.com/en-us/azure/developer/terraform/store-state-in-azure-storage?tabs=powershell). Then you can run `terraform init` with remote state backend.

Resources used only once are found in the infrastructure root folder. Other reused modules are found in the modules folder.

To apply changes, run `terraform apply -var-file=dev.tfvars`.

Once output `web_app_api_key` changes, change the GitHub action secret `WEB_APP_API_KEY` accordingly.
Once a new static web app is deployed, the custom domain will fail, set up CNAME before running again.
