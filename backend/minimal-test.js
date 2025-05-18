const express = require('express');
const app = express();

// // Option 1: Use a simple wildcard without parentheses
// app.use('/api/*', (req, res) => {
//   res.status(404).json({ 
//     error: 'NOT_FOUND', 
//     message: 'The requested API endpoint does not exist' 
//   });
// });




// Option 3: Use specific sub-paths instead
app.use('/api', (req, res) => {
  res.status(404).json({ 
    error: 'NOT_FOUND', 
    message: 'The requested API endpoint does not exist' 
  });
});


app.listen(3000, () => {
  console.log('Test server running on port 3000');
});