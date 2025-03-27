const runtime = {
    handler: async (params) => {
      const { role, description } = params;
  
      try {
        // Generate Python code based on the role and description
        const generatedCode = this._generateAgentCode(role, description);
        return {
          response: `Here is the Python code for your custom AutoGen agent with the role: "${role}":\n\n\`\`\`python\n${generatedCode}\n\`\`\``
        };
      } catch (error) {
        console.error('Error generating agent code:', error);
        return 'An error occurred while generating the agent code.';
      }
    },
  
    // Helper function to generate Python code for the agent
    _generateAgentCode: function (role, description) {
      // Convert the role to a valid class name (e.g., "data analyst" -> "DataAnalystAgent")
      const className = this._toPascalCase(role) + "Agent";
  
      // Generate boilerplate code based on the role
      let code = `from autogen import AutoGenAgent\n\n`;
      code += `class ${className}(AutoGenAgent):\n`;
      code += `    """\n`;
      code += `    ${description}\n`;
      code += `    """\n\n`;
      code += `    def __init__(self, config):\n`;
      code += `        super().__init__(config)\n\n`;
  
      // Add methods based on the role
      if (role.toLowerCase().includes("weather")) {
        code += this._generateWeatherFetcherMethods();
      } else if (role.toLowerCase().includes("data processor")) {
        code += this._generateDataProcessorMethods();
      } else if (role.toLowerCase().includes("api integrator")) {
        code += this._generateApiIntegratorMethods();
      } else {
        code += `    async def handle_message(self, message):\n`;
        code += `        """\n`;
        code += `        Handle incoming messages.\n`;
        code += `        """\n`;
        code += `        # Add your custom logic here\n`;
        code += `        return "Hello from ${className}!"\n`;
      }
  
      return code;
    },
  
    // Helper function to generate methods for a weather fetcher agent
    _generateWeatherFetcherMethods: function () {
      let code = `    async def fetch_weather(self, location):\n`;
      code += `        """\n`;
      code += `        Fetches weather data for a given location.\n`;
      code += `        """\n`;
      code += `        import requests\n\n`;
      code += `        api_url = "https://api.open-meteo.com/v1/forecast"\n`;
      code += `        params = {\n`;
      code += `            "latitude": location["latitude"],\n`;
      code += `            "longitude": location["longitude"],\n`;
      code += `            "current_weather": True\n`;
      code += `        }\n\n`;
      code += `        response = requests.get(api_url, params=params)\n`;
      code += `        if response.status_code == 200:\n`;
      code += `            return response.json()\n`;
      code += `        else:\n`;
      code += `            raise Exception("Failed to fetch weather data")\n\n`;
      return code;
    },
  
    // Helper function to generate methods for a data processor agent
    _generateDataProcessorMethods: function () {
      let code = `    async def process_csv(self, file_path):\n`;
      code += `        """\n`;
      code += `        Processes a CSV file and performs data analysis.\n`;
      code += `        """\n`;
      code += `        import pandas as pd\n\n`;
      code += `        try:\n`;
      code += `            df = pd.read_csv(file_path)\n`;
      code += `            # Perform data analysis here\n`;
      code += `            return df.describe().to_dict()\n`;
      code += `        except Exception as e:\n`;
      code += `            raise Exception(f"Failed to process CSV file: {str(e)}")\n\n`;
      return code;
    },
  
    // Helper function to generate methods for an API integrator agent
    _generateApiIntegratorMethods: function () {
      let code = `    async def fetch_api_data(self, endpoint, params=None):\n`;
      code += `        """\n`;
      code += `        Fetches data from a REST API.\n`;
      code += `        """\n`;
      code += `        import requests\n\n`;
      code += `        try:\n`;
      code += `            response = requests.get(endpoint, params=params)\n`;
      code += `            if response.status_code == 200:\n`;
      code += `                return response.json()\n`;
      code += `            else:\n`;
      code += `                raise Exception(f"API request failed with status code: {response.status_code}")\n`;
      code += `        except Exception as e:\n`;
      code += `            raise Exception(f"Failed to fetch API data: {str(e)}")\n\n`;
      return code;
    },
  
    // Helper function to convert a string to PascalCase
    _toPascalCase: function (str) {
      return str
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("");
    }
  };
  
  module.exports = { runtime };