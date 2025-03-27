const axios = require('axios');

const runtime = {
  handler: async (params) => {
    const { query } = params;
    const apiUrl = process.env.AUTOGEN_API_URL || 'http://localhost:8000/api';

    try {
      // If the query is about Python or AutoGen, handle it locally
      if (query.toLowerCase().includes("python") || query.toLowerCase().includes("autogen")) {
        return this._handlePythonOrAutoGenQuery(query);
      } else {
        // Otherwise, make a request to the AutoGen API (if configured)
        const response = await axios.post(`${apiUrl}/query`, { query });
        if (response.data && response.data.result) {
          return `AutoGen response: ${response.data.result}`;
        } else {
          return 'No relevant information found in AutoGen.';
        }
      }
    } catch (error) {
      console.error('Error processing query:', error);
      return 'An error occurred while processing your query.';
    }
  },

  // Helper function to handle Python and AutoGen queries
  _handlePythonOrAutoGenQuery: function (query) {
    if (query.toLowerCase().includes("decorator")) {
      return this._explainPythonDecorator();
    } else if (query.toLowerCase().includes("custom agent")) {
      return this._explainCustomAutoGenAgent();
    } else if (query.toLowerCase().includes("magnetic")) {
      return this._explainAutoGenMagnetic();
    } else {
      return `I can help with Python and AutoGen concepts. Please ask a specific question!`;
    }
  },

  // Example: Explain Python decorators
  _explainPythonDecorator: function () {
    return {
      response: "A decorator in Python is a function that takes another function and extends its behavior without explicitly modifying it. Here's an example:\n\n```python\n@my_decorator\ndef my_function():\n    print('Hello, World!')\n```"
    };
  },

  // Example: Explain how to create a custom AutoGen agent
  _explainCustomAutoGenAgent: function () {
    return {
      response: "To create a custom agent in AutoGen, you need to define a class that extends the `AutoGenAgent` class. Here's an example:\n\n```javascript\nconst { AutoGenAgent } = require('autogen-studio');\n\nclass MyCustomAgent extends AutoGenAgent {\n  constructor(config) {\n    super(config);\n  }\n\n  async handleMessage(message) {\n    // Your custom logic here\n  }\n}\n```"
    };
  },

  // Example: Explain AutoGen Magnetic
  _explainAutoGenMagnetic: function () {
    return {
      response: "AutoGen Magnetic is a framework for building multi-agent systems (MAS) with AutoGen. It allows you to create agents that can collaborate, share state, and perform complex workflows. For more details, check out the [AutoGen Magnetic documentation](https://microsoft.github.io/autogen/stable/reference/python/autogen_agentchat.state.html)."
    };
  }
};

module.exports = { runtime };