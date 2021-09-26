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

- implement all button actions (tab, read)
- show connection status in remote web app
- use dynamically local ip
    - use ipc bridge for secure communication to get data for electron app frontend (see https://stackoverflow.com/a/59888788 and `src/_OLD`)
- add secure key for more secure server <-> client connection
- add NVDA windows support (not quite sure if possible)
- bonus
    - replace jQuery with vanillaJS