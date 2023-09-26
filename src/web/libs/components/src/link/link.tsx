import NextLink, { type LinkProps as NextLinkProps } from 'next/link';
import BaseLink, { type LinkProps as BaseLinkProps } from '@mui/joy/Link';

export type LinkProps = Omit<BaseLinkProps<'a'>, 'components' | 'href'> &
  // @ts-ignore
  Omit<NextLinkProps, 'passHref' | 'legacyBehavior' | 'as'>;

const Link = (props: LinkProps) => {
  const { children, ...rest } = props;

  return (
    <BaseLink
      component={NextLink}
      {...rest}
      textColor="inherit"
      fontSize="inherit"
      fontWeight="inherit"
      fontFamily="inherit"
    >
      {children}
    </BaseLink>
  );
};

export default Link;
