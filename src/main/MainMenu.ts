import electron from 'electron';

// import { store } from '../store';

// const enableTogglingInternalFeatures =
//   process.env.NODE_ENV === 'development' ||
//   process.env.REALM_STUDIO_INTERNAL_FEATURES === 'true'; // Show features only relevant for Realm employees


export const getDefaultMenuTemplate = (updateMenu: () => void): electron.MenuItemConstructorOptions[] => {
  // const showInternalFeatures = store.shouldShowInternalFeatures();
  // const electronOrRemote = electron.remote || electron;
  const template: electron.MenuItemConstructorOptions[] = [
    {
      label: 'File',
      id: 'file',
      submenu: [
        {
          label: 'Open...',
          accelerator: 'CmdOrCtrl+O',
          click: () => {
            console.log('TODO: Open something')
          },
        },
        { type: 'separator' },
        {
          label: 'Create Realm from',
          id: 'import',
          submenu: [
            {
              id: 'import-csv',
              label: 'CSV',
              click: () => {
                console.log('notImplemented()')
                // main.showImportData(ImportFormat.CSV).catch(err => {
                //   showError('Failed to import data', err);
                // });
              },
            },
          ],
        },
        { type: 'separator' },
        { role: 'close', id: 'close' },
      ],
    },
    // {
    //   label: 'Edit',
    //   id: 'edit',
    //   submenu: [
    //     { role: 'undo' },
    //     { role: 'redo' },
    //     { type: 'separator' },
    //     { role: 'cut' },
    //     { role: 'copy' },
    //     { role: 'paste' },
    //     { role: 'delete' },
    //     { role: 'selectall', id: 'select-all' },
    //   ],
    // },
    // {
    //   label: 'View',
    //   submenu: [
    //     {
    //       label: 'Show Internal Realm features',
    //       visible: showInternalFeatures || enableTogglingInternalFeatures,
    //       type: 'checkbox',
    //       checked: showInternalFeatures,
    //       click: () => {
    //         store.toggleShowInternalFeatures();
    //         updateMenu();
    //       },
    //     },
    //     { role: 'reload', visible: showInternalFeatures },
    //     { role: 'toggledevtools', visible: showInternalFeatures },
    //     { type: 'separator', visible: showInternalFeatures },
    //     {
    //       label: 'Show partial Realms',
    //       type: 'checkbox',
    //       checked: store.shouldShowPartialRealms(),
    //       click: () => {
    //         store.toggleShowPartialRealms();
    //         updateMenu();
    //       },
    //     },
    //     {
    //       label: 'Show system Realms',
    //       type: 'checkbox',
    //       checked: store.shouldShowSystemRealms(),
    //       click: () => {
    //         store.toggleShowSystemRealms();
    //         updateMenu();
    //       },
    //     },
    //     {
    //       label: 'Show system users',
    //       type: 'checkbox',
    //       checked: store.shouldShowSystemUsers(),
    //       click: () => {
    //         store.toggleShowSystemUsers();
    //         updateMenu();
    //       },
    //     },
    //     {
    //       label: 'Show system classes and properties',
    //       type: 'checkbox',
    //       checked: store.shouldShowSystemClasses(),
    //       click: () => {
    //         store.toggleShowSystemClasses();
    //         updateMenu();
    //       },
    //     },
    //     { type: 'separator' },
    //     { role: 'resetzoom' },
    //     { role: 'zoomin' },
    //     { role: 'zoomout' },
    //     { type: 'separator' },
    //     { role: 'togglefullscreen' },
    //   ],
    // },
    // {
    //   role: 'window',
    //   submenu: [{ role: 'minimize' }, { role: 'zoom' }],
    // },
    // {
    //   label: 'Realm Cloud',
    //   submenu: [
    //     {
    //       label: 'Login',
    //       visible: true,
    //       click: () => {
    //         console.log('notImplemented()')
    //       },
    //     },
    //     {
    //       label: 'Logout',
    //       visible: true,
    //       click: () => {
    //         console.log('notImplemented()')
    //       },
    //     },
    //   ],
    // },
    // {
    //   role: 'help',
    //   submenu: [
    //     {
    //       label: 'Learn More...',
    //       click: () => {
    //         electronOrRemote.shell.openExternal('https://realm.io/docs');
    //       },
    //     },
    //     {
    //       label: 'Clear Cache',
    //       click: () => {
    //         console.log('notImplemented()')
    //       },
    //     },
    //     {
    //       label: 'Open Cache folder',
    //       visible: showInternalFeatures,
    //       click: () => {
    //         electronOrRemote.shell.openItem(
    //           electronOrRemote.app.getPath('userData'),
    //         );
    //       },
    //     },
    //   ],
    // },
  ];

  // if (process.platform === 'darwin') {
  //   template.unshift({
  //     label: electronOrRemote.app.getName(),
  //     submenu: [
  //       { role: 'about' },
  //       { type: 'separator' },
  //       {
  //         label: 'Check for Updates...',
  //         click: () => {
  //           console.log('notImplemented()')
  //         },
  //       },
  //       { type: 'separator' },
  //       { role: 'services', submenu: [] },
  //       { type: 'separator' },
  //       { role: 'hide' },
  //       { role: 'hideothers' },
  //       { role: 'unhide' },
  //       { type: 'separator' },
  //       { role: 'quit' },
  //     ],
  //   });
  // }

  // Workaround for https://github.com/electron/electron/issues/8703
  // In some cases the setting for `visible` is not respected, instead
  // just manually remove all items marked invisible.
  for (let i = template.length - 1; i >= 0; i--) {
    const menuItem: electron.MenuItemConstructorOptions = template[i];
    if (menuItem.visible === false) {
      template.splice(i, 1);
      continue;
    }
    if (menuItem.submenu instanceof Array) {
      for (let j = menuItem.submenu.length - 1; j >= 0; j--) {
        const subMenuItem: electron.MenuItemConstructorOptions =
          menuItem.submenu[j];
        if (subMenuItem.visible === false) {
          menuItem.submenu.splice(j, 1);
        }
      }
    }
  }

  return template;
};
