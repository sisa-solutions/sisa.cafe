import { type ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const CategoriesLayout = ({ children }: Props) => {
  return <>{children}</>;
};

export default CategoriesLayout;
