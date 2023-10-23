import {
  DetailItem,
  DetailList,
  PageContent,
  PageHeader,
  PageLayout,
  PageTitle,
} from '@sisa/components';

import { findCommentById } from '@sisa/grpc-api';

import Breadcrumbs from 'components/common/breadcrumbs';
import getServerI18n from 'i18n/get-server-i18n';

type Props = {
  params: {
    id: string;
  };
};

const CommentDetails = async ({ params: { id } }: Props) => {
  const { t } = await getServerI18n();
  const data = await findCommentById({
    id,
  });

  return (
    <PageLayout>
      <Breadcrumbs
        items={[
          {
            title: t('label.comments'),
            url: '/comments',
          },
          {
            title: t('label.details'),
          },
        ]}
      />
      <PageHeader>
        <PageTitle>{t('label.details')}</PageTitle>
      </PageHeader>
      <PageContent>
        <DetailList orientation="horizontal">
          <DetailItem
            label={t('label.content')}
            value={
              <div
                dangerouslySetInnerHTML={{
                  __html: data.content ?? '',
                }}
              />
            }
          />
        </DetailList>
      </PageContent>
    </PageLayout>
  );
};

export default CommentDetails;
