import Constants from '../utils/constants';

export function createIframeHtml(src: string, height: number) {

    return `<iframe id=\"${Constants.PREVIEW_IFRAME_ID}\" src=\"${src}\"
 align=\"middle\"
 width=\"100%\"
 height=\"${height}\"
 allowfullscreen=\"true\"
 scrolling="no"
 frameborder=\"0\"></iframe> `;
}
