function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{"ct+p":function(e,t,n){"use strict";n.r(t),n.d(t,"HomePageModule",(function(){return g}));var i=n("ofXK"),o=n("TEn/"),s=n("3Pt+"),r=n("tyNb"),l=n("fXoL"),a=["searchDepth"],c=["moveTurn"];function u(e,t){if(1&e&&l.Kb(0,"pre",16),2&e){var n=l.Vb();l.Yb("innerHTML",n.result,l.ac)}}var h,b,p,f=[{path:"",component:(h=function(){function e(){_classCallCheck(this,e),this.showResult=!1,this.result=""}return _createClass(e,[{key:"ngOnInit",value:function(){this.game=new Chess,this.board=ChessBoard("board",{draggable:!0,dropOffBoard:"trash",sparePieces:!0})}},{key:"start",value:function(){this.findSolution()}},{key:"stop",value:function(){this.result="",this.showResult=!1}},{key:"clear",value:function(){this.board.clear(),this.game.clear(),this.result="",this.showResult=!1}},{key:"findSolution",value:function(){var e;this.depth_think=parseInt(this.depth_think_selector.nativeElement.value),e=parseInt(this.move_turn_selector.nativeElement.value)%2==0?"w":"b";var t=this.board.position("fen")+" "+e+" KQkq - 0 1";this.game.load(t);var n=this.iterativeSolution();if(n&&n.length>0){var i="";n.forEach((function(e){Array.isArray(e)?(e.forEach((function(e){e=Array.isArray(e)?e.join(""):e})),i+="<ul>"+e.join("")+"</ul>"):i+="<b>"+e+"</b><br>"})),console.log(n),this.result=i}else this.result="No solution.";this.showResult=!0}},{key:"iterativeSolution",value:function(){var e=this,t=[];if(1==this.depth_think)return this.allMoves(),this.possibleMoves&&0!=this.possibleMoves.length?(this.possibleMoves.forEach((function(e){e.includes("#")&&t.push(e)})),t):t;var n=[];if(2==this.depth_think){if(n=this.allMoves(),!this.possibleMoves||0==this.possibleMoves.length)return t;for(var i=0;i<n.length;i++)if(!n[i].includes("#")){t.push("1."+n[i]),this.game.move(n[i]),this.allMoves();var o=void 0,s=this.possibleMoves,r=[];if(s&&0!=s.length)for(var l=function(n){o=s[n],e.game.move(o),e.allMoves();var i=[];if(e.possibleMoves.forEach((function(e){e.includes("#")&&i.push(e)})),0==i.length)return e.game.undo(),e.game.undo(),e.allMoves(),t.pop(),"break";i.length>0&&(r.push("<li>2."+o+" - "+i[0]+"</li>"),e.game.undo(),n==s.length-1&&(t.push(r),r=[],e.game.undo()))},a=0;a<s.length&&"break"!==l(a);a++);else t.pop()}return t}if(3==this.depth_think){if(n=this.allMoves(),!this.possibleMoves||0==this.possibleMoves.length)return t;for(var c=this.game.fen(),u=0;u<n.length;u++)if(!n[u].includes("#")){t.push("1."+n[u]),this.game.move(n[u]),this.allMoves();var h=void 0,b=this.possibleMoves,p=[];if(b&&0!=b.length)for(var f=this.game.fen(),v=0;v<b.length;v++)h=b[v],t.push("<li> >> "+h+"</li>"),this.game.move(h),this.depth_think>2&&this.depth_think--,(p=this.iterativeSolution()).length>0?(t.push(p),this.game.load(f)):(t.pop(),t.pop(),this.game.load(c));else t.pop()}return t}}},{key:"allMoves",value:function(){if("8/8/8/8/8/8/8/8"!=this.game.fen().split(" ")[0])return this.possibleMoves=this.removeOOO(this.game.moves()),this.possibleMoves}},{key:"removeOOO",value:function(e){if(!e||0==e.length)return e;var t=e.indexOf("O-O");return-1!=t&&e.splice(t,1),-1!=e.indexOf("O-O-O")&&e.splice(t,1),e}}]),e}(),h.\u0275fac=function(e){return new(e||h)},h.\u0275cmp=l.Db({type:h,selectors:[["app-home"]],viewQuery:function(e,t){var n;1&e&&(l.fc(a,!0),l.fc(c,!0)),2&e&&(l.Zb(n=l.Ub())&&(t.depth_think_selector=n.first),l.Zb(n=l.Ub())&&(t.move_turn_selector=n.first))},decls:31,vars:3,consts:[[3,"translucent"],[1,"form-group"],[1,"form-control"],["searchDepth",""],["value","1"],["value","2","selected",""],["value","3"],["moveTurn",""],["value","0","selected",""],["type","button","id","solve","value","Start",1,"btn","btn-success",3,"click"],["type","button","id","stop","value","Stop",1,"btn","btn-danger",3,"click"],["type","button","id","clear","value","Clear",1,"btn","btn-info",3,"click"],[3,"fullscreen"],["id","container"],["id","board",1,"board"],["id","res",3,"innerHTML",4,"ngIf"],["id","res",3,"innerHTML"]],template:function(e,t){1&e&&(l.Mb(0,"ion-header",0),l.Mb(1,"ion-toolbar"),l.Mb(2,"form"),l.Mb(3,"div",1),l.Mb(4,"label"),l.ec(5,"How many steps?"),l.Lb(),l.Mb(6,"select",2,3),l.Mb(8,"option",4),l.ec(9,"1"),l.Lb(),l.Mb(10,"option",5),l.ec(11,"2"),l.Lb(),l.Mb(12,"option",6),l.ec(13,"3"),l.Lb(),l.Lb(),l.Kb(14,"br"),l.Mb(15,"label"),l.ec(16,"First move by:"),l.Lb(),l.Mb(17,"select",2,7),l.Mb(19,"option",8),l.ec(20,"White"),l.Lb(),l.Mb(21,"option",4),l.ec(22,"Black"),l.Lb(),l.Lb(),l.Lb(),l.Mb(23,"div",1),l.Mb(24,"input",9),l.Tb("click",(function(){return t.start()})),l.Lb(),l.Mb(25,"input",10),l.Tb("click",(function(){return t.stop()})),l.Lb(),l.Mb(26,"input",11),l.Tb("click",(function(){return t.clear()})),l.Lb(),l.Lb(),l.Lb(),l.Lb(),l.Lb(),l.Mb(27,"ion-content",12),l.Mb(28,"div",13),l.Kb(29,"div",14),l.dc(30,u,1,1,"pre",15),l.Lb(),l.Lb()),2&e&&(l.Yb("translucent",!1),l.zb(27),l.Yb("fullscreen",!0),l.zb(3),l.Yb("ngIf",t.showResult))},directives:[o.c,o.e,s.g,s.c,s.d,s.e,s.f,o.b,i.h],styles:["#container[_ngcontent-%COMP%]{text-align:center;position:absolute;left:0;right:0}#container[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{font-size:20px;line-height:26px}#container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:16px;line-height:22px;color:#8c8c8c;margin:0}#container[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:none}.board[_ngcontent-%COMP%]{width:90vw;margin:40px auto auto}#res[_ngcontent-%COMP%], .form-line[_ngcontent-%COMP%]{display:flex}#res[_ngcontent-%COMP%]{flex-direction:column;overflow-y:auto}#res[_ngcontent-%COMP%]   b[_ngcontent-%COMP%]{margin-top:10px;display:block;margin-bottom:-10px}#res[_ngcontent-%COMP%]   b[_ngcontent-%COMP%]:first-child{-webkit-margin-before:0;margin-block-start:0}#res[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{-webkit-margin-start:10px;margin-inline-start:10px}#res[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{list-style-type:circle}#res[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{display:block}"]}),h)}],v=((p=function e(){_classCallCheck(this,e)}).\u0275mod=l.Hb({type:p}),p.\u0275inj=l.Gb({factory:function(e){return new(e||p)},imports:[[r.i.forChild(f)],r.i]}),p),g=((b=function e(){_classCallCheck(this,e)}).\u0275mod=l.Hb({type:b}),b.\u0275inj=l.Gb({factory:function(e){return new(e||b)},imports:[[i.b,s.a,o.f,v]]}),b)}}]);