import { type ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const TagsLayout = ({ children }: Props) => {
  return <>{children}</>;
};

export default TagsLayout;
