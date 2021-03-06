export default class Constants {

    public static readonly DOCULET = 'DOCULET';
    public static readonly DOCULET_LOGO = '/static/doculet-logo1.png';
    public static readonly DOCULET_URL = 'https://doculet.net/';
    public static readonly ACCESS_TOKEN_PROPERTY = 'accessToken';
    public static readonly DB_COLLECTION_DOCULENTS = 'doculets';

    public static readonly ON_LOAD_DOC_NAME = 'User Guide.adoc';
    public static readonly ON_LOAD_DOC_CONTENT = 'Loading';
    public static readonly NEW_DOC_GIST_ID = '8d03c78d367928f569d9e3dbad8644fa';
    public static readonly GETTING_STARTED_DOC_GIST_ID = '9dbb0ce6393c355eebb1cf012a70fc5e';
    public static readonly VIEW_URL_PATTERN = '/view/';
    public static readonly EDIT_URL_PATTERN = '/edit/';
    public static readonly SHARE_URL_PATTERN = '/share/';
    public static readonly GUIDE_URL_PATTERN = '/guide';
    public static readonly MENU_ICON_COLOR = '#1E2C40';
    public static readonly GITHUB_API_URL = 'https://api.github.com/gists/';
    public static readonly GITHUB_DOCULET_OWNER_ID = '629276';

    // SEO Related
    public static readonly DOCULET_TITLE = 'Doculet - Easily share and embed code examples in your website';
    public static readonly DOCULET_DESCRIPTION = 'Doculet is a free open source project to easily create, ' +
        'share and embed code examples on your blog, ' +
        'medium articles or any of your website.';
    public static readonly DOCULET_SEO_KEYWORDS = 'code, share, embed, blog, website, ' +
        'comments, programming, computer science';
    public static readonly GOOGLE_SITE_VERIFICATION_NAME = 'google-site-verification';
    public static readonly GOOGLE_SITE_VERIFICATION_VALUE = 'vHh-krBq1bBdzJKjqoJs5Bev0qLwE-b5-jII1kfy7no';

    // Embed related
    public static readonly DOCULET_S3_DEV_URL = 'https://s3.us-east-2.amazonaws.com/doculet3/';
    public static readonly DOCULET_OEMBED_URL = `${Constants.DOCULET_URL}oembed?`;
    public static readonly DOCULET_EDIT_URL = `${Constants.DOCULET_URL}edit/`;
    public static readonly IFRAME_WIDTH = 960;
    public static readonly IFRAME_HEIGHT = 600;
    public static readonly PREVIEW_IFRAME_ID = 'preview-iframe';
    public static readonly EMBED_LOGO_WIDTH = 100;
    public static readonly EMBED_LOGO_HEIGHT = 50;
    public static readonly STATIC_CSS_VERSION = 'v0.4.0';
    public static readonly EMBED_CSS_PATH = `/css/embed/${Constants.STATIC_CSS_VERSION}/`;

    public static readonly STATIC_JS_VERSION = 'v0.4.0';
    public static readonly EMBED_JS_PATH = `/js/embed/${Constants.STATIC_JS_VERSION}/`;
    public static readonly COPYBOARD_JS = 'https://unpkg.com/clipboard@2.0.0/dist/clipboard.min.js';
}
