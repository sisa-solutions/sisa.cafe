import { PencilLine } from 'lucide-react';

import {
  DetailItem,
  DetailList,
  PageContent,
  PageHeader,
  PageLayout,
  PageTitle,
} from '@sisa/components';
import { Link } from '@sisa/next';

import { findPostById } from '@sisa/grpc-api';

import Breadcrumbs from 'components/common/breadcrumbs';
import getServerI18n from 'i18n/get-server-i18n';

type Props = {
  params: {
    id: string;
  };
};

const NewCategoryPage = async ({ params: { id } }: Props) => {
  const { t } = await getServerI18n();
  const data = await findPostById({
    id,
  });

  return (
    <PageLayout>
      <Breadcrumbs
        items={[
          {
            title: t('label.posts'),
            url: '/posts',
          },
          {
            title: t('label.details'),
          },
        ]}
      />
      <PageHeader>
        <PageTitle
          endDecorator={
            <Link
              disableCache={true}
              href={`/posts/${id}/edit`}
              variant="outlined"
              fontSize="md"
              borderRadius="sm"
            >
              <PencilLine />
            </Link>
          }
        >
          {t('label.details')}
        </PageTitle>
      </PageHeader>
      <PageContent>
        <DetailList orientation="horizontal">
          <DetailItem label={t('label.title')} value={data.title} />
          <DetailItem label={t('label.category')} value={data.category?.name} />
          <DetailItem label={t('label.slug')} value={data.slug} />
          <DetailItem
            label={t('label.excerpt')}
            value={
              <div
                dangerouslySetInnerHTML={{
                  __html: data.excerpt,
                }}
              />
            }
          />
          <DetailItem
            label={t('label.content')}
            value={
              <div
                dangerouslySetInnerHTML={{
                  __html: data.content,
                }}
              />
            }
          />
          <DetailItem label={t('label.commentCount')} value={data.commentCount} />
          <DetailItem label={t('label.createdBy')} value={data.creator?.displayName} />
          <DetailItem
            label={t('label.createdAt')}
            value={data.creator?.timestamp?.toLocaleString()}
          />
          <DetailItem label={t('label.updatedBy')} value={data.updater?.displayName} />
          <DetailItem
            label={t('label.updatedAt')}
            value={data.updater?.timestamp?.toLocaleString()}
          />
        </DetailList>
      </PageContent>
    </PageLayout>
  );
};

export default NewCategoryPage;
