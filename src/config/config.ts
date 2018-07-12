const configAll = {
    default: {
        firebase : {
            apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
            authDomain: 'doculet-cbd63.firebaseapp.com',
            databaseURL: 'https://doculet-cbd63.firebaseio.com',
            projectId: 'doculet-cbd63',
            storageBucket: 'doculet-cbd63.appspot.com',
            messagingSenderId: '274170082980',
        },
    },
};

export const config = configAll.default;
