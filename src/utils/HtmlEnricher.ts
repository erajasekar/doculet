import hljs from 'highlight.js';

export function applyHighlightJs(el: Element) {
    const targets = el.querySelectorAll('code');
    targets.forEach((target: Element) => {
        // Check for class attribute to not apply hljs for single backtick code.
        if (target.hasAttribute('class')) {
            hljs.highlightBlock(target);
        }
    });
}

export function enrichHtml(html: string) {
    const root = document.createElement('html');

    const head = document.createElement('head');
    appendStylesheets(head);


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
function createStyleSheet(location: string) {
    const link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = location;
    link.media = 'all';
    return link;
}
