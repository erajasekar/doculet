# DOCULET

> Easily share and embed code examples in your blog, medium articles or on any website.



Doculet is my side project and my goal to create an app to easily share and embed code examples on any website.

Live website: https://doculet.net/

It is buit using [VueJs](https://vuejs.org/) framework.

## Getting Started

* Clone the repository

* Run `npm install`

* Create and setup firebase project 

  * Doculet uses firebase firestore database for backend.

  * So you should create a firebase project and add firestore database to it.

  * Setup following rules in database to provides access to any signed in user

    ```
    // Allow read/write access on all documents to any user signed in to the application
    service cloud.firestore {
      match /databases/{database}/documents {
        match /{document=**} {
          allow read, write: if request.auth.uid != null;
        }
      }
    }
    ```

  * Also you should setup github authentication in firebase authentication settings. You can refer to these [instructions](https://firebase.google.com/docs/auth/web/github-auth).

* Create S3 Bucket in AWS.

  * Doculet uses AWS S3 bucket for static web hosting.
  * So create a AWS S3 bucket

* Configure Firestore and S3.

  * Create environment specific files `.env.development` for development and `.env.production` for production and define following properties in them.

    ```
    VUE_APP_FIREBASE_API_KEY=
    VUE_APP_FIREBASE_AUTH_DOMAIN=
    VUE_APP_FIREBASE_DB_URL=
    VUE_APP_FIREBASE_PROJECT_ID=
    VUE_APP_FIREBASE_STORATE_BUCKET=
    VUE_APP_FIREBASE_MESSAGING_SENDER_ID=
    VUE_APP_AWS_ACCESS_KEY=
    VUE_APP_AWS_SECRET_ACCESS_KEY=
    VUE_APP_AWS_S3_BUCKET_NAME=
    VUE_APP_AWS_S3_BUCKET_REGION=
    ```

  * You can find these properties in firebase and S3 settings.

* Run `npm run serve` to start the application in dev mode.



## Testing prodcution version locally

* Run `npm run build` to build the app.
* Install [serve](https://www.npmjs.com/package/serve) npm module.
* Run `serve -s dist` to run locally in production mode.



### Deploying to AWS S3

* Run `npm run deploy` to deploy and AWS S3.
* TODO clould front redirection.