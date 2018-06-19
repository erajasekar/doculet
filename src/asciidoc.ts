export class AsciiDoc {
    public convert(input: string) {
        const asciidoctor = require('asciidoctor.js')();
        return asciidoctor.convert(input);
    }
}
