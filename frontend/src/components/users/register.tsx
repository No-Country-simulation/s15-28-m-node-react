
import { Box, Button, Divider, IconButton, TextField, Typography } from '@mui/material';
import { FaGithub, FaGoogle, FaLinkedin } from 'react-icons/fa';

const Register = () => {
  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      minHeight="100vh" 
      bgcolor="#f5f5f5"
    >
      <Box textAlign="center" mb={3}>
        <Typography 
          variant="h5" 
          component="h2" 
          mb={1}
        >
          Get started with TimeTracker
        </Typography>
        <Typography 
          variant="body1"
        >
          Create a free account to start tracking time and supercharge your productivity.
        </Typography>
      </Box>
      
      <Box 
        p={4} 
        bgcolor="white" 
        borderRadius={2} 
        boxShadow={3} 
        width={300}
      >
        <Typography 
          variant="h5" 
          component="h2" 
          textAlign="center" 
          mb={3}
        >
          Sign Up
        </Typography>
        <form>
          <Box mb={2}>
            <TextField 
              fullWidth 
              label="Email" 
              type="email" 
              variant="outlined" 
              size="small" 
            />
          </Box>
          <Box mb={2}>
            <TextField 
              fullWidth 
              label="Password" 
              type="password" 
              variant="outlined" 
              size="small" 
            />
          </Box>
          <Box mb={3}>
            <TextField 
              fullWidth 
              label="Confirm Password" 
              type="password" 
              variant="outlined" 
              size="small" 
            />
          </Box>
          <Button 
            type="submit" 
            fullWidth 
            variant="contained" 
            color="primary"
          >
            Register
          </Button>
        </form>
        <Divider 
          sx={{ my: 3 }} 
        >
          <Typography 
            variant="body2" 
            color="textSecondary"
          >
            Or Continue With
          </Typography>
        </Divider>
        <Box display="flex" justifyContent="center" gap={2}>
          <IconButton 
            aria-label="google" 
            color="error"
          >
            <FaGoogle />
          </IconButton>
          <IconButton 
            aria-label="linkedin" 
            color="primary"
          >
            <FaLinkedin />
          </IconButton>
          <IconButton 
            aria-label="github" 
            color="inherit"
          >
            <FaGithub />
          </IconButton>
        </Box>
        <Typography 
          variant="body2" 
          color="textSecondary" 
          textAlign="center"
          mt={3}
        >
          Already have an account? <a href="/login" style={{ color: '#1976d2' }}>Login</a>
        </Typography>
      </Box>
    </Box>
  );
};

export default Register;
