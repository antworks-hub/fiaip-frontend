'use strict'

// The editor creator to use.
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'

import EssentialsPlugin from '@ckeditor/ckeditor5-essentials/src/essentials'
import BoldPlugin from '@ckeditor/ckeditor5-basic-styles/src/bold'
import ItalicPlugin from '@ckeditor/ckeditor5-basic-styles/src/italic'
import CodePlugin from '@ckeditor/ckeditor5-basic-styles/src/code'
import FontPlugin from '@ckeditor/ckeditor5-font/src/font'
import HeadingPlugin from '@ckeditor/ckeditor5-heading/src/heading'
import AlignmentPlugin from '@ckeditor/ckeditor5-alignment/src/alignment'
import ListPlugin from '@ckeditor/ckeditor5-list/src/list'
import LinkPlugin from '@ckeditor/ckeditor5-link/src/link'
import AutoLinkPlugin from '@ckeditor/ckeditor5-link/src/autolink'

export default class ViteviniEditor extends ClassicEditor {}

// Plugins to include in the build.
ViteviniEditor.builtinPlugins = [
  EssentialsPlugin,
  BoldPlugin,
  ItalicPlugin,
  FontPlugin,
  HeadingPlugin,
  AlignmentPlugin,
  ListPlugin,
  LinkPlugin,
  AutoLinkPlugin,
  CodePlugin
]

ViteviniEditor.defaultConfig = {
  toolbar: [
    'heading',
    'fontfamily',
    'fontsize',
    '|',
    'bold',
    'italic',
    '|',
    'fontColor',
    'fontBackgroundColor',
    'alignment',
    '|',
    'bulletedList',
    'numberedList',
    '|',
    'undo',
    'redo',
    '|',
    'link',
    'code'
  ],
  fontFamily: {
    options: [
      'Ubuntu, Arial, sans-serif',
      'Ubuntu Mono, Courier New, Courier, monospace'
    ]
  },
  fontSize: {
    options: [
      9,
      11,
      13,
      'default',
      17,
      19,
      21
    ]
  },
  fontColor: {
    colors: [
      {
        color: '#414142',
        label: 'Nero'
      },
      {
        color: '#ee8b36',
        label: 'Arancione primario'
      },
      {
        color: '#D6711D',
        label: 'Arancione secondario'
      },
      {
        color: '#C8C8C8',
        label: 'Grigio'
      },
      {
        color: '#f2f2f2',
        label: 'Bianco',
        hasBorder: true
      }
    ]
  },
  fontBackgroundColor: {
    colors: [
      {
        color: '#414142',
        label: 'Nero'
      },
      {
        color: '#ee8b36',
        label: 'Arancione primario'
      },
      {
        color: '#D6711D',
        label: 'Arancione secondario'
      },
      {
        color: '#C8C8C8',
        label: 'Grigio'
      },
      {
        color: '#f2f2f2',
        label: 'Bianco',
        hasBorder: true
      }
    ]
  },
  // This value must be kept in sync with the language defined in webpack.config.js.
  language: 'it'
}
