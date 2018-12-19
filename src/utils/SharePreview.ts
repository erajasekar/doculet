import Constants from '../utils/constants';

export function createIframeHtml(src: string) {

    return `<iframe id=\"${Constants.PREVIEW_IFRAME_ID}\" src=\"${src}\"
 align=\"middle\"
 width=\"${Constants.IFRAME_WIDTH}\"
 height=\"${Constants.IFRAME_HEIGHT}\"
 allowfullscreen=\"true\"
 scrolling="auto"
 frameborder=\"0\"></iframe> `;
}
