# Magic Mirror

## ⚠️ Experimental Project

> **Note**: This is an experimental project and will not be actively maintained. It was created as a proof of concept and is shared as-is. If you want to modify or extend it, please fork the repository and create your own version. There is no formal contribution process.

## Interactive AI Coaching Experience

Magic Mirror is a modern web application that provides an interactive AI coaching experience using the [Tavus Conversational Video Interface (CVI)](https://docs.tavus.io/sections/conversational-video-interface/cvi-overview) technology. This application allows users to engage in natural conversations with AI coaches that provide personalized guidance across various session types including confidence building, goal setting, fear management, habit formation, purpose discovery, and resilience building.

![Magic Mirror Interface](https://via.placeholder.com/800x400?text=Magic+Mirror+Interface)

## ✨ Features

- **Multiple Session Types**: Choose from various coaching categories like confidence, goals, habits, and more
- **Interactive Video Experience**: Engage with lifelike AI coaches through video interface
- **Real-time Conversation**: Have dynamic conversations with AI coaches that respond to your specific questions
- **Session Management**: Start new sessions, continue existing ones, or review past interactions

## 🛠️ Tech Stack

- React with TypeScript
- Vite for fast development and building
- Tailwind CSS for responsive styling
- Framer Motion for smooth animations
- Jotai for state management
- Tavus API for conversational video interface

## 📋 Prerequisites

Before you begin, ensure you have the following:
- Node.js (v16 or higher)
- npm or yarn package manager
- A Tavus API key (get one from [Tavus Platform](https://platform.tavus.io/))

## 🚀 Installation and Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/magic-mirror.git
   cd magic-mirror
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory with your Tavus API key:
   ```
   VITE_TAVUS_API_KEY=your_tavus_api_key_here
   ```
   
   > ⚠️ **Important**: Never commit your `.env` file to version control. The `.gitignore` file is already set up to exclude it.

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Build for production**
   ```bash
   npm run build
   # or
   yarn build
   ```

## 🔐 Security Considerations

- The application uses environment variables (`.env` file) to store sensitive API keys
- The `.env` file is excluded from version control via `.gitignore`
- When forking this repository, make sure to:
  - Create your own `.env` file with your own API keys
  - Never share your API keys publicly
  - Consider implementing a server-side proxy for API calls in production environments

### Environment Variables

This application uses the following environment variables:

| Variable | Description |
|----------|-------------|
| `VITE_TAVUS_API_KEY` | Your Tavus API key for accessing the CVI services |

To set up your environment:

1. Create a `.env` file in the root of the project
2. Add your API key as shown below:
   ```
   VITE_TAVUS_API_KEY=your_tavus_api_key_here
   ```
3. Restart your development server if it's already running

> Note: For production deployments, set environment variables according to your hosting platform's recommendations.

## 🎨 Customization

### Using Your Own Tavus Persona

1. Create your persona in the [Tavus Platform](https://platform.tavus.io/)
2. Update the `persona_id` in the `src/api/createConversation.ts` file:
   ```typescript
   const getPersonaId = (replicaId: string): string => {
     return "your_persona_id"; // Replace with your persona ID
   };
   ```

### Adding Custom Session Types

The application supports multiple session types. You can add or modify them in the `src/api/createConversation.ts` file:

```typescript
const replicaIds: ReplicaMapping = {
  // Add your custom session type here
  your_custom_type: [
    // Add replica IDs for this session type
  ],
};
```

## 📚 API Reference and Resources

- [Tavus Developer Documentation](https://docs.tavus.io/)
- [Tavus API Reference](https://docs.tavus.io/api-reference/)
- [Tavus Platform](https://platform.tavus.io/)
- [Creating a Tavus Persona](https://docs.tavus.io/sections/conversational-video-interface/creating-a-persona)

## 🔄 Project Status

This project is shared as an experimental implementation and is not actively maintained. It demonstrates the capabilities of the Tavus CVI technology but is not intended for production use without further development and security enhancements.

If you find the project useful and want to modify it:
- Fork the repository
- Make your own changes
- Use it as a starting point for your own implementation

There is no formal contribution or pull request process for this repository.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
