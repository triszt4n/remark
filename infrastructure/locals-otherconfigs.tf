locals {
  cosmos_trigger_configs = {
    channels = {
      on-create-channeljoin = {
        display_name    = "CreateChannelJoinCosmosTrigger"
        collection_name = "ChannelJoins"
      }
      on-delete-channel = {
        display_name    = "DeleteChannelCosmosTrigger"
        collection_name = "Channels"
      }
    }
    comments = {
      on-create-comment = {
        display_name    = "CreateCommentCosmosTrigger"
        collection_name = "Comments"
      }
      on-delete-comment = {
        display_name    = "DeleteCommentCosmosTrigger"
        collection_name = "Comments"
      }
      on-vote-comment = {
        display_name    = "VoteCommentCosmosTrigger"
        collection_name = "CommentVotes"
      }
    }
    notifications = {
      on-create-notif = {
        display_name    = "CreateNotificationCosmosTrigger"
        collection_name = "Notifications"
      }
    }
    posts = {
      on-create-post = {
        display_name    = "CreatePostCosmosTrigger"
        collection_name = "Posts"
      }
      on-delete-post = {
        display_name    = "DeletePostCosmosTrigger"
        collection_name = "Posts"
      }
      on-vote-post = {
        display_name    = "VotePostCosmosTrigger"
        collection_name = "PostVotes"
      }
    }
  }
  service_bus_trigger_configs = {
    sb-create-notif = {
      display_name = "CreateNotificationServiceBusQueueTrigger"
      hub_name     = "remark"
    }
  }
}
