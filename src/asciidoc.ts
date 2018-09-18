export class AsciiDoc {

    private asciidoctor: any;

    constructor() {
        this.asciidoctor = require('asciidoctor.js')();
    }
    public convert(input: string) {
        return this.asciidoctor.convert(input,
            {attributes: {'source-highlighter': 'highlightjs', 'showtitle': true, 'icons': 'font'}},
            );
    }
}

export const asciiDoc = new AsciiDoc();
