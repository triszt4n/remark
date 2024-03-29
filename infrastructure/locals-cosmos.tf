locals {
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
}
