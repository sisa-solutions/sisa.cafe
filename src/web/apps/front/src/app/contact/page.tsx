import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

import {
  CheckCheckIcon,
  GlobeIcon,
  LoaderIcon,
  MailIcon,
} from 'lucide-react';

import {
  FormActions,
  FormContainer,
  TextInput,
  TextareaInput,
} from '@sisa/form';

const ContactPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Sheet
        sx={{
          boxShadow: 'md',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Sheet invertedColors color="primary" variant="soft" sx={{ p: 4 }}>
          <Stack direction="column" spacing={2}>
            <Typography level="h2">Contact us</Typography>
            <Divider />
            <Typography startDecorator={<MailIcon />}>contact@sisa.cafe</Typography>
            <Typography startDecorator={<GlobeIcon />}>sisa.cafe</Typography>
          </Stack>
        </Sheet>
        <Sheet sx={{ p: 4 }}>
          <FormContainer orientation="horizontal" maxLabelWidth='100px'>
            <TextInput label="Name" />
            <TextInput label="Email" />
            <TextInput label="Subject" />
            <TextareaInput label="Message" minRows={2} />
            <FormActions>
              <Button
                variant="solid"
                color="primary"
                startDecorator={<CheckCheckIcon />}
                loadingIndicator={<LoaderIcon className="spin" />}
              >
                Send
              </Button>
            </FormActions>
          </FormContainer>
        </Sheet>
      </Sheet>
    </Box>
  );
};

export default ContactPage;
