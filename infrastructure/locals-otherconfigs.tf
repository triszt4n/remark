locals {
  cosmos_trigger_configs = {
    channels = {
      create-channel-join = {
        display_name    = "CreateChannelJoinCosmosTrigger"
        collection_name = "ChannelJoins"
      }
      delete-channel = {
        display_name    = "DeleteChannelCosmosTrigger"
        collection_name = "Channels"
      }
    }
    comments = {
      create-comment = {
        display_name    = "CreateCommentCosmosTrigger"
        collection_name = "Comments"
      }
      delete-comment = {
        display_name    = "DeleteCommentCosmosTrigger"
        collection_name = "Comments"
      }
      vote-comment = {
        display_name    = "VoteCommentCosmosTrigger"
        collection_name = "CommentVotes"
      }
    }
    notifications = {
      create-notification = {
        display_name    = "CreateNotificationCosmosTrigger"
        collection_name = "Notifications"
      }
    }
    posts = {
      create-post = {
        display_name    = "CreatePostCosmosTrigger"
        collection_name = "Posts"
      }
      delete-post = {
        display_name    = "DeletePostCosmosTrigger"
        collection_name = "Posts"
      }
      vote-post = {
        display_name    = "VotePostCosmosTrigger"
        collection_name = "PostVotes"
      }
    }
  }
  service_bus_trigger_configs = {
    create-nofitication-in-queue = {
      display_name = "CreateNotificationServiceBusQueueTrigger"
      hub_name     = "remark"
    }
  }
}
