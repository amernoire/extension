import { defineManifest } from '@crxjs/vite-plugin'
import packageData from '../package.json' assert { type: 'json' }

export default defineManifest({
  name: `amernoire.ai`,
  description: 'The Chrome Extension for Bloods',
  version: packageData.version,
  manifest_version: 3,
  icons: {
    16: 'img/amernoire_logo_16.png',
    32: 'img/amernoire_logo_34.png',
    48: 'img/amernoire_logo_48.png',
    128: 'img/amernoire_logo_128.png',
  },
  // action: {
  //   default_popup: 'popup.html',
  //   default_icon: 'img/logo-48.png',
  // },
  // options_page: 'options.html',
  // devtools_page: 'devtools.html',
  // background: {
  //   service_worker: 'src/background/index.js',
  //   type: 'module',
  // },
  content_scripts: [
    {
      matches: ['http://*/*', 'https://*/*'],
      js: ['src/contentScript/index.js'],
      run_at: 'document_start',
      all_frames: true,
    },
  ],
  web_accessible_resources: [
    {
      resources: [
        'img/amernoire_logo_16.png',
        'img/amernoire_logo_34.png',
        'img/amernoire_logo_48.png',
        'img/amernoire_logo_128.png',
      ],
      matches: [],
    },
  ],
  permissions: [],
})
