# RadarImg
技能雷达图生成插件
a js plugin for drawing skills radar.
you can use it after add the radar.js into you project and then use:

var radarNode = document.querySelector('#radar_dom');
Radar.of(radarNode).setOption({
     maxLevel: 5,// how many levels can the radar image show
     items: [
         { label: "JavaScript", point: 5 },//label: the name of each skill.   point: the points of each skill.
         { label: "CSS", point: 2 },
         { label: "HTML", point: 3 }
     ],
     r: 50,// the radar's radius
}).draw();

you can also set some default options to the radar such as:
width: default by 200
height: default by 180 
fontSize: default by 12 
fontFamaly: default by Microsoft YAHEI
