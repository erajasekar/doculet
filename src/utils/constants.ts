export default class Constants {

    public static readonly DOCULET_URL = 'https://doculet.net/';
    public static readonly ACCESS_TOKEN_PROPERTY = 'accessToken';
    public static readonly DB_COLLECTION_DOCULENTS = 'doculets';
    public static readonly ON_LOAD_DOC_NAME = 'User Guide.adoc';
    public static readonly ON_LOAD_DOC_CONTENT = 'Loading';
    public static readonly NEW_DOC_GIST_ID = '8d03c78d367928f569d9e3dbad8644fa';
    public static readonly GETTING_STARTED_DOC_GIST_ID = 'bf75e8cc021e8d39d17a09f3a592844a';
    public static readonly VIEW_URL_PATTERN = '/view/';
    public static readonly MENU_ICON_COLOR = '#1E2C40';
    public static readonly GITHUB_API_URL = 'https://api.github.com/gists/';
    public static readonly GITHUB_DOCULET_OWNER_ID = '629276';
    public static readonly DOCULET_TITLE = 'Doculet - Easily share and embed code examples in your website';
    public static readonly DOCULET_DESCRIPTION = 'Doculet is a free open source project to easily create, ' +
        'share and embed code examples on your blog, ' +
        'medium articles or any of your website.';
    public static readonly DOCULET_SEO_KEYWORDS = 'code, share, embed, blog, website, ' +
        'comments, programming, computer science';

    public static readonly DOCULET_S3_DEV_URL = 'https://doculet3.s3-website.us-east-2.amazonaws.com/';
    public static readonly DOCULET_OEMBED_URL = `${Constants.DOCULET_URL}ombed?`;
}
