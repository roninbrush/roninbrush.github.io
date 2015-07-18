ly = Framer.Importer.load("imported/handle")

var bkg = ly.Bkg;
var entityContent = ly.EntityContent;
//var entityHeader = ly.EntityHeader;
//var entity_group = ly.Entity_Group;
//var entity_groupHeader = ly.Entity_GroupHeader;
//var entity_list_base = ly.Entity_List;
//var entityActionBtn = ly.EntityActionBtn;
var titleText_active = ly.TitleText_active;
var titleText_changed = ly.TitleText_changed;
var titleText_final = ly.TitleText_Final;
var keyboard = ly.Keyboard;
var keyboard_press = ly.Keyboard_press;
//var entityHeader_actions = ly.EntityHeader_actions;


device = new Framer.DeviceView();
device.setupContext();
device.contentScale = .90;

if (Utils.isDesktop() == true) {
      
//device.deviceType = "iphone-6-spacegray-hand"
//device.contentScale = .7;

//device.deviceType = "iphone-5c-blue-hand"
//device.contentScale = .6;

//device.deviceType = "nexus-5-black";
device.deviceType = "nexus-5-black-hand"
device.contentScale = 1;
}

scrollContainer = new Layer({
  x: 0,
  y: 0,
  height: 1920,
  width: 1080,  
  backgroundColor: "transparent",
  scroll: true
});

entity_list = new Layer({
  x: 0,
  y: 332,
  height: 3119,
  width: 1080,  
  opacity: 0,
  image: "images/scrollEntity_List.png",
  superLayer: scrollContainer
});

entity_list.draggable.enabled = true;
entity_list.draggable.speedX = 0;
entity_list.draggable.speedY = 2;

groupContainer = new Layer({
  x: 40,
  y: 880,
  height: 140,
  width: 1000,
  shadowX: 3,
  shadowY: 3,
  shadowBlur: 25,
  shadowSpread: 5,
  shadowColor: "#c3c3c3",
  backgroundColor: "#f7f7f7",
  opacity: 0,
  zindex: 5
});

hit_keyPress = new Layer({
  x: 125,
  y: 1550,
  height: 200,
  width: 200,
  backgroundColor: "rgba(189, 248, 189, 0.5)",
  zindex: 1000,
  opacity: 0
});
hit_textPress = new Layer({
  x: 0,
  y: 175,
  height: 175,
  width: 1080,
  backgroundColor: "rgba(189, 248, 189, 0.5)",
  zindex: 1000,
  opacity: 0
});
hit_save = new Layer({
  x: 780,
  y: 0,
  height: 175,
  width: 300,
  backgroundColor: "rgba(189, 248, 189, 0.5)",
  zindex: 1000,
  opacity: 0
});
hit_keyboardBtn = new Layer({
  x: 400,
  y: 0,
  height: 175,
  width: 275,
  backgroundColor: "rgba(189, 248, 189, 0.5)",
  zindex: 1000,
  opacity: 0
});

var animateInCurve, animateOutCurve, gotoGroup, gotoEntity, noBounceCurve, noBounceCurveSpeed, toggler;
//
//Framer.Device.fullScreen = true;
//
/* Settings */

animateInCurveHi = "spring(400,30,0)";
animateInCurveLo = "spring(350,50,10)";
animateOutCurve = "spring(350,35,0)";

cubic = "cubic-bezier(0,.72,.77,1)";
cubicQuick = "cubic-bezier(0,.8,.3,1)";


animSpeedReg = "0.22";

/* Layer groups */

background = new Layer({
  x: 0,
  y: 0,
  height: 1920,
  width: 1080,
  backgroundColor: "transparent"
});
background.addSubLayer(bkg);

wrapper = new Layer({
  x: 0,
  y: 0,
  height: 1920,
  width: 1080,
  backgroundColor: "transparent"
});
wrapper.addSubLayer(entityContent);
//wrapper.addSubLayer(entityHeader_actions);

wrapper.addSubLayer(titleText_active);
wrapper.addSubLayer(titleText_changed);
wrapper.addSubLayer(titleText_final);

wrapper.addSubLayer(keyboard);
wrapper.addSubLayer(keyboard_press);

wrapper.addSubLayer(hit_textPress);
wrapper.addSubLayer(hit_keyPress);
keyboard.addSubLayer(hit_save);
keyboard.addSubLayer(hit_keyboardBtn);





/* Set up */
keyboard.y = wrapper.height + keyboard.height;
keyboard_press.opacity = 0;
keyboard_press.y = 1390;

titleText_active.opacity = 0;
titleText_changed.opacity = 0;
titleText_final.opacity = 0;

//entityHeader_actions.opacity = 0;
//entityHeader_actions.y = -100;




//entityActionBtn.addSubLayer(openGroup)
makeChange = function() {
    keyboard_press.animate ({
      properties: {
        opacity: 0
      },
      curve: animateInCurveLo
    });
    titleText_changed.animate ({
      properties: {
        opacity: 1
      },
      curve: animateOutCurve
    });
    entityHeader_actions.animate ({
      properties: {
        opacity: 1
      },
      curve: animateInCurveLo
    });
   entityHeader_actions.animate ({
      properties: {
        y: 0
      },
      curve: cubicQuick
    });
    
};

showEdit = function() {
    
    keyboard.animate ({
      properties: {
        y: (wrapper.height - 729)
      },
      curve: animateInCurveLo
    });
    titleText_active.animate ({
      properties: {
        opacity: 1 
      },
      curve: animateInCurveHi
    });
};

saveChange = function() {
    
    keyboard.animate ({
      properties: {
        opacity: 0
      },
      curve: animateInCurveLo
    });
   
    
    titleText_active.animate ({
      properties: {
        opacity: 0     
      },
      curve: cubicQuick
    });
		titleText_final.animate ({
      properties: {
        opacity: 1     
      },
      curve: cubicQuick
    });
};

hideKeyboard = function() {
    
    keyboard.animate ({
      properties: {
        y: 1750
      },
      curve: cubicQuick
    });
   
};
//keyboard.y = wrapper.height + keyboard.height;
//keyboard_press.opacity = 0;
//
//titleText_active.opacity = 0;
//titleText_changed.opacity = 0;
//
//entityHeader_actions.opacity = 0;
//entityHeader_actions.y = -100;


hit_keyPress.on(Events.Click, function() {
  keyboard_press.opacity = 1;
  return makeChange(); 
});

hit_textPress.on(Events.Click, function() {
  return showEdit();
});

hit_save.on(Events.Click, function() {
  return saveChange();
});

hit_keyboardBtn.on(Events.Click, function() {
  return hideKeyboard();
});
