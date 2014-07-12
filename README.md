# Cordova icon and land screen generator

# Install 

```
npm install cordova-gen -g
```

# Usage

```
$ cd YOUR_PROJECT_FOLER
$ cp config.xml www/config.xml
$ cordova-gen www/img/all.png "#000"
```

# Note

1. cordova-gen read app name from `www/config.xml` . for example , config.xml has  `<name>Tidean</name>` . then `Cordova build ios` will build a folder like `platforms/ios/Tidean/Resources/`
2. `www/img/all.png` is a 2048x2048 image file , which will convert to many sizes includes icon & land screen
3. `"#000"` is the background color of generated land screen image files , it should be double quoted
4. `cordova-gen` must be executed in YOUR_PROJECT_ROOT
5. now only suport iOS and Android

