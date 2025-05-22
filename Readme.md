## Clone the repository and create .env file in "/Leucine Assignment/API" and copy keys from .env.example to .env file.

# To start the backend run the following command in your terminal

1. cd API
2. npm install       
3. npm run dev 

# To start the frontend run the following command in your terminal

1. cd todo-app-frontend
2. npm install
3. npm start

---
##  External Service Setup

###  Slack Webhook Setup

1. Go to https://slack.com/intl/en-in/, log in, and create a **new Workspace**.
2. Visit https://api.slack.com/apps, log in, and click **“Create New App”**.
3. Select **“From Manifest”**, then choose the Workspace you just created.
4. Click **Next** through all three steps to complete app creation.
5. You will be redirected to a page like `https://api.slack.com/apps/{AppID}?created=1`. Click on **“Incoming Webhooks”** under the **Features** section.
6. Enable **“Activate Incoming Webhooks”**, scroll down, and click **“Add New Webhook”**.
7. When asked **“Where should Demo App post?”**, choose either a channel or direct message, then click **Allow**.
8. Copy the generated **Webhook URL** and paste it in your `.env` 


---

### 🤖 Groq API Key Setup

1. Go to https://groq.com and click on the **“DEV Console”** in the top-right corner. Sign in or register.
2. Click on **“API Keys”** in the navigation bar.
3. Click **“Create API Key”**.
4. Enter a name for your API key and submit.
5. Copy the generated key and paste it in your `.env` file




---

### 🔥 Firebase (Firestore) Setup

1. Go to https://console.firebase.google.com and click **“Create a new project”**. Name your project and click **Continue** through all steps.
2. When asked about **Google Analytics**, select **“Default Account for Firebase”** and proceed.
3. On the dashboard, click the **web icon (`</>`)** under **“Get started by adding Firebase to your app.”**
4. Enter your web app name and click **“Register app”**.
5. Copy the `firebaseConfig` object provided and use it in your frontend initialization.
6. Click **“Continue to Console”**, then navigate to **Cloud Firestore** from the left sidebar under **“Build”**.
7. Click **“Create database”**, choose a location, and for **security rules**, select **“Start in test mode”**, then click **Create**.

---
