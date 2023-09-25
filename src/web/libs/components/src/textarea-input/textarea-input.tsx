import { forwardRef } from 'react';

import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';

import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Textarea, { type TextareaProps } from '@mui/joy/Textarea';

export type TextareaInputProps = TextareaProps & {
  label?: React.ReactNode;
  helperMessage?: React.ReactNode;
  errorMessage?: React.ReactNode;
};

const TextareaInput = forwardRef<HTMLDivElement, TextareaInputProps>(
  ({ label, helperMessage, errorMessage, required, error, disabled, ...inputProps }, ref) => {
    return (
      <FormControl required={required} error={error} disabled={disabled}>
        <Box>
          {label && <FormLabel>{label}</FormLabel>}
          {helperMessage && <Typography level="body-sm">{helperMessage}</Typography>}
        </Box>
        <Box>
          <Textarea ref={ref} {...inputProps} />
          {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
        </Box>
      </FormControl>
    );
  }
);

TextareaInput.displayName = 'TextareaInput';

export default TextareaInput;
