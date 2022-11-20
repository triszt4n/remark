locals {
  api_configs = {
    users = {
      get-user = {
        display_name        = "GetUser"
        url_template        = "/users/{id}"
        method              = "GET"
        template_parameters = ["id"]
        extra_bindings      = []
      }
      get-profile = {
        display_name        = "GetProfile"
        url_template        = "/profile"
        method              = "GET"
        template_parameters = []
        extra_bindings      = []
      }
      get-user-by-username = {
        display_name        = "GetUserByUsername"
        url_template        = "/users/username/{username}"
        method              = "GET"
        template_parameters = ["username"]
        extra_bindings      = []
      }
      login-user = {
        display_name        = "LoginUser"
        url_template        = "/login"
        method              = "POST"
        template_parameters = []
        extra_bindings      = []
      }
      update-user = {
        display_name        = "UpdateUser"
        url_template        = "/profile"
        method              = "PATCH"
        template_parameters = []
        extra_bindings      = []
      }
      update-user-image = {
        display_name        = "UpdateUserImage"
        url_template        = "/profile/image"
        method              = "PATCH"
        template_parameters = []
        extra_bindings      = []
      }
    }
    channels = {
      add-mod-to-channel = {
        display_name        = "AddModeratorToChannel"
        url_template        = "/channels/{id}/moderator"
        method              = "POST"
        template_parameters = ["id"]
        extra_bindings      = []
      }
      create-channel = {
        display_name        = "CreateChannel"
        url_template        = "/channels"
        method              = "POST"
        template_parameters = []
        extra_bindings      = []
      }
      delete-channel = {
        display_name        = "DeleteChannel"
        url_template        = "/channels/{id}"
        method              = "DELETE"
        template_parameters = ["id"]
        extra_bindings      = []
      }
      get-channel = {
        display_name        = "GetChannel"
        url_template        = "/channels/{id}"
        method              = "GET"
        template_parameters = ["id"]
        extra_bindings      = []
      }
      get-channel-id-from-uriname = {
        display_name        = "GetChannelIdFromUriName"
        url_template        = "/channels/uriName/{uriName}"
        method              = "GET"
        template_parameters = ["uriName"]
        extra_bindings      = []
      }
      get-channels = {
        display_name        = "GetChannels"
        url_template        = "/channels"
        method              = "GET"
        template_parameters = []
        extra_bindings      = []
      }
      get-joined-channels-user = {
        display_name        = "GetJoinedChannelsOfUser"
        url_template        = "/channels/user/{id}/joins"
        method              = "GET"
        template_parameters = ["id"]
        extra_bindings      = []
      }
      get-mod-info-channel = {
        display_name        = "GetModeratorInfoOfChannel"
        url_template        = "/channels/{id}/modinfo"
        method              = "GET"
        template_parameters = ["id"]
        extra_bindings      = []
      }
      join-channel = {
        display_name        = "JoinChannel"
        url_template        = "/channels/{id}/join"
        method              = "POST"
        template_parameters = ["id"]
        extra_bindings      = []
      }
      remove-mod-from-channel = {
        display_name        = "RemoveModeratorFromChannel"
        url_template        = "/channels/{id}/moderator/{moderatorId}"
        method              = "DELETE"
        template_parameters = ["id", "moderatorId"]
        extra_bindings      = []
      }
      update-channel = {
        display_name        = "UpdateChannel"
        url_template        = "/channels/{id}"
        method              = "PATCH"
        template_parameters = ["id"]
        extra_bindings      = []
      }
    }
    comments = {
      create-comment = {
        display_name        = "CreateComment"
        url_template        = "/comments"
        method              = "POST"
        template_parameters = []
        extra_bindings      = []
      }
      delete-comment = {
        display_name        = "DeleteComment"
        url_template        = "/comments/{id}"
        method              = "DELETE"
        template_parameters = ["id"]
        extra_bindings      = []
      }
      get-comment = {
        display_name        = "GetComment"
        url_template        = "/comments/{id}"
        method              = "GET"
        template_parameters = ["id"]
        extra_bindings      = []
      }
      update-comment = {
        display_name        = "UpdateComment"
        url_template        = "/comments/{id}"
        method              = "PATCH"
        template_parameters = ["id"]
        extra_bindings      = []
      }
      vote-comment = {
        display_name        = "VoteComment"
        url_template        = "/comments/{id}/vote"
        method              = "POST"
        template_parameters = ["id"]
        extra_bindings      = []
      }
    }
    posts = {
      create-post = {
        display_name        = "CreatePost"
        url_template        = "/posts"
        method              = "POST"
        template_parameters = []
        extra_bindings      = []
      }
      delete-post = {
        display_name        = "DeletePost"
        url_template        = "/posts/{id}"
        method              = "DELETE"
        template_parameters = ["id"]
        extra_bindings      = []
      }
      get-post = {
        display_name        = "GetPost"
        url_template        = "/posts/{id}"
        method              = "GET"
        template_parameters = ["id"]
        extra_bindings      = []
      }
      update-post = {
        display_name        = "UpdatePost"
        url_template        = "/posts/{id}"
        method              = "PATCH"
        template_parameters = ["id"]
        extra_bindings      = []
      }
      vote-comment = {
        display_name        = "VotePost"
        url_template        = "/posts/{id}/vote"
        method              = "POST"
        template_parameters = ["id"]
        extra_bindings      = []
      }
      get-comments-post = {
        display_name        = "GetCommentsOfPost"
        url_template        = "/posts/{id}/comments"
        method              = "GET"
        template_parameters = ["id"]
        extra_bindings      = []
      }
      get-posts-channel = {
        display_name        = "GetPostsOfChannel"
        url_template        = "/posts/channel/{id}"
        method              = "GET"
        template_parameters = ["id"]
        extra_bindings      = []
      }
      get-posts-user = {
        display_name        = "GetPostsOfUser"
        url_template        = "/posts/user/{id}"
        method              = "GET"
        template_parameters = ["id"]
        extra_bindings      = []
      }
      update-postimage = {
        display_name        = "UpdatePostImage"
        url_template        = "/posts/{id}/image"
        method              = "POST"
        template_parameters = ["id"]
        extra_bindings      = []
      }
    }
    notifications = {
      delete-notifs = {
        display_name        = "DeleteNotifications"
        url_template        = "/notifications"
        method              = "DELETE"
        template_parameters = []
        extra_bindings      = []
      }
      get-notif = {
        display_name        = "GetNotifications"
        url_template        = "/notifications"
        method              = "GET"
        template_parameters = []
        extra_bindings      = []
      }
      signalr-negotiate = {
        display_name        = "SignalrNegotiater"
        url_template        = "/negotiate"
        method              = "POST"
        template_parameters = []
        extra_bindings = [{
          "type"                    = "signalRConnectionInfo",
          "name"                    = "connectionInfo",
          "hubName"                 = "remark",
          "connectionStringSetting" = "SIGNALR_CONNECTION_STRING",
          "direction"               = "in"
        }]
      }
    }
  }
}
