
const debug = process.env.NODE_ENV !== 'production';

export function logInfo(message: string) {
    if (debug) {
        /* tslint:disable: no-console */
        console.log(message);
        /* tslint:enable: no-console */
    }
}

export function logError(message: string) {
    if (debug) {
        /* tslint:disable: no-console */
        console.error(message);
        /* tslint:enable: no-console */
    }
}
