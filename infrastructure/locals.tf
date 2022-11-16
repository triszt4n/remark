locals {
  client = {
    domain_name = var.client.domain_name
    site_name   = "client-web-app"
  }
  local_dev_server_url = var.local_dev_server_url
  service_bus = {
    namespace_name = "notifbus"
  }
  signalr = {
    name = "notifsignalr"
  }
  cosmos = {
    account_name = "cosmos"
    containers = {
      Notifications = {
        partition_key_path = "/id"
        unique_key_paths   = []
      },
      Users = {
        partition_key_path = "/id"
        unique_key_paths   = ["/email"]
      },
      ChannelJoins = {
        partition_key_path = "/id"
        unique_key_paths   = []
      },
      CommentVotes = {
        partition_key_path = "/id"
        unique_key_paths   = []
      },
      Comments = {
        partition_key_path = "/id"
        unique_key_paths   = []
      },
      PostVotes = {
        partition_key_path = "/id"
        unique_key_paths   = []
      },
      Channels = {
        partition_key_path = "/id"
        unique_key_paths   = ["/uriName"]
      },
      Posts = {
        partition_key_path = "/id"
        unique_key_paths   = []
      },
    }
  }
  api_configs = {
    users = {
      get-user = {
        display_name        = "GetUser"
        url_template        = "/users/{id}"
        method              = "GET"
        template_parameters = ["id"]
      }
      get-profile = {
        display_name        = "GetProfile"
        url_template        = "/profile"
        method              = "GET"
        template_parameters = []
      }
      get-user-by-username = {
        display_name        = "GetUserByUsername"
        url_template        = "/users/username/{username}"
        method              = "GET"
        template_parameters = ["username"]
      }
      login-user = {
        display_name        = "LoginUser"
        url_template        = "/login"
        method              = "POST"
        template_parameters = []
      }
      update-user = {
        display_name        = "UpdateUser"
        url_template        = "/profile"
        method              = "PATCH"
        template_parameters = []
      }
      update-user-image = {
        display_name        = "UpdateUserImage"
        url_template        = "/profile/image"
        method              = "PATCH"
        template_parameters = []
      }
    }
  }
  app_settings = {
    COSMOS_DB_ENDPOINT            = module.cosmos-db.db-endpoint
    COSMOS_DB_DATABASE_ID         = module.cosmos-db.db-id
    COSMOS_DB_KEY                 = module.cosmos-db.db-key
    remarkcosmosdb_DOCUMENTDB     = module.cosmos-db.connection-string
    JWT_PRIVATE_KEY               = var.jwt_private_key
    SERVICE_BUS_CONNECTION_STRING = module.service-bus.service-bus-connection-string
    SERVICE_BUS_QUEUE_NAME        = module.service-bus.service-bus-queue-name
    SIGNALR_CONNECTION_STRING     = module.signalr.connection-string
    STORAGE_ACCOUNT_KEY           = azurerm_storage_account.images.primary_access_key
    STORAGE_ACCOUNT_NAME          = azurerm_storage_account.images.name
  }
}
