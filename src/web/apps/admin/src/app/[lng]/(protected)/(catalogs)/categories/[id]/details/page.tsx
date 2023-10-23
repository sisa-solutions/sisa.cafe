import { PencilLine } from 'lucide-react';

import { dayUtils } from '@sisa/i18n';

import {
  DetailItem,
  DetailList,
  PageContent,
  PageHeader,
  PageLayout,
  PageTitle,
} from '@sisa/components';
import { Link } from '@sisa/next';

import { findCategoryById } from '@sisa/grpc-api';

import Breadcrumbs from 'components/common/breadcrumbs';
import getServerI18n from 'i18n/get-server-i18n';

type Props = {
  params: {
    id: string;
  };
};

const NewCategoryPage = async ({ params: { id } }: Props) => {
  const { t } = await getServerI18n();

  const data = await findCategoryById({
    id,
  });

  return (
    <PageLayout>
      <Breadcrumbs
        items={[
          {
            title: t('label.categories'),
            url: '/categories',
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
              href={`/categories/${id}/edit`}
              variant="outlined"
              fontSize="md"
              borderRadius="sm"
            >
              <PencilLine />
            </Link>
          }
        >
          {t('label.categories')}
        </PageTitle>
      </PageHeader>
      <PageContent>
        <DetailList orientation="horizontal">
          <DetailItem label={t('label.name')} value={data.name} />
          <DetailItem label={t('label.parentCategory')} value={data.parent?.name} />
          <DetailItem label={t('label.slug')} value={data.slug} />
          <DetailItem
            label={t('label.description')}
            value={
              <div
                dangerouslySetInnerHTML={{
                  __html: data.description ?? '',
                }}
              />
            }
          />
          <DetailItem label={t('label.createdBy')} value={data.creator?.displayName} />
          <DetailItem
            label={t('label.createdAt')}
            value={dayUtils(data.creator?.timestamp).fromNow()}
          />
          <DetailItem label={t('label.updatedBy')} value={data.updater?.displayName} />
          <DetailItem
            label={t('label.updatedAt')}
            value={dayUtils(data.updater?.timestamp).fromNow()}
          />
        </DetailList>
      </PageContent>
    </PageLayout>
  );
};

export default NewCategoryPage;
