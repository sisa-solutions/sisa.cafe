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

import { findTagById } from '@sisa/grpc-api';

import Breadcrumbs from 'components/common/breadcrumbs';
import getServerI18n from 'i18n/get-server-i18n';

type Props = {
  params: {
    id: string;
  };
};

const NewTagPage = async ({ params: { id } }: Props) => {
  const { t } = await getServerI18n();
  const data = await findTagById({
    id,
  });

  return (
    <PageLayout>
      <Breadcrumbs
        items={[
          {
            title: t('label.tags'),
            url: '/tags',
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
              href={`/tags/${id}/edit`}
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
          <DetailItem label="Name" value={data.name} />
          <DetailItem label="Slug" value={data.slug} />
          <DetailItem
            label="Description"
            value={
              <div
                dangerouslySetInnerHTML={{
                  __html: data.description ?? '',
                }}
              />
            }
          />
        </DetailList>
      </PageContent>
    </PageLayout>
  );
};

export default NewTagPage;
