# screenreader-remote-control

Training / learning tool for web accessibility. Use your smartphone, tablet or another device as remote control for a screenreader. No need to remember all screenreader shortcuts.  

State: Experimental, use with caution

Currently supported: Voice Over (Apple Mac)
Support for NVDA (Windows) and Orca (Linux) would be cool as well.

## Install / Run

- npm start

## Built with

- electron-forge
- node-applescript
- websocket
- express
- quick-local-ip

Thanks to https://github.com/mafikes/electron-websocket-express/

## TODOs

- implement button "read whole page" (how to jump back to web content top?)
- implement button and input "open website"
- add buttons for group actions (enter/leave groups?)
- show local ip and use it in connect.js
    - use ipc bridge for secure communication to get data for electron app frontend (see https://stackoverflow.com/a/59888788 and `src/_OLD`)
- add secure key for more secure server <-> client connection
- add NVDA windows support (not quite sure if possible)
- bonus
    - better mobile interface (big buttons, 2 column layout)
    - replace jQuery with vanillaJS
    - show connection status in remote web app