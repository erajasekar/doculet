import hljs from 'highlight.js';

export const VueHighlightJsDirective = {
    bind(el: any, binding: any) {

        // if a value is directly assigned to the directive, use this
        // instead of the element content.
        if (binding.value) {
            el.innerHTML = binding.value;
        } else {
            el.innerHTML = el.textContent;
        }
        // on first bind, highlight all targets
        const targets = el.querySelectorAll('code');
        targets.forEach((target: any) => {
            hljs.highlightBlock(target);
        });

    },
    componentUpdated(el: any, binding: any) {
        // after an update, re-fill the content and then highlight

        // if a value is directly assigned to the directive, use this
        // instead of the element content.
        if (binding.value) {
            el.innerHTML = binding.value;
        } else {
            el.innerHTML = el.textContent;
        }
        const targets = el.querySelectorAll('code');
        targets.forEach((target: any) => {
            hljs.highlightBlock(target);
        });
    },
};

