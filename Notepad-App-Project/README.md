# Notepad-App-Project
A notepad app built with ReactJS, ElctronJS, and more, by Dylan Wong and Gage Christensen.

<!-- ### Setting up your development environment

To setup React Native on Windows, follow the steps listed on [this blog](https://shift.infinite.red/getting-started-with-react-native-development-on-windows-90d85a72ae65 "React Native Setup for Windows"), otherwise find a tutorial for your OS. -->

### Cloning the repository

To clone the repo, create a new directory in your file system and name it whatever you want, in that directory open Git Bash and run the following commands.
```console
foo@bar:~$ git init
foo@bar:~$ git remote add origin https://github.com/Wong-Innovations/React-Native-Notepad-Project
foo@bar:~$ git pull origin master
```

### Grabbing the dependancies

Make sure you have [Node JS](https://nodejs.org/en/ "") installed. Then run the following commands
```console
foo@bar:~$ cd PATH/TO/PROJECT/desktop-client
foo@bar:~$ npm install
// A better method may be to use 'yarn' instead of 'npm install' if you can set it up...
```

### Running the app

After you have installed all the required dependancies using 'npm install' open up a terminal in the desktop-client directory then run
```console
// If you were able to install 'yarn' than you can replace 'npm' with it in all these commands.
foo@bar:~$ npm run rebuild
```

This will rebuild your SQLite3 installation to match your host OS, then run
```console
foo@bar:~$ npm run start
```
This will open the app in your internet browser. To build the destop app open another terminal to the same directory mentioned above then run
```console
foo@bar:~$ npm run electron-dev
```