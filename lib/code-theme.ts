/**
 * Shiki themes for MDX code blocks, built from the site's syntax tokens
 * (--ui-tk-* in app/styles/tokens.css): purple keywords, blue types, green
 * strings, red numbers, amber annotations, indigo function names, grey comments.
 */
type Palette = {
  fg: string;
  bg: string;
  keyword: string;
  string: string;
  comment: string;
  number: string;
  type: string;
  annotation: string;
  fn: string;
};

function createTheme(name: string, type: 'light' | 'dark', c: Palette) {
  return {
    name,
    type,
    colors: {
      'editor.foreground': c.fg,
      'editor.background': c.bg,
    },
    tokenColors: [
      { settings: { foreground: c.fg, background: c.bg } },
      {
        scope: ['comment', 'punctuation.definition.comment', 'string.comment'],
        settings: { foreground: c.comment, fontStyle: 'italic' },
      },
      {
        scope: ['string', 'string.quoted', 'string.template', 'constant.character', 'constant.other.symbol'],
        settings: { foreground: c.string },
      },
      {
        scope: ['constant.numeric', 'constant.other.color', 'support.constant'],
        settings: { foreground: c.number },
      },
      {
        scope: [
          'keyword',
          'keyword.control',
          'keyword.other',
          'keyword.operator.new',
          'keyword.operator.expression',
          'keyword.operator.logical.python',
          'keyword.operator.word',
          'storage',
          'storage.modifier',
          'storage.type.primitive',
          'constant.language',
          'variable.language',
          'entity.name.tag',
        ],
        settings: { foreground: c.keyword },
      },
      {
        scope: [
          'storage.type.java',
          'storage.type.generic.java',
          'storage.type.object.array.java',
          'storage.type.haskell',
          'entity.name.type',
          'entity.name.class',
          'entity.other.inherited-class',
          'support.class',
          'support.type',
          'support.type.property-name',
          'meta.type.parameters entity.name.type',
          'constant.other.haskell',
        ],
        settings: { foreground: c.type },
      },
      {
        scope: [
          'storage.type.annotation',
          'punctuation.definition.annotation',
          'meta.declaration.annotation',
          'entity.other.attribute-name',
          'meta.decorator',
          'punctuation.decorator',
        ],
        settings: { foreground: c.annotation },
      },
      {
        scope: ['entity.name.function', 'support.function', 'meta.function-call entity.name.function', 'meta.method-call entity.name.function'],
        settings: { foreground: c.fn },
      },
      {
        scope: ['keyword.operator', 'punctuation', 'meta.brace', 'variable', 'variable.other', 'variable.parameter'],
        settings: { foreground: c.fg },
      },
      { scope: ['markup.heading'], settings: { foreground: c.type, fontStyle: 'bold' } },
      { scope: ['markup.bold'], settings: { fontStyle: 'bold' } },
      { scope: ['markup.italic'], settings: { fontStyle: 'italic' } },
      { scope: ['markup.inserted'], settings: { foreground: c.string } },
      { scope: ['markup.deleted'], settings: { foreground: c.number } },
    ],
  };
}

export const codeThemeLight = createTheme('university-light', 'light', {
  fg: '#202124',
  bg: '#f8f9fa',
  keyword: '#a626a4',
  string: '#188038',
  comment: '#80868b',
  number: '#c5221f',
  type: '#1967d2',
  annotation: '#b06000',
  fn: '#4e5bb4',
});

export const codeThemeDark = createTheme('university-dark', 'dark', {
  fg: '#e8eaed',
  bg: '#262626',
  keyword: '#d7aefb',
  string: '#a8dab5',
  comment: '#9aa0a6',
  number: '#f6aea9',
  type: '#8ab4f8',
  annotation: '#fdd663',
  fn: '#aecbfa',
});
