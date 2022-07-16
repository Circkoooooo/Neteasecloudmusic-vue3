const { app, BrowserWindow } = require('electron');

const createWindow = () => {
	const win = new BrowserWindow({
		width: 1000,
		height: 760,
		minHeight: 724,
		minWidth: 1000,
		frame: false,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
	});
	if (process.env.npm_lifecycle_event === 'electron:start') {
		win.loadURL('http://localhost:3000');
		win.webContents.openDevTools();
	} else {
		win.loadFile('dist/index.html');
	}
};
app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
