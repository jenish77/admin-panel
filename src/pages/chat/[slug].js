// // Import necessary libraries
// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';
// import { useRouter } from 'next/router';
// import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
// import { Box, Container, Stack, Typography, TextField, Button } from '@mui/material';
// import SendIcon from '@mui/icons-material/Send';

// const Page = () => {
//   const router = useRouter();
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const socket = io('http://localhost:3001'); // Connect to your server URL


//   useEffect(() => {
//     socket.on('chat_message', (message) => {
//       setMessages([...messages, message]);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [socket]);

//   const sendMessage = () => {
//     if (message.trim()) {
//       socket.emit('chat_message', message);
//       setMessage('');
//     }
//   };
//   // const [message, setMessage] = useState('');
//   // const [messages, setMessages] = useState([]);
//   // const [chatClient, setChatClient] = useState(null);
//   // const [connected, setConnected] = useState(false);

//   // useEffect(() => {
//   //   const initChat = () => {
//   //     const client = io('http://localhost:3001', {
//   //       query: {
//   //         user_id: router.query.slug,
//   //       },
//   //     });

//   //     client.on('connect', function () {
//   //       console.log('connected................');
//   //       setConnected(true);
//   //     });

//   //     client.on('chat_message', (message) => {
//   //       setMessages([...messages, message]);
//   //     });

//   //     setChatClient(client);
//   //   };

//   //   initChat();

//   //   return () => {
//   //     chatClient?.disconnect();
//   //   };
//   // }, [messages]);

//   // const sendMessage = () => {
//   //   if (message.trim()) {
//   //     chatClient.emit('chat_message', message);
//   //     setMessage('');
//   //   }
//   // };

//   return (
//     <Box>
//       <Container>
//         <Stack spacing={2}>
//           <Typography variant="h4" align="center" mb={2}>
//             Chat Room
//           </Typography>
//           <Box border="1px solid #ccc" borderRadius="md" p={3} maxHeight="300px" overflowY="auto">
//             {messages.map((msg, index) => (
//               <div key={index}>{msg}</div>
//             ))}
//           </Box>
//           <Stack direction="row" spacing={1} alignItems="center">
//             <TextField
//               variant="outlined"
//               label="Message"
//               fullWidth
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//             />
//             <Button variant="contained" endIcon={<SendIcon />} onClick={sendMessage}>
//               Send
//             </Button>
//           </Stack>
//         </Stack>
//       </Container>
//     </Box>
//   );
// };

// Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// export default Page;
// Import necessary libraries
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useRouter } from 'next/router';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { Box, Container, Stack, Typography, TextField, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const Page = () => {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize socket connection when component mounts
    const socketInstance = io('http://localhost:3001');
    setSocket(socketInstance);

    // Listen for incoming messages
    socketInstance.on('chat_message', (message) => {
      setMessages([...messages, message]);
    });

    // Clean up socket connection when component unmounts
    return () => {
      socketInstance.disconnect();
    };
  }, []); // Only run this effect once when component mounts

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('chat_message', message);
      setMessage('');
    }
  };

  return (
    <Box>
      <Container>
        <Stack spacing={2}>
          <Typography variant="h4" align="center" mb={2}>
            Chat Room
          </Typography>
          <Box border="1px solid #ccc" borderRadius="md" p={3} maxHeight="300px" overflowY="auto">
            {messages.map((msg, index) => (
              <div key={index}>{msg}</div>
            ))}
          </Box>
          <Stack direction="row" spacing={1} alignItems="center">
            <TextField
              variant="outlined"
              label="Message"
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button variant="contained" endIcon={<SendIcon />} onClick={sendMessage}>
              Send
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
