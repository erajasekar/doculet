
const debug = process.env.NODE_ENV !== 'production';

export default function log(message: string) {
    if (debug) {
        /* tslint:disable: no-console */
        console.error(message);
        /* tslint:enable: no-console */
    }
}
