# [The "new friends list" update](https://steamcommunity.com/updates/chatupdate) broke this extension and it will not be maintained. Maybe a new project involving these features will come soon.

# SteamAutoIgnore

An extension to manage group/friend invites easier.

### Features

* Reject group invites by setting a custom name filter
* Reject friend invites by level
* Reject friend invites if the profiles are private
* Reject friend invites by multiple types of ban

### Requirements

* Requires the latest Google Chrome or Opera
* You must be logged on Steam in your browser (otherwise the script will do nothing)

### Recommendations

Turn off the features (by clicking on the ON/OFF button), if:
* you want to have good latency in games if you have weak internet
* you are not logged on Steam
* you are on a metered connection (if you have a ton of invites; or you can change to a higher check interval)

### Known issues:

* If you delete the extension or reinstall it, you will lose your settings.

* There is a [pop up](https://i.stack.imgur.com/861MU.png) when you start Chrome (this is not happening in Opera though). If the pop up annoys you, you can [download a quick-fix](https://github.com/thirdless/SteamAutoIgnore/archive/chr-fix.zip). Make sure the main extension is deleted and follow the steps below, except the first one.

## Setting up

* [Download the zipped files from here](https://github.com/thirdless/SteamAutoIgnore/archive/master.zip)
* Extract the "steamautoignore" folder somewhere in your computer (where to find and keep it)
* Open the Extension settings from your browser (if you don't find them type "chrome://extensions" in the URL bar)
* Enable "Developer mode"
* Click on "Load unpacked extension..." and choose the "steamautoignore" folder from where you extracted

### Don't delete the extracted folder or you will lose the extension !

**If you did all the steps correctly you will get the extension in the list and a "S" icon in the top right corner**

## Configuring

When you press the "S" icon, you will see a small window showing. Every time you make a change in the settings press the "Save" button. The ON/OFF button will still activate/deactivate the features even if you dont press "Save", but the changes made won't be saved.

### Input fields and buttons 

* **ON/OFF button** - Shows if the features are active or not, and switches them (duh)

* **Check interval time** - The length of time the extension will check the invitations page; expressed in minutes, minimum 2 mins, maximum 1 day (1440 mins)

* **Steam API Key** - The API Key is mandatory for some features to work. The features that need the key will be marked with "(apikey)". [Click here](http://steamcommunity.com/dev/apikey) to get it

* **Keywords to filter** - Set the keywords that you want to filter out. Each word needs to be separated from the other by a comma. E.g. FREE, CASE, $. If you want to reject every group invite, fill the field with an asterisk (*)

* **If matches, block who invited** - If a group matches the keywords above, block the person who invited

* **Keywords to filter (2)** - If the profile name matches one of the keywords set, reject the request. Similar to "**Keywords to filter**" above

* **Reject the profile is below level** - Reject the friend request if the profile level is smaller than the number you set. For example if you complete with "5" and the Steam level is 4 or smaller, the request will be rejected. Filling with "0" will deactivate the feature

* **Reject if profile is private** (api key) - Check the box if you want to reject profiles with "private" state (not "only friends" because you can still see the content of the profile even he send you a request)

* **Reject if profile has trade ban** (api key) - Check the box if you want to reject profiles with a trade ban issued

* **Reject if profile has VAC ban / game ban** (api key) - Check the box if you want to reject profiles with a VAC or game ban issued

* **Reject if profile has community ban** (api key) - Check the box if you want to reject profiles with a community ban issued

[Here is an example of customized settings.](http://i.imgur.com/KGCqBFl.png)

## Contact

If you have any suggestions, questions or concerns, you can contact me via:

* [Twitter](http://twitter.com/game4ro)
* [Steam](http://steamcommunity.com/id/game4ro)

## Donate

[Here](&#x68;&#x74;&#x74;&#x70;&#x73;&#x3A;&#x2F;&#x2F;&#x73;&#x74;&#x65;&#x61;&#x6D;&#x63;&#x6F;&#x6D;&#x6D;&#x75;&#x6E;&#x69;&#x74;&#x79;&#x2E;&#x63;&#x6F;&#x6D;&#x2F;&#x74;&#x72;&#x61;&#x64;&#x65;&#x6F;&#x66;&#x66;&#x65;&#x72;&#x2F;&#x6E;&#x65;&#x77;&#x2F;&#x3F;&#x70;&#x61;&#x72;&#x74;&#x6E;&#x65;&#x72;&#x3D;&#x32;&#x34;&#x35;&#x32;&#x31;&#x36;&#x34;&#x32;&#x30;&#x26;&#x74;&#x6F;&#x6B;&#x65;&#x6E;&#x3D;&#x6E;&#x45;&#x2D;&#x6E;&#x33;&#x6E;&#x6D;&#x6C;) is my Steam trade link if you want to donate items to me. Every donation is very appreciated! :D
