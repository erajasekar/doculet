import Constants from '../utils/constants';

export function createIframeHtml(src: string) {

    return `<iframe id=\"${Constants.PREVIEW_IFRAME_ID}\" src=\"${src}\"
 align=\"middle\"
 height=\"${Constants.IFRAME_HEIGHT}\"
 width=\"${Constants.IFRAME_WIDTH}\"
 frameborder=\"0\"></iframe> `;
}
