import hljs from 'highlight.js';
import {staticHostingUrl} from '../config/config';
import Constants from '../utils/constants';
import { constants } from 'fs';

const COPY_BUTTON_HTML = ` <button class="copy-btn" tooltip="Copy" tooltip-position="buttom">
<span class="icon">
        <i class="fa fa-copy"></i>
</span>
</button>`;

export interface EnrichParams {
    docLocation: string;
    docId: string;
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
    appendGoogleSiteVerification(head);
    appendOmbedLink(head, params.docLocation);

    const body = document.createElement('body');
    const embedContainer = createEmbedContainer(head, html, params.docId);
    body.appendChild(embedContainer);

    root.appendChild(head);
    root.appendChild(body);
    root.appendChild(createScript(`${Constants.EMBED_JS_PATH}embed.min.js`));
    return root.innerHTML;
}

function addCopyFeature(head: Element, embedBody: Element) {
    head.appendChild(createScript(Constants.COPYBOARD_JS));
    const listings = embedBody.querySelectorAll('.listingblock');
    listings.forEach((listing: Element) => {
        const listingTitle = findOrCreateListingTitle(listing);
        if (listingTitle) {
            const titleHtml = listingTitle.innerHTML || '&nbsp;';
            listingTitle.innerHTML = titleHtml + COPY_BUTTON_HTML;
        }
    });
}

function findOrCreateListingTitle(listing: Element) {
    const firstChild = listing.firstElementChild;
    let listingTitle = null;
    if (firstChild) {
        if (firstChild.getAttribute('class') === 'title') {
            listingTitle = firstChild;
        } else {
            listingTitle = document.createElement('div');
            listingTitle.className = 'title';
            listing.insertBefore(listingTitle, firstChild);
        }
    }
    return listingTitle;
}

function appendStylesheets(el: Element) {
    el.appendChild(createStyleSheet(`${Constants.EMBED_CSS_PATH}asciidoc/colony.min.css`));
    el.appendChild(createStyleSheet(`${Constants.EMBED_CSS_PATH}highlightjs/idea.min.css`));
    el.appendChild(createStyleSheet(`${Constants.EMBED_CSS_PATH}embed.min.css`));
}

function appendGoogleSiteVerification(el: Element) {
    const meta  = document.createElement('meta');
    meta.name = Constants.GOOGLE_SITE_VERIFICATION_NAME;
    meta.content = Constants.GOOGLE_SITE_VERIFICATION_VALUE;

    el.appendChild(meta);

}

function appendOmbedLink(el: Element, docLocation: string) {
    const link  = document.createElement('link');
    link.rel  = 'alternate';
    link.type = 'application/json+oembed';
    link.href = Constants.DOCULET_OEMBED_URL + `url=${docLocation}`;
    el.appendChild(link);
}

function createEmbedBody(html: string) {
    const div = document.createElement('div');
    div.className = 'embed-body';
    div.innerHTML = html;
    return div;
}

function createEmbedContainer(head: Element, html: string, docId: string) {
    const div = document.createElement('div');
    div.id = 'embed-container';

    const embedHeader = createEmbedHeader(docId);
    const embedBody = createEmbedBody(html);
    addCopyFeature(head, embedBody);
    applyHighlightJs(embedBody);

    div.appendChild(embedHeader);
    div.appendChild(embedBody);

    return div;
}

function createEmbedHeader(docId: string) {
    const div = document.createElement('div');
    const anchor = document.createElement('a');
    anchor.className = 'open-in';
    anchor.href = `${Constants.DOCULET_EDIT_URL}${docId}`;
    anchor.target = '_blank';
    anchor.textContent = 'Open in';

    const img = document.createElement('img');
    img.src = Constants.DOCULET_LOGO;
    img.width = Constants.EMBED_LOGO_WIDTH;
    img.height = Constants.EMBED_LOGO_HEIGHT;
    img.alt = Constants.DOCULET;

    div.className = 'embed-header';
    anchor.appendChild(img);
    div.appendChild(anchor);
    return div;
}

function createStyleSheet(location: string) {
    const link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = location;
    link.media = 'all';
    return link;
}

function createScript(src: string) {
    const script  = document.createElement('script');
    script.src  = src;
    script.lang = 'javascript';
    return script;
}
