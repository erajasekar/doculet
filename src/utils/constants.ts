export default class Constants {
    public static readonly ACCESS_TOKEN_PROPERTY = 'accessToken';
    public static readonly ON_LOAD_DOC_NAME = 'Getting Started.adoc';
    public static readonly ON_LOAD_DOC_CONTENT = 'Welcome to AsciiDocLIVE!\n' +
        '------------------------\n' +
        '\n' +
        'AsciiDocLIVE is a *free online http://www.methods.co.nz/asciidoc/[AsciiDoc^]\n' +
        'editor*.\n' +
        '\n' +
        '* Just type AsciiDoc source text into the *left* pane,\n' +
        '* ...and the live preview appears in the *right* pane!\n' +
        '\n' +
        'What\'s AsciiDoc?\n' +
        '~~~~~~~~~~~~~~~~~\n' +
        '\n' +
        '[source,ruby]\n' +
        '.app.rb\n' +
        '----\n' +
        'require \'sinatra\'\n' +
        'get \'/hi\' do\n' +
        ' "Hello World!"\n' +
        'end\n' +
        '----';
}
