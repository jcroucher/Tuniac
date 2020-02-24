/**
 * Electron menu components. This is the system menu.
 *
 * Note that We can't use the Vue Event Bus here. We need to use the Electron Event system
 * @type {boolean}
 */

const isMac = process.platform === 'darwin'; // Different options are needed for mac

export const menuTemplate = [
    {
        label: "File",
        submenu: [
            {
                label: 'Preferences',
                click (item, focusedWindow) {
                    // Electron event. Send a page change event which is caught in App.vue
                    // require('electron').ipcRenderer.on('change-page', (event, page)....
                    focusedWindow.webContents.send('change-page', 'preferences')
                },
            },
            { type: 'separator' },
            {
                label: 'Import Files',
                click: async () => {}
            },
            {
                label: 'Import Directory',
                click: async () => {}
            },
            {
                label: 'Import Stream',
                click: async () => {}
            },
            { type: 'separator' },
            {
                label: 'New Playlist',
                click: async () => {}
            },
            {
                label: 'Export Playlist',
                click: async () => {}
            },
            { type: 'separator' },
            isMac ? { role: 'close' } : { role: 'quit' }
        ]
    },
    {
        label: "Playback",
        submenu: [
            {
                label: 'Show Currently Playing',
                click: async () => {}
            },
            { type: 'separator' },
            {
                label: 'Play/Pause',
                click: async () => {}
            },
            {
                label: 'Soft Pause',
                click: async () => {}
            },
            {
                label: 'Stop',
                click: async () => {}
            },
            {
                label: 'Next',
                click: async () => {}
            },
            {
                label: 'Random Next',
                click: async () => {}
            },
            {
                label: 'Previous',
                click: async () => {}
            },
            { type: 'separator' },
            {
                label: 'Shuffle Play',
                click: async () => {}
            },
            {
                label: 'Clear Queue',
                click: async () => {}
            },
            {
                label: 'Clear Pause Here',
                click: async () => {}
            }
        ]
    },
    {
        label: 'Window',
        submenu: [
            { role : "reload" },
            { role: 'minimize' },
            { role: 'zoom' },
            ...(isMac ? [
                { type: 'separator' },
                { role: 'front' },
                { type: 'separator' },
                { role: 'window' }
            ] : [
                { role: 'close' }
            ])
        ]
    },
    {
        label : "About",
        submenu : [
            { role : "about" },
            {
                label: 'Learn More',
                click: async () => {
                    const { shell } = require('electron');
                    await shell.openExternal('https://github.com/jcroucher/Tuniac');
                }
            }
        ]
    }
];
