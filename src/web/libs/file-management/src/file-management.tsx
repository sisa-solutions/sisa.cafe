import Grid from '@mui/joy/Grid';
import Box from '@mui/joy/Box';

const FileManagement = () => {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        width: '100%',
        height: '100%',
        flexGrow: 1,
      }}
    >
      <Grid md={3}>
        <Box>Sidebar</Box>
      </Grid>
      <Grid md={9}>
        <Box>Content</Box>
      </Grid>
    </Grid>
  );
};

export default FileManagement;
