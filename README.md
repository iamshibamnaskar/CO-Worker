# CO-Worker Chrome Extension

CO-Worker is a Chrome extension that allows users to interact with an AI assistant directly from their browser. Users can type messages or select text from any webpage and use the right-click context menu to send queries to the AI.

## Features

- **AI Chat Interface:** Communicate with an AI assistant within a pop-up window.
- **Code Highlighting:** Messages with code blocks are properly formatted using syntax highlighting.
- **Context Menu Integration:** Select text on a webpage, right-click, and choose "Ask CO-Worker" to send a query.
- **Conversation History:** Maintains a conversation thread for continuity.
- **Markdown Support:** Displays formatted responses with Markdown rendering.

## Installation & Running Instructions

### 1. Clone the Repository
```sh
git clone https://github.com/iamshibamnaskar/CO-Worker.git
cd CO-Worker
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Get a Gemini API Key
1. Visit [Google AI Studio](https://aistudio.google.com/).
2. Sign in with your Google account.
3. Navigate to the **API Keys** section.
4. Generate a new API key.
5. Copy the key and paste it into `src/App.js` by replacing the placeholder in:
   ```js
   const API_KEY = "YOUR_GEMINI_API_KEY_HERE";
   ```

### 4. Build the Extension
```sh
npm run build
```

### 5. Load the Extension in Chrome
1. Open **Google Chrome**.
2. Navigate to `chrome://extensions/`.
3. Enable **Developer Mode** (toggle switch at the top-right corner).
4. Click **Load unpacked**.
5. Select the `dist` folder inside your project directory.
6. The extension should now be loaded and ready to use.

## How to Use

### Option 1: Direct Input
1. Click on the extension icon in the toolbar.
2. Type your message in the input box.
3. Press **Enter** or click **Send**.
4. The AI will respond in the chat window.

### Option 2: Context Menu (Ask CO-Worker)
1. Select text on any webpage.
2. Right-click and choose **Ask CO-Worker**.
3. The selected text is sent as a query, and the AI's response appears in the pop-up chat.

## Contribution
Feel free to fork and contribute to this project by submitting pull requests.

## License
This project is licensed under the MIT License.

---

Now, install, build, and start chatting with CO-Worker! 🚀

