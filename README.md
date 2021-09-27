# screenreader-remote-control

Training / learning tool for web accessibility. Use your smartphone, tablet or another device as remote control for a screenreader. "Screenreader shortcuts are hard to remember" is no longer a valid excuse! ;-)

State: Experimental, use with caution 

Currently supported: Voice Over (Apple Mac), controlled via applescript commands

## Install / Run

- npm start

## Built with

- electron-forge
- node-applescript
- websocket
- express
- quick-local-ip

Thanks to https://github.com/mafikes/electron-websocket-express/

## TODOs / ideas

- implement start/stop websocket server
- add github pipeline, test dmg for mac (permissions must be given?)
- ! show local ip as qr code in electron app
    - use ipc bridge for secure communication to get data for electron app frontend (see https://stackoverflow.com/a/59888788)
    - ! add secure key for more secure server <-> client connection
- show connection status in remote control web app
- screenreader support?
    - add NVDA windows support (not quite sure if easily possible?!)
    - add orca linux support (not quite sure if easily possible?!)