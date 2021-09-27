# screenreader-remote-control
*"Screenreader shortcuts are hard to remember" is no longer a valid excuse! ;-)*

Training / learning tool for web accessibility. Use your smartphone, tablet or another device as remote control for a screenreader. 


State: Experimental, use with caution 
Currently supported: Voice Over (Apple Mac)

## Demo

🎥   Demo video: https://www.youtube.com/watch?v=sZCS_kytKj0

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

## Background

In last fall I started working as web developer again. Web Accessibility is now part of my daily job, so I needed to learn fast. A big struggle I had at first was operating screenreader software. There are just a lot of keyboard shortcuts to learn while I just wanted to get a basic feeling of how a website is read to screenreader users. Like "Does the screenreader even recognize my button?!".  I'm not sure, but maybe a lot of developers postpone learning a11y skills because of this initial hurdle? 
This project is another attempt to provide a simple learning and test tool for a11y-beginners. 

Disclaimer: I'm an a11y newbie. I try to respect *Nothing About Us Without Us* as much as possible. Feedback is very welcome. :-)

## License

My own scripts are available as CC0 (https://creativecommons.org/publicdomain/zero/1.0/deed.de). Please see package.json for a list of Open Source Libraries used (and their respective license). I'll provide a LICENSE and CREDITS file in future.