import hljs from 'highlight.js';
import {staticHostingUrl} from '../config/config';
import Constants from '../utils/constants';

export interface EnrichParams {
    docLocation: string;
}

export function applyHighlightJs(el: Element) {
    const targets = el.querySelectorAll('code');
    targets.forEach((target: Element) => {
        // Check for class attribute to not apply hljs for single backtick code.
        if (target.hasAttribute('class')) {
            hljs.highlightBlock(target);
        }
    });
}

export function enrichHtml(html: string, params: EnrichParams) {
    const root = document.createElement('html');

    const head = document.createElement('head');
    appendStylesheets(head);
    appendOmbedLink(head, params.docLocation);


    const body = document.createElement('body');
    body.innerHTML = html;
    applyHighlightJs(body);

    root.appendChild(head);
    root.appendChild(body);
    return root.innerHTML;
}


function appendStylesheets(el: Element) {
    el.appendChild(createStyleSheet('/css/asciidoc/colony.min.css'));
    el.appendChild(createStyleSheet('/css/asciidoc/highlightjs/idea.min.css'));
}

function appendOmbedLink(el: Element, docLocation: string) {
    const link  = document.createElement('link');
    link.rel  = 'alternate';
    link.type = 'application/json+oembed';
    link.href = Constants.DOCULET_OEMBED_URL + `url=${staticHostingUrl}${docLocation}`;
    el.appendChild(link);
}

function createStyleSheet(location: string) {
    const link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = location;
    link.media = 'all';
    return link;
}
