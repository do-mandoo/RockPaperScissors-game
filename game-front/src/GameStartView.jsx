import { Box, Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const GameStartView = ({ onStart }) => {
  const location = useLocation();
  console.log(location.pathname, 'location');

  return (
    <Box
      sx={{
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        mt: 40,
        // bgcolor: '#ccc',
        // minHeight: '700px',
      }}
    >
      {/* {location.pathname === '/game' ? (
        <Button
          sx={{ border: '3px solid blue', width: '400px', fontSize: '50px' }}
          onClick={onStart}
        >
          게임 시작
        </Button>
      ) : (
        <Link to={'/game'}>
          <Button>효우</Button>
        </Link>
      )} */}
      <Button sx={{ border: '3px solid blue', width: '400px', fontSize: '50px' }} onClick={onStart}>
        게임 시작
      </Button>
    </Box>
  );
};

export default GameStartView;
