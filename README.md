# React Google Login Example

Disclaimer: This is not an official Google product.

## Do this first
1. Create a new Google Cloud project from the Cloud Console.
1. Add the project to Firebase from the Firebase Console.
1. Add Firebase application from "Project Overview" -> "Project settings" menu.
1. Enable the "Google" sign-in provider from "Build" -> "Authentication" -> "Sign-in method" menu.
<<<<<<< HEAD
1. Copy the Firebase configuration `firebaseConfig` in `src/Firebase.js`

## Setup

### Build and deply the backend API service.

```
PROJECT_ID=[your project ID]
gcloud config set project $PROJECT_ID
gcloud services enable \
  cloudbuild.googleapis.com \
  run.googleapis.com 
cd $HOME/react-google-login-example/backend-example
gcloud builds submit --tag gcr.io/$PROJECT_ID/hello-world-service
gcloud run deploy hello-world-service \
  --image gcr.io/$PROJECT_ID/hello-world-service \
  --platform=managed --region=us-central1 \
  --allow-unauthenticated
```

### Build React App.
=======
1. Add your react app domain to the authorized domain.
1. Copy the Firebase configuration `firebaseConfig` in `src/Firebase.js`

## Manual setup for local testing
>>>>>>> 414bc4c43690a374d54fad5e685cbd15698b3201

```
nvm install 16.10.0
yarn install
yarn build
```

### Deploy to Firebase hosting.

```
firebase init
```
Specify `/build` as a deployment directory.

Modify `firebase.json` as below.
```
{
  "hosting": {
    "public": "build",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "/hello-world-service/**",
        "run": {
          "serviceId": "hello-world-service",
          "region": "us-central1"
        }
      }
    ]
  }
}
```

```
firebase deploy
```
