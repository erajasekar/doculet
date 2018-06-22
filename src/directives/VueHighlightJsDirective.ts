import hljs from 'highlight.js';
import {VNodeDirective} from 'vue';

export const VueHighlightJsDirective = {
    bind(el: Element, binding: VNodeDirective) {

        // if a value is directly assigned to the directive, use this
        // instead of the element content.
        el.innerHTML = binding.value ? binding.value : el.textContent;
        // on first bind, highlight all targets
        const targets = el.querySelectorAll('code');
        targets.forEach((target: Element) => {
            // Check for class attribute to not apply hljs for single backtick code.
            if (target.hasAttribute('class')) {
                hljs.highlightBlock(target);
            }
        });

    },
    componentUpdated(el: Element, binding: VNodeDirective) {
        // after an update, re-fill the content and then highlight

        // if a value is directly assigned to the directive, use this
        // instead of the element content.
        el.innerHTML = binding.value ? binding.value : el.textContent;

        const targets = el.querySelectorAll('code');
        targets.forEach((target: Element) => {
            // Check for class attribute to not apply hljs for single backtick code.
            if (target.hasAttribute('class')) {
                hljs.highlightBlock(target);
            }

        });
    },
};

