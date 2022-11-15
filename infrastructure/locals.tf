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
      get_user = {
        display_name = "GetUser"
        url_template = "/users/{id}"
        method       = "GET"
      }
      get_profile = {
        display_name = "GetProfile"
        url_template = "/profile"
        method       = "GET"
      }
      get_user_by_username = {
        display_name = "GetUserByUsername"
        url_template = "/users/username/{username}"
        method       = "GET"
      }
      login_user = {
        display_name = "LoginUser"
        url_template = "/login"
        method       = "POST"
      }
      update_user = {
        display_name = "UpdateUser"
        url_template = "/profile"
        method       = "PATCH"
      }
      update_user_image = {
        display_name = "UpdateUserImage"
        url_template = "/profile/image"
        method       = "PATCH"
      }
    }
  }
}
