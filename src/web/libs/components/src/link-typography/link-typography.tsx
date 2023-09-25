import Typography, { type TypographyProps } from '@mui/joy/Typography';

import Link, { type LinkProps } from '../link';

type Props = TypographyProps & LinkProps;

const LinkChip = ({
  children,
  href,
  replace,
  prefetch,
  locale,
  scroll,
  shallow,
  ...rest
}: Props) => {
  return (
    <Typography {...rest}>
      <Link
        href={href}
        replace={replace}
        prefetch={prefetch}
        locale={locale}
        scroll={scroll}
        shallow={shallow}
      >
        {children}
      </Link>
    </Typography>
  );
};

export default LinkChip;
