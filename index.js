var Q = require('q');
var FS = require('fs');

var child = require('child_process');

var exec = Q.denodeify(child.exec);
var readFile = Q.denodeify(FS.readFile);

var parseString = require('xml2js').parseString;

// TODO img is configable !

function convert(projectName,root,img,bg){
  if(!projectName){
    console.log('read projectName failed');
    return;
  }
  img || (img = 'www/img/2048.png');
  bg || (bg = "#000");
  var android = './platforms/android/res/';
  var ios = './platforms/ios/'+projectName+'/Resources/';

  var cmds = [
    'convert ' +img+ ' -resize' + ' 96x96 ' + android + 'drawable/icon.png',
    'convert ' +img+ ' -resize' + ' 48x48 ' + android + 'drawable-ldpi/icon.png',
    'convert ' +img+ ' -resize' + ' 48x48 ' + android + 'drawable-mdpi/icon.png',
    'convert ' +img+ ' -resize' + ' 72x72 ' + android + 'drawable-hdpi/icon.png',
    'convert ' +img+ ' -resize' + ' 96x96 ' + android + 'drawable-xhdpi/icon.png',
    // landing
    'convert ' +img+ ' -background "'+bg+'" -gravity center -resize' + ' 512x512 -extent 1280x720  ' + android + 'drawable-land-xhdpi/screen.png',
    'convert ' +img+ ' -background "'+bg+'" -gravity center -resize' + ' 320x320 -extent 800x480  ' + android + 'drawable-land-hdpi/screen.png',
    'convert ' +img+ ' -background "'+bg+'" -gravity center -resize' + ' 128x128 -extent 480x320  ' + android + 'drawable-land-mdpi/screen.png',
    'convert ' +img+ ' -background "'+bg+'" -gravity center -resize' + ' 128x128 -extent 320x200  ' + android + 'drawable-land-ldpi/screen.png',

    'convert ' +img+ ' -background "'+bg+'" -gravity center -resize' + ' 512x512 -extent 720x1280  ' + android + 'drawable-port-xhdpi/screen.png',
    'convert ' +img+ ' -background "'+bg+'" -gravity center -resize' + ' 320x320 -extent 480x800  ' + android + 'drawable-port-hdpi/screen.png',
    'convert ' +img+ ' -background "'+bg+'" -gravity center -resize' + ' 128x128 -extent 320x480  ' + android + 'drawable-port-mdpi/screen.png',
    'convert ' +img+ ' -background "'+bg+'" -gravity center -resize' + ' 128x128 -extent 200x320  ' + android + 'drawable-port-ldpi/screen.png',


    'convert ' +img+ ' -resize' + ' 57x57 ' + ios + 'icons/icon.png',
    'convert ' +img+ ' -resize' + ' 40x40 ' + ios + 'icons/icon-40.png',
    'convert ' +img+ ' -resize' + ' 50x50 ' + ios + 'icons/icon-50.png',
    'convert ' +img+ ' -resize' + ' 57x57 ' + ios + 'icons/icon-57.png',
    'convert ' +img+ ' -resize' + ' 60x60 ' + ios + 'icons/icon-60.png',
    'convert ' +img+ ' -resize' + ' 72x72 ' + ios + 'icons/icon-72.png',
    'convert ' +img+ ' -resize' + ' 76x76 ' + ios + 'icons/icon-76.png',
    'convert ' +img+ ' -resize' + ' 29x29 ' + ios + 'icons/icon-small.png',
    'convert ' +img+ ' -resize' + ' 512x512 ' + ios + 'icons/iTunesArtwork.png',
    'convert ' +img+ ' -resize' + ' 114x114 ' + ios + 'icons/icon@2x.png',
    'convert ' +img+ ' -resize' + ' 80x80 ' + ios + 'icons/icon-40@2x.png',
    'convert ' +img+ ' -resize' + ' 100x100 ' + ios + 'icons/icon-50@2x.png',
    'convert ' +img+ ' -resize' + ' 114x114 ' + ios + 'icons/icon-57@2x.png',
    'convert ' +img+ ' -resize' + ' 120x120 ' + ios + 'icons/icon-60@2x.png',
    'convert ' +img+ ' -resize' + ' 144x144 ' + ios + 'icons/icon-72@2x.png',
    'convert ' +img+ ' -resize' + ' 152x152 ' + ios + 'icons/icon-76@2x.png',
    'convert ' +img+ ' -resize' + ' 58x58 ' + ios + 'icons/icon-small@2x.png',
    'convert ' +img+ ' -resize' + ' 1024x1024 ' + ios + 'icons/iTunesArtwork@2x.png',

    'convert ' +img+ ' -background "'+bg+'" -gravity center -resize' + ' 128x128 -extent 320x480  ' + ios + 'splash/Default~iphone.png',
    'convert ' +img+ ' -background "'+bg+'" -gravity center -resize' + ' 256x256 -extent 640x960  ' + ios + 'splash/Default@2x~iphone.png',
    'convert ' +img+ ' -background "'+bg+'" -gravity center -resize' + ' 256x256 -extent 640x1136  ' + ios + 'splash/Default-568h@2x~iphone.png',

    'convert ' +img+ ' -background "'+bg+'" -gravity center -resize' + ' 512x512 -extent 768x1024  ' + ios + 'splash/Default-Portrait~ipad.png',
    'convert ' +img+ ' -background "'+bg+'" -gravity center -resize' + ' 1024x1024 -extent 1536x2048  ' + ios + 'splash/Default-Portrait@2x~ipad.png',

    'convert ' +img+ ' -background "'+bg+'" -gravity center -resize' + ' 512x512 -extent 1024x768  ' + ios + 'splash/Default-Landscape~ipad.png',
    'convert ' +img+ ' -background "'+bg+'" -gravity center -resize' + ' 512x512 -extent 2048x1536  ' + ios + 'splash/Default-Landscape@2x~ipad.png'
  ];

  function donext(){
    if(cmds.length){
      var cmd = cmds.pop();
      exec(cmd)
      .then(function(){
        console.log('[done]'+cmd);
        donext();
      })
      .fail(function(e){
        console.log('fail:'+cmd);
        console.log(e);
      })
    }else{
      console.log('done');
    }
  }
  donext();
}

function init(root,img,bg){
  // TODO read config.xml : 1. config.xml 2. www/config.xml
  readFile("./www/config.xml", "utf-8")
  .then(function (xml) {
    parseString(xml, function (err, result) {
      result && result.widget && result.widget.name && result.widget.name[0] && convert(result.widget.name[0],root,img,bg);
    });
  })
  .fail(function(e){
    console.log(e);
  })
}

module.exports = function(root,argv){
  argv = argv.slice(2);
  var img = argv[0];
  var bg = argv[1];
  // console.log(argv);
  init(root,img,bg);
}
