/* eslint-disable max-len */
export const FROALA_CONFIG = {
  language: 'ru',
  quickInsertTags: [''],
  placeholderText: 'Введите описание товара...',
  toolbarButtons: {
    moreText: {
      buttons: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting'],
    },
    moreParagraph: {
      buttons: ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote'],
    },
    moreRich: {
      buttons: ['insertLink', 'insertTable', 'insertHR'],
    },
    moreMisc: {
      buttons: ['print'],
    },
  },
};

Object.freeze(FROALA_CONFIG);
