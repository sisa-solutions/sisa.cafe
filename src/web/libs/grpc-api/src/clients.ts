import { Channel, ChannelCredentials } from '@grpc/grpc-js';

import { CategoryGrpcServiceClient } from './generated/sisa/services/blog/v1/categories/category_grpc_service';
import { TagGrpcServiceClient } from './generated/sisa/services/blog/v1/tags/tag_grpc_service';
import { PostGrpcServiceClient } from './generated/sisa/services/blog/v1/posts/post_grpc_service';
import { CommentGrpcServiceClient } from './generated/sisa/services/blog/v1/comments/comment_grpc_service';
import { FileGrpcServiceClient } from './generated/sisa/services/blog/v1/files/file_grpc_service';

const channel = new Channel(process.env.GRPC_API_HOST, ChannelCredentials.createInsecure(), {});

export const CategoryGrpcClient = new CategoryGrpcServiceClient(
  process.env.GRPC_API_HOST,
  ChannelCredentials.createInsecure(),
  {
    channelOverride: channel,
  }
);

export const TagGrpcClient = new TagGrpcServiceClient(
  process.env.GRPC_API_HOST,
  ChannelCredentials.createInsecure(),
  {
    channelOverride: channel,
  }
);

export const PostGrpcClient = new PostGrpcServiceClient(
  process.env.GRPC_API_HOST,
  ChannelCredentials.createInsecure(),
  {
    channelOverride: channel,
  }
);

export const CommentGrpcClient = new CommentGrpcServiceClient(
  process.env.GRPC_API_HOST,
  ChannelCredentials.createInsecure(),
  {
    channelOverride: channel,
  }
);


export const FileGrpcClient = new FileGrpcServiceClient(
  process.env.GRPC_API_HOST,
  ChannelCredentials.createInsecure(),
  {
    channelOverride: channel,
  }
);
