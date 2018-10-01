const configAll = {
    default: {
        firebase : {
            apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
            authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
            databaseURL: process.env.VUE_APP_FIREBASE_DB_URL,
            projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
            storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
        },

        aws : {
            accessKey: process.env.VUE_APP_AWS_ACCESS_KEY,
            secretAccessKey: process.env.VUE_APP_AWS_SECRET_ACCESS_KEY,
            s3BucketName: process.env.VUE_APP_AWS_S3_BUCKET_NAME,
            s3BucketRegion: process.env.VUE_APP_AWS_S3_BUCKET_REGION,
        },
    },
};

export const config = configAll.default;
