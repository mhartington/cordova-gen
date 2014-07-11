# Cordova icon and land screen generator

# Install 

```
npm install cordova-gen -g
```

# Usage

```
$ cd YOUR_PROJECT_FOLER
$ cp config.xml www/config.xml # in newer cordova config.xml in root dir , copy it to www. NOTE: future versions supurt read config.xml in root dir
$ cordova-gen www/img/all.png #000 # all.png is a 2048x2048 png file
```

**there are 2 parameters:**

- `www/img/all.png`: a 2048x2048 image , build for all icon and landing 
- `#000` : landing background color

# Note

1. cordova-gen read `www/config.xml` to get the `name` field `<name>Tidean</name>` , and the name field should be a english word. Cordova will build a fold like `platforms/ios/Tidean/Resources/`
2. now only surport iOS and android
3. cordova-gen must be execute in YOUR PROJECT ROOT

