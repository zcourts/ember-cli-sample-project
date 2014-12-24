NextStep5
=========

Open a terminal and cd into the main project directory then run

```bash
./run-client.sh
```

then in a new tab or terminal run

```bash
./run-server.sh
```

If these don't work on Windows try

```bash
cd `client`
node install
bower install
```

repeat for server, cd into server directory and run node and bower install.

Alternatively, instead of ./run-server you can run the server from Intellij so that you can debug.
To achieve the same thing the script does, in Intellij, expand the server/bin directory, right click on www and click run or debug

This should fail, when it does, click the drop down button at the top of Intellij next to the run button and click
edit configuration. Change th configuration to be similar to

![www configuration example](https://cloud.githubusercontent.com/assets/692396/5546249/412f9210-8b35-11e4-8f54-9179ee413968.png)

The server should now be available at http://localhost:3000 ,  the app at http://localhost:3000/app
