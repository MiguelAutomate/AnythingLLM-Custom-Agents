const axios = require('axios');

const runtime = {
  handler: async (params) => {
    const { query } = params;
    const apiUrl = process.env.MAGENTIC_ONE_API_URL || 'http://localhost:8000/api';

    try {
      // Make a request to the Magentic-One API
      const response = await axios.post(`${apiUrl}/query`, { query });

      // Process the response and return relevant information
      if (response.data && response.data.result) {
        return `Magentic-One response: ${response.data.result}`;
      } else {
        return 'No relevant information found in Magentic-One.';
      }
    } catch (error) {
      console.error('Error fetching data from Magentic-One:', error);
      return 'An error occurred while retrieving information from Magentic-One.';
    }
  }
};

module.exports = { runtime };