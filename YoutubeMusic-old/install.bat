@echo off

color 79

call npm -v
if %errorlevel%==1 (
	cls
	color 79
	echo ````````......``````..````````````...````...````````...````...```````````...````...````````....`````
	echo `````:ydmNNNNmds.``smmd:`````````ommd-``-mmm/``````ommm-``:mmm:```.-.```.dmmo```dmmh:`````-mmmo`````
	echo ````sNMNs+//+sho```yMMMN+``````.yMMMN:``:MMM+``````sMMN-``/MMN:``/mNm+``.NMMo```NMMMNy-```:NMMs`````
	echo ````hMMN+:-.```````yMMMMNs.```:dMMMMM:``:MMM+``````sMMN-``/MMN:`oNMNMNs..NMMo```NMMMMMNo-`:NMMs`````
	echo ````-smNNNNmdyo:```yMMmyNMd-`+mMmsMMM:``:MMM+``````sMMN-``/MMN+yMMy-sNMh:NMMo```NMMdomMMm+/NMMs`````
	echo ``````.-:+oydMMNs``yMMm.+NMmyNMh-/MMM:``-NMMs``````yMMN.``/MMMNMNo```+mMmMMM+```NMMh.-sNMMmMMMs`````
	echo ````:o/-.``.:mMMd``yMMm.`:dMMNs.`/MMM:```hMMN+-..-oNMMs```/MMMMm/`````:dMMMM+```NMMh.``:yNMMMMs`````
	echo ````yNNNmmmmNMNh:``yMMm```.os/```/MMM:```.smMMNmmNMMmo.```/MMMh-```````.yMMM+```NMMh.```./dMMMs`````
	echo `````-:+ooso+:.````:++/``````````.+++.`````.:+oooo/:.`````.+++.``````````/+o-```+oo/``````./oo:`````

	echo.
	echo.
	echo Exiting the script as Node.JS isn't installed on this PC. Check https://nodejs.org/ for downloads or press any key to open the page. After installing, run this script again.
	echo.
	echo.
	pause
	start "" https://nodejs.org/
	exit /b
)

echo.
echo.
echo Node.JS is installed. Proceeding to verify if electron is installed
echo.
echo.

call electron --version
if %errorlevel%==1 (
	echo.
	echo.
	echo Electron isn't installed. Installing electron.
	echo.
	call npm install -g electron
	timeout 7 > nul
	cls
	color 79
	call electron --version
	if %errorlevel%==1 (
		echo.
		echo.
		echo Electron couldn't be installed. Please restart the script or try again later.
		pause
		exit /b
	)
	echo.
	echo.
	echo Electron installed successfully.
	echo.
	echo.
) else (
	echo.
	echo.
	echo Electron is already installed. Skipping.
	echo.
	echo.
)

set SCRIPT="%TEMP%\%RANDOM%-%RANDOM%-%RANDOM%-%RANDOM%.vbs"

echo Set oWS = WScript.CreateObject("WScript.Shell") >> %SCRIPT%
echo sLinkFile = "%~dp0\YoutubeMusic.lnk" >> %SCRIPT%
echo Set oLink = oWS.CreateShortcut(sLinkFile) >> %SCRIPT%
echo oLink.TargetPath = "%userprofile%\AppData\Roaming\npm\node_modules\electron\dist\electron.exe" >> %SCRIPT%
echo oLink.Arguments = "%~dp0\assets\core.js" >> %SCRIPT%
echo oLink.IconLocation = "%~dp0\assets\icon.ico" >> %SCRIPT%
echo oLink.Save >> %SCRIPT%

cscript /nologo %SCRIPT%
del %SCRIPT%

copy "%~dp0\YoutubeMusic.lnk" "%userprofile%\desktop"

cls
color 79

echo ````````......``````..````````````...````...````````...````...```````````...````...````````....`````
echo `````:ydmNNNNmds.``smmd:`````````ommd-``-mmm/``````ommm-``:mmm:```.-.```.dmmo```dmmh:`````-mmmo`````
echo ````sNMNs+//+sho```yMMMN+``````.yMMMN:``:MMM+``````sMMN-``/MMN:``/mNm+``.NMMo```NMMMNy-```:NMMs`````
echo ````hMMN+:-.```````yMMMMNs.```:dMMMMM:``:MMM+``````sMMN-``/MMN:`oNMNMNs..NMMo```NMMMMMNo-`:NMMs`````
echo ````-smNNNNmdyo:```yMMmyNMd-`+mMmsMMM:``:MMM+``````sMMN-``/MMN+yMMy-sNMh:NMMo```NMMdomMMm+/NMMs`````
echo ``````.-:+oydMMNs``yMMm.+NMmyNMh-/MMM:``-NMMs``````yMMN.``/MMMNMNo```+mMmMMM+```NMMh.-sNMMmMMMs`````
echo ````:o/-.``.:mMMd``yMMm.`:dMMNs.`/MMM:```hMMN+-..-oNMMs```/MMMMm/`````:dMMMM+```NMMh.``:yNMMMMs`````
echo ````yNNNmmmmNMNh:``yMMm```.os/```/MMM:```.smMMNmmNMMmo.```/MMMh-```````.yMMM+```NMMh.```./dMMMs`````
echo `````-:+ooso+:.````:++/``````````.+++.`````.:+oooo/:.`````.+++.``````````/+o-```+oo/``````./oo:`````

echo.
echo.
echo App installed successfully. A desktop shortcut has been created, from there you can pin to taskbar, add to startup etc.
echo.
pause
del install.bat
exit /b
