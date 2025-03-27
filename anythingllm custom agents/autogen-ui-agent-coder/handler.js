const runtime = {
  handler: async (params) => {
    const { team_name, assistant_agent_name, user_agent_name, tool_name } = params;

    try {
      // Generate JSON configuration for the team
      const teamConfig = this._generateTeamConfig(team_name, assistant_agent_name, user_agent_name, tool_name);
      return {
        response: `Here is the JSON configuration for your AutoGen Studio 0.4 UI team:\n\n\`\`\`json\n${JSON.stringify(teamConfig, null, 2)}\n\`\`\``
      };
    } catch (error) {
      console.error('Error generating team configuration:', error);
      return 'An error occurred while generating the team configuration.';
    }
  },

  // Helper function to generate JSON configuration for a team
  _generateTeamConfig: function (team_name, assistant_agent_name, user_agent_name, tool_name) {
    const teamConfig = {
      version: "1.0.0",
      component_type: "team",
      name: team_name,
      participants: [
        {
          component_type: "agent",
          name: assistant_agent_name,
          agent_type: "AssistantAgent",
          system_message: "You are a helpful assistant. Solve tasks carefully. When done respond with TERMINATE.",
          model_client: {
            component_type: "model",
            model: "gpt-4o-2024-08-06",
            model_type: "OpenAIChatCompletionClient"
          },
          tools: []
        }
      ],
      team_type: "RoundRobinGroupChat",
      termination_condition: {
        component_type: "termination",
        termination_type: "MaxMessageTermination",
        max_messages: 3
      }
    };

    // Add user agent if provided
    if (user_agent_name) {
      teamConfig.participants.push({
        component_type: "agent",
        name: user_agent_name,
        agent_type: "UserProxyAgent",
        tools: []
      });
    }

    // Add tool if provided
    if (tool_name) {
      const toolConfig = this._getToolConfig(tool_name);
      if (toolConfig) {
        teamConfig.participants[0].tools.push(toolConfig);
      }
    }

    return teamConfig;
  },

  // Helper function to get tool configuration
  _getToolConfig: function (tool_name) {
    const tools = {
      calculator: {
        component_type: "tool",
        name: "calculator",
        description: "A simple calculator that performs basic arithmetic operations between two numbers",
        content: "def calculator(a: float, b: float, operator: str) -> str:\n    try:\n        if operator == '+':\n            return str(a + b)\n        elif operator == '-':\n            return str(a - b)\n        elif operator == '*':\n            return str(a * b)\n        elif operator == '/':\n            if b == 0:\n                return 'Error: Division by zero'\n            return str(a / b)\n        else:\n            return 'Error: Invalid operator. Please use +, -, *, or /'\n    except Exception as e:\n        return f'Error: {str(e)}'",
        tool_type: "PythonFunction"
      },
      fetch_website: {
        component_type: "tool",
        name: "fetch_website",
        description: "Fetch and return the content of a website URL",
        content: "async def fetch_website(url: str) -> str:\n    try:\n        import requests\n        from urllib.parse import urlparse\n        \n        # Validate URL format\n        parsed = urlparse(url)\n        if not parsed.scheme or not parsed.netloc:\n            return \"Error: Invalid URL format. Please include http:// or https://\"\n            \n        # Add scheme if not present\n        if not url.startswith(('http://', 'https://')): \n            url = 'https://' + url\n            \n        # Set headers to mimic a browser request\n        headers = {\n            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'\n        }\n        \n        # Make the request with a timeout\n        response = requests.get(url, headers=headers, timeout=10)\n        response.raise_for_status()\n        \n        # Return the text content\n        return response.text\n        \n    except requests.exceptions.Timeout:\n        return \"Error: Request timed out\"\n    except requests.exceptions.ConnectionError:\n        return \"Error: Failed to connect to the website\"\n    except requests.exceptions.HTTPError as e:\n        return f\"Error: HTTP {e.response.status_code} - {e.response.reason}\"\n    except Exception as e:\n        return f\"Error: {str(e)}\"",
        tool_type: "PythonFunction"
      }
    };

    return tools[tool_name] || null;
  }
};

module.exports = { runtime };