
const debug = process.env.NODE_ENV !== 'production';

export function logInfo(message: string) {
    /* tslint:disable: no-console */
    console.log(message);
    /* tslint:enable: no-console */
}

export function logDebug(message: string) {
    if (debug) {
        /* tslint:disable: no-console */
        console.info(message);
        /* tslint:enable: no-console */
    }
}

export function logError(message: string) {
    /* tslint:disable: no-console */
    console.error(message);
    /* tslint:enable: no-console */
}

export function logWarn(message: string) {
    if (debug) {
        /* tslint:disable: no-console */
        console.warn(message);
        /* tslint:enable: no-console */
    }
}
