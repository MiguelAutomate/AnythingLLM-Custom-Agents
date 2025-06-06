# 🤖 AnythingLLM Custom Agents

**Supercharge Your AnythingLLM Instance with Bespoke AI Agent Skills for Advanced Automation and Seamless API Interactions!**

---

## ✨ Overview

This repository is your go-to resource for a collection of **custom agent skills** meticulously crafted for **AnythingLLM**. Leveraging the powerful **AnythingLLM Agent Framework**, these agents are designed to elevate your AI-driven workflows, enabling sophisticated automation, intelligent decision-making, and seamless integration with external APIs.

Whether you're looking to automate repetitive tasks, connect AnythingLLM to your favorite services, or build complex AI-driven processes, these custom agents provide the blueprint and examples you need to unlock the full potential of your AnythingLLM instance.

---

## 🚀 Features

Dive into what these custom agents bring to the table:

* **Tailored AI Agents**: Pre-built and ready-to-customize AI agents specifically designed to extend AnythingLLM's capabilities.
* **Seamless Integration**: Each agent includes its `plugin.json` definition for effortless "plug-and-play" integration into your AnythingLLM environment.
* **Robust Action Handlers**: Dedicated `handler.js` files for each agent, providing the logic to process and execute complex agent actions.
* **Extensible Framework**: A clear, modular structure that makes it incredibly easy to add new agent capabilities, adapt existing ones, and contribute your own innovations.

---

## 🛠️ Installation & Usage

Getting these custom agents up and running with your AnythingLLM instance is straightforward. Just follow these steps:

1.  **Clone the Repository**:
    ```bash
    git clone [https://github.com/MiguelAutomate/anythingllm-custom-agents.git](https://github.com/MiguelAutomate/anythingllm-custom-agents.git)
    cd anythingllm-custom-agents
    ```

2.  **Explore the Agents**: Each folder (`agent-1`, `agent-2`, etc.) contains a complete custom agent. Browse them to understand their `plugin.json` (definition) and `handler.js` (logic).

3.  **Integrate with AnythingLLM**: Follow the official AnythingLLM Agent Developer Guide to integrate these agents into your AnythingLLM instance:
    * [**Introduction to Custom Agents**](https://docs.anythingllm.com/agent/custom/introduction)
    * [**Developer Guide: Building Custom Agents**](https://docs.anythingllm.com/agent/custom/developer-guide)
    * [**Plugin JSON Reference**](https://docs.anythingllm.com/agent/custom/plugin-json)
    * [**Handler JS Reference**](https://docs.anythingllm.com/agent/custom/handler-js)

4.  **Customize Your Agents**:
    * **Modify `plugin.json`**: Adjust agent names, descriptions, input parameters, or API endpoints to fit your specific needs.
    * **Implement `handler.js`**: Write or modify the JavaScript logic within the `handler.js` file to define how your agent processes requests and interacts with external services.

5.  **Deploy and Test**: Follow the AnythingLLM documentation to deploy your modified or new agents and test them thoroughly within your AnythingLLM instance.

---

## 📂 Project Structure

This repository is organized to make navigating and understanding each custom agent intuitive:
```
anythingllm-custom-agents/
│
├── agent-1/                # Example Agent 1: Contains a complete custom agent
│   ├── plugin.json         #   - Agent's definition (name, description, abilities)
│   └── handler.js          #   - JavaScript logic for executing agent actions
│
├── agent-2/                # Example Agent 2: Another complete custom agent
│   ├── plugin.json         #   - Agent's definition
│   └── handler.js          #   - JavaScript logic
│
└── README.md               # You're reading this!
```
