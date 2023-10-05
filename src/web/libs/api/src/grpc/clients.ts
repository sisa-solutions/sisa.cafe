import { Channel, ChannelCredentials } from '@grpc/grpc-js';

import { CategoryGrpcServiceClient } from './generated/sisa/services/blog/v1/categories/category_grpc_service';
import { TagGrpcServiceClient } from './generated/sisa/services/blog/v1/tags/tag_grpc_service';

const channel = new Channel(process.env.GRPC_API_DNS, ChannelCredentials.createInsecure(), {});

export const CategoryGrpcClient = new CategoryGrpcServiceClient(
  process.env.GRPC_API_DNS,
  ChannelCredentials.createInsecure(),
  {
    channelOverride: channel,
  }
);

export const TagGrpcClient = new TagGrpcServiceClient(
  process.env.GRPC_API_DNS,
  ChannelCredentials.createInsecure(),
  {
    channelOverride: channel,
  }
);
