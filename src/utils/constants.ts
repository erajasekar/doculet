export default class Constants {
    public static readonly ACCESS_TOKEN_PROPERTY = 'accessToken';
    public static readonly DB_COLLECTION_DOCULENTS = 'doculets';
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
    public static readonly NEW_DOC_GIST_ID = 'e322756b428595516bc471c81c2081bf';
    public static readonly GETTING_STARTED_DOC_GIST_ID = '15d05096e7076183d74469ed32ba234f';
    public static readonly VIEW_URL_PATTERN = '/doc/';
    public static readonly MENU_ICON_COLOR = '#1E2C40';
}
