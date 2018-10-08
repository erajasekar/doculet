import Constants from '../utils/constants';

export function createIframeHtml(src: string) {

    return `<iframe src=\"${src}\"
 align=\"middle\"
 height=\"${Constants.IFRAME_HEIGHT}\"
 width=\"${Constants.IFRAME_WIDTH}\"
 frameborder=\"0\"></iframe> `;
}
