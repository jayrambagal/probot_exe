### Probot_exe > GitHut App which execute your selected PR Code
#### Demo Video :
https://github.com/jayrambagal/probot_exe/assets/94613732/0d1adc58-78cd-4f5b-ab1d-d14ddbb3583b

### 1. App Overview:
#### Description: 
- The Probot GitHub app, named "Probot_exe," is designed to enhance the code review process by integrating with the LLP API for intelligent code analysis and suggestions.
#### Features:
- Automated code analysis using LLP API.
- Custom slash commands (/execute) for executing the selected code.
- Custom message on raising the new PR.
- Custom message on creating the new issue.

### 2. Setup Instructions:
#### Prerequisites:

- Node.js installed on the local machine.
- GitHub account with repository access.
- LLP API key for intelligent code analysis.

#### Installation:

- Clone the repository.
- Install dependencies using `npm install`.
- Set up the necessary environment variables, including the below keys.
    - WEBHOOK_PROXY_URL,
    - APP_ID,
    - PRIVATE_KEY,
    - WEBHOOK_SECRET,
    - GITHUB_CLIENT_ID,
    - GITHUB_CLIENT_SECRET,
    - OPENAI_API_KEY,
- Run the app using - `npm start`
- Go to `localhost:3000`, register with your GitHub account, and grant the required permissions.

#### Configuration:
- Customize the Probot app settings in the index.js file.
- Define slash command functionalities and event triggers.
- Usage:
    - Open a pull request and interact with the app using slash commands.
    - Example: Use /execute to receive code analysis in the pull request comments.

### 3. Summary Report:
#### Development Methodology:
- Followed a modular approach by dividing functionality into separate handlers and services.
- Leveraged Probot's event-driven architecture for handling GitHub events.
- Integration with OpenAI:
    - Implemented a dedicated service (OpenAIService) for communication with the LLP API.
    - Ensured secure handling of the API key.

#### Challenges Faced:

### 4. Suggestions for Improvement:
Enhanced User Interface:

- Explore possibilities for integrating a web interface for a more user-friendly experience.
- Provide visual representations of code suggestions.
- Error Handling:
- Implement robust error handling and logging mechanisms to enhance app stability.

### 4. Conclusion:
Probot_exe, powered by Probot and OpenAI, aims to revolutionize the code review process with intelligent suggestions.
