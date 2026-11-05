"""Build original SVG tile scenery, aligned to the existing gameplay coordinates."""
from pathlib import Path
import random
OUT=Path(__file__).resolve().parents[1]/'assets'
class Scene:
 def __init__(self): self.parts=[];self.r=random.Random(82)
 def rect(self,x,y,w,h,c): self.parts.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{c}"/>')
 def poly(self,pts,c): self.parts.append(f'<path d="{pts}" fill="{c}"/>')
 def window(self,x,y,w=18,h=25):
  self.rect(x-2,y-2,w+4,h+5,'#49434f');self.rect(x,y,w,h,'#176d86');self.rect(x+2,y+2,w-4,h-4,'#5bd3d8');self.poly(f'M{x+2} {y+2}h{w-4}l-{w-4} {h-6}z','#b2f1df');self.rect(x+w//2-1,y,2,h,'#ffe7a7');self.rect(x,y+h//2,w,2,'#ffe7a7');self.rect(x-3,y+h,w+6,3,'#b77551');self.rect(x-3,y+h,w+6,1,'#ffe9aa')
 def tree(self,x,y):
  self.rect(x-14,y-2,31,5,'#36794b');self.rect(x-4,y-21,8,21,'#5a3d49');self.rect(x-2,y-20,3,20,'#a36b48');self.rect(x+1,y-13,2,12,'#d69454')
  self.poly(f'M{x-20} {y-18}v-17h5v-11h10v-7h13v5h12v12h6v17h-6v7h-28z','#174e49')
  for ox,oy,w,h,c in [(-18,-38,18,19,'#28794b'),(-9,-48,18,20,'#378d4b'),(4,-40,15,22,'#23744d'),(-16,-30,27,12,'#3a974e'),(-12,-43,11,8,'#70b74c'),(-4,-49,10,8,'#95cd5c'),(-16,-32,9,6,'#73b84c'),(2,-31,10,6,'#56a34a')]:self.rect(x+ox,y+oy,w,h,c)
  for i in range(24):
   ox=self.r.randrange(-15,16);oy=self.r.randrange(-39,-20);self.rect(x+ox,y+oy,2,1,self.r.choice(['#92c858','#225b46','#52a14c']))
 def cloud(self,x,y):
  self.poly(f'M{x} {y+8}h8v-5h12v-3h15v4h11v4h8v7h-54z','#b8e4d4');self.rect(x+6,y+8,42,5,'#fff3cf');self.rect(x+11,y+4,29,8,'#fff3cf')
 def save(self,name): (OUT/name).write_text('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 240" shape-rendering="crispEdges">'+''.join(self.parts)+'</svg>')
s=Scene();b=s.rect;p=s.poly;r=s.r
# Atmospheric bands, distant island silhouettes and forest layers.
for y,c in [(0,'#319cbd'),(20,'#46b9ce'),(45,'#6dd2d5'),(74,'#9bdfcf')]:b(0,y,384,110-y,c)
b(306,17,19,19,'#ffe5a0');b(303,22,25,9,'#ffe5a0')
for x,y in [(12,20),(100,8),(245,38)]:s.cloud(x,y)
p('M0 94l26-29 16 13 25-36 27 29 20-9 30 33 30-22 35 24 31-38 25 20 32-34 37 39 25-10 20 28H0z','#57afa9')
p('M0 104l28-18 21 8 29-27 21 26 28-12 39 25 30-22 30 16 29-27 27 22 22-13 31 21 23-11 26 17v24H0z','#348e84')
for x in range(0,384,10):
 h=r.randrange(11,24);p(f'M{x} 114v-{h}h3v-5h4v5h3v{h}z','#266f68')
b(0,114,384,84,'#53984b');b(0,119,384,78,'#71ae50')
for _ in range(760):
 x,y=r.randrange(384),r.randrange(120,196);b(x,y,r.choice([1,2,3]),1,r.choice(['#91c65b','#579a48','#b0d56b','#66a14b']))
# Ground and worn stone trail, aligned with the entry and bridge.
b(158,146,41,53,'#9e8456');b(160,146,37,53,'#d8bc7d');b(62,158,276,18,'#9e8456');b(62,158,276,15,'#d8bc7d')
for _ in range(150):
 x,y=r.randrange(64,337),r.randrange(159,173);b(x,y,2,1,r.choice(['#b39b69','#f1d896']))
for y in range(153,197,7):
 for x in range(161,196,9):b(x+(3 if y%2 else 0),y,6,1,'#ac986b')
# Riverbank soil and pebbles.
b(0,197,384,43,'#167394');b(0,201,384,39,'#248fab');b(0,216,384,24,'#20829f');b(0,193,384,5,'#3b7250');b(0,198,384,3,'#c2b384')
for x in range(0,384,7):b(x,195+r.randrange(3),5,2,r.choice(['#4e695a','#81a76a','#c5c58a']))
for _ in range(190):
 x,y=r.randrange(384),r.randrange(203,240);b(x,y,r.randrange(2,9),1,r.choice(['#75d9ce','#4dbbc3','#36a3b4','#1a698f']))
# Water lilies on banks.
for x,y in [(35,212),(46,227),(302,214),(337,232)]:b(x,y,9,3,'#377e62');b(x+2,y-1,5,2,'#6fb96a');b(x+4,y-3,2,2,'#ffb6b2')
# Bridge: deck, planks, rails and stone footings.
b(157,199,44,30,'#15546e');b(160,197,38,31,'#704a3f')
for y in range(198,228,4):b(161,y,36,3,'#b78353');b(162,y,33,1,'#e2b373');b(172,y+1,8,1,'#946744')
for x in [158,196]:
 b(x,193,3,32,'#553b3a');b(x,192,3,2,'#edcb8a');b(x,204,3,2,'#edcb8a');b(x,219,3,2,'#edcb8a')
# Library footprint matches game geometry, art adds trim and texture.
b(123,148,121,8,'#477746');b(126,91,114,62,'#9e7951');b(129,94,108,56,'#e6bf77');b(130,96,105,8,'#c69660')
for y in range(105,148,6):
 for x in range(131,235,12):
  xx=x+(6 if y%12 else 0)
  if xx+10<237:b(xx,y,10,1,'#cda56c');b(xx,y+1,1,3,'#f5d59a')
for x in [127,232]:b(x,99,6,51,'#d4ab73');b(x,101,2,47,'#ffe0a1')
# Stepped red roof, individually shaded shingle rows.
p('M116 98v-6h6v-6h7v-6h8v-6h9v-6h10v-6h53v6h10v6h9v6h8v6h7v6h7v6z','#533f50')
for row in range(6):
 y=65+row*5;left=155-row*6;right=211+row*6;b(left,y,right-left,5,['#ec9284','#df776f','#d56868','#bd535e','#a94356','#90374c'][row])
 for x in range(left+2,right-3,8):b(x+(row%2)*2,y+3,5,1,'#f39b80');b(x,y+4,1,1,'#883d51')
b(120,95,126,4,'#633d48');b(122,95,122,1,'#f8ba84')
b(215,58,10,20,'#8e605b');b(213,56,14,4,'#e6bd97');b(218,60,2,15,'#c3977d')
s.window(140,111,18,24);s.window(208,111,18,24)
b(173,112,26,41,'#71504b');b(176,115,20,35,'#b28153');b(179,118,14,11,'#65c7c7');b(185,118,2,11,'#f5d99a');b(179,132,14,14,'#8b5c47');b(189,134,2,2,'#ffdf83');b(171,150,30,3,'#b0a087');b(169,153,34,2,'#e4cda2')
b(172,101,28,8,'#5c514b');b(174,102,24,5,'#e9c77d');b(181,103,4,3,'#7e684e');b(186,103,4,3,'#7e684e')
for x in [138,208]:
 b(x,138,23,5,'#a55d4f');b(x,138,23,1,'#e1a26e')
 for dx in range(2,22,5):b(x+dx,136,3,3,'#3a7f4b');b(x+dx+1,134,2,2,'#f1a3aa')
for x,y in [(28,145),(70,159),(299,146),(345,171),(112,195)]:s.tree(x,y)
# Meadow flowers, stones and grass tufts, decorative only.
for x,y in [(15,174),(48,186),(91,137),(271,188),(319,153),(233,191),(362,191)]:
 b(x,y,1,5,'#387e48');b(x-1,y,3,2,'#ffe99b');b(x,y-1,1,4,'#f7c570');b(x+3,y+4,2,1,'#d4de80')
# Treasure chest.
b(312,184,23,4,'#366b4e');b(313,171,20,14,'#67433f');b(315,169,16,3,'#d9a650');b(315,172,16,11,'#b77a43');b(313,175,20,2,'#f6cc6c');b(316,171,2,12,'#edbc58');b(328,171,2,12,'#edbc58');b(322,175,3,4,'#ffe2a0');b(323,176,1,2,'#594849')
s.save('world-school-rich.svg')
# Technology: orbital research campus, distant city and luminous floor.
s=Scene();b=s.rect;p=s.poly;r=s.r
for y,c in [(0,'#152d50'),(35,'#223b61'),(70,'#315572')]:b(0,y,384,123-y,c)
for _ in range(110):b(r.randrange(384),r.randrange(105),1,1,r.choice(['#acceda','#5f91b3','#e0d6bb']))
b(306,16,26,26,'#a1b6d0');b(301,21,36,16,'#a1b6d0');b(309,19,9,6,'#c7d8de');b(320,29,7,6,'#728cba');b(303,27,5,5,'#748fb8')
for x in range(0,384,18):
 h=r.randrange(12,54);b(x,113-h,15,h,'#1b3e58');b(x+2,115-h,2,h-4,'#2e5870')
 for yy in range(117-h,109,5):b(x+6,yy,2,1,'#478194');b(x+10,yy,2,1,'#67aab2')
b(0,116,384,124,'#244c60')
for y in range(119,240,10):
 for x in range(0,384,16):
  b(x,y,15,9,r.choice(['#315c6b','#345f6d','#2c5567']));b(x+1,y,13,1,'#427581');b(x+14,y+1,1,7,'#22475c')
for x in [18,111,274,369]:b(x,124,2,111,'#102e4e');b(x,126,1,104,'#43c0b8')
for y in [145,222]:b(18,y,352,3,'#16354b');b(18,y,352,1,'#7be0c5')
# Rear pipes and observatory dome, contained in existing lab footprint.
for x in [138,249]:b(x,88,7,61,'#17334b');b(x+1,88,3,58,'#6a9ba6');b(x,116,7,3,'#a2c3c3')
p('M145 79v-12h7v-10h10v-8h14v-5h40v5h14v8h10v10h7v12z','#182f4d')
p('M149 77v-10h7v-9h11v-7h14v-4h30v4h14v7h11v9h7v10z','#6ac3c6')
for x in [170,194,218]:b(x,52 if x!=194 else 47,3,26,'#c0e7d9')
b(147,74,98,6,'#345978');b(149,75,94,1,'#bbdcce')
b(130,80,132,71,'#122c47');b(134,83,124,64,'#567c8b');b(136,85,120,7,'#a7c5bc');b(136,95,120,48,'#31596e')
for x in range(138,255,8):b(x,96,1,45,'#426e7b')
# Window terminal wall with code, indicators, vents.
b(141,99,54,29,'#13283f');b(143,101,50,25,'#1a697f');b(144,102,48,1,'#8ce7d1')
for j,w in enumerate([18,32,24,37]):b(148,107+j*4,w,1,['#9df0cf','#ffd58a','#90cadc','#bba6ed'][j]);b(145,107+j*4,1,1,'#e1f9d2')
b(205,96,34,54,'#1d2b49');b(208,98,28,49,'#2e7a91');b(211,101,22,43,'#4cb7be');b(221,102,2,41,'#b9f4db');b(211,119,22,2,'#82decb');b(208,146,28,3,'#b6c7c0');b(203,150,38,3,'#6b94a0')
for x in range(143,190,4):b(x,134,2,6,'#112c43')
for y in range(101,142,8):b(246,y,5,3,'#78e6c4')
b(159,87,65,5,'#203b52');b(163,88,4,2,'#ffe29c');b(170,88,45,1,'#b3eed6')
# Terminal workbenches occupy existing obstacle rectangles.
for x,y in [(40,155),(285,159)]:
 b(x,y+44,48,4,'#1a3b50');b(x+3,y+27,42,20,'#1c344d');b(x+5,y+29,38,3,'#607e90');b(x+7,y+34,32,10,'#284c63')
 for xx in range(x+10,x+37,5):b(xx,y+36,2,6,'#456a7b')
 b(x+2,y,44,29,'#12283e');b(x+4,y+2,40,24,'#8389b6');b(x+7,y+5,34,17,'#21445f');b(x+8,y+6,32,1,'#a4dfdb')
 for j in range(3):b(x+10,y+10+j*4,24-j*5,1,'#73d9ca')
 b(x,y+28,48,4,'#8cb0b0');b(x+8,y+29,20,1,'#253b55');b(x+34,y+28,3,2,'#ffdb93')
# Robot merchant on existing target.
b(262,219,23,4,'#18394e');b(268,209,4,11,'#699ca6');b(277,209,4,11,'#699ca6');b(265,199,18,14,'#a5c9c8');b(267,200,14,10,'#537d94');b(271,203,6,3,'#8bffe0');b(262,184,23,16,'#29435c');b(264,186,19,12,'#c3ddd0');b(266,189,15,6,'#23455c');b(269,190,3,2,'#6ef6d2');b(276,190,3,2,'#6ef6d2');b(273,180,2,5,'#9cc9bf');b(272,178,4,3,'#ffe6a1');b(261,202,3,7,'#73a8af');b(284,202,3,7,'#73a8af')
# Cable channels and inset landing beacons.
for x,y in [(20,166),(110,130),(344,128),(344,228)]:b(x,y,9,3,'#152e49');b(x+2,y,5,1,'#a5f2d7')
s.save('world-tech-rich.svg')
print('Created original detailed SVG worlds')
