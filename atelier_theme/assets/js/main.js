// Scroll Offset
var scrollOffset = 150
if(window.innerWidth < 850) {
	scrollOffset = 120
}
/*! Magnific Popup - v1.1.0 - 2016-02-20
* http://dimsemenov.com/plugins/magnific-popup/
* Copyright (c) 2016 Dmitry Semenov; */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):window.jQuery||window.Zepto)}(function(a){var b,c,d,e,f,g,h="Close",i="BeforeClose",j="AfterClose",k="BeforeAppend",l="MarkupParse",m="Open",n="Change",o="mfp",p="."+o,q="mfp-ready",r="mfp-removing",s="mfp-prevent-close",t=function(){},u=!!window.jQuery,v=a(window),w=function(a,c){b.ev.on(o+a+p,c)},x=function(b,c,d,e){var f=document.createElement("div");return f.className="mfp-"+b,d&&(f.innerHTML=d),e?c&&c.appendChild(f):(f=a(f),c&&f.appendTo(c)),f},y=function(c,d){b.ev.triggerHandler(o+c,d),b.st.callbacks&&(c=c.charAt(0).toLowerCase()+c.slice(1),b.st.callbacks[c]&&b.st.callbacks[c].apply(b,a.isArray(d)?d:[d]))},z=function(c){return c===g&&b.currTemplate.closeBtn||(b.currTemplate.closeBtn=a(b.st.closeMarkup.replace("%title%",b.st.tClose)),g=c),b.currTemplate.closeBtn},A=function(){a.magnificPopup.instance||(b=new t,b.init(),a.magnificPopup.instance=b)},B=function(){var a=document.createElement("p").style,b=["ms","O","Moz","Webkit"];if(void 0!==a.transition)return!0;for(;b.length;)if(b.pop()+"Transition"in a)return!0;return!1};t.prototype={constructor:t,init:function(){var c=navigator.appVersion;b.isLowIE=b.isIE8=document.all&&!document.addEventListener,b.isAndroid=/android/gi.test(c),b.isIOS=/iphone|ipad|ipod/gi.test(c),b.supportsTransition=B(),b.probablyMobile=b.isAndroid||b.isIOS||/(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),d=a(document),b.popupsCache={}},open:function(c){var e;if(c.isObj===!1){b.items=c.items.toArray(),b.index=0;var g,h=c.items;for(e=0;e<h.length;e++)if(g=h[e],g.parsed&&(g=g.el[0]),g===c.el[0]){b.index=e;break}}else b.items=a.isArray(c.items)?c.items:[c.items],b.index=c.index||0;if(b.isOpen)return void b.updateItemHTML();b.types=[],f="",c.mainEl&&c.mainEl.length?b.ev=c.mainEl.eq(0):b.ev=d,c.key?(b.popupsCache[c.key]||(b.popupsCache[c.key]={}),b.currTemplate=b.popupsCache[c.key]):b.currTemplate={},b.st=a.extend(!0,{},a.magnificPopup.defaults,c),b.fixedContentPos="auto"===b.st.fixedContentPos?!b.probablyMobile:b.st.fixedContentPos,b.st.modal&&(b.st.closeOnContentClick=!1,b.st.closeOnBgClick=!1,b.st.showCloseBtn=!1,b.st.enableEscapeKey=!1),b.bgOverlay||(b.bgOverlay=x("bg").on("click"+p,function(){b.close()}),b.wrap=x("wrap").attr("tabindex",-1).on("click"+p,function(a){b._checkIfClose(a.target)&&b.close()}),b.container=x("container",b.wrap)),b.contentContainer=x("content"),b.st.preloader&&(b.preloader=x("preloader",b.container,b.st.tLoading));var i=a.magnificPopup.modules;for(e=0;e<i.length;e++){var j=i[e];j=j.charAt(0).toUpperCase()+j.slice(1),b["init"+j].call(b)}y("BeforeOpen"),b.st.showCloseBtn&&(b.st.closeBtnInside?(w(l,function(a,b,c,d){c.close_replaceWith=z(d.type)}),f+=" mfp-close-btn-in"):b.wrap.append(z())),b.st.alignTop&&(f+=" mfp-align-top"),b.fixedContentPos?b.wrap.css({overflow:b.st.overflowY,overflowX:"hidden",overflowY:b.st.overflowY}):b.wrap.css({top:v.scrollTop(),position:"absolute"}),(b.st.fixedBgPos===!1||"auto"===b.st.fixedBgPos&&!b.fixedContentPos)&&b.bgOverlay.css({height:d.height(),position:"absolute"}),b.st.enableEscapeKey&&d.on("keyup"+p,function(a){27===a.keyCode&&b.close()}),v.on("resize"+p,function(){b.updateSize()}),b.st.closeOnContentClick||(f+=" mfp-auto-cursor"),f&&b.wrap.addClass(f);var k=b.wH=v.height(),n={};if(b.fixedContentPos&&b._hasScrollBar(k)){var o=b._getScrollbarSize();o&&(n.marginRight=o)}b.fixedContentPos&&(b.isIE7?a("body, html").css("overflow","hidden"):n.overflow="hidden");var r=b.st.mainClass;return b.isIE7&&(r+=" mfp-ie7"),r&&b._addClassToMFP(r),b.updateItemHTML(),y("BuildControls"),a("html").css(n),b.bgOverlay.add(b.wrap).prependTo(b.st.prependTo||a(document.body)),b._lastFocusedEl=document.activeElement,setTimeout(function(){b.content?(b._addClassToMFP(q),b._setFocus()):b.bgOverlay.addClass(q),d.on("focusin"+p,b._onFocusIn)},16),b.isOpen=!0,b.updateSize(k),y(m),c},close:function(){b.isOpen&&(y(i),b.isOpen=!1,b.st.removalDelay&&!b.isLowIE&&b.supportsTransition?(b._addClassToMFP(r),setTimeout(function(){b._close()},b.st.removalDelay)):b._close())},_close:function(){y(h);var c=r+" "+q+" ";if(b.bgOverlay.detach(),b.wrap.detach(),b.container.empty(),b.st.mainClass&&(c+=b.st.mainClass+" "),b._removeClassFromMFP(c),b.fixedContentPos){var e={marginRight:""};b.isIE7?a("body, html").css("overflow",""):e.overflow="",a("html").css(e)}d.off("keyup"+p+" focusin"+p),b.ev.off(p),b.wrap.attr("class","mfp-wrap").removeAttr("style"),b.bgOverlay.attr("class","mfp-bg"),b.container.attr("class","mfp-container"),!b.st.showCloseBtn||b.st.closeBtnInside&&b.currTemplate[b.currItem.type]!==!0||b.currTemplate.closeBtn&&b.currTemplate.closeBtn.detach(),b.st.autoFocusLast&&b._lastFocusedEl&&a(b._lastFocusedEl).focus(),b.currItem=null,b.content=null,b.currTemplate=null,b.prevHeight=0,y(j)},updateSize:function(a){if(b.isIOS){var c=document.documentElement.clientWidth/window.innerWidth,d=window.innerHeight*c;b.wrap.css("height",d),b.wH=d}else b.wH=a||v.height();b.fixedContentPos||b.wrap.css("height",b.wH),y("Resize")},updateItemHTML:function(){var c=b.items[b.index];b.contentContainer.detach(),b.content&&b.content.detach(),c.parsed||(c=b.parseEl(b.index));var d=c.type;if(y("BeforeChange",[b.currItem?b.currItem.type:"",d]),b.currItem=c,!b.currTemplate[d]){var f=b.st[d]?b.st[d].markup:!1;y("FirstMarkupParse",f),f?b.currTemplate[d]=a(f):b.currTemplate[d]=!0}e&&e!==c.type&&b.container.removeClass("mfp-"+e+"-holder");var g=b["get"+d.charAt(0).toUpperCase()+d.slice(1)](c,b.currTemplate[d]);b.appendContent(g,d),c.preloaded=!0,y(n,c),e=c.type,b.container.prepend(b.contentContainer),y("AfterChange")},appendContent:function(a,c){b.content=a,a?b.st.showCloseBtn&&b.st.closeBtnInside&&b.currTemplate[c]===!0?b.content.find(".mfp-close").length||b.content.append(z()):b.content=a:b.content="",y(k),b.container.addClass("mfp-"+c+"-holder"),b.contentContainer.append(b.content)},parseEl:function(c){var d,e=b.items[c];if(e.tagName?e={el:a(e)}:(d=e.type,e={data:e,src:e.src}),e.el){for(var f=b.types,g=0;g<f.length;g++)if(e.el.hasClass("mfp-"+f[g])){d=f[g];break}e.src=e.el.attr("data-mfp-src"),e.src||(e.src=e.el.attr("href"))}return e.type=d||b.st.type||"inline",e.index=c,e.parsed=!0,b.items[c]=e,y("ElementParse",e),b.items[c]},addGroup:function(a,c){var d=function(d){d.mfpEl=this,b._openClick(d,a,c)};c||(c={});var e="click.magnificPopup";c.mainEl=a,c.items?(c.isObj=!0,a.off(e).on(e,d)):(c.isObj=!1,c.delegate?a.off(e).on(e,c.delegate,d):(c.items=a,a.off(e).on(e,d)))},_openClick:function(c,d,e){var f=void 0!==e.midClick?e.midClick:a.magnificPopup.defaults.midClick;if(f||!(2===c.which||c.ctrlKey||c.metaKey||c.altKey||c.shiftKey)){var g=void 0!==e.disableOn?e.disableOn:a.magnificPopup.defaults.disableOn;if(g)if(a.isFunction(g)){if(!g.call(b))return!0}else if(v.width()<g)return!0;c.type&&(c.preventDefault(),b.isOpen&&c.stopPropagation()),e.el=a(c.mfpEl),e.delegate&&(e.items=d.find(e.delegate)),b.open(e)}},updateStatus:function(a,d){if(b.preloader){c!==a&&b.container.removeClass("mfp-s-"+c),d||"loading"!==a||(d=b.st.tLoading);var e={status:a,text:d};y("UpdateStatus",e),a=e.status,d=e.text,b.preloader.html(d),b.preloader.find("a").on("click",function(a){a.stopImmediatePropagation()}),b.container.addClass("mfp-s-"+a),c=a}},_checkIfClose:function(c){if(!a(c).hasClass(s)){var d=b.st.closeOnContentClick,e=b.st.closeOnBgClick;if(d&&e)return!0;if(!b.content||a(c).hasClass("mfp-close")||b.preloader&&c===b.preloader[0])return!0;if(c===b.content[0]||a.contains(b.content[0],c)){if(d)return!0}else if(e&&a.contains(document,c))return!0;return!1}},_addClassToMFP:function(a){b.bgOverlay.addClass(a),b.wrap.addClass(a)},_removeClassFromMFP:function(a){this.bgOverlay.removeClass(a),b.wrap.removeClass(a)},_hasScrollBar:function(a){return(b.isIE7?d.height():document.body.scrollHeight)>(a||v.height())},_setFocus:function(){(b.st.focus?b.content.find(b.st.focus).eq(0):b.wrap).focus()},_onFocusIn:function(c){return c.target===b.wrap[0]||a.contains(b.wrap[0],c.target)?void 0:(b._setFocus(),!1)},_parseMarkup:function(b,c,d){var e;d.data&&(c=a.extend(d.data,c)),y(l,[b,c,d]),a.each(c,function(c,d){if(void 0===d||d===!1)return!0;if(e=c.split("_"),e.length>1){var f=b.find(p+"-"+e[0]);if(f.length>0){var g=e[1];"replaceWith"===g?f[0]!==d[0]&&f.replaceWith(d):"img"===g?f.is("img")?f.attr("src",d):f.replaceWith(a("<img>").attr("src",d).attr("class",f.attr("class"))):f.attr(e[1],d)}}else b.find(p+"-"+c).html(d)})},_getScrollbarSize:function(){if(void 0===b.scrollbarSize){var a=document.createElement("div");a.style.cssText="width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",document.body.appendChild(a),b.scrollbarSize=a.offsetWidth-a.clientWidth,document.body.removeChild(a)}return b.scrollbarSize}},a.magnificPopup={instance:null,proto:t.prototype,modules:[],open:function(b,c){return A(),b=b?a.extend(!0,{},b):{},b.isObj=!0,b.index=c||0,this.instance.open(b)},close:function(){return a.magnificPopup.instance&&a.magnificPopup.instance.close()},registerModule:function(b,c){c.options&&(a.magnificPopup.defaults[b]=c.options),a.extend(this.proto,c.proto),this.modules.push(b)},defaults:{disableOn:0,key:null,midClick:!1,mainClass:"",preloader:!0,focus:"",closeOnContentClick:!1,closeOnBgClick:!0,closeBtnInside:!0,showCloseBtn:!0,enableEscapeKey:!0,modal:!1,alignTop:!1,removalDelay:0,prependTo:null,fixedContentPos:"auto",fixedBgPos:"auto",overflowY:"auto",closeMarkup:'<button title="%title%" type="button" class="mfp-close">&#215;</button>',tClose:"Close (Esc)",tLoading:"Loading...",autoFocusLast:!0}},a.fn.magnificPopup=function(c){A();var d=a(this);if("string"==typeof c)if("open"===c){var e,f=u?d.data("magnificPopup"):d[0].magnificPopup,g=parseInt(arguments[1],10)||0;f.items?e=f.items[g]:(e=d,f.delegate&&(e=e.find(f.delegate)),e=e.eq(g)),b._openClick({mfpEl:e},d,f)}else b.isOpen&&b[c].apply(b,Array.prototype.slice.call(arguments,1));else c=a.extend(!0,{},c),u?d.data("magnificPopup",c):d[0].magnificPopup=c,b.addGroup(d,c);return d};var C,D,E,F="inline",G=function(){E&&(D.after(E.addClass(C)).detach(),E=null)};a.magnificPopup.registerModule(F,{options:{hiddenClass:"hide",markup:"",tNotFound:"Content not found"},proto:{initInline:function(){b.types.push(F),w(h+"."+F,function(){G()})},getInline:function(c,d){if(G(),c.src){var e=b.st.inline,f=a(c.src);if(f.length){var g=f[0].parentNode;g&&g.tagName&&(D||(C=e.hiddenClass,D=x(C),C="mfp-"+C),E=f.after(D).detach().removeClass(C)),b.updateStatus("ready")}else b.updateStatus("error",e.tNotFound),f=a("<div>");return c.inlineElement=f,f}return b.updateStatus("ready"),b._parseMarkup(d,{},c),d}}});var H,I="ajax",J=function(){H&&a(document.body).removeClass(H)},K=function(){J(),b.req&&b.req.abort()};a.magnificPopup.registerModule(I,{options:{settings:null,cursor:"mfp-ajax-cur",tError:'<a href="%url%">The content</a> could not be loaded.'},proto:{initAjax:function(){b.types.push(I),H=b.st.ajax.cursor,w(h+"."+I,K),w("BeforeChange."+I,K)},getAjax:function(c){H&&a(document.body).addClass(H),b.updateStatus("loading");var d=a.extend({url:c.src,success:function(d,e,f){var g={data:d,xhr:f};y("ParseAjax",g),b.appendContent(a(g.data),I),c.finished=!0,J(),b._setFocus(),setTimeout(function(){b.wrap.addClass(q)},16),b.updateStatus("ready"),y("AjaxContentAdded")},error:function(){J(),c.finished=c.loadError=!0,b.updateStatus("error",b.st.ajax.tError.replace("%url%",c.src))}},b.st.ajax.settings);return b.req=a.ajax(d),""}}});var L,M=function(c){if(c.data&&void 0!==c.data.title)return c.data.title;var d=b.st.image.titleSrc;if(d){if(a.isFunction(d))return d.call(b,c);if(c.el)return c.el.attr(d)||""}return""};a.magnificPopup.registerModule("image",{options:{markup:'<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',cursor:"mfp-zoom-out-cur",titleSrc:"title",verticalFit:!0,tError:'<a href="%url%">The image</a> could not be loaded.'},proto:{initImage:function(){var c=b.st.image,d=".image";b.types.push("image"),w(m+d,function(){"image"===b.currItem.type&&c.cursor&&a(document.body).addClass(c.cursor)}),w(h+d,function(){c.cursor&&a(document.body).removeClass(c.cursor),v.off("resize"+p)}),w("Resize"+d,b.resizeImage),b.isLowIE&&w("AfterChange",b.resizeImage)},resizeImage:function(){var a=b.currItem;if(a&&a.img&&b.st.image.verticalFit){var c=0;b.isLowIE&&(c=parseInt(a.img.css("padding-top"),10)+parseInt(a.img.css("padding-bottom"),10)),a.img.css("max-height",b.wH-c)}},_onImageHasSize:function(a){a.img&&(a.hasSize=!0,L&&clearInterval(L),a.isCheckingImgSize=!1,y("ImageHasSize",a),a.imgHidden&&(b.content&&b.content.removeClass("mfp-loading"),a.imgHidden=!1))},findImageSize:function(a){var c=0,d=a.img[0],e=function(f){L&&clearInterval(L),L=setInterval(function(){return d.naturalWidth>0?void b._onImageHasSize(a):(c>200&&clearInterval(L),c++,void(3===c?e(10):40===c?e(50):100===c&&e(500)))},f)};e(1)},getImage:function(c,d){var e=0,f=function(){c&&(c.img[0].complete?(c.img.off(".mfploader"),c===b.currItem&&(b._onImageHasSize(c),b.updateStatus("ready")),c.hasSize=!0,c.loaded=!0,y("ImageLoadComplete")):(e++,200>e?setTimeout(f,100):g()))},g=function(){c&&(c.img.off(".mfploader"),c===b.currItem&&(b._onImageHasSize(c),b.updateStatus("error",h.tError.replace("%url%",c.src))),c.hasSize=!0,c.loaded=!0,c.loadError=!0)},h=b.st.image,i=d.find(".mfp-img");if(i.length){var j=document.createElement("img");j.className="mfp-img",c.el&&c.el.find("img").length&&(j.alt=c.el.find("img").attr("alt")),c.img=a(j).on("load.mfploader",f).on("error.mfploader",g),j.src=c.src,i.is("img")&&(c.img=c.img.clone()),j=c.img[0],j.naturalWidth>0?c.hasSize=!0:j.width||(c.hasSize=!1)}return b._parseMarkup(d,{title:M(c),img_replaceWith:c.img},c),b.resizeImage(),c.hasSize?(L&&clearInterval(L),c.loadError?(d.addClass("mfp-loading"),b.updateStatus("error",h.tError.replace("%url%",c.src))):(d.removeClass("mfp-loading"),b.updateStatus("ready")),d):(b.updateStatus("loading"),c.loading=!0,c.hasSize||(c.imgHidden=!0,d.addClass("mfp-loading"),b.findImageSize(c)),d)}}});var N,O=function(){return void 0===N&&(N=void 0!==document.createElement("p").style.MozTransform),N};a.magnificPopup.registerModule("zoom",{options:{enabled:!1,easing:"ease-in-out",duration:300,opener:function(a){return a.is("img")?a:a.find("img")}},proto:{initZoom:function(){var a,c=b.st.zoom,d=".zoom";if(c.enabled&&b.supportsTransition){var e,f,g=c.duration,j=function(a){var b=a.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),d="all "+c.duration/1e3+"s "+c.easing,e={position:"fixed",zIndex:9999,left:0,top:0,"-webkit-backface-visibility":"hidden"},f="transition";return e["-webkit-"+f]=e["-moz-"+f]=e["-o-"+f]=e[f]=d,b.css(e),b},k=function(){b.content.css("visibility","visible")};w("BuildControls"+d,function(){if(b._allowZoom()){if(clearTimeout(e),b.content.css("visibility","hidden"),a=b._getItemToZoom(),!a)return void k();f=j(a),f.css(b._getOffset()),b.wrap.append(f),e=setTimeout(function(){f.css(b._getOffset(!0)),e=setTimeout(function(){k(),setTimeout(function(){f.remove(),a=f=null,y("ZoomAnimationEnded")},16)},g)},16)}}),w(i+d,function(){if(b._allowZoom()){if(clearTimeout(e),b.st.removalDelay=g,!a){if(a=b._getItemToZoom(),!a)return;f=j(a)}f.css(b._getOffset(!0)),b.wrap.append(f),b.content.css("visibility","hidden"),setTimeout(function(){f.css(b._getOffset())},16)}}),w(h+d,function(){b._allowZoom()&&(k(),f&&f.remove(),a=null)})}},_allowZoom:function(){return"image"===b.currItem.type},_getItemToZoom:function(){return b.currItem.hasSize?b.currItem.img:!1},_getOffset:function(c){var d;d=c?b.currItem.img:b.st.zoom.opener(b.currItem.el||b.currItem);var e=d.offset(),f=parseInt(d.css("padding-top"),10),g=parseInt(d.css("padding-bottom"),10);e.top-=a(window).scrollTop()-f;var h={width:d.width(),height:(u?d.innerHeight():d[0].offsetHeight)-g-f};return O()?h["-moz-transform"]=h.transform="translate("+e.left+"px,"+e.top+"px)":(h.left=e.left,h.top=e.top),h}}});var P="iframe",Q="//about:blank",R=function(a){if(b.currTemplate[P]){var c=b.currTemplate[P].find("iframe");c.length&&(a||(c[0].src=Q),b.isIE8&&c.css("display",a?"block":"none"))}};a.magnificPopup.registerModule(P,{options:{markup:'<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',srcAction:"iframe_src",patterns:{youtube:{index:"youtube.com",id:"v=",src:"//www.youtube.com/embed/%id%?autoplay=1"},vimeo:{index:"vimeo.com/",id:"/",src:"//player.vimeo.com/video/%id%?autoplay=1"},gmaps:{index:"//maps.google.",src:"%id%&output=embed"}}},proto:{initIframe:function(){b.types.push(P),w("BeforeChange",function(a,b,c){b!==c&&(b===P?R():c===P&&R(!0))}),w(h+"."+P,function(){R()})},getIframe:function(c,d){var e=c.src,f=b.st.iframe;a.each(f.patterns,function(){return e.indexOf(this.index)>-1?(this.id&&(e="string"==typeof this.id?e.substr(e.lastIndexOf(this.id)+this.id.length,e.length):this.id.call(this,e)),e=this.src.replace("%id%",e),!1):void 0});var g={};return f.srcAction&&(g[f.srcAction]=e),b._parseMarkup(d,g,c),b.updateStatus("ready"),d}}});var S=function(a){var c=b.items.length;return a>c-1?a-c:0>a?c+a:a},T=function(a,b,c){return a.replace(/%curr%/gi,b+1).replace(/%total%/gi,c)};a.magnificPopup.registerModule("gallery",{options:{enabled:!1,arrowMarkup:'<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',preload:[0,2],navigateByImgClick:!0,arrows:!0,tPrev:"Previous (Left arrow key)",tNext:"Next (Right arrow key)",tCounter:"%curr% of %total%"},proto:{initGallery:function(){var c=b.st.gallery,e=".mfp-gallery";return b.direction=!0,c&&c.enabled?(f+=" mfp-gallery",w(m+e,function(){c.navigateByImgClick&&b.wrap.on("click"+e,".mfp-img",function(){return b.items.length>1?(b.next(),!1):void 0}),d.on("keydown"+e,function(a){37===a.keyCode?b.prev():39===a.keyCode&&b.next()})}),w("UpdateStatus"+e,function(a,c){c.text&&(c.text=T(c.text,b.currItem.index,b.items.length))}),w(l+e,function(a,d,e,f){var g=b.items.length;e.counter=g>1?T(c.tCounter,f.index,g):""}),w("BuildControls"+e,function(){if(b.items.length>1&&c.arrows&&!b.arrowLeft){var d=c.arrowMarkup,e=b.arrowLeft=a(d.replace(/%title%/gi,c.tPrev).replace(/%dir%/gi,"left")).addClass(s),f=b.arrowRight=a(d.replace(/%title%/gi,c.tNext).replace(/%dir%/gi,"right")).addClass(s);e.click(function(){b.prev()}),f.click(function(){b.next()}),b.container.append(e.add(f))}}),w(n+e,function(){b._preloadTimeout&&clearTimeout(b._preloadTimeout),b._preloadTimeout=setTimeout(function(){b.preloadNearbyImages(),b._preloadTimeout=null},16)}),void w(h+e,function(){d.off(e),b.wrap.off("click"+e),b.arrowRight=b.arrowLeft=null})):!1},next:function(){b.direction=!0,b.index=S(b.index+1),b.updateItemHTML()},prev:function(){b.direction=!1,b.index=S(b.index-1),b.updateItemHTML()},goTo:function(a){b.direction=a>=b.index,b.index=a,b.updateItemHTML()},preloadNearbyImages:function(){var a,c=b.st.gallery.preload,d=Math.min(c[0],b.items.length),e=Math.min(c[1],b.items.length);for(a=1;a<=(b.direction?e:d);a++)b._preloadItem(b.index+a);for(a=1;a<=(b.direction?d:e);a++)b._preloadItem(b.index-a)},_preloadItem:function(c){if(c=S(c),!b.items[c].preloaded){var d=b.items[c];d.parsed||(d=b.parseEl(c)),y("LazyLoad",d),"image"===d.type&&(d.img=a('<img class="mfp-img" />').on("load.mfploader",function(){d.hasSize=!0}).on("error.mfploader",function(){d.hasSize=!0,d.loadError=!0,y("LazyLoadError",d)}).attr("src",d.src)),d.preloaded=!0}}}});var U="retina";a.magnificPopup.registerModule(U,{options:{replaceSrc:function(a){return a.src.replace(/\.\w+$/,function(a){return"@2x"+a})},ratio:1},proto:{initRetina:function(){if(window.devicePixelRatio>1){var a=b.st.retina,c=a.ratio;c=isNaN(c)?c():c,c>1&&(w("ImageHasSize."+U,function(a,b){b.img.css({"max-width":b.img[0].naturalWidth/c,width:"100%"})}),w("ElementParse."+U,function(b,d){d.src=a.replaceSrc(d,c)}))}}}}),A()});
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.MCDatepicker=t():e.MCDatepicker=t()}(self,(function(){return(()=>{"use strict";var e={422:(e,t,n)=>{n.d(t,{default:()=>Oe});var a={theme_color:"38ada9#",main_background:"#f5f5f6",active_text_color:"rgb(0, 0, 0)",inactive_text_color:"rgba(0, 0, 0, 0.2)",display:{foreground:"rgba(255, 255, 255, 0.8)",background:"var(--product-color)"},picker:{foreground:"rgb(0, 0, 0)",background:"#f5f5f6"},picker_header:{active:"#818181",inactive:"rgba(0, 0, 0, 0.2)"},weekday:{foreground:"var(--product-color)"},button:{success:{foreground:"var(--product-color)"},danger:{foreground:"#e65151"}},date:{active:{default:{foreground:"rgb(0, 0, 0)"},picked:{foreground:"#ffffff",background:"var(--product-color)"},today:{foreground:"rgb(0, 0, 0)",background:"rgba(0, 0, 0, 0.2)"}},inactive:{default:{foreground:"rgba(0, 0, 0, 0.2)"},picked:{foreground:"var(--product-color)",background:"var(--product-color)"},today:{foreground:"rgba(0, 0, 0, 0.2)",background:"rgba(0, 0, 0, 0.2)"}},marcked:{foreground:"var(--product-color)"}},month_year_preview:{active:{default:{foreground:"rgb(0, 0, 0)"},picked:{foreground:"rgb(0, 0, 0)",background:"rgba(0, 0, 0,0.2)"}},inactive:{default:{foreground:"rgba(0, 0, 0, 0.2)"},picked:{foreground:"rgba(0, 0, 0, 0.2)",background:"rgba(0, 0, 0, 0.2)"}}}},r={DMY:["calendar","month","year"],DY:["calendar","month","year"],D:["calendar","month","year"],MY:["month","year"],M:["month"],Y:["year"]};const c={el:null,context:null,dateFormat:"DD-MMM-YYYY",bodyType:"modal",autoClose:!1,closeOndblclick:!0,closeOnBlur:!1,showCalendarDisplay:!0,customWeekDays:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],customMonths:["January","February","March","April","May","June","July","August","September","October","November","December"],customOkBTN:"OK",customClearBTN:"Clear",customCancelBTN:"CANCEL",firstWeekday:0,selectedDate:null,minDate:null,maxDate:null,jumpToMinMax:!0,jumpOverDisabled:!0,disableWeekends:!1,disableWeekDays:[],disableDates:[],allowedMonths:[],allowedYears:[],disableMonths:[],disableYears:[],markDates:[],theme:a};var i="show-calendar",o="hide-calendar",l="update-calendar",d="update-display",s="update-header",u="update-preview",v="date-pick",m="preview-pick",f="month-change",h="year-change",p="set-date",y="cancel-calendar",g=function(e){e.dispatchEvent(new CustomEvent(u,{bubbles:!0}))},b=function(e){e.dispatchEvent(new CustomEvent(s,{bubbles:!0}))},_=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];e.dispatchEvent(new CustomEvent(v,{bubbles:!0,detail:{dblclick:t,date:new Date(e.getAttribute("data-val-date"))}}))},k=function(e,t){e.dispatchEvent(new CustomEvent(f,{bubbles:!0,detail:{direction:t}}))},w=function(e,t){e.dispatchEvent(new CustomEvent(h,{bubbles:!0,detail:{direction:t}}))},D=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];e.dispatchEvent(new CustomEvent(m,{bubbles:!0,detail:{dblclick:t,data:e.children[0].innerHTML}}))},x=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{instance:null,date:null};e.dispatchEvent(new CustomEvent(p,{bubbles:!0,detail:t}))},M=function(e){e.dispatchEvent(new CustomEvent(y,{bubbles:!0}))};var E=function(e,t,n){var a=(t+1)%e.length,r=((t-1)%e.length+e.length)%e.length,c=(t+1)/e.length,i=(t-e.length)/e.length;return{newIndex:"next"===n?a:r,overlap:"next"===n?~~c:~~i}},L=function(e){return new Promise((function(t,n){setTimeout(t,e)}))},C=function(){var e=null;return{slide:function(t,n,a){var r="prev"===a?"slide-right--out":"slide-left--out",c="prev"===a?"slide-right--in":"slide-left--in";t.classList.add(r),n.classList.add(c),e=L(150).then((function(){t.remove(),n.removeAttribute("style"),n.classList.remove(c)}))},onFinish:function(t){!e&&t(),e&&e.then((function(){return t()})),e=null}}},T=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new Date,t=arguments.length>1?arguments[1]:void 0,n=t.customWeekDays,a=t.customMonths,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"dd-mmm-yyyy";if(W(e).date()&&$(r.toLocaleLowerCase()).isValid()){var c=e.getDay(),i=e.getDate(),o=e.getMonth(),l=e.getFullYear(),d={d:String(i),dd:String(i).padStart(2,"0"),ddd:n[c].substr(0,3),dddd:n[c],m:String(o+1),mm:String(o+1).padStart(2,"0"),mmm:a[o].substr(0,3),mmmm:a[o],yy:String(l).substr(2),yyyy:String(l)};return $(r.toLocaleLowerCase()).replaceMatch(d)}throw new Error(e+" Is not a Date object.")},O=function(e){return e.setHours(0,0,0,0).valueOf()},S=function(e){var t=e.getBoundingClientRect();return{t:Math.ceil(t.top),l:Math.ceil(t.left),b:Math.ceil(t.bottom),r:Math.ceil(t.right),w:Math.ceil(t.width),h:Math.ceil(t.height)}},Y=function(e,t){var n=function(e,t){var n=window.innerWidth,a=window.innerHeight,r=document.body.offsetHeight,c=S(t),i=S(e);return{vw:n,vh:a,dh:r,elementOffsetTop:c.t+ +window.scrollY,elementOffsetleft:c.l+window.scrollX,elem:c,cal:i}}(e,t),a=n.cal,r=n.elem,c=n.vw,i=n.vh,o=n.dh,l=n.elementOffsetTop,d=n.elementOffsetleft,s=function(e){var t=e.elem,n=e.cal;return{t:t.t-n.h-10,b:t.b+n.h+10,l:t.w>n.w?t.l:t.l-n.w,r:t.w>n.w?t.r:t.r+n.w}}(n),u=function(e){var t=e.elementOffsetTop,n=e.elem,a=e.cal;return{t:t-a.h-10,b:t+n.h+a.h+10}}(n),v=s.l>0,m=c>s.r,f=s.t>0,h=i>s.b,p=u.t>0,y=o>u.b,g=null,b=null;return m&&(b=d),!m&&v&&(b=d+r.w-a.w),m||v||(b=(c-a.w)/2),h&&(g=l+r.h+5),!h&&f&&(g=l-a.h-5),h||f||(y&&(g=l+r.h+5),!y&&p&&(g=l-a.h-5),y||p||(g=(i-a.h)/2)),{top:g,left:b}},j=function(e){return{active:function(){e.classList.remove("mc-select__nav--inactive")},inactive:function(){e.classList.add("mc-select__nav--inactive")}}},N=function(e,t){var n=e.calendar,a=e.calendarDisplay,r=e.calendarHeader,c=e.monthYearPreview;return{display:{target:t,date:null,set setDate(e){this.date=e,a.dispatchEvent(new CustomEvent(d,{bubbles:!0}))}},header:{target:t,month:null,year:null,set setTarget(e){this.target=e,b(r)},set setMonth(e){this.month=e,b(r)},set setYear(e){this.year=e,b(r)}},preview:{target:null,month:null,year:null,set setTarget(e){this.target=e,g(c)},set setMonth(e){this.month=e,g(c)},set setYear(e){this.year=e,g(c)}},calendar:{date:null,set setDate(e){this.date=e,n.dispatchEvent(new CustomEvent(l,{bubbles:!0}))}}}},A=function(e){var t=null,n=null,a=null,r=!1;return{opened:!1,closed:!0,blured:!1,isOpening:!1,isClosing:!1,isBluring:!1,open:function(n){var c=this;this.isClosing||(r=a&&a._id===n._id,this.isOpening=!0,clearTimeout(t),function(e,t){e.dispatchEvent(new CustomEvent(i,{bubbles:!0,detail:{instance:t}}))}(e,n),t=setTimeout((function(){c.isOpening=!1,c.opened=!0,c.closed=!1,a=n}),200))},close:function(){var t=this;this.closed||this.isOpening||this.isClosing||(r=!1,this.isClosing=!0,clearTimeout(n),e.dispatchEvent(new CustomEvent(o,{bubbles:!0})),n=setTimeout((function(){t.isClosing=!1,t.opened=!1,t.closed=!0}),200))},blur:function(){var e=this;return this.isBluring=!0,L(100).then((function(){return e.closed||e.isOpening||e.isClosing?!r:!(a&&!a.options.closeOnBlur)&&(e.close(),e.isBluring=!1,e.blured=!0,!0)}))}}},P=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:16;return parseInt(Math.ceil(Math.random()*Date.now()).toPrecision(e)).toString(16)};function F(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function V(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?F(Object(n),!0).forEach((function(t){B(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):F(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function B(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function q(e){return function(e){if(Array.isArray(e))return H(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return H(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return H(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function H(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}var W=function(e){var t=Object.prototype.toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();return{object:function(){return"object"===t},array:function(){return"array"===t},date:function(){return"date"===t},number:function(){var n=Number.isNaN(e);return"number"===t&&!n},string:function(){return"string"===t},boolean:function(){return"boolean"===t},func:function(){return"function"===t}}},I=function(e){return W(e).string()&&/(?:#|0x)(?:[a-f0-9]{3}|[a-f0-9]{6})\b|(?:rgb|hsl)a?\([^\)]*\)/gi.test(e)},$=function(e){var t=/^(?:(d{1,4}|m{1,4}|y{4}|y{2})?\b(?:(?:,\s)|[.-\s\/]{1})?(d{1,4}|m{1,4}|y{4}|y{2})?\b(?:(?:,\s)|[.-\s\/]{1})?(d{1,4}|m{1,4}|y{4}|y{2})\b(?:(?:,\s)|[.-\s\/]{1})?(d{1,4}|m{1,4}|y{2}|y{4})?\b)$/gi;return{isValid:function(){var n=t.test(e);return n||console.error(new Error('"'.concat(e,'" format is not supported')))},replaceMatch:function(n){return e.replace(t,(function(e){for(var t=arguments.length,a=new Array(t>1?t-1:0),r=1;r<t;r++)a[r-1]=arguments[r];return a.forEach((function(t){t&&(e=e.replace(t,n[t]))})),e}))}}},z=function(e,t){return W(t).object()&&W(e).array()&&Object.keys(t).every((function(t){return e.includes(t)}))},J=function(e,t){return z(e,t)&&Object.keys(t).every((function(e){return I(t[e])}))},K=function(e,t){var n=Object.keys(t).filter((function(n){return!t[n](e[n])})).map((function(e){return new Error('Data does not match the schema for property: "'.concat(e,'"'))}));return 0===n.length||(n.forEach((function(e){return console.error(e)})),!1)},U={date:function(e){return W(e).date()},title:function(e){return W(e).string()},description:function(e){return W(e).string()}},R={type:function(e){return W(e).string()},color:function(e){return/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(e)}},X={theme_color:function(e){return I(e)},main_background:function(e){return I(e)},active_text_color:function(e){return I(e)},inactive_text_color:function(e){return I(e)},display:function(e){return J(["foreground","background"],e)},picker:function(e){return J(["foreground","background"],e)},picker_header:function(e){return J(["active","inactive"],e)},weekday:function(e){return J(["foreground"],e)},button:function(e){return z(["success","danger"],e)&&Object.keys(e).every((function(t){return J(["foreground"],e[t])}))},date:function(e){var t=z(["active","inactive","marcked"],e),n=Object.keys(e).every((function(t){var n=e[t],a=z(["default","picked","today"],n);if("marcked"===t)return J(["foreground"],n);var r=Object.keys(n).every((function(e){return J("default"===e?["foreground"]:["foreground","background"],n[e])}));return a&&r}));return t&&n},month_year_preview:function(e){var t=z(["active","inactive"],e),n=Object.keys(e).every((function(t){var n=e[t],a=z(["default","picked"],n),r=Object.keys(n).every((function(e){return J("default"===e?["foreground"]:["foreground","background"],n[e])}));return a&&r}));return t&&n}},G={el:function(e){return/^[#][-\w]+$/.test(e)},context:function(e){return e.nodeType==Node.ELEMENT_NODE||e.nodeType==Node.DOCUMENT_FRAGMENT_NODE},dateFormat:function(e){return $(e).isValid()},bodyType:function(e){return["modal","inline","permanent"].includes(e)},autoClose:function(e){return W(e).boolean()},closeOndblclick:function(e){return W(e).boolean()},closeOnBlur:function(e){return W(e).boolean()},showCalendarDisplay:function(e){return W(e).boolean()},customWeekDays:function(e){return W(e).array()&&7===e.length&&e.every((function(e){return/^[^\d\s]{2,}$/.test(e)}))},customMonths:function(e){return W(e).array()&&12===e.length&&e.every((function(e){return/^[^\d\s]{2,}$/.test(e)}))},customOkBTN:function(e){return W(e).string()},customClearBTN:function(e){return W(e).string()},customCancelBTN:function(e){return W(e).string()},firstWeekday:function(e){return W(e).number()&&/^[0-6]{1}$/.test(e)},selectedDate:function(e){return W(e).date()},minDate:function(e){return W(e).date()},maxDate:function(e){return W(e).date()},jumpToMinMax:function(e){return W(e).boolean()},jumpOverDisabled:function(e){return W(e).boolean()},disableWeekends:function(e){return W(e).boolean()},disableWeekDays:function(e){return W(e).array()&&e.every((function(e){return/^[0-6]{1}$/.test(e)}))},disableDates:function(e){return W(e).array()&&e.every((function(e){return W(e).date()}))},allowedMonths:function(e){return W(e).array()&&e.length<12&&e.every((function(e){return W(e).number()&&e<12}))},allowedYears:function(e){return W(e).array()&&e.every((function(e){return W(e).number()}))},disableMonths:function(e){return W(e).array()&&e.length<12&&e.every((function(e){return W(e).number()&&e<12}))},disableYears:function(e){return W(e).array()&&e.every((function(e){return W(e).number()}))},markDates:function(e){return W(e).array()&&e.every((function(e){return W(e).date()}))},markDatesCustom:function(e){return W(e).func()},daterange:function(e){return W(e).boolean()},theme:function(e){return W(e).object()&&(t=e,n=X,0===(a=Object.keys(t).filter((function(e){return n.hasOwnProperty(e)&&!n[e](t[e])})).map((function(e){return new Error('Data does not match the schema for property: "'.concat(e,'"'))}))).length||(a.forEach((function(e){return console.error(e)})),!1));var t,n,a},events:function(e){return W(e).array()&&e.every((function(e){return W(e).object()&&K(e,U)}))},eventColorScheme:function(e){return W(e).array()&&e.every((function(e){return W(e).object()&&K(e,R)}))}},Z=function(e,t){var n=Object.keys(e).filter((function(e){return!t.hasOwnProperty(e)})).map((function(e){return new Error('Property "'.concat(e,'" is not recognized'))}));e.hasOwnProperty("allowedMonths")&&e.hasOwnProperty("disableMonths")&&n.unshift(new Error('"disableMonths" option cannot be used along with "allowedMonths" option')),e.hasOwnProperty("allowedYears")&&e.hasOwnProperty("disableYears")&&n.unshift(new Error('"disableYears" option cannot be used along with "allowedYears" option'));var a=Object.keys(e).filter((function(n){return t.hasOwnProperty(n)&&!G[n](e[n])})).map((function(e){return new Error('Data does not match the schema for property: "'.concat(e,'"'))}));return e.hasOwnProperty("minDate")&&e.hasOwnProperty("maxDate")&&O(e.minDate)>=O(e.maxDate)&&n.push(new Error("maxDate should be greater than minDate")),a.length>0&&n.push.apply(n,q(a)),n.length>0?n.forEach((function(e){return console.error(e)})):(t.context=document.body,V(V({},t),e))},Q=function(e,t){return'<span style="transform: translateX('.concat("next"===e?"-100":"100",'px);">').concat(t,"</span>")};var ee=function(e){e.linkedElement&&(e.linkedElement.onfocus=function(t){e.open()})},te=function(e,t){return!(!e||!t)&&O(e)<O(t)},ne=function(e,t){return!(!e||!t)&&O(e)>O(t)},ae=function(e,t){var n=e.allowedMonths,a=e.disableMonths;return n.length?n.includes(t):!a.includes(t)},re=function(e,t){var n=e.disableYears,a=e.allowedYears;return a.length?a.includes(t):!n.includes(t)},ce=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return{date:e,day:e.getDay(),dateNumb:e.getDate(),month:e.getMonth(),year:e.getFullYear(),classList:[]}},ie=function(e,t){var n=e.options,a=e.pickedDate,r=new Date(t.getFullYear(),t.getMonth(),1),c=r.getMonth(),i=function(t){var r=["mc-date"];return t.ariaLabel=t.date.toDateString(),!function(e,t){return t.month===e}(c,t)||!ae(n,t.month)||!re(n,t.year)||function(e,t){var n=e.prevLimitDate,a=e.nextLimitDate,r=t.date,c=!!n&&O(r)<O(n),i=!!a&&O(a)<O(r);return c||i}(e,t)||function(e,t){var n=e.disableWeekends,a=t.day;return!!n&&(0===a||6===a)}(n,t)||function(e,t){var n=e.disableWeekDays,a=t.day;return!!n.length&&n.some((function(e){return e===a}))}(n,t)||function(e,t){var n=e.disableDates,a=t.date;return!!n.length&&n.some((function(e){return O(e)===O(a)}))}(n,t)?(r.push("mc-date--inactive"),t.tabindex=-1):(r.push("mc-date--active"),t.tabindex=0),function(e,t){var n=t.date;return null!==e&&O(e)===O(n)}(a,t)&&(r.push("mc-date--picked"),t.ariaLabel="Picked: ".concat(t.ariaLabel)),function(e,t){var n=e.options,a=e.markCustomCallbacks,r=t.date,c=n.markDates.some((function(e){return O(e)===O(r)})),i=a.some((function(e){return e.apply(null,[r])}));return c||i}(e,t)&&(r.push("mc-date--marked"),t.ariaLabel="Marked: ".concat(t.ariaLabel)),function(e){var t=e.date;return O(t)===O(new Date)}(t)&&(r.push("mc-date--today"),t.ariaLabel="Today: ".concat(t.ariaLabel)),t.classList=r.join(" "),t};return function(e,t){var n=[],a=e.firstWeekday,r=-1*(t.getDay()-(a-7)%7-1)%7;for(r=r>-6?r:1;n.length<42;){var c=new Date(t),i=new Date(c.setDate(r++));n.push(ce(i))}return n}(n,r).map((function(e){return i(e)}))};function oe(e){var t=document.createElement("div");t.className="mc-calendar",t.setAttribute("tabindex",0),t.innerHTML='<div class="mc-display" data-target="calendar">\n<div class="mc-display__header">\n<h3 class="mc-display__day">Thursday</h3>\n</div>\n<div class="mc-display__body">\n<div class="mc-display__data mc-display__data--primary">\n<h1 class="mc-display__date">1</h1>\n</div>\n<div class="mc-display__data mc-display__data--secondary">\n<h3 class="mc-display__month">January</h3>\n<h2 class="mc-display__year">1970</h2>\n</div>\n</div>\n</div>\n<div class="mc-picker">\n<div class="mc-picker__header mc-select mc-container" data-target="calendar">\n<div class="mc-select__month">\n<button id="mc-picker__month--prev" class="mc-select__nav mc-select__nav--prev" tabindex="0" aria-label="Previous Month">\n<svg class="icon-angle icon-angle--left" viewBox="0 0 256 512" width=\'10px\' height=\'100%\'>\n<path fill="currentColor" d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z" />\n</svg>\n</button>\n<div id="mc-current--month" class="mc-select__data mc-select__data--month" tabindex="0" aria-label="Click to select month" aria-haspopup="true" aria-expanded="false" aria-controls="mc-month-year__preview">\n<span>January</span>\n</div>\n<button id="mc-picker__month--next" class="mc-select__nav mc-select__nav--next" tabindex="0" aria-label="Next Month">\n<svg class="icon-angle icon-angle--right" viewBox="0 0 256 512" width=\'10px\' height=\'100%\'>\n<path fill="currentColor" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" />\n</svg>\n</button>\n</div>\n<div class="mc-select__year">\n<button id="mc-picker__year--prev" class="mc-select__nav mc-select__nav--prev">\n<svg class="icon-angle icon-angle--left" viewBox="0 0 256 512" width=\'10px\' height=\'100%\'>\n<path fill="currentColor" d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z" />\n</svg>\n</button>\n<div id="mc-current--year" class="mc-select__data mc-select__data--year" tabindex="0" aria-label="Click to select year" aria-haspopup="true" aria-expanded="false" aria-controls="mc-month-year__preview">\n<span>1970</span>\n</div>\n<button id="mc-picker__year--next" class="mc-select__nav mc-select__nav--next">\n<svg class="icon-angle icon-angle--right" viewBox="0 0 256 512" width=\'10px\' height=\'100%\'>\n<path fill="currentColor" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" />\n</svg>\n</button>\n</div>\n<div id="mc-picker__month-year" class="mc-picker-vhidden" aria-live="polite" aria-atomic="true">January 1970</div>\n</div>\n<div class="mc-picker__body">\n<table class="mc-table mc-container" aria-labelledby="mc-picker__month-year">\n<thead class="mc-table__header">\n<tr>\n<th class="mc-table__weekday">S</th>\n<th class="mc-table__weekday">M</th>\n<th class="mc-table__weekday">T</th>\n<th class="mc-table__weekday">W</th>\n<th class="mc-table__weekday">T</th>\n<th class="mc-table__weekday">F</th>\n<th class="mc-table__weekday">S</th>\n</tr>\n</thead>\n<tbody class="mc-table__body">\n<tr class="mc-table__week">\n<td class="mc-date mc-date--inactive" data-val-date="">28</td>\n<td class="mc-date mc-date--inactive" data-val-date="">29</td>\n<td class="mc-date mc-date--inactive" data-val-date="">30</td>\n<td class="mc-date mc-date--inactive" data-val-date="">31</td>\n<td class="mc-date mc-date--active" data-val-date="">1</td>\n<td class="mc-date mc-date--active" data-val-date="">2</td>\n<td class="mc-date mc-date--active" data-val-date="">3</td>\n</tr>\n<tr class="mc-table__week">\n<td class="mc-date mc-date--active" data-val-date="">4</td>\n<td class="mc-date mc-date--active" data-val-date="">5</td>\n<td class="mc-date mc-date--active" data-val-date="">6</td>\n<td class="mc-date mc-date--active" data-val-date="">7</td>\n<td class="mc-date mc-date--active" data-val-date="">8</td>\n<td class="mc-date mc-date--active" data-val-date="">9</td>\n<td class="mc-date mc-date--active" data-val-date="">10</td>\n</tr>\n<tr class="mc-table__week">\n<td class="mc-date mc-date--active" data-val-date="">11</td>\n<td class="mc-date mc-date--active" data-val-date="">12</td>\n<td class="mc-date mc-date--active" data-val-date="">13</td>\n<td class="mc-date mc-date--active" data-val-date="">14</td>\n<td class="mc-date mc-date--active" data-val-date="">15</td>\n<td class="mc-date mc-date--active" data-val-date="">16</td>\n<td class="mc-date mc-date--active" data-val-date="">17</td>\n</tr>\n<tr class="mc-table__week">\n<td class="mc-date mc-date--active" data-val-date="">18</td>\n<td class="mc-date mc-date--active" data-val-date="">19</td>\n<td class="mc-date mc-date--active" data-val-date="">20</td>\n<td class="mc-date mc-date--active" data-val-date="">21</td>\n<td class="mc-date mc-date--active" data-val-date="">22</td>\n<td class="mc-date mc-date--active" data-val-date="">23</td>\n<td class="mc-date mc-date--active" data-val-date="">24</td>\n</tr>\n<tr class="mc-table__week">\n<td class="mc-date mc-date--active" data-val-date="">25</td>\n<td class="mc-date mc-date--active" data-val-date="">26</td>\n<td class="mc-date mc-date--active" data-val-date="">27</td>\n<td class="mc-date mc-date--active" data-val-date="">28</td>\n<td class="mc-date mc-date--active" data-val-date="">29</td>\n<td class="mc-date mc-date--active" data-val-date="">30</td>\n<td class="mc-date mc-date--active" data-val-date="">31</td>\n</tr>\n<tr class="mc-table__week">\n<td class="mc-date mc-date--inactive" data-val-date="">1</td>\n<td class="mc-date mc-date--inactive" data-val-date="">2</td>\n<td class="mc-date mc-date--inactive" data-val-date="">3</td>\n<td class="mc-date mc-date--inactive" data-val-date="">4</td>\n<td class="mc-date mc-date--inactive" data-val-date="">5</td>\n<td class="mc-date mc-date--inactive" data-val-date="">6</td>\n<td class="mc-date mc-date--inactive" data-val-date="">7</td>\n</tr>\n</tbody>\n</table>\n<div id="mc-month-year__preview" class="mc-month-year__preview" data-target=null role="menu">\n<div class="mc-month-year__cell"></div>\n<div class="mc-month-year__cell"></div>\n<div class="mc-month-year__cell"></div>\n<div class="mc-month-year__cell"></div>\n<div class="mc-month-year__cell"></div>\n<div class="mc-month-year__cell"></div>\n<div class="mc-month-year__cell"></div>\n<div class="mc-month-year__cell"></div>\n<div class="mc-month-year__cell"></div>\n<div class="mc-month-year__cell"></div>\n<div class="mc-month-year__cell"></div>\n<div class="mc-month-year__cell"></div>\n</div>\n</div>\n<div class="mc-picker__footer mc-container">\n<div class="mc-footer__section mc-footer__section--primary">\n<button id="mc-btn__clear" class="mc-btn mc-btn--danger" tabindex="0">Clear</button>\n</div>\n<div class="mc-footer__section mc-footer__section--secondary">\n<button id="mc-btn__cancel" class="mc-btn mc-btn--success" tabindex="0">CANCEL</button>\n<button id="mc-btn__ok" class="mc-btn mc-btn--success" tabindex="0">OK</button>\n</div>\n</div>\n</div>',document.body.appendChild(t);var n=se(t);return function(e){var t=null,n=!0,a=e.calendarStates,r=e.calendar,c=e.calendarDisplay,g=e.calendarPicker,b=e.calendarHeader,x=e.currentMonthSelect,E=e.currentYearSelect,L=e.monthYearPreview,T=e.monthNavPrev,O=e.monthNavNext,S=e.yearNavPrev,Y=e.yearNavNext,j=e.dateCells,N=e.previewCells,A=e.cancelButton,P=e.okButton,F=e.clearButton;r.addEventListener(i,(function(n){t=n.detail.instance,xe(e,t),r.classList.add("mc-calendar--opened"),t.onOpenCallbacks.forEach((function(e){return e.apply(null)}))})),r.addEventListener(o,(function(){var e=t,n=e.options,a=e.onCloseCallbacks;r.classList.remove("mc-calendar--opened"),"inline"==n.bodyType&&r.removeAttribute("style"),t=null,a.forEach((function(e){return e.apply(null)}))})),r.addEventListener(v,(function(e){if(t){var n=t.options,r=n.autoClose,c=n.closeOndblclick;if(!e.target.classList.contains("mc-date--inactive")){if(e.detail.dblclick){if(!c)return;return pe(t,a)}t.pickedDate=e.detail.date,t.store.display.setDate=e.detail.date,j.forEach((function(e){return e.classList.remove("mc-date--picked")})),e.target.classList.add("mc-date--picked"),r&&pe(t,a)}}})),r.addEventListener(m,(function(e){if(t){var n=e.detail,r=n.data,c=n.dblclick,i=t,o=i.store,l=i.options,d=i.viewLayers,s=l.customMonths,u=l.autoClose,v=l.closeOndblclick,m=o.preview.target;if(!e.target.classList.contains("mc-month-year__cell--inactive")){if(N.forEach((function(e){return e.classList.remove("mc-month-year__cell--picked")})),e.target.classList.add("mc-month-year__cell--picked"),c&&o.preview.target===d[0]){if(!v)return;return pe(t,a)}var f=o.preview.year,h=s[o.header.month];"year"===d[0]&&(h=s[0]),"month"===m&&(h=r),"year"===m&&(f=Number(r));var p=s.findIndex((function(e){return e.includes(h)})),y=ve(t,new Date(f,p));if(o.header.month=y.getMonth(),o.preview.year=y.getFullYear(),"year"!==d[0]&&(o.header.year=y.getFullYear()),o.preview.month=y.getMonth(),"calendar"!==d[0]&&(t.pickedDate=y),"calendar"!==d[0]&&(o.display.setDate=y),"calendar"===d[0]&&(o.calendar.setDate=y),u&&o.preview.target===d[0])return pe(t,a);o.preview.setTarget=d[0],o.header.setTarget=d[0],x.setAttribute("aria-expanded",!1),E.setAttribute("aria-expanded",!1),"month"==m&&x.focus(),"year"==m&&E.focus()}}})),r.addEventListener(p,(function(e){var n,a=e.detail,r=a.instance,c=a.date;if(r.pickedDate=c,ye(r),(null===(n=t)||void 0===n?void 0:n._id)===r._id){var i=t.store;i.display.setDate=c,i.calendar.setDate=i.calendar.date,"calendar"!==i.preview.target&&(i.preview.month=c.getMonth(),i.preview.year=c.getFullYear(),i.preview.setTarget=i.preview.target),"month"===i.header.target&&(i.header.month=c.getMonth(),i.header.year=c.getFullYear(),i.header.setTarget=i.header.target)}})),r.addEventListener(l,(function(n){return t&&be(e,t)})),document.addEventListener("click",(function(e){var n,c=e.target,i=r.contains(c),o=(null===(n=t)||void 0===n?void 0:n.linkedElement)===c;i||o||!t||a.blur()})),r.addEventListener(y,(function(e){t&&(t.onCancelCallbacks.forEach((function(e){return e.apply(null)})),a.close())})),c.addEventListener(d,(function(n){t&&ge(e,t)})),b.addEventListener(s,(function(n){return t&&_e(e,t)})),L.addEventListener(u,(function(n){return t&&ke(e,t)})),x.addEventListener(f,(function(e){if(n&&t){n=!n;var a=C(),r=t,c=r.store,i=r.viewLayers,o=r.options,l=r.onMonthChangeCallbacks,d=r.onYearChangeCallbacks,s=o.customMonths,u=e.detail.direction,v=s[c.header.month],m=c.header.year,f=me(t,v,u),h=f.newMonth,p=f.overlap,y=0!==p?fe(o,m,u):m,g=new Date(y,h.index,1);0!==p&&(E.innerHTML+=Q(u,y),a.slide(E.children[0],E.children[1],u),d.forEach((function(e){return e.apply(null)}))),e.target.innerHTML+=Q(u,h.name),a.slide(e.target.children[0],e.target.children[1],u),a.onFinish((function(){"calendar"===i[0]&&(c.calendar.setDate=g),"calendar"!==i[0]&&(c.display.setDate=g),"month"===i[0]&&(t.pickedDate=g),c.header.year=g.getFullYear(),c.header.setMonth=g.getMonth(),c.preview.year=g.getFullYear(),c.preview.setMonth=g.getMonth(),l.forEach((function(e){return e.apply(null)})),n=!n}))}})),E.addEventListener(h,(function(e){if(n&&t){n=!n;var a=e.detail.direction,r=t,c=r.store,i=r.viewLayers,o=r.options,l=r.onMonthChangeCallbacks,d=r.onYearChangeCallbacks,s=r.prevLimitDate,u=r.nextLimitDate,v=o.customMonths,m=C(),f="next"===a,h=c.header.year,p=c.header.month,y=c.header.target,g=fe(o,h,a),b=null,_=g&&ve(t,new Date(g,p,1));if(g||(_=f?u:s),_.getMonth()!==p&&(b=v[_.getMonth()]),"year"===y){var k=c.header.year,w=f?k+12:k-12;return c.header.setYear=w,c.preview.setTarget="year",void(n=!n)}b&&(x.innerHTML+=Q(a,b),m.slide(x.children[0],x.children[1],a),l.forEach((function(e){return e.apply(null)}))),g&&(e.target.innerHTML+=Q(a,g),m.slide(e.target.children[0],e.target.children[1],a),d.forEach((function(e){return e.apply(null)}))),m.onFinish((function(){"calendar"===i[0]&&(c.calendar.setDate=_),"calendar"!==i[0]&&(c.display.setDate=_),"calendar"!==i[0]&&(t.pickedDate=_),c.preview.year=_.getFullYear(),c.preview.setMonth=_.getMonth(),c.header.year=_.getFullYear(),c.header.setMonth=_.getMonth(),n=!n}))}})),x.addEventListener("click",(function(){return t&&we(t,e)})),E.addEventListener("keydown",(function(n){"Enter"==n.key&&we(t,e,"keyboard"),"Tab"!=n.key||n.shiftKey||(n.preventDefault(),E.focus())})),E.addEventListener("click",(function(){return t&&De(t,e)})),E.addEventListener("keydown",(function(n){if("Enter"==n.key&&De(t,e,"keyboard"),"Tab"==n.key){if(n.preventDefault(),n.shiftKey)return x.focus();O.focus()}})),N.forEach((function(e){e.addEventListener("click",(function(e){return 1===e.detail&&D(e.currentTarget)})),e.addEventListener("dblclick",(function(e){return 2===e.detail&&D(e.currentTarget,!0)})),e.addEventListener("keydown",(function(e){return"Enter"===e.key&&D(e.currentTarget)}))})),j.forEach((function(e){e.addEventListener("click",(function(e){return 1===e.detail&&_(e.target)})),e.addEventListener("dblclick",(function(e){return 2===e.detail&&_(e.target,!0)})),e.addEventListener("keydown",(function(e){"Enter"===e.key&&_(e.target),"End"===e.key&&F.focus()}))})),T.addEventListener("click",(function(e){e.currentTarget.classList.contains("mc-select__nav--inactive")||k(x,"prev")})),O.addEventListener("click",(function(e){e.currentTarget.classList.contains("mc-select__nav--inactive")||k(x,"next")})),O.addEventListener("keydown",(function(e){if("Tab"==e.key){if(e.preventDefault(),e.shiftKey)return E.focus();b.nextElementSibling.querySelector('[tabindex="0"]').focus()}})),S.addEventListener("click",(function(e){e.currentTarget.classList.contains("mc-select__nav--inactive")||w(E,"prev")})),Y.addEventListener("click",(function(e){e.currentTarget.classList.contains("mc-select__nav--inactive")||w(E,"next")})),A.addEventListener("click",(function(e){return M(r)})),g.addEventListener("keyup",(function(e){return"Escape"==e.key&&M(r)})),P.addEventListener("click",(function(e){return t&&pe(t,a)})),F.addEventListener("click",(function(e){if(t){var n=t,a=n.linkedElement,r=n.onClearCallbacks;j.forEach((function(e){return e.classList.remove("mc-date--picked")})),t.pickedDate=null,a&&(a.value=null),r.forEach((function(e){return e.apply(null)}))}}))}(n),n}function le(e){return function(e){if(Array.isArray(e))return de(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return de(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return de(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function de(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}var se=function(e){return{calendar:e,calendarDisplay:e.querySelector(".mc-display"),calendarPicker:e.querySelector(".mc-picker"),displayDay:e.querySelector(".mc-display__day"),displayDate:e.querySelector(".mc-display__date"),displayMonth:e.querySelector(".mc-display__month"),displayYear:e.querySelector(".mc-display__year"),accessibilityMonthYear:e.querySelector("#mc-picker__month-year"),calendarHeader:e.querySelector(".mc-picker__header"),currentMonthSelect:e.querySelector("#mc-current--month"),currentYearSelect:e.querySelector("#mc-current--year"),monthNavPrev:e.querySelector("#mc-picker__month--prev"),monthNavNext:e.querySelector("#mc-picker__month--next"),yearNavPrev:e.querySelector("#mc-picker__year--prev"),yearNavNext:e.querySelector("#mc-picker__year--next"),weekdays:e.querySelectorAll(".mc-table__weekday"),okButton:e.querySelector("#mc-btn__ok"),cancelButton:e.querySelector("#mc-btn__cancel"),clearButton:e.querySelector("#mc-btn__clear"),dateCells:e.querySelectorAll(".mc-date"),monthYearPreview:e.querySelector(".mc-month-year__preview"),previewCells:e.querySelectorAll(".mc-month-year__cell"),calendarStates:A(e)}},ue=function(e){var t=e.dateFormat.split(/(?:(?:,\s)|[.-\s\/]{1})/).map((function(e){return e.charAt(0).toUpperCase()})),n=le(new Set(t)).sort().join("");return r[n]},ve=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=e.options,a=e.pickedDate,r=e.prevLimitDate,c=e.nextLimitDate,i=e.activeMonths,o=a||new Date,l=o.getMonth();if(!ae(n,l)){var d=i.reduce((function(e,t){return Math.abs(t.index-l)<Math.abs(e.index-l)?t:e}));o.setMonth(d.index)}return t&&(o=t),r&&te(o,r)&&(o=r),c&&ne(o,c)&&(o=c),o},me=function(e,t,n){var a=e.activeMonths,r=e.options,c=r.customMonths;if(!r.jumpOverDisabled){var i=E(c,c.indexOf(t),n),o=i.newIndex,l=i.overlap;return{newMonth:{name:c[o],index:o},overlap:l}}var d=a.findIndex((function(e){return e.name===t})),s=E(a,d,n),u=s.newIndex,v=s.overlap;return{newMonth:a[u],overlap:v}},fe=function(e,t,n){var a=e.allowedYears,r="next"===n?t+1:t-1;if(!e.jumpOverDisabled)return r;if(a.length){var c=E(a,a.indexOf(t),n),i=c.newIndex;return r=0!==c.overlap?null:a[i]}for(;!re(e,r);)"next"===n?r++:r--;return r},he=function(e){return e.customMonths.map((function(t,n){return ae(e,n)?{name:t,index:n}:null})).filter((function(e){return e}))},pe=function(e,t){if(e){var n=e.pickedDate,a=e.linkedElement,r=e.onSelectCallbacks,c=e.options,i=c.dateFormat,o=n?T(n,c,i):null;a&&(a.value=o),r.forEach((function(e){return e.apply(null,[n,o])})),t.close()}},ye=function(e){var t=e.pickedDate,n=e.linkedElement,a=e.options,r=a.dateFormat;n&&t&&(n.value=T(t,a,r))},ge=function(e,t){var n=e.displayDay,a=e.displayDate,r=e.displayMonth,c=e.displayYear,i=e.calendarDisplay,o=t.store,l=t.options,d=o.display,s=d.target,u=d.date,v=l.customWeekDays,m=l.customMonths;l.showCalendarDisplay?i.classList.remove("u-display-none"):i.classList.add("u-display-none"),i.setAttribute("data-target",o.display.target),c.innerText=u.getFullYear(),"year"!==s&&(r.innerText=m[u.getMonth()],"month"!==s&&(n.innerText=v[u.getDay()],a.innerText=u.getDate()))},be=function(e,t){var n=e.dateCells,a=t.store,r=t.viewLayers,c=a.calendar.date;if("calendar"===r[0]){var i=ie(t,c);n.forEach((function(e,t){e.innerText=i[t].dateNumb,e.classList=i[t].classList,e.setAttribute("data-val-date",i[t].date),e.setAttribute("tabindex",i[t].tabindex),e.setAttribute("aria-label",i[t].ariaLabel)}))}},_e=function(e,t){var n=e.currentMonthSelect,a=e.currentYearSelect,r=e.calendarHeader,c=e.accessibilityMonthYear,i=t.store,o=t.options.customMonths,l=i.header,d=l.target,s=l.month,u=l.year;if(r.setAttribute("data-target",d),function(e,t){var n=e.monthNavPrev,a=e.monthNavNext,r=e.yearNavPrev,c=e.yearNavNext,i=t.store,o=t.prevLimitDate,l=t.nextLimitDate,d=t.options,s=d.customMonths,u=d.jumpToMinMax,v=i.header.target,m=i.header.month,f=i.header.year,h=j(n),p=j(a),y=j(r),g=j(c);if(y.active(),g.active(),h.active(),p.active(),"year"===v)return h.inactive(),p.inactive(),o&&o.getFullYear()>f-1&&y.inactive(),void(l&&l.getFullYear()<f+12&&g.inactive());var b=me(t,s[m],"prev"),_=me(t,s[m],"next"),k="year"!==v&&fe(d,f,"prev"),w="year"!==v&&fe(d,f,"next");if("calendar"===v&&0!==b.overlap&&!k&&h.inactive(),"calendar"===v&&0!==b.overlap&&!k&&y.inactive(),"calendar"===v&&0!==_.overlap&&!w&&p.inactive(),"calendar"===v&&0!==_.overlap&&!w&&g.inactive(),o){var D=new Date(f,m,1),x=new Date(k,m+1,0),M=te(D,o),E=te(x,o);u&&M&&y.inactive(),u||!E&&w||y.inactive(),M&&h.inactive()}if(l){var L=new Date(f,m+1,0),C=new Date(w,m,1),T=ne(L,l),O=ne(C,l);u&&T&&g.inactive(),u||!O&&w||g.inactive(),T&&p.inactive()}}(e,t),"year"!==d)n.innerHTML="<span>".concat(o[s],"</span>"),a.innerHTML="<span>".concat(u,"</span>"),c.innerText="".concat(o[s]," ").concat(u);else{var v=u;a.innerHTML="<span>".concat(v,"</span><span> - </span><span>").concat(v+11,"</span>")}},ke=function(e,t){if(t){var n=e.monthYearPreview,a=t.store.preview.target,r=t.store.header.year;if("calendar"===a)return n.classList.remove("mc-month-year__preview--opened");n.setAttribute("data-target",a),n.classList.add("mc-month-year__preview--opened"),"month"==a&&function(e,t){var n=e.previewCells,a=e.currentMonthSelect,r=t.store,c=t.prevLimitDate,i=t.nextLimitDate,o=t.options,l=o.customMonths,d=l[r.preview.month],s=r.preview.year;a.setAttribute("aria-expanded",!0),l.map((function(e,t){var a=["mc-month-year__cell"],r=new Date(Number(s),t),l=new Date(Number(s),t+1,0),u=c&&O(l)<O(c),v=i&&O(r)>O(i),m=e;e===d&&(a.push("mc-month-year__cell--picked"),m="Current Month: ".concat(m)),u||v||!ae(o,t)||!re(o,Number(s))?(a.push("mc-month-year__cell--inactive"),n[t].setAttribute("tabindex",-1)):n[t].setAttribute("tabindex",0),n[t].classList=a.join(" "),n[t].innerHTML="<span>".concat(e.substr(0,3),"</span>"),n[t].setAttribute("aria-label",e)}))}(e,t),"year"==a&&function(e,t,n){var a=e.previewCells,r=e.currentYearSelect,c=t.store,i=t.prevLimitDate,o=t.nextLimitDate,l=t.options,d=i&&i.getFullYear(),s=o&&o.getFullYear(),u=c.preview.year;r.setAttribute("aria-expanded",!0),a.forEach((function(e,t){var r=["mc-month-year__cell"],c=n+t,v=i&&c<d,m=o&&c>s;c===u&&r.push("mc-month-year__cell--picked"),v||m||!re(l,c)?(r.push("mc-month-year__cell--inactive"),a[t].setAttribute("tabindex",-1)):a[t].setAttribute("tabindex",0),e.classList=r.join(" "),e.innerHTML="<span>".concat(c,"</span>")}))}(e,t,r)}},we=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"click",a=e.store,r=e.viewLayers;if("month"!==r[0]){var c=t.monthYearPreview,i=c.classList.contains("mc-month-year__preview--opened"),o="month"===a.preview.target;i&&o?a.preview.setTarget=r[0]:(a.header.setTarget="month",a.preview.setTarget="month","keyboard"==n&&c.querySelector('[tabindex="0"]').focus())}},De=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"click",a=e.store,r=e.viewLayers;if("year"!==r[0]){var c=t.monthYearPreview,i=c.classList.contains("mc-month-year__preview--opened"),o=a.preview.target,l="year"===o;if(i&&l)return a.header.year=a.preview.year,a.preview.setTarget=r[0],void(a.header.setTarget=r[0]);a.header.year=a.preview.year-4,a.header.setTarget="year",a.preview.setTarget="year","keyboard"==n&&c.querySelector('[tabindex="0"]').focus()}},xe=function(e,t){var n=e.calendar,a=t.store,r=t.viewLayers,c=t.options,i=t.pickedDate,o=c.bodyType,l=c.theme,d=ve(t),s=d.getFullYear(),u=d.getMonth();n.classList="mc-calendar",n.classList.add("mc-calendar--".concat(o)),a.display.target=r[0],a.display.setDate=i||new Date,a.calendar.setDate=d,a.header.month=u,a.header.year="year"===r[0]?s-4:s,a.preview.month=u,a.preview.year=s,a.header.setTarget=r[0],a.preview.setTarget=r[0],function(e,t){Object.values(t).forEach((function(t){return e.style.setProperty(t.cssVar,t.color)}))}(n,l),function(e,t){var n=e.weekdays,a=t.customWeekDays,r=t.firstWeekday;n.forEach((function(e,t){var n=(r+t)%a.length;e.innerText=a[n].substr(0,2),e.setAttribute("aria-label",a[n])}))}(e,c),function(e,t){var n=t.customOkBTN,a=t.customClearBTN,r=t.customCancelBTN,c=e.okButton,i=e.clearButton,o=e.cancelButton;c.innerText=n,i.innerText=a,o.innerText=r}(e,c),function(e,t){var n=e.calendar,a=t.options,r=t.linkedElement;if("inline"===a.bodyType){var c=Y(n,r),i=c.top,o=c.left;n.style.top="".concat(i,"px"),n.style.left="".concat(o,"px")}else n.style.removeProperty("top"),n.style.removeProperty("left")}(e,t)};function Me(e,t,n){n.allowedYears.sort((function(e,t){return e-t}));var r=null!==n.el?n.context.querySelector(n.el):null,c=he(n),i=function(e){var t=e.minDate,n=e.maxDate,a=e.allowedYears,r=null,c=null,i=he(e),o=i[0],l=i[i.length-1],d=a.length?Math.min.apply(Math,le(a)):null,s=a.length?Math.max.apply(Math,le(a)):null,u=d?new Date(d,o.index,1):null,v=s?new Date(s,l.index+1,0):null;return t&&u&&(r=new Date(Math.max(t,u))),n&&v&&(c=new Date(Math.min(n,v))),r||(r=t||u),c||(c=n||v),{prevLimitDate:r,nextLimitDate:c}}(n),o=i.prevLimitDate,l=i.nextLimitDate,d=ue(n),s=N(t,d[0]),u=function(e,t){var n,a,r,c,i,o,l,d,s,u,v,m,f,h,p,y,g,b,_,k,w,D,x,M,E,L,C,T,O,S,Y,j,N,A,P,F,V,B,q,H,W,I,$,z,J,K,U,R,X,G,Z,Q,ee,te,ne,ae,re,ce,ie,oe,le;return{theme_color:{cssVar:"--mc-theme-color",color:(null==t?void 0:t.theme_color)||e.theme_color},main_background:{cssVar:"--mc-main-bg",color:(null==t?void 0:t.main_background)||e.main_background},active_text_color:{cssVar:"--mc-active-text-color",color:(null==t?void 0:t.active_text_color)||e.active_text_color},inactive_text_color:{cssVar:"--mc-inactive-text-color",color:(null==t?void 0:t.inactive_text_color)||e.inactive_text_color},display_foreground:{cssVar:"--mc-display-foreground",color:(null==t||null===(n=t.display)||void 0===n?void 0:n.foreground)||e.display.foreground},display_background:{cssVar:"--mc-display-background",color:(null==t||null===(a=t.display)||void 0===a?void 0:a.background)||(null==t?void 0:t.theme_color)||e.display.background},picker_foreground:{cssVar:"--mc-picker-foreground",color:(null==t||null===(r=t.picker)||void 0===r?void 0:r.foreground)||(null==t?void 0:t.active_text_color)||e.picker.foreground},picker_background:{cssVar:"--mc-picker-background",color:(null==t||null===(c=t.picker)||void 0===c?void 0:c.background)||(null==t?void 0:t.main_background)||e.picker.background},picker_header_active:{cssVar:"--mc-picker-header-active",color:(null==t||null===(i=t.picker_header)||void 0===i?void 0:i.active)||e.picker_header.active},picker_header_inactive:{cssVar:"--mc-picker-header-inactive",color:(null==t||null===(o=t.picker_header)||void 0===o?void 0:o.inactive)||(null==t?void 0:t.inactive_text_color)||e.picker_header.inactive},weekday_foreground:{cssVar:"--mc-weekday-foreground",color:(null==t||null===(l=t.weekday)||void 0===l?void 0:l.foreground)||(null==t?void 0:t.theme_color)||e.weekday.foreground},button_success_foreground:{cssVar:"--mc-btn-success-foreground",color:(null==t||null===(d=t.button)||void 0===d||null===(s=d.success)||void 0===s?void 0:s.foreground)||(null==t?void 0:t.theme_color)||e.button.success.foreground},button_danger_foreground:{cssVar:"--mc-btn-danger-foreground",color:(null==t||null===(u=t.button)||void 0===u||null===(v=u.danger)||void 0===v?void 0:v.foreground)||e.button.danger.foreground},date_active_default_foreground:{cssVar:"--mc-date-active-def-foreground",color:(null==t||null===(m=t.date)||void 0===m||null===(f=m.active)||void 0===f||null===(h=f.default)||void 0===h?void 0:h.foreground)||(null==t?void 0:t.active_text_color)||e.date.active.default.foreground},date_active_picked_foreground:{cssVar:"--mc-date-active-pick-foreground",color:(null==t||null===(p=t.date)||void 0===p||null===(y=p.active)||void 0===y||null===(g=y.picked)||void 0===g?void 0:g.foreground)||e.date.active.picked.foreground},date_active_picked_background:{cssVar:"--mc-date-active-pick-background",color:(null==t||null===(b=t.date)||void 0===b||null===(_=b.active)||void 0===_||null===(k=_.picked)||void 0===k?void 0:k.background)||(null==t?void 0:t.theme_color)||e.date.active.picked.background},date_active_today_foreground:{cssVar:"--mc-date-active-today-foreground",color:(null==t||null===(w=t.date)||void 0===w||null===(D=w.active)||void 0===D||null===(x=D.today)||void 0===x?void 0:x.foreground)||(null==t?void 0:t.active_text_color)||e.date.active.today.foreground},date_active_today_background:{cssVar:"--mc-date-active-today-background",color:(null==t||null===(M=t.date)||void 0===M||null===(E=M.active)||void 0===E||null===(L=E.today)||void 0===L?void 0:L.background)||(null==t?void 0:t.inactive_text_color)||e.date.active.today.background},date_inactive_default_foreground:{cssVar:"--mc-date-inactive-def-foreground",color:(null==t||null===(C=t.date)||void 0===C||null===(T=C.inactive)||void 0===T||null===(O=T.default)||void 0===O?void 0:O.foreground)||(null==t?void 0:t.inactive_text_color)||e.date.inactive.default.foreground},date_inactive_picked_foreground:{cssVar:"--mc-date-inactive-pick-foreground",color:(null==t||null===(S=t.date)||void 0===S||null===(Y=S.inactive)||void 0===Y||null===(j=Y.picked)||void 0===j?void 0:j.foreground)||(null==t?void 0:t.theme_color)||e.date.inactive.picked.foreground},date_inactive_picked_background:{cssVar:"--mc-date-inactive-pick-background",color:(null==t||null===(N=t.date)||void 0===N||null===(A=N.inactive)||void 0===A||null===(P=A.picked)||void 0===P?void 0:P.background)||(null==t?void 0:t.theme_color)||e.date.inactive.picked.background},date_inactive_today_foreground:{cssVar:"--mc-date-inactive-today-foreground",color:(null==t||null===(F=t.date)||void 0===F||null===(V=F.inactive)||void 0===V||null===(B=V.today)||void 0===B?void 0:B.foreground)||(null==t?void 0:t.inactive_text_color)||e.date.inactive.today.foreground},date_inactive_today_background:{cssVar:"--mc-date-inactive-today-background",color:(null==t||null===(q=t.date)||void 0===q||null===(H=q.inactive)||void 0===H||null===(W=H.today)||void 0===W?void 0:W.background)||(null==t?void 0:t.inactive_text_color)||e.date.inactive.today.background},date_marcked_foreground:{cssVar:"--mc-date-marcked-foreground",color:(null==t||null===(I=t.date)||void 0===I||null===($=I.marcked)||void 0===$?void 0:$.foreground)||(null==t?void 0:t.theme_color)||e.date.marcked.foreground},month_year_preview_active_default_foreground:{cssVar:"--mc-prev-active-def-foreground",color:(null==t||null===(z=t.month_year_preview)||void 0===z||null===(J=z.active)||void 0===J||null===(K=J.default)||void 0===K?void 0:K.foreground)||(null==t?void 0:t.active_text_color)||e.month_year_preview.active.default.foreground},month_year_preview_active_picked_foreground:{cssVar:"--mc-prev-active-pick-foreground",color:(null==t||null===(U=t.month_year_preview)||void 0===U||null===(R=U.active)||void 0===R||null===(X=R.picked)||void 0===X?void 0:X.foreground)||(null==t?void 0:t.active_text_color)||e.month_year_preview.active.picked.foreground},month_year_preview_active_picked_background:{cssVar:"--mc-prev-active-pick-background",color:(null==t||null===(G=t.month_year_preview)||void 0===G||null===(Z=G.active)||void 0===Z||null===(Q=Z.picked)||void 0===Q?void 0:Q.background)||e.month_year_preview.active.picked.background},month_year_preview_inactive_default_foreground:{cssVar:"--mc-prev-inactive-def-foreground",color:(null==t||null===(ee=t.month_year_preview)||void 0===ee||null===(te=ee.inactive)||void 0===te||null===(ne=te.default)||void 0===ne?void 0:ne.foreground)||(null==t?void 0:t.inactive_text_color)||e.month_year_preview.inactive.default.foreground},month_year_preview_inactive_picked_foreground:{cssVar:"--mc-prev-inactive-pick-foreground",color:(null==t||null===(ae=t.month_year_preview)||void 0===ae||null===(re=ae.inactive)||void 0===re||null===(ce=re.picked)||void 0===ce?void 0:ce.foreground)||(null==t?void 0:t.inactive_text_color)||e.month_year_preview.inactive.picked.foreground},month_year_preview_inactive_picked_background:{cssVar:"--mc-prev-inactive-pick-background",color:(null==t||null===(ie=t.month_year_preview)||void 0===ie||null===(oe=ie.inactive)||void 0===oe||null===(le=oe.picked)||void 0===le?void 0:le.background)||(null==t?void 0:t.inactive_text_color)||e.month_year_preview.inactive.picked.background}}}(a,n.theme);return n.theme=u,{_id:P(),datepicker:e,el:n.el,context:n.context,linkedElement:r,pickedDate:n.selectedDate,viewLayers:d,activeMonths:c,prevLimitDate:o,nextLimitDate:l,options:n,onOpenCallbacks:[],onCloseCallbacks:[],onSelectCallbacks:[],onCancelCallbacks:[],onClearCallbacks:[],onMonthChangeCallbacks:[],onYearChangeCallbacks:[],markCustomCallbacks:[],store:s,open:function(){e.open(this._id)},close:function(){e.close()},reset:function(){this.pickedDate=null,this.linkedElement&&(this.linkedElement.value=null)},destroy:function(){e.remove(this._id)},onOpen:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){};this.onOpenCallbacks.push(e)},onClose:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){};this.onCloseCallbacks.push(e)},onSelect:function(e){this.onSelectCallbacks.push(e)},onCancel:function(e){this.onCancelCallbacks.push(e)},onClear:function(e){this.onClearCallbacks.push(e)},onMonthChange:function(e){this.onMonthChangeCallbacks.push(e)},onYearChange:function(e){this.onYearChangeCallbacks.push(e)},getDay:function(){return this.pickedDate?this.pickedDate.getDay():null},getDate:function(){return this.pickedDate?this.pickedDate.getDate():null},getMonth:function(){return this.pickedDate?this.pickedDate.getMonth():null},getYear:function(){return this.pickedDate?this.pickedDate.getFullYear():null},getFullDate:function(){return this.pickedDate},getFormatedDate:function(){return this.pickedDate?T(this.pickedDate,this.options,this.options.dateFormat):null},markDatesCustom:function(e){this.markCustomCallbacks.push(e)},setFullDate:function(e){if(!W(e).date())throw new TypeError("Parameter of setFullDate() is not of type date");x(t.calendar,{instance:this,date:e})},setDate:function(e){if(!W(e).number())throw new TypeError("Parameter 'date' of setDate() is not of type number");var n=this.pickedDate?new Date(this.pickedDate):new Date;n.setDate(e),x(t.calendar,{instance:this,date:n})},setMonth:function(e){if(!W(e).number())throw new TypeError("Parameter 'month' of setMonth() is not of type number");var n=this.pickedDate?new Date(this.pickedDate):new Date;n.setMonth(e),x(t.calendar,{instance:this,date:n})},setYear:function(e){if(!W(e).number())throw new TypeError("Parameter 'year' of setYear() is not of type number");var n=this.pickedDate?new Date(this.pickedDate):new Date;n.setFullYear(e),x(t.calendar,{instance:this,date:n})}}}var Ee,Le,Ce,Te=(Ee=[],Le=null,Ce=function(e){Le||(Le=oe())},{create:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=Z(e,c);Ce();var n=Me(Te,Le,t);return Ee.push(n),ee(n),n},remove:function(e){var t,n=Ee.find((function(t){return t._id===e}));if(Ee.length&&n&&((t=n.linkedElement)&&(t.onfocus=null),Ee.splice(Ee.indexOf(n),1),!Ee.length)){var a=Le.calendar;a.parentNode.removeChild(a),Le=null}},open:function(e){var t=Ee.find((function(t){return t._id===e}));(t||Le)&&Le.calendarStates.open(t)},close:function(){Le&&Le.calendarStates.close()}});const Oe=Te}},t={};function n(a){if(t[a])return t[a].exports;var r=t[a]={exports:{}};return e[a](r,r.exports,n),r.exports}return n.d=(e,t)=>{for(var a in t)n.o(t,a)&&!n.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n(422)})().default}));
!function(i){"use strict";"function"==typeof define&&define.amd?define(["jquery"],i):"undefined"!=typeof exports?module.exports=i(require("jquery")):i(jQuery)}(function(i){"use strict";var e=window.Slick||{};(e=function(){var e=0;return function(t,o){var s,n=this;n.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:i(t),appendDots:i(t),arrows:!0,asNavFor:null,prevArrow:'<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',nextArrow:'<button class="slick-next" aria-label="Next" type="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(e,t){return i('<button type="button" />').text(t+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,focusOnChange:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},n.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,scrolling:!1,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,swiping:!1,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},i.extend(n,n.initials),n.activeBreakpoint=null,n.animType=null,n.animProp=null,n.breakpoints=[],n.breakpointSettings=[],n.cssTransitions=!1,n.focussed=!1,n.interrupted=!1,n.hidden="hidden",n.paused=!0,n.positionProp=null,n.respondTo=null,n.rowCount=1,n.shouldClick=!0,n.$slider=i(t),n.$slidesCache=null,n.transformType=null,n.transitionType=null,n.visibilityChange="visibilitychange",n.windowWidth=0,n.windowTimer=null,s=i(t).data("slick")||{},n.options=i.extend({},n.defaults,o,s),n.currentSlide=n.options.initialSlide,n.originalSettings=n.options,void 0!==document.mozHidden?(n.hidden="mozHidden",n.visibilityChange="mozvisibilitychange"):void 0!==document.webkitHidden&&(n.hidden="webkitHidden",n.visibilityChange="webkitvisibilitychange"),n.autoPlay=i.proxy(n.autoPlay,n),n.autoPlayClear=i.proxy(n.autoPlayClear,n),n.autoPlayIterator=i.proxy(n.autoPlayIterator,n),n.changeSlide=i.proxy(n.changeSlide,n),n.clickHandler=i.proxy(n.clickHandler,n),n.selectHandler=i.proxy(n.selectHandler,n),n.setPosition=i.proxy(n.setPosition,n),n.swipeHandler=i.proxy(n.swipeHandler,n),n.dragHandler=i.proxy(n.dragHandler,n),n.keyHandler=i.proxy(n.keyHandler,n),n.instanceUid=e++,n.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,n.registerBreakpoints(),n.init(!0)}}()).prototype.activateADA=function(){this.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},e.prototype.addSlide=e.prototype.slickAdd=function(e,t,o){var s=this;if("boolean"==typeof t)o=t,t=null;else if(t<0||t>=s.slideCount)return!1;s.unload(),"number"==typeof t?0===t&&0===s.$slides.length?i(e).appendTo(s.$slideTrack):o?i(e).insertBefore(s.$slides.eq(t)):i(e).insertAfter(s.$slides.eq(t)):!0===o?i(e).prependTo(s.$slideTrack):i(e).appendTo(s.$slideTrack),s.$slides=s.$slideTrack.children(this.options.slide),s.$slideTrack.children(this.options.slide).detach(),s.$slideTrack.append(s.$slides),s.$slides.each(function(e,t){i(t).attr("data-slick-index",e)}),s.$slidesCache=s.$slides,s.reinit()},e.prototype.animateHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.animate({height:e},i.options.speed)}},e.prototype.animateSlide=function(e,t){var o={},s=this;s.animateHeight(),!0===s.options.rtl&&!1===s.options.vertical&&(e=-e),!1===s.transformsEnabled?!1===s.options.vertical?s.$slideTrack.animate({left:e},s.options.speed,s.options.easing,t):s.$slideTrack.animate({top:e},s.options.speed,s.options.easing,t):!1===s.cssTransitions?(!0===s.options.rtl&&(s.currentLeft=-s.currentLeft),i({animStart:s.currentLeft}).animate({animStart:e},{duration:s.options.speed,easing:s.options.easing,step:function(i){i=Math.ceil(i),!1===s.options.vertical?(o[s.animType]="translate("+i+"px, 0px)",s.$slideTrack.css(o)):(o[s.animType]="translate(0px,"+i+"px)",s.$slideTrack.css(o))},complete:function(){t&&t.call()}})):(s.applyTransition(),e=Math.ceil(e),!1===s.options.vertical?o[s.animType]="translate3d("+e+"px, 0px, 0px)":o[s.animType]="translate3d(0px,"+e+"px, 0px)",s.$slideTrack.css(o),t&&setTimeout(function(){s.disableTransition(),t.call()},s.options.speed))},e.prototype.getNavTarget=function(){var e=this,t=e.options.asNavFor;return t&&null!==t&&(t=i(t).not(e.$slider)),t},e.prototype.asNavFor=function(e){var t=this.getNavTarget();null!==t&&"object"==typeof t&&t.each(function(){var t=i(this).slick("getSlick");t.unslicked||t.slideHandler(e,!0)})},e.prototype.applyTransition=function(i){var e=this,t={};!1===e.options.fade?t[e.transitionType]=e.transformType+" "+e.options.speed+"ms "+e.options.cssEase:t[e.transitionType]="opacity "+e.options.speed+"ms "+e.options.cssEase,!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.autoPlay=function(){var i=this;i.autoPlayClear(),i.slideCount>i.options.slidesToShow&&(i.autoPlayTimer=setInterval(i.autoPlayIterator,i.options.autoplaySpeed))},e.prototype.autoPlayClear=function(){var i=this;i.autoPlayTimer&&clearInterval(i.autoPlayTimer)},e.prototype.autoPlayIterator=function(){var i=this,e=i.currentSlide+i.options.slidesToScroll;i.paused||i.interrupted||i.focussed||(!1===i.options.infinite&&(1===i.direction&&i.currentSlide+1===i.slideCount-1?i.direction=0:0===i.direction&&(e=i.currentSlide-i.options.slidesToScroll,i.currentSlide-1==0&&(i.direction=1))),i.slideHandler(e))},e.prototype.buildArrows=function(){var e=this;!0===e.options.arrows&&(e.$prevArrow=i(e.options.prevArrow).addClass("slick-arrow"),e.$nextArrow=i(e.options.nextArrow).addClass("slick-arrow"),e.slideCount>e.options.slidesToShow?(e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.prependTo(e.options.appendArrows),e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.appendTo(e.options.appendArrows),!0!==e.options.infinite&&e.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},e.prototype.buildDots=function(){var e,t,o=this;if(!0===o.options.dots){for(o.$slider.addClass("slick-dotted"),t=i("<ul />").addClass(o.options.dotsClass),e=0;e<=o.getDotCount();e+=1)t.append(i("<li />").append(o.options.customPaging.call(this,o,e)));o.$dots=t.appendTo(o.options.appendDots),o.$dots.find("li").first().addClass("slick-active")}},e.prototype.buildOut=function(){var e=this;e.$slides=e.$slider.children(e.options.slide+":not(.slick-cloned)").addClass("slick-slide"),e.slideCount=e.$slides.length,e.$slides.each(function(e,t){i(t).attr("data-slick-index",e).data("originalStyling",i(t).attr("style")||"")}),e.$slider.addClass("slick-slider"),e.$slideTrack=0===e.slideCount?i('<div class="slick-track"/>').appendTo(e.$slider):e.$slides.wrapAll('<div class="slick-track"/>').parent(),e.$list=e.$slideTrack.wrap('<div class="slick-list"/>').parent(),e.$slideTrack.css("opacity",0),!0!==e.options.centerMode&&!0!==e.options.swipeToSlide||(e.options.slidesToScroll=1),i("img[data-lazy]",e.$slider).not("[src]").addClass("slick-loading"),e.setupInfinite(),e.buildArrows(),e.buildDots(),e.updateDots(),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),!0===e.options.draggable&&e.$list.addClass("draggable")},e.prototype.buildRows=function(){var i,e,t,o,s,n,r,l=this;if(o=document.createDocumentFragment(),n=l.$slider.children(),l.options.rows>1){for(r=l.options.slidesPerRow*l.options.rows,s=Math.ceil(n.length/r),i=0;i<s;i++){var d=document.createElement("div");for(e=0;e<l.options.rows;e++){var a=document.createElement("div");for(t=0;t<l.options.slidesPerRow;t++){var c=i*r+(e*l.options.slidesPerRow+t);n.get(c)&&a.appendChild(n.get(c))}d.appendChild(a)}o.appendChild(d)}l.$slider.empty().append(o),l.$slider.children().children().children().css({width:100/l.options.slidesPerRow+"%",display:"inline-block"})}},e.prototype.checkResponsive=function(e,t){var o,s,n,r=this,l=!1,d=r.$slider.width(),a=window.innerWidth||i(window).width();if("window"===r.respondTo?n=a:"slider"===r.respondTo?n=d:"min"===r.respondTo&&(n=Math.min(a,d)),r.options.responsive&&r.options.responsive.length&&null!==r.options.responsive){s=null;for(o in r.breakpoints)r.breakpoints.hasOwnProperty(o)&&(!1===r.originalSettings.mobileFirst?n<r.breakpoints[o]&&(s=r.breakpoints[o]):n>r.breakpoints[o]&&(s=r.breakpoints[o]));null!==s?null!==r.activeBreakpoint?(s!==r.activeBreakpoint||t)&&(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):null!==r.activeBreakpoint&&(r.activeBreakpoint=null,r.options=r.originalSettings,!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e),l=s),e||!1===l||r.$slider.trigger("breakpoint",[r,l])}},e.prototype.changeSlide=function(e,t){var o,s,n,r=this,l=i(e.currentTarget);switch(l.is("a")&&e.preventDefault(),l.is("li")||(l=l.closest("li")),n=r.slideCount%r.options.slidesToScroll!=0,o=n?0:(r.slideCount-r.currentSlide)%r.options.slidesToScroll,e.data.message){case"previous":s=0===o?r.options.slidesToScroll:r.options.slidesToShow-o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide-s,!1,t);break;case"next":s=0===o?r.options.slidesToScroll:o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide+s,!1,t);break;case"index":var d=0===e.data.index?0:e.data.index||l.index()*r.options.slidesToScroll;r.slideHandler(r.checkNavigable(d),!1,t),l.children().trigger("focus");break;default:return}},e.prototype.checkNavigable=function(i){var e,t;if(e=this.getNavigableIndexes(),t=0,i>e[e.length-1])i=e[e.length-1];else for(var o in e){if(i<e[o]){i=t;break}t=e[o]}return i},e.prototype.cleanUpEvents=function(){var e=this;e.options.dots&&null!==e.$dots&&(i("li",e.$dots).off("click.slick",e.changeSlide).off("mouseenter.slick",i.proxy(e.interrupt,e,!0)).off("mouseleave.slick",i.proxy(e.interrupt,e,!1)),!0===e.options.accessibility&&e.$dots.off("keydown.slick",e.keyHandler)),e.$slider.off("focus.slick blur.slick"),!0===e.options.arrows&&e.slideCount>e.options.slidesToShow&&(e.$prevArrow&&e.$prevArrow.off("click.slick",e.changeSlide),e.$nextArrow&&e.$nextArrow.off("click.slick",e.changeSlide),!0===e.options.accessibility&&(e.$prevArrow&&e.$prevArrow.off("keydown.slick",e.keyHandler),e.$nextArrow&&e.$nextArrow.off("keydown.slick",e.keyHandler))),e.$list.off("touchstart.slick mousedown.slick",e.swipeHandler),e.$list.off("touchmove.slick mousemove.slick",e.swipeHandler),e.$list.off("touchend.slick mouseup.slick",e.swipeHandler),e.$list.off("touchcancel.slick mouseleave.slick",e.swipeHandler),e.$list.off("click.slick",e.clickHandler),i(document).off(e.visibilityChange,e.visibility),e.cleanUpSlideEvents(),!0===e.options.accessibility&&e.$list.off("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().off("click.slick",e.selectHandler),i(window).off("orientationchange.slick.slick-"+e.instanceUid,e.orientationChange),i(window).off("resize.slick.slick-"+e.instanceUid,e.resize),i("[draggable!=true]",e.$slideTrack).off("dragstart",e.preventDefault),i(window).off("load.slick.slick-"+e.instanceUid,e.setPosition)},e.prototype.cleanUpSlideEvents=function(){var e=this;e.$list.off("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.off("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.cleanUpRows=function(){var i,e=this;e.options.rows>1&&((i=e.$slides.children().children()).removeAttr("style"),e.$slider.empty().append(i))},e.prototype.clickHandler=function(i){!1===this.shouldClick&&(i.stopImmediatePropagation(),i.stopPropagation(),i.preventDefault())},e.prototype.destroy=function(e){var t=this;t.autoPlayClear(),t.touchObject={},t.cleanUpEvents(),i(".slick-cloned",t.$slider).detach(),t.$dots&&t.$dots.remove(),t.$prevArrow&&t.$prevArrow.length&&(t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.prevArrow)&&t.$prevArrow.remove()),t.$nextArrow&&t.$nextArrow.length&&(t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.nextArrow)&&t.$nextArrow.remove()),t.$slides&&(t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){i(this).attr("style",i(this).data("originalStyling"))}),t.$slideTrack.children(this.options.slide).detach(),t.$slideTrack.detach(),t.$list.detach(),t.$slider.append(t.$slides)),t.cleanUpRows(),t.$slider.removeClass("slick-slider"),t.$slider.removeClass("slick-initialized"),t.$slider.removeClass("slick-dotted"),t.unslicked=!0,e||t.$slider.trigger("destroy",[t])},e.prototype.disableTransition=function(i){var e=this,t={};t[e.transitionType]="",!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.fadeSlide=function(i,e){var t=this;!1===t.cssTransitions?(t.$slides.eq(i).css({zIndex:t.options.zIndex}),t.$slides.eq(i).animate({opacity:1},t.options.speed,t.options.easing,e)):(t.applyTransition(i),t.$slides.eq(i).css({opacity:1,zIndex:t.options.zIndex}),e&&setTimeout(function(){t.disableTransition(i),e.call()},t.options.speed))},e.prototype.fadeSlideOut=function(i){var e=this;!1===e.cssTransitions?e.$slides.eq(i).animate({opacity:0,zIndex:e.options.zIndex-2},e.options.speed,e.options.easing):(e.applyTransition(i),e.$slides.eq(i).css({opacity:0,zIndex:e.options.zIndex-2}))},e.prototype.filterSlides=e.prototype.slickFilter=function(i){var e=this;null!==i&&(e.$slidesCache=e.$slides,e.unload(),e.$slideTrack.children(this.options.slide).detach(),e.$slidesCache.filter(i).appendTo(e.$slideTrack),e.reinit())},e.prototype.focusHandler=function(){var e=this;e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*",function(t){t.stopImmediatePropagation();var o=i(this);setTimeout(function(){e.options.pauseOnFocus&&(e.focussed=o.is(":focus"),e.autoPlay())},0)})},e.prototype.getCurrent=e.prototype.slickCurrentSlide=function(){return this.currentSlide},e.prototype.getDotCount=function(){var i=this,e=0,t=0,o=0;if(!0===i.options.infinite)if(i.slideCount<=i.options.slidesToShow)++o;else for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else if(!0===i.options.centerMode)o=i.slideCount;else if(i.options.asNavFor)for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else o=1+Math.ceil((i.slideCount-i.options.slidesToShow)/i.options.slidesToScroll);return o-1},e.prototype.getLeft=function(i){var e,t,o,s,n=this,r=0;return n.slideOffset=0,t=n.$slides.first().outerHeight(!0),!0===n.options.infinite?(n.slideCount>n.options.slidesToShow&&(n.slideOffset=n.slideWidth*n.options.slidesToShow*-1,s=-1,!0===n.options.vertical&&!0===n.options.centerMode&&(2===n.options.slidesToShow?s=-1.5:1===n.options.slidesToShow&&(s=-2)),r=t*n.options.slidesToShow*s),n.slideCount%n.options.slidesToScroll!=0&&i+n.options.slidesToScroll>n.slideCount&&n.slideCount>n.options.slidesToShow&&(i>n.slideCount?(n.slideOffset=(n.options.slidesToShow-(i-n.slideCount))*n.slideWidth*-1,r=(n.options.slidesToShow-(i-n.slideCount))*t*-1):(n.slideOffset=n.slideCount%n.options.slidesToScroll*n.slideWidth*-1,r=n.slideCount%n.options.slidesToScroll*t*-1))):i+n.options.slidesToShow>n.slideCount&&(n.slideOffset=(i+n.options.slidesToShow-n.slideCount)*n.slideWidth,r=(i+n.options.slidesToShow-n.slideCount)*t),n.slideCount<=n.options.slidesToShow&&(n.slideOffset=0,r=0),!0===n.options.centerMode&&n.slideCount<=n.options.slidesToShow?n.slideOffset=n.slideWidth*Math.floor(n.options.slidesToShow)/2-n.slideWidth*n.slideCount/2:!0===n.options.centerMode&&!0===n.options.infinite?n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)-n.slideWidth:!0===n.options.centerMode&&(n.slideOffset=0,n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)),e=!1===n.options.vertical?i*n.slideWidth*-1+n.slideOffset:i*t*-1+r,!0===n.options.variableWidth&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,!0===n.options.centerMode&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow+1),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,e+=(n.$list.width()-o.outerWidth())/2)),e},e.prototype.getOption=e.prototype.slickGetOption=function(i){return this.options[i]},e.prototype.getNavigableIndexes=function(){var i,e=this,t=0,o=0,s=[];for(!1===e.options.infinite?i=e.slideCount:(t=-1*e.options.slidesToScroll,o=-1*e.options.slidesToScroll,i=2*e.slideCount);t<i;)s.push(t),t=o+e.options.slidesToScroll,o+=e.options.slidesToScroll<=e.options.slidesToShow?e.options.slidesToScroll:e.options.slidesToShow;return s},e.prototype.getSlick=function(){return this},e.prototype.getSlideCount=function(){var e,t,o=this;return t=!0===o.options.centerMode?o.slideWidth*Math.floor(o.options.slidesToShow/2):0,!0===o.options.swipeToSlide?(o.$slideTrack.find(".slick-slide").each(function(s,n){if(n.offsetLeft-t+i(n).outerWidth()/2>-1*o.swipeLeft)return e=n,!1}),Math.abs(i(e).attr("data-slick-index")-o.currentSlide)||1):o.options.slidesToScroll},e.prototype.goTo=e.prototype.slickGoTo=function(i,e){this.changeSlide({data:{message:"index",index:parseInt(i)}},e)},e.prototype.init=function(e){var t=this;i(t.$slider).hasClass("slick-initialized")||(i(t.$slider).addClass("slick-initialized"),t.buildRows(),t.buildOut(),t.setProps(),t.startLoad(),t.loadSlider(),t.initializeEvents(),t.updateArrows(),t.updateDots(),t.checkResponsive(!0),t.focusHandler()),e&&t.$slider.trigger("init",[t]),!0===t.options.accessibility&&t.initADA(),t.options.autoplay&&(t.paused=!1,t.autoPlay())},e.prototype.initADA=function(){var e=this,t=Math.ceil(e.slideCount/e.options.slidesToShow),o=e.getNavigableIndexes().filter(function(i){return i>=0&&i<e.slideCount});e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),null!==e.$dots&&(e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t){var s=o.indexOf(t);i(this).attr({role:"tabpanel",id:"slick-slide"+e.instanceUid+t,tabindex:-1}),-1!==s&&i(this).attr({"aria-describedby":"slick-slide-control"+e.instanceUid+s})}),e.$dots.attr("role","tablist").find("li").each(function(s){var n=o[s];i(this).attr({role:"presentation"}),i(this).find("button").first().attr({role:"tab",id:"slick-slide-control"+e.instanceUid+s,"aria-controls":"slick-slide"+e.instanceUid+n,"aria-label":s+1+" of "+t,"aria-selected":null,tabindex:"-1"})}).eq(e.currentSlide).find("button").attr({"aria-selected":"true",tabindex:"0"}).end());for(var s=e.currentSlide,n=s+e.options.slidesToShow;s<n;s++)e.$slides.eq(s).attr("tabindex",0);e.activateADA()},e.prototype.initArrowEvents=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},i.changeSlide),i.$nextArrow.off("click.slick").on("click.slick",{message:"next"},i.changeSlide),!0===i.options.accessibility&&(i.$prevArrow.on("keydown.slick",i.keyHandler),i.$nextArrow.on("keydown.slick",i.keyHandler)))},e.prototype.initDotEvents=function(){var e=this;!0===e.options.dots&&(i("li",e.$dots).on("click.slick",{message:"index"},e.changeSlide),!0===e.options.accessibility&&e.$dots.on("keydown.slick",e.keyHandler)),!0===e.options.dots&&!0===e.options.pauseOnDotsHover&&i("li",e.$dots).on("mouseenter.slick",i.proxy(e.interrupt,e,!0)).on("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.initSlideEvents=function(){var e=this;e.options.pauseOnHover&&(e.$list.on("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.on("mouseleave.slick",i.proxy(e.interrupt,e,!1)))},e.prototype.initializeEvents=function(){var e=this;e.initArrowEvents(),e.initDotEvents(),e.initSlideEvents(),e.$list.on("touchstart.slick mousedown.slick",{action:"start"},e.swipeHandler),e.$list.on("touchmove.slick mousemove.slick",{action:"move"},e.swipeHandler),e.$list.on("touchend.slick mouseup.slick",{action:"end"},e.swipeHandler),e.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},e.swipeHandler),e.$list.on("click.slick",e.clickHandler),i(document).on(e.visibilityChange,i.proxy(e.visibility,e)),!0===e.options.accessibility&&e.$list.on("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),i(window).on("orientationchange.slick.slick-"+e.instanceUid,i.proxy(e.orientationChange,e)),i(window).on("resize.slick.slick-"+e.instanceUid,i.proxy(e.resize,e)),i("[draggable!=true]",e.$slideTrack).on("dragstart",e.preventDefault),i(window).on("load.slick.slick-"+e.instanceUid,e.setPosition),i(e.setPosition)},e.prototype.initUI=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.show(),i.$nextArrow.show()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.show()},e.prototype.keyHandler=function(i){var e=this;i.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===i.keyCode&&!0===e.options.accessibility?e.changeSlide({data:{message:!0===e.options.rtl?"next":"previous"}}):39===i.keyCode&&!0===e.options.accessibility&&e.changeSlide({data:{message:!0===e.options.rtl?"previous":"next"}}))},e.prototype.lazyLoad=function(){function e(e){i("img[data-lazy]",e).each(function(){var e=i(this),t=i(this).attr("data-lazy"),o=i(this).attr("data-srcset"),s=i(this).attr("data-sizes")||n.$slider.attr("data-sizes"),r=document.createElement("img");r.onload=function(){e.animate({opacity:0},100,function(){o&&(e.attr("srcset",o),s&&e.attr("sizes",s)),e.attr("src",t).animate({opacity:1},200,function(){e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")}),n.$slider.trigger("lazyLoaded",[n,e,t])})},r.onerror=function(){e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),n.$slider.trigger("lazyLoadError",[n,e,t])},r.src=t})}var t,o,s,n=this;if(!0===n.options.centerMode?!0===n.options.infinite?s=(o=n.currentSlide+(n.options.slidesToShow/2+1))+n.options.slidesToShow+2:(o=Math.max(0,n.currentSlide-(n.options.slidesToShow/2+1)),s=n.options.slidesToShow/2+1+2+n.currentSlide):(o=n.options.infinite?n.options.slidesToShow+n.currentSlide:n.currentSlide,s=Math.ceil(o+n.options.slidesToShow),!0===n.options.fade&&(o>0&&o--,s<=n.slideCount&&s++)),t=n.$slider.find(".slick-slide").slice(o,s),"anticipated"===n.options.lazyLoad)for(var r=o-1,l=s,d=n.$slider.find(".slick-slide"),a=0;a<n.options.slidesToScroll;a++)r<0&&(r=n.slideCount-1),t=(t=t.add(d.eq(r))).add(d.eq(l)),r--,l++;e(t),n.slideCount<=n.options.slidesToShow?e(n.$slider.find(".slick-slide")):n.currentSlide>=n.slideCount-n.options.slidesToShow?e(n.$slider.find(".slick-cloned").slice(0,n.options.slidesToShow)):0===n.currentSlide&&e(n.$slider.find(".slick-cloned").slice(-1*n.options.slidesToShow))},e.prototype.loadSlider=function(){var i=this;i.setPosition(),i.$slideTrack.css({opacity:1}),i.$slider.removeClass("slick-loading"),i.initUI(),"progressive"===i.options.lazyLoad&&i.progressiveLazyLoad()},e.prototype.next=e.prototype.slickNext=function(){this.changeSlide({data:{message:"next"}})},e.prototype.orientationChange=function(){var i=this;i.checkResponsive(),i.setPosition()},e.prototype.pause=e.prototype.slickPause=function(){var i=this;i.autoPlayClear(),i.paused=!0},e.prototype.play=e.prototype.slickPlay=function(){var i=this;i.autoPlay(),i.options.autoplay=!0,i.paused=!1,i.focussed=!1,i.interrupted=!1},e.prototype.postSlide=function(e){var t=this;t.unslicked||(t.$slider.trigger("afterChange",[t,e]),t.animating=!1,t.slideCount>t.options.slidesToShow&&t.setPosition(),t.swipeLeft=null,t.options.autoplay&&t.autoPlay(),!0===t.options.accessibility&&(t.initADA(),t.options.focusOnChange&&i(t.$slides.get(t.currentSlide)).attr("tabindex",0).focus()))},e.prototype.prev=e.prototype.slickPrev=function(){this.changeSlide({data:{message:"previous"}})},e.prototype.preventDefault=function(i){i.preventDefault()},e.prototype.progressiveLazyLoad=function(e){e=e||1;var t,o,s,n,r,l=this,d=i("img[data-lazy]",l.$slider);d.length?(t=d.first(),o=t.attr("data-lazy"),s=t.attr("data-srcset"),n=t.attr("data-sizes")||l.$slider.attr("data-sizes"),(r=document.createElement("img")).onload=function(){s&&(t.attr("srcset",s),n&&t.attr("sizes",n)),t.attr("src",o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),!0===l.options.adaptiveHeight&&l.setPosition(),l.$slider.trigger("lazyLoaded",[l,t,o]),l.progressiveLazyLoad()},r.onerror=function(){e<3?setTimeout(function(){l.progressiveLazyLoad(e+1)},500):(t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),l.$slider.trigger("lazyLoadError",[l,t,o]),l.progressiveLazyLoad())},r.src=o):l.$slider.trigger("allImagesLoaded",[l])},e.prototype.refresh=function(e){var t,o,s=this;o=s.slideCount-s.options.slidesToShow,!s.options.infinite&&s.currentSlide>o&&(s.currentSlide=o),s.slideCount<=s.options.slidesToShow&&(s.currentSlide=0),t=s.currentSlide,s.destroy(!0),i.extend(s,s.initials,{currentSlide:t}),s.init(),e||s.changeSlide({data:{message:"index",index:t}},!1)},e.prototype.registerBreakpoints=function(){var e,t,o,s=this,n=s.options.responsive||null;if("array"===i.type(n)&&n.length){s.respondTo=s.options.respondTo||"window";for(e in n)if(o=s.breakpoints.length-1,n.hasOwnProperty(e)){for(t=n[e].breakpoint;o>=0;)s.breakpoints[o]&&s.breakpoints[o]===t&&s.breakpoints.splice(o,1),o--;s.breakpoints.push(t),s.breakpointSettings[t]=n[e].settings}s.breakpoints.sort(function(i,e){return s.options.mobileFirst?i-e:e-i})}},e.prototype.reinit=function(){var e=this;e.$slides=e.$slideTrack.children(e.options.slide).addClass("slick-slide"),e.slideCount=e.$slides.length,e.currentSlide>=e.slideCount&&0!==e.currentSlide&&(e.currentSlide=e.currentSlide-e.options.slidesToScroll),e.slideCount<=e.options.slidesToShow&&(e.currentSlide=0),e.registerBreakpoints(),e.setProps(),e.setupInfinite(),e.buildArrows(),e.updateArrows(),e.initArrowEvents(),e.buildDots(),e.updateDots(),e.initDotEvents(),e.cleanUpSlideEvents(),e.initSlideEvents(),e.checkResponsive(!1,!0),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),e.setPosition(),e.focusHandler(),e.paused=!e.options.autoplay,e.autoPlay(),e.$slider.trigger("reInit",[e])},e.prototype.resize=function(){var e=this;i(window).width()!==e.windowWidth&&(clearTimeout(e.windowDelay),e.windowDelay=window.setTimeout(function(){e.windowWidth=i(window).width(),e.checkResponsive(),e.unslicked||e.setPosition()},50))},e.prototype.removeSlide=e.prototype.slickRemove=function(i,e,t){var o=this;if(i="boolean"==typeof i?!0===(e=i)?0:o.slideCount-1:!0===e?--i:i,o.slideCount<1||i<0||i>o.slideCount-1)return!1;o.unload(),!0===t?o.$slideTrack.children().remove():o.$slideTrack.children(this.options.slide).eq(i).remove(),o.$slides=o.$slideTrack.children(this.options.slide),o.$slideTrack.children(this.options.slide).detach(),o.$slideTrack.append(o.$slides),o.$slidesCache=o.$slides,o.reinit()},e.prototype.setCSS=function(i){var e,t,o=this,s={};!0===o.options.rtl&&(i=-i),e="left"==o.positionProp?Math.ceil(i)+"px":"0px",t="top"==o.positionProp?Math.ceil(i)+"px":"0px",s[o.positionProp]=i,!1===o.transformsEnabled?o.$slideTrack.css(s):(s={},!1===o.cssTransitions?(s[o.animType]="translate("+e+", "+t+")",o.$slideTrack.css(s)):(s[o.animType]="translate3d("+e+", "+t+", 0px)",o.$slideTrack.css(s)))},e.prototype.setDimensions=function(){var i=this;!1===i.options.vertical?!0===i.options.centerMode&&i.$list.css({padding:"0px "+i.options.centerPadding}):(i.$list.height(i.$slides.first().outerHeight(!0)*i.options.slidesToShow),!0===i.options.centerMode&&i.$list.css({padding:i.options.centerPadding+" 0px"})),i.listWidth=i.$list.width(),i.listHeight=i.$list.height(),!1===i.options.vertical&&!1===i.options.variableWidth?(i.slideWidth=Math.ceil(i.listWidth/i.options.slidesToShow),i.$slideTrack.width(Math.ceil(i.slideWidth*i.$slideTrack.children(".slick-slide").length))):!0===i.options.variableWidth?i.$slideTrack.width(5e3*i.slideCount):(i.slideWidth=Math.ceil(i.listWidth),i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0)*i.$slideTrack.children(".slick-slide").length)));var e=i.$slides.first().outerWidth(!0)-i.$slides.first().width();!1===i.options.variableWidth&&i.$slideTrack.children(".slick-slide").width(i.slideWidth-e)},e.prototype.setFade=function(){var e,t=this;t.$slides.each(function(o,s){e=t.slideWidth*o*-1,!0===t.options.rtl?i(s).css({position:"relative",right:e,top:0,zIndex:t.options.zIndex-2,opacity:0}):i(s).css({position:"relative",left:e,top:0,zIndex:t.options.zIndex-2,opacity:0})}),t.$slides.eq(t.currentSlide).css({zIndex:t.options.zIndex-1,opacity:1})},e.prototype.setHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.css("height",e)}},e.prototype.setOption=e.prototype.slickSetOption=function(){var e,t,o,s,n,r=this,l=!1;if("object"===i.type(arguments[0])?(o=arguments[0],l=arguments[1],n="multiple"):"string"===i.type(arguments[0])&&(o=arguments[0],s=arguments[1],l=arguments[2],"responsive"===arguments[0]&&"array"===i.type(arguments[1])?n="responsive":void 0!==arguments[1]&&(n="single")),"single"===n)r.options[o]=s;else if("multiple"===n)i.each(o,function(i,e){r.options[i]=e});else if("responsive"===n)for(t in s)if("array"!==i.type(r.options.responsive))r.options.responsive=[s[t]];else{for(e=r.options.responsive.length-1;e>=0;)r.options.responsive[e].breakpoint===s[t].breakpoint&&r.options.responsive.splice(e,1),e--;r.options.responsive.push(s[t])}l&&(r.unload(),r.reinit())},e.prototype.setPosition=function(){var i=this;i.setDimensions(),i.setHeight(),!1===i.options.fade?i.setCSS(i.getLeft(i.currentSlide)):i.setFade(),i.$slider.trigger("setPosition",[i])},e.prototype.setProps=function(){var i=this,e=document.body.style;i.positionProp=!0===i.options.vertical?"top":"left","top"===i.positionProp?i.$slider.addClass("slick-vertical"):i.$slider.removeClass("slick-vertical"),void 0===e.WebkitTransition&&void 0===e.MozTransition&&void 0===e.msTransition||!0===i.options.useCSS&&(i.cssTransitions=!0),i.options.fade&&("number"==typeof i.options.zIndex?i.options.zIndex<3&&(i.options.zIndex=3):i.options.zIndex=i.defaults.zIndex),void 0!==e.OTransform&&(i.animType="OTransform",i.transformType="-o-transform",i.transitionType="OTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.MozTransform&&(i.animType="MozTransform",i.transformType="-moz-transform",i.transitionType="MozTransition",void 0===e.perspectiveProperty&&void 0===e.MozPerspective&&(i.animType=!1)),void 0!==e.webkitTransform&&(i.animType="webkitTransform",i.transformType="-webkit-transform",i.transitionType="webkitTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.msTransform&&(i.animType="msTransform",i.transformType="-ms-transform",i.transitionType="msTransition",void 0===e.msTransform&&(i.animType=!1)),void 0!==e.transform&&!1!==i.animType&&(i.animType="transform",i.transformType="transform",i.transitionType="transition"),i.transformsEnabled=i.options.useTransform&&null!==i.animType&&!1!==i.animType},e.prototype.setSlideClasses=function(i){var e,t,o,s,n=this;if(t=n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),n.$slides.eq(i).addClass("slick-current"),!0===n.options.centerMode){var r=n.options.slidesToShow%2==0?1:0;e=Math.floor(n.options.slidesToShow/2),!0===n.options.infinite&&(i>=e&&i<=n.slideCount-1-e?n.$slides.slice(i-e+r,i+e+1).addClass("slick-active").attr("aria-hidden","false"):(o=n.options.slidesToShow+i,t.slice(o-e+1+r,o+e+2).addClass("slick-active").attr("aria-hidden","false")),0===i?t.eq(t.length-1-n.options.slidesToShow).addClass("slick-center"):i===n.slideCount-1&&t.eq(n.options.slidesToShow).addClass("slick-center")),n.$slides.eq(i).addClass("slick-center")}else i>=0&&i<=n.slideCount-n.options.slidesToShow?n.$slides.slice(i,i+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):t.length<=n.options.slidesToShow?t.addClass("slick-active").attr("aria-hidden","false"):(s=n.slideCount%n.options.slidesToShow,o=!0===n.options.infinite?n.options.slidesToShow+i:i,n.options.slidesToShow==n.options.slidesToScroll&&n.slideCount-i<n.options.slidesToShow?t.slice(o-(n.options.slidesToShow-s),o+s).addClass("slick-active").attr("aria-hidden","false"):t.slice(o,o+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"));"ondemand"!==n.options.lazyLoad&&"anticipated"!==n.options.lazyLoad||n.lazyLoad()},e.prototype.setupInfinite=function(){var e,t,o,s=this;if(!0===s.options.fade&&(s.options.centerMode=!1),!0===s.options.infinite&&!1===s.options.fade&&(t=null,s.slideCount>s.options.slidesToShow)){for(o=!0===s.options.centerMode?s.options.slidesToShow+1:s.options.slidesToShow,e=s.slideCount;e>s.slideCount-o;e-=1)t=e-1,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t-s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");for(e=0;e<o+s.slideCount;e+=1)t=e,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t+s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");s.$slideTrack.find(".slick-cloned").find("[id]").each(function(){i(this).attr("id","")})}},e.prototype.interrupt=function(i){var e=this;i||e.autoPlay(),e.interrupted=i},e.prototype.selectHandler=function(e){var t=this,o=i(e.target).is(".slick-slide")?i(e.target):i(e.target).parents(".slick-slide"),s=parseInt(o.attr("data-slick-index"));s||(s=0),t.slideCount<=t.options.slidesToShow?t.slideHandler(s,!1,!0):t.slideHandler(s)},e.prototype.slideHandler=function(i,e,t){var o,s,n,r,l,d=null,a=this;if(e=e||!1,!(!0===a.animating&&!0===a.options.waitForAnimate||!0===a.options.fade&&a.currentSlide===i))if(!1===e&&a.asNavFor(i),o=i,d=a.getLeft(o),r=a.getLeft(a.currentSlide),a.currentLeft=null===a.swipeLeft?r:a.swipeLeft,!1===a.options.infinite&&!1===a.options.centerMode&&(i<0||i>a.getDotCount()*a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else if(!1===a.options.infinite&&!0===a.options.centerMode&&(i<0||i>a.slideCount-a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else{if(a.options.autoplay&&clearInterval(a.autoPlayTimer),s=o<0?a.slideCount%a.options.slidesToScroll!=0?a.slideCount-a.slideCount%a.options.slidesToScroll:a.slideCount+o:o>=a.slideCount?a.slideCount%a.options.slidesToScroll!=0?0:o-a.slideCount:o,a.animating=!0,a.$slider.trigger("beforeChange",[a,a.currentSlide,s]),n=a.currentSlide,a.currentSlide=s,a.setSlideClasses(a.currentSlide),a.options.asNavFor&&(l=(l=a.getNavTarget()).slick("getSlick")).slideCount<=l.options.slidesToShow&&l.setSlideClasses(a.currentSlide),a.updateDots(),a.updateArrows(),!0===a.options.fade)return!0!==t?(a.fadeSlideOut(n),a.fadeSlide(s,function(){a.postSlide(s)})):a.postSlide(s),void a.animateHeight();!0!==t?a.animateSlide(d,function(){a.postSlide(s)}):a.postSlide(s)}},e.prototype.startLoad=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.hide(),i.$nextArrow.hide()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.hide(),i.$slider.addClass("slick-loading")},e.prototype.swipeDirection=function(){var i,e,t,o,s=this;return i=s.touchObject.startX-s.touchObject.curX,e=s.touchObject.startY-s.touchObject.curY,t=Math.atan2(e,i),(o=Math.round(180*t/Math.PI))<0&&(o=360-Math.abs(o)),o<=45&&o>=0?!1===s.options.rtl?"left":"right":o<=360&&o>=315?!1===s.options.rtl?"left":"right":o>=135&&o<=225?!1===s.options.rtl?"right":"left":!0===s.options.verticalSwiping?o>=35&&o<=135?"down":"up":"vertical"},e.prototype.swipeEnd=function(i){var e,t,o=this;if(o.dragging=!1,o.swiping=!1,o.scrolling)return o.scrolling=!1,!1;if(o.interrupted=!1,o.shouldClick=!(o.touchObject.swipeLength>10),void 0===o.touchObject.curX)return!1;if(!0===o.touchObject.edgeHit&&o.$slider.trigger("edge",[o,o.swipeDirection()]),o.touchObject.swipeLength>=o.touchObject.minSwipe){switch(t=o.swipeDirection()){case"left":case"down":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide+o.getSlideCount()):o.currentSlide+o.getSlideCount(),o.currentDirection=0;break;case"right":case"up":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide-o.getSlideCount()):o.currentSlide-o.getSlideCount(),o.currentDirection=1}"vertical"!=t&&(o.slideHandler(e),o.touchObject={},o.$slider.trigger("swipe",[o,t]))}else o.touchObject.startX!==o.touchObject.curX&&(o.slideHandler(o.currentSlide),o.touchObject={})},e.prototype.swipeHandler=function(i){var e=this;if(!(!1===e.options.swipe||"ontouchend"in document&&!1===e.options.swipe||!1===e.options.draggable&&-1!==i.type.indexOf("mouse")))switch(e.touchObject.fingerCount=i.originalEvent&&void 0!==i.originalEvent.touches?i.originalEvent.touches.length:1,e.touchObject.minSwipe=e.listWidth/e.options.touchThreshold,!0===e.options.verticalSwiping&&(e.touchObject.minSwipe=e.listHeight/e.options.touchThreshold),i.data.action){case"start":e.swipeStart(i);break;case"move":e.swipeMove(i);break;case"end":e.swipeEnd(i)}},e.prototype.swipeMove=function(i){var e,t,o,s,n,r,l=this;return n=void 0!==i.originalEvent?i.originalEvent.touches:null,!(!l.dragging||l.scrolling||n&&1!==n.length)&&(e=l.getLeft(l.currentSlide),l.touchObject.curX=void 0!==n?n[0].pageX:i.clientX,l.touchObject.curY=void 0!==n?n[0].pageY:i.clientY,l.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(l.touchObject.curX-l.touchObject.startX,2))),r=Math.round(Math.sqrt(Math.pow(l.touchObject.curY-l.touchObject.startY,2))),!l.options.verticalSwiping&&!l.swiping&&r>4?(l.scrolling=!0,!1):(!0===l.options.verticalSwiping&&(l.touchObject.swipeLength=r),t=l.swipeDirection(),void 0!==i.originalEvent&&l.touchObject.swipeLength>4&&(l.swiping=!0,i.preventDefault()),s=(!1===l.options.rtl?1:-1)*(l.touchObject.curX>l.touchObject.startX?1:-1),!0===l.options.verticalSwiping&&(s=l.touchObject.curY>l.touchObject.startY?1:-1),o=l.touchObject.swipeLength,l.touchObject.edgeHit=!1,!1===l.options.infinite&&(0===l.currentSlide&&"right"===t||l.currentSlide>=l.getDotCount()&&"left"===t)&&(o=l.touchObject.swipeLength*l.options.edgeFriction,l.touchObject.edgeHit=!0),!1===l.options.vertical?l.swipeLeft=e+o*s:l.swipeLeft=e+o*(l.$list.height()/l.listWidth)*s,!0===l.options.verticalSwiping&&(l.swipeLeft=e+o*s),!0!==l.options.fade&&!1!==l.options.touchMove&&(!0===l.animating?(l.swipeLeft=null,!1):void l.setCSS(l.swipeLeft))))},e.prototype.swipeStart=function(i){var e,t=this;if(t.interrupted=!0,1!==t.touchObject.fingerCount||t.slideCount<=t.options.slidesToShow)return t.touchObject={},!1;void 0!==i.originalEvent&&void 0!==i.originalEvent.touches&&(e=i.originalEvent.touches[0]),t.touchObject.startX=t.touchObject.curX=void 0!==e?e.pageX:i.clientX,t.touchObject.startY=t.touchObject.curY=void 0!==e?e.pageY:i.clientY,t.dragging=!0},e.prototype.unfilterSlides=e.prototype.slickUnfilter=function(){var i=this;null!==i.$slidesCache&&(i.unload(),i.$slideTrack.children(this.options.slide).detach(),i.$slidesCache.appendTo(i.$slideTrack),i.reinit())},e.prototype.unload=function(){var e=this;i(".slick-cloned",e.$slider).remove(),e.$dots&&e.$dots.remove(),e.$prevArrow&&e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.remove(),e.$nextArrow&&e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.remove(),e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},e.prototype.unslick=function(i){var e=this;e.$slider.trigger("unslick",[e,i]),e.destroy()},e.prototype.updateArrows=function(){var i=this;Math.floor(i.options.slidesToShow/2),!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&!i.options.infinite&&(i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===i.currentSlide?(i.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-i.options.slidesToShow&&!1===i.options.centerMode?(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-1&&!0===i.options.centerMode&&(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},e.prototype.updateDots=function(){var i=this;null!==i.$dots&&(i.$dots.find("li").removeClass("slick-active").end(),i.$dots.find("li").eq(Math.floor(i.currentSlide/i.options.slidesToScroll)).addClass("slick-active"))},e.prototype.visibility=function(){var i=this;i.options.autoplay&&(document[i.hidden]?i.interrupted=!0:i.interrupted=!1)},i.fn.slick=function(){var i,t,o=this,s=arguments[0],n=Array.prototype.slice.call(arguments,1),r=o.length;for(i=0;i<r;i++)if("object"==typeof s||void 0===s?o[i].slick=new e(o[i],s):t=o[i].slick[s].apply(o[i].slick,n),void 0!==t)return t;return o}});

/*! js-cookie v2.2.1 | MIT */

!function(a){var b;if("function"==typeof define&&define.amd&&(define(a),b=!0),"object"==typeof exports&&(module.exports=a(),b=!0),!b){var c=window.Cookies,d=window.Cookies=a();d.noConflict=function(){return window.Cookies=c,d}}}(function(){function a(){for(var a=0,b={};a<arguments.length;a++){var c=arguments[a];for(var d in c)b[d]=c[d]}return b}function b(a){return a.replace(/(%[0-9A-Z]{2})+/g,decodeURIComponent)}function c(d){function e(){}function f(b,c,f){if("undefined"!=typeof document){f=a({path:"/"},e.defaults,f),"number"==typeof f.expires&&(f.expires=new Date(1*new Date+864e5*f.expires)),f.expires=f.expires?f.expires.toUTCString():"";try{var g=JSON.stringify(c);/^[\{\[]/.test(g)&&(c=g)}catch(j){}c=d.write?d.write(c,b):encodeURIComponent(c+"").replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),b=encodeURIComponent(b+"").replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent).replace(/[\(\)]/g,escape);var h="";for(var i in f)f[i]&&(h+="; "+i,!0!==f[i]&&(h+="="+f[i].split(";")[0]));return document.cookie=b+"="+c+h}}function g(a,c){if("undefined"!=typeof document){for(var e={},f=document.cookie?document.cookie.split("; "):[],g=0;g<f.length;g++){var h=f[g].split("="),i=h.slice(1).join("=");c||'"'!==i.charAt(0)||(i=i.slice(1,-1));try{var j=b(h[0]);if(i=(d.read||d)(i,j)||b(i),c)try{i=JSON.parse(i)}catch(k){}if(e[j]=i,a===j)break}catch(k){}}return a?e[a]:e}}return e.set=f,e.get=function(a){return g(a,!1)},e.getJSON=function(a){return g(a,!0)},e.remove=function(b,c){f(b,"",a(c,{expires:-1}))},e.defaults={},e.withConverter=c,e}return c(function(){})});
class Form {

    constructor(formElement, validation) {
        console.log(validation)
        this.validation = validation
        this.formInputs = formElement.querySelectorAll("input:not([type='radio']), select, textarea")
    }

    validateForm() {
        let isValidArray = []
        this.formInputs.forEach((input, index) => {
			const inputIsValid = this.validateInput(input, this.validation[index])
            isValidArray.push(inputIsValid)
        })

        let formIsValid = true
        for(const value of isValidArray) {
            if(value === false) {
                formIsValid = false
            }
        }
        if(formIsValid === true ) {
            return true
        }
        return false
    }

    validationSchema(inputValue, configKey, configValue) {
        if(configKey === "isRequired" && configValue === false) {
            return "notRequired"
        }
        switch(configKey) {
            case "isRequired":
                return inputValue.trim().length !== 0
            case "minLength":
                return inputValue.trim().length >= configValue
            case "maxLength":
                return inputValue.trim().length <= configValue
            case "isEmail":
                return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i.test(inputValue);
            case "isNumber":
                return /[0-9]/.test(inputValue);
            case "minNumber":
                return inputValue >= configValue
            case "maxNumber":
                return inputValue <= configValue
            default:
                throw new Error( `Validation Schema not known, please add key ${configKey} to validationSchema`);
        }
    }

    validateInput(input, validationConfig) {
        let isRequired = true
        let isValid = true
        let errorMessage
        for(let item in validationConfig) {
            let configKey = item
            let configValue = validationConfig[item][0]
            errorMessage = validationConfig[item][1]
            isValid = this.validationSchema(input.value, configKey, configValue)
            if(isValid === "notRequired") {
                isValid = true
                isRequired = false
                continue
            }
            if(!isValid) {
                break
            }
        }
        if(isRequired) {
            if(isValid) {
                this.setError(input, false)
                return true
            } else {
                this.setError(input, errorMessage)
                return false
            }
        } else {
            if(input.value !== "") {
                if(isValid) {
                    this.setError(input, false)
                    return true
                } else {
                    this.setError(input, errorMessage)
                    return false
                }
            }
            if(!isValid) {
                this.setError(input, false)
            }
            return true
        }
    }

    setError(input, errorMessage) { 
        if(errorMessage === false) {
            input.parentElement.classList.remove("--error")
            input.parentElement.querySelector(".input__error").innerText = ""
        } else {
            input.parentElement.classList.add("--error")
            input.parentElement.querySelector(".input__error").innerText = errorMessage
            //input.parentElement.querySelector(".input__error").innerText = errorMessage
        }
    }

    getValues() {
        let returnObj = {}
        this.formInputs.forEach((input) => {
            const key = input.name
            Object.assign(returnObj, {
                [key]: input.value,
            })
        })
        return returnObj
    }

    setValues(valuesObj) {
        if(valuesObj !== null) {
            this.formInputs.forEach((input) => {
                if( valuesObj[input.name] != "" && valuesObj[input.name] != undefined) {
                    input.value = valuesObj[input.name]
                }
            })
        }
    }

}

jQuery(document).ready(function ($) {
	function onElementLoad(selector, execution) {
		const observer = new MutationObserver((mutations) => {
			if (document.querySelectorAll(selector).length > 0) {
				execution();
				observer.disconnect();
			}
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});
	}

	// set website moe
	var websiteMode = "website";
	if (document.querySelector(".button--toggle-site.--to-website"))
		websiteMode = "shop";

	// set empty object on session start
	if (!sessionStorage.getItem("site_toggle_links")) {
		sessionStorage.setItem(
			"site_toggle_links",
			JSON.stringify({
				website: "",
				shop: "",
			})
		);
	}

	// add content group to tag manager data layer
	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push({
		content_group: websiteMode,
	});

	// set toggle links from sessionStorage
	const siteToggleLinks = JSON.parse(
		sessionStorage.getItem("site_toggle_links")
	);
	const toggleTo = websiteMode === "website" ? "shop" : "website";
	const toggleToLink = siteToggleLinks[toggleTo];
	if (toggleToLink) {
		document
			.querySelectorAll(".nav__toggle__site a, .button--toggle-site")
			.forEach((button) => {
				button.href = toggleToLink;
			});
	}

	// set new Link
	siteToggleLinks[websiteMode] = window.location.href;
	document
		.querySelectorAll(".nav__toggle__site a, .button--toggle-site")
		.forEach((button) => {
			button.addEventListener("click", (e) => {
				gtag("event", "page_toggle", {
					origin: websiteMode,
					direction: toggleTo,
				});
				sessionStorage.setItem(
					"site_toggle_links",
					JSON.stringify(siteToggleLinks)
				);
			});
		});

	if (document.querySelector(".tracking-detail")) {
		$(".shipping__status").append($(".tracking-detail"));
	}

	/*------------------------------------*\
    // order review - move elements to split left
	\*------------------------------------*/
	if (document.querySelector(".woocommerce-thankyou-order-details")) {
		$(".checkout-split .left .container").prepend(
			$(".woocommerce-thankyou-order-details")
		);
	}
	if (document.querySelector(".woocommerce-thankyou-order-received")) {
		$(".checkout-split .left .container").prepend(
			$(".woocommerce-thankyou-order-received")
		);
	}

	class ShopHeroSlider {
		constructor(textSliderClass, imageSliderClass) {
			this.textSlider = $(textSliderClass).slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				dots: false,
				arrows: false,
				fade: true,
				cssEase: "linear",
				adaptiveHeight: true,
				draggable: false,
				responsive: [
					{
						breakpoint: 520,
						settings: {
							adaptiveHeight: false,
						},
					},
				],
			});
			this.imageSlider = $(imageSliderClass).slick({
				infinite: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				dots: false,
				arrows: true,
				prevArrow: $(".hero__slider__button--prev"),
				nextArrow: $(".hero__slider__button--next"),
				asNavFor: ".shop-hero-banner__text",
			});

			this.sliderLength = this.imageSlider.slick("getSlick").slideCount;
			this.processBar = document.querySelector(
				".process-button .process"
			);
			this.processButton = document.querySelector(".process-button");
			this.isPaused = false;

			this.declareEventListeners();
		}

		declareEventListeners() {
			this.processButton.addEventListener("click", () => {
				if (this.isPaused) {
					this.imageSlider.slick("slickPlay");
					this.processButton.classList.remove("--paused");
					this.isPaused = false;
				} else {
					this.imageSlider.slick("slickPause");
					this.processButton.classList.add("--paused");
					this.isPaused = true;
				}
			});
			this.textSlider.on("beforeChange", () => {
				this.processButton.classList.remove("--filled");
				setTimeout(() => {
					this.processButton.classList.add("--filled");
				}, 1);
			});
			this.processBar.addEventListener("animationend", () => {
				this.imageSlider.slick("slickNext");
			});
		}
	}
	if (document.querySelector(".shop-hero-banner .hero__slider")) {
		const shopHeroSlider = new ShopHeroSlider(
			".shop-hero-banner__text",
			".hero__slider"
		);
	}

	//
	let dropdownIsOpened = false;
	$(".hamburger").click(function () {
		const hamburgers = document.querySelectorAll(".hamburger");
		hamburgers.forEach((hamburger) => {
			hamburger.classList.toggle("is-active");
		});
		$(".header__dropdown").slideToggle(300);
		$(".header__dropdown").toggleClass("header__dropdown--opened");
		$(".header__dropdown").parent().toggleClass("--dropdown-opened");
		if (dropdownIsOpened) {
			dropdownIsOpened = false;
			enableScroll();
		} else {
			dropdownIsOpened = true;
			disableScroll();
		}
	});

	// Nav mit Unterpunkten bekommt eine Klasse
	$(".dropdown__nav li").find("UL").parent().addClass("has-sub");
	$(".dropdown__nav ul li").each(function () {
		var hasSubnav = $(this).find("ul").length;
		if (hasSubnav >= 1) {
			$(this).prepend('<div class="showSub" />');
		}
	});

	//
	$(".showSub").on("click", function () {
		$(this).toggleClass("open");
		$(this).parent("li").toggleClass("open");
		$(this).parent("li").children(".sub-menu").slideToggle(200);
	});

	$(".header__dropdown__mobile .dropdown__links__item .submenu").each(
		(index, element) => {
			if ($(element).find("li").length > 0) {
				$(element).parent().addClass("hasSub");
			}
		}
	);

	$(".header__dropdown__mobile .hasSub .main-link").on("click", function (e) {
		e.preventDefault();
		$(this).parent().toggleClass("--opened");
		$(this).parent().find(".submenu:not(:empty)").slideToggle(300);
	});

	// Leichtes Scrollen
	$("a[href*=\\#]:not([href=\\#])").click(function () {
		if (
			location.pathname.replace(/^\//, "") ==
				this.pathname.replace(/^\//, "") &&
			location.hostname == this.hostname
		) {
			var target = $(this.hash);
			target = target.length
				? target
				: $("[name=" + this.hash.slice(1) + "]");
			if (target.length) {
				$("html,body").animate(
					{
						scrollTop: target.offset().top - scrollOffset,
					},
					1000
				);
				return false;
			}
		}
	});

	// ANnchor scroll offset on Page Load
	scrollToAnchor();
	function scrollToAnchor() {
		var hash = window.location.hash;
		var target = $(hash);
		if (hash == "" || hash == "#" || hash == undefined) return false;
		// headerHeight = 120;
		target = target.length ? target : $("[name=" + hash.slice(1) + "]");
		if (target.length) {
			$("html,body")
				.stop()
				.animate(
					{
						scrollTop: target.offset().top - 150, //offsets for fixed header
					},
					10
				);
		}
	}

	// Hide Header on Load
	const hiddenHeader = document.querySelector(".header.--hidden-on-load");
	if (hiddenHeader) {
		let dropdownIsOpened = false;
		let showOffset = hiddenHeader.dataset.showOffset;
		let wScroll = $(window).scrollTop();

		const pageStart = document.querySelector(".page__start");
		if (pageStart) {
			console.log("pageStart");
			showOffset = pageStart.offsetHeight - 350;
		}
		const showHeader = document.querySelector(".show-header-on-offset");
		if (showHeader) {
			console.log("showHeader");
			showOffset = showHeader.offsetHeight - 350;
		}

		toggleHeader(wScroll);
		window.addEventListener(
			"scroll",
			() => {
				wScroll = $(window).scrollTop();
				toggleHeader(wScroll);
			},
			{ passive: true }
		);
		// $(window).on("scroll", function() {
		// });
		function toggleHeader(wScroll) {
			console.log(wScroll > showOffset);
			if (wScroll > showOffset && wScroll > 20) {
				hiddenHeader.classList.add("--show");
			} else {
				if (!dropdownIsOpened) hiddenHeader.classList.remove("--show");
			}
		}

		hiddenHeader.querySelector("ul").addEventListener("mouseenter", () => {
			dropdownIsOpened = true;
		});
		hiddenHeader.querySelector("ul").addEventListener("mouseleave", () => {
			dropdownIsOpened = false;
			if (wScroll < showOffset) {
				hiddenHeader.classList.remove("--show");
			}
		});

		// Header anzeigen, wenn kein Element mit der Klasse "page_start" vorhanden ist
		if (
			!pageStart &&
			!document.querySelector(".header--shop") &&
			!document.querySelector(".home__banner")
		) {
			hiddenHeader.classList.remove("--hidden-on-load");
		}
	}

	// Scrolling Controls: Enable/Disable
	function disableScroll() {
		// Get the current page scroll position
		scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		(scrollLeft =
			window.pageXOffset || document.documentElement.scrollLeft),
			// if any scroll is attempted, set this to the previous value
			(window.onscroll = function () {
				window.scrollTo(scrollLeft, scrollTop);
			});
	}

	function enableScroll() {
		window.onscroll = function () {};
		$("body").removeClass("--hide-scrollbar");
	}

	//Accordeon
	$(".accordeon__item .accordeon__header").click(function (e) {
		$(this)
			.parent(".accordeon__item")
			.toggleClass("accordeon__item--opened");
		$accordion_content = $(this)
			.parent(".accordeon__item")
			.find(".accordeon__content");
		$(".accordeon__content").not($accordion_content).slideUp(200);
		$(".accordeon__item")
			.find(".accordeon__content")
			.not($accordion_content)
			.parent(".accordeon__item")
			.removeClass("accordeon__item--opened");
		$accordion_content.stop(true, true).slideToggle(200);

		target = e.currentTarget.parentElement;
		if (target.classList.contains("accordeon__item--opened")) {
			setTimeout(function () {
				if (window.innerHeight < target.offsetHeight + 100) {
					console.log("dfdf");
					window.scrollTo({
						behavior: "smooth",
						top:
							target.getBoundingClientRect().top -
							document.body.getBoundingClientRect().top -
							115,
					});
				} else {
					target.scrollIntoView({
						behavior: "smooth",
						block: "center",
					});
				}
			}, 200);
		}
	});

	//Erstes Item bei Laden der Seite geöffnet
	$(".accordeon")
		.not(".accordeon--closed")
		.find(".accordeon__item")
		.first()
		.addClass("accordeon__item--opened");
	$(".accordeon")
		.not(".accordeon--closed")
		.find(".accordeon__item")
		.first()
		.find(".accordeon__content")
		.show();

	// Breadcrum - Letztes Element in view scrollen
	// document.querySelectorAll('.woocommerce-breadcrumb a:last-of-type')[-0].scrollIntoView()

	const termDescription = $(".term-description");
	if (termDescription) {
		termDescription.addClass("--hide-text");
		termDescription.append('<a class="show-more">Mehr lesen</a>');
		termDescription.find(".show-more").click(() => {
			termDescription.removeClass("--hide-text");
		});
	}

	// Cart
	if ($(".cart").length > 0 || $(".checkout").length > 0) {
		scrollOffset = 265;
	}
	//Warenkorb Neu laden bei Gutscheincode anpassungen
	jQuery(document.body).on(
		"applied_coupon_in_checkout removed_coupon_in_checkout",
		function () {
			location.reload();
		}
	);

	//Input Border Farbe bei Füllung färben
	$("input, textarea").each(function () {
		if ($(this).val() !== "") {
			$(this).addClass("input--filled");
			$(this).parents(".form-row").addClass("form-row--filled");
		}
	});
	$("input, textarea").on("keyup change", function () {
		if ($(this).val() !== "") {
			$(this).addClass("input--filled");
			$(this).parents(".form-row").addClass("form-row--filled");
		} else {
			$(this).removeClass("input--filled");
			$(this).parents(".form-row").removeClass("form-row--filled");
		}
	});

	// Formular anpassen
	$("<div class='checkmark'></div>").insertAfter(
		'.standard-formular input[type="checkbox"]'
	);
	$("input.half").each(function () {
		$(this).parent().addClass("half");
	});

	// Kontaktformular: Lebel rot bei falscher eingabe
	waitForElementToDisplay(
		".wpcf7-not-valid-tip",
		function () {
			$(".wpcf7-not-valid-tip")
				.parent()
				.parent()
				.find(".labeltext")
				.css("color", "rgb(218, 15, 15)");
		},
		10,
		9000
	);

	function waitForElementToDisplay(
		selector,
		callback,
		checkFrequencyInMs,
		timeoutInMs
	) {
		var startTimeInMs = Date.now();
		(function loopSearch() {
			if (document.querySelector(selector) != null) {
				callback();
				return;
			} else {
				setTimeout(function () {
					if (timeoutInMs && Date.now() - startTimeInMs > timeoutInMs)
						return;
					loopSearch();
				}, checkFrequencyInMs);
			}
		})();
	}

	if (document.querySelector(".kasse")) {
		const noticesWrapper = document.querySelector(
			".woocommerce-notices-wrapper"
		);

		// create a new instance of 'MutationObserver' named 'observer',
		// passing it a callback function
		observer = new MutationObserver(function (mutationsList, observer) {
			$(".left .container").prepend(noticesWrapper);
		});

		// call 'observe' on that MutationObserver instance,
		// passing it the element to observe, and the options object
		observer.observe(noticesWrapper, {
			characterData: false,
			childList: true,
			attributes: false,
		});
	}

	$("input, textarea, select").on("keyup change", function () {
		$(this).parent("p").removeClass("--error");
	});

	//Do the First state
	tabName = $(".tab__link.--active").attr("data-tabID");
	$(".tab__content").hide();
	$(".tab__content#" + tabName).show();

	//Tab Control Function
	$(".tab__link").click(function () {
		tabName = $(this).attr("data-tabID");
		//Hide the Actives
		$(".tab__content").hide();
		$(".tab__link").removeClass("--active");
		//Show the Selected
		$(this).addClass("--active");
		$(".tab__content#" + tabName).show();
	});

	selectedName = $(".swatch.selected")
		.parent()
		.find(".swatch__tooltip")
		.text();
	$(".variations .label label").append("<span></span>");
	updateVariationTooltip();

	function updateVariationTooltip() {
		setTimeout(function () {
			$(".variations .label span").html("");
			$(".swatch.selected").each(function () {
				selectedName = $(this).parent().find(".swatch__tooltip").text();
				$(".variations .label span").html(selectedName);
			});
		}, 50);
	}

	$(".reset_variations").on("click", updateVariationTooltip);
	$(".swatch").on("click", updateVariationTooltip);

	// Background Dark Image
	const darkBackgrounds = document.querySelectorAll(".background--dark");
	darkBackgrounds.forEach((element) => {
		const backgroundElement = document.createElement("img");
		backgroundElement.classList.add("background__image");
		backgroundElement.src =
			"https://atelier-delatron.de/wp-content/themes/atelier_theme/assets/img/website/background_dark_image.jpg";
		element.append(backgroundElement);
	});

	// Mobile Message swipe up
	let touchstartY = 0;
	let touchendY = 0;
	function handleGesture(item) {
		if (touchendY < touchstartY) {
			// Swipe Up
			item.classList.add("--swipe-up");
		}
		if (touchendY > touchstartY) {
			// Swipe Down
		}
	}
	document
		.querySelectorAll(".woocommerce-message, .woocommerce-error")
		.forEach((item) => {
			item.addEventListener("touchstart", (e) => {
				touchstartY = e.changedTouches[0].screenY;
			});

			item.addEventListener("touchend", (e) => {
				touchendY = e.changedTouches[0].screenY;
				handleGesture(item);
			});

			item.addEventListener("touchmove", (e) => {
				e.preventDefault();
			});
		});

	$(".related").append('<div class="slider__controls"></div>');

	//slider
	$(".slider, .related .products").each(function () {
		const controls = $(this).next(".slider__controls");
		controls.append('<div class="slider__arrows"></div>');
		$(this).slick({
			autoplay: false,
			speed: 500,
			slidesToShow: 3,
			slidesToScroll: 1,
			swipeToSlide: true,
			variableWidth: true,
			infinite: false,
			// lazyLoad: 'progressive',
			lazyLoad: "ondemand",
			waitForAnimate: true,

			arrows: true,
			appendArrows: controls.find(".slider__arrows"),
			dots: true,
			appendDots: controls,

			draggable: true,
			touchMove: true,
			touchThreshold: 180,

			responsive: [
				{
					breakpoint: 850,
					settings: {
						slidesToShow: 2,
					},
				},
				{
					breakpoint: 520,
					settings: {
						touchThreshold: 250,
						slidesToShow: 1,
					},
					// settings: "unslick"
				},
			],
		});
	});

	$(".woocommerce-product-gallery").each(function () {
		// Add required DOM Structure
		// $(this).append('<div class="slider__controls"></div>')
		// $(this).find('.slider__controls').append('<div class="slider__arrows"></div>')

		// Init slider
		$(this)
			.find(".woocommerce-product-gallery__wrapper")
			.slick({
				autoplay: false,
				speed: 200,
				slidesToShow: 1,
				slidesToScroll: 1,
				draggable: true,
				mobileFirst: true,

				arrows: false,
				// arrows: true,
				// appendArrows: $(this).find('.slider__arrows'),
				dots: true,
				// appendDots: $(this).find('.slider__controls'),

				responsive: [
					{
						breakpoint: 768,
						settings: "unslick",
					},
				],
			});
	});

	if (document.querySelector("tr.subtotal")) {
		$("tr.subtotal").prev("tr").addClass("pre__subtotal");
	}

	if (document.querySelector(".checkout_coupon")) {
		setTimeout(function () {
			document.querySelector(".checkout_coupon").style.display = "block";
		}, 1000);
	}

	// Open popups
	const popupButtons = document.querySelectorAll("a.--open__popup");
	const popupButtonsSpan = document.querySelectorAll("a.--open__popup span");
	popupButtons.forEach((button) => {
		button.addEventListener("click", (e) => {
			disableScroll();
			e.preventDefault();
			const popup = e.target.dataset.popup;
			document
				.querySelector(".popup.--" + popup)
				.classList.remove("--hidden");
		});
	});
	popupButtonsSpan.forEach((button) => {
		button.addEventListener("click", (e) => {
			disableScroll();
			e.preventDefault();
			const popup = e.target.parentElement.dataset.popup;
			document
				.querySelector(".popup.--" + popup)
				.classList.remove("--hidden");
		});
	});

	// Close popups
	const popupCloseButtons = document.querySelectorAll(".popup .popup__close");
	const popupCloseButtonsImg = document.querySelectorAll(
		".popup .popup__close img"
	);
	popupCloseButtons.forEach((button) => {
		button.addEventListener("click", (e) => {
			enableScroll();
			e.target.parentElement.parentElement.classList.add("--hidden");
		});
	});
	popupCloseButtonsImg.forEach((button) => {
		button.addEventListener("click", (e) => {
			enableScroll();
			e.target.parentElement.parentElement.parentElement.classList.add(
				"--hidden"
			);
		});
	});

	// Erweitere die Click-Box input zum li Container
	document
		.querySelectorAll(".woocommerce-shipping-methods li")
		.forEach((element) => {
			element.addEventListener("click", (e) => {
				// console.log('click', e.currentTarget)
				e.currentTarget.querySelector("input").checked = true;
				jQuery("body").trigger("update_checkout");

				const label =
					e.currentTarget.querySelector("label").childNodes[0]
						.nodeValue;
				$(".shipping__total .label").text(label);

				let amount = undefined;
				if (e.currentTarget.querySelector(".amount")) {
					amount =
						e.currentTarget.querySelector(".amount bdi")
							.childNodes[0].nodeValue +
						'<span class="woocommerce-Price-currencySymbol">€</span>';
				}
				if (amount === undefined) {
					amount = "Kostenlos!";
				}
				document.querySelector(".shipping__total .totals").innerHTML =
					amount;

				// Gesamtsumme ausrechen und anzeigen
				let subtotalEl = document.querySelector(".subtotal bdi");
				if (!subtotalEl)
					subtotalEl = document.querySelector(".cart-subtotal bdi");
				const subtotal = parseFloat(
					subtotalEl.childNodes[0].nodeValue.replace(",", ".")
				);
				const shipping = parseFloat(amount.replace(",", "."));
				let total;
				if (isNaN(shipping)) {
					total = subtotal;
				} else {
					console.log(shipping);
					total = subtotal + shipping;
				}
				total = `${total}`.substring(0, 5).replace(".", ",");
				document.querySelector(
					".order-total bdi"
				).innerHTML = `${total}<span class="woocommerce-Price-currencySymbol">€</span>`;

				newElement = null;
				newElement = document.createElement("div");
				newElement.classList.add("shop_table__icon");
				newElement.classList.add("shop_table__icon--shipping");
				document
					.querySelector(".shipping__total th")
					.prepend(newElement);
			});
		});

	let newElement;

	document.querySelectorAll(".cart-discount").forEach((element) => {
		newElement = document.createElement("div");
		newElement.classList.add("shop_table__icon");
		newElement.classList.add("shop_table__icon--discount");
		element.querySelector("th").prepend(newElement);
	});

	document
		.querySelectorAll(".woocommerce-remove-coupon")
		.forEach((element) => {
			element.innerHTML =
				'<div class="icon--remove-coupon" title="Gutschein entfernen"></div>';
		});

	newElement = null;
	newElement = document.createElement("div");
	newElement.classList.add("shop_table__icon");
	newElement.classList.add("shop_table__icon--shipping");
	if (document.querySelector(".shipping__total th")) {
		document.querySelector(".shipping__total th").prepend(newElement);
	}
});


jQuery(document).ready(function ($) {
	const bookingReminder = $('.booking-reminder')
	const urlParams = new URLSearchParams(window.location.search)
	const bookUncompleted = urlParams.get('book_uncompleted') || Cookies.get('book_uncompleted')
	const bookTitle = urlParams.get('book_title') || Cookies.get('book_title')
	const bookColor = urlParams.get('book_color') || Cookies.get('book_color')

	console.log('bookTitle', bookTitle)

	if (bookUncompleted === 'true') {
		document.documentElement.style.setProperty('--book-color', bookColor)
		bookingReminder.find('.booking-reminder__text p').text(bookTitle)
		bookingReminder.removeClass('--hidden')

		Cookies.set('book_uncompleted', 'true', { expires: 1 })
		Cookies.set('book_title', bookTitle, { expires: 1 })
		Cookies.set('book_color', bookColor, { expires: 1 })
	}

	bookingReminder.hover(
		function () {
			$(this).removeClass('--closed')
			$(this).find('.booking-reminder__text').animate(
				{
					width: 'toggle',
					opacity: 1,
					'padding-left': '14px',
				},
				200,
				'swing'
			)
		},
		function () {
			$(this).addClass('--closed')
			$(this).find('.booking-reminder__text').animate(
				{
					width: 'toggle',
					opacity: 0,
					'padding-left': '0px',
				},
				200,
				'swing'
			)
		}
	)
})

jQuery(document).ready(function ($) {
	// Product Filter
	const productsFilter = document.querySelector('.products__filter')

	if (productsFilter) {
		const buttonOne = productsFilter.querySelector('.--child')
		const buttonTwo = productsFilter.querySelector('.--adult')
		const resetButton = document.querySelector('.filter__reset')
		const productsOne = document.querySelectorAll('.product__item.--child')
		const productsTwo = document.querySelectorAll('.product__item.--adult')
		let currentFilter

		// Erhält den aktuellen Filter aus der URL
		function getFilterParams() {
			const urlParams = new URLSearchParams(window.location.search)
			let filter = urlParams.get('filter')

			if (filter === '') filter = undefined

			return filter
		}

		function setFilterParams(filter) {
			// set url param filter
			const urlParams = new URLSearchParams(window.location.search)
			urlParams.set('filter', filter)
			window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`)
		}

		// Setzt den Filter
		function setFilter(filter) {
			if (filter === undefined) {
				currentFilter = undefined

				productsOne.forEach((product) => {
					product.style.display = 'flex'
				})
				productsTwo.forEach((product) => {
					product.style.display = 'flex'
				})

				buttonOne.classList.remove('--active')
				buttonTwo.classList.remove('--active')
				resetButton.classList.add('--hidden')
			}
			if (filter === 'child') {
				currentFilter = 'child'

				productsOne.forEach((product) => {
					product.style.display = 'flex'
				})
				productsTwo.forEach((product) => {
					product.style.display = 'none'
				})

				buttonOne.classList.add('--active')
				buttonTwo.classList.remove('--active')
				resetButton.classList.remove('--hidden')
			}
			if (filter === 'adult') {
				currentFilter = 'adult'

				productsOne.forEach((product) => {
					product.style.display = 'none'
				})
				productsTwo.forEach((product) => {
					product.style.display = 'flex'
				})

				buttonOne.classList.remove('--active')
				buttonTwo.classList.add('--active')
				resetButton.classList.remove('--hidden')
			}

			setFilterParams(filter)
		}

		// Setzte den Filter beim Laden der Seite
		setFilter(getFilterParams())

		// Button Event Listener
		buttonOne.addEventListener('click', () => {
			if (currentFilter === 'child') {
				setFilter(undefined)
			} else {
				setFilter('child')
			}
		})
		buttonTwo.addEventListener('click', () => {
			if (currentFilter === 'adult') {
				setFilter(undefined)
			} else {
				setFilter('adult')
			}
		})
		resetButton.addEventListener('click', () => setFilter(undefined))

		// Filter Buttons im Archive Hero Banner
		const filterButtonChild = document.querySelector('.button--filter.--child')
		const filterButtonAdult = document.querySelector('.button--filter.--adult')

		filterButtonChild.addEventListener('click', () => {
			setFilter('child')
		})
		filterButtonAdult.addEventListener('click', () => {
			setFilter('adult')
		})
	}
})

jQuery( document ).ready(function($) {

    // Set a Cookie
    function setCookie(cName, cValue, expDays) {
        let date = new Date();
        date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
    }

    function getCookie(cName) {
        const name = cName + "=";
        const cDecoded = decodeURIComponent(document.cookie); //to be careful
        const cArr = cDecoded .split('; ');
        let res;
        cArr.forEach(val => {
            if (val.indexOf(name) === 0) res = val.substring(name.length);
        })
        return res;
    }


    const newsletterIsOnPage = document.querySelectorAll(".newsletter__field").length > 0
    if( newsletterIsOnPage ) {

        document.querySelector('.newsletter__image').addEventListener("click", () => {
            document.querySelector('.popup--newsletter').showModal()
        })

        const popupNewsletter = document.querySelector(".popup--newsletter")
        if(popupNewsletter) {
            setTimeout(function() {
                if(getCookie("newsletter_opened") != "true") {
                    popupNewsletter.showModal()
                }
            }, 1000*5)
            popupNewsletter.addEventListener('close', () => {
                console.log('close')
                setCookie('newsletter_opened', true, 14);
            })
        }
        




        
        const newsletterEmailButton = document.querySelector(".newsletter-form .button")
        if( newsletterEmailButton ) {
            newsletterEmailButton.addEventListener("click", () => {
                const emailValue = document.getElementById("sib-email").value
                newsletterEmailButton.href = newsletterEmailButton.href + "?email=" + emailValue
                // sessionStorage.setItem("newsletter_email", emailValue)
            })
        }
    
        // document.querySelector("input.sib-email-area").value = sessionStorage.getItem("newsletter_email")
        // transfereEmail = document.getElementById("transfered__email").innerText
        // document.querySelector("input.sib-email-area").value = transfereEmail
    
    
    
        function waitForElm(selector) {
            return new Promise(resolve => {
                if (document.querySelector(selector) !== null) {
                    return resolve(document.querySelector(selector));
                }
        
                const observer = new MutationObserver(mutations => {
                    if (document.querySelector(selector) !== null) {
                        resolve(document.querySelector(selector));
                        observer.disconnect();
                    }
                });
        
                observer.observe(document.body, {
                    childList: true,
                    subtree: true
                });
            });
        }
    
        waitForElm('.sib-alert-message-success').then((elm) => {
            document.querySelector(".newsletter__content").style.display = "none"
            document.querySelector(".newsletter__success").style.display = "flex"
        });
    
    
    
    

    



        // function setWithExpiry(key, value, ttl) {
        //     const now = new Date()
    
        //     // `item` is an object which contains the original value
        //     // as well as the time when it's supposed to expire
        //     const item = {
        //         value: value,
        //         expiry: now.getTime() + ttl,
        //     }
        //     localStorage.setItem(key, JSON.stringify(item))
        // }

        // function getWithExpiry(key) {
        //     const itemStr = localStorage.getItem(key)
        //     // if the item doesn't exist, return null
        //     if (!itemStr) {
        //         return null
        //     }
        //     const item = JSON.parse(itemStr)
        //     const now = new Date()
        //     // compare the expiry time of the item with the current time
        //     if (now.getTime() > item.expiry) {
        //         // If the item is expired, delete the item from storage
        //         // and return null
        //         localStorage.removeItem(key)
        //         return null
        //     }
        //     return item.value
        // }

        // function closeNewsletterPopup() {
        //     document.querySelector(".newsletter__popup").close()
        //     setWithExpiry("newsletter_opened", "true", 1000*60*60*24)
        // }
        // $(".newsletter__content input[type='submit']").click(function() {
        //     closeNewsletterPopup();
        // })
        // $(".newsletter__popup input[type='submit']").click(function() {
        //     closeNewsletterPopup();
        // })

    }

})
jQuery(document).ready(function ($) {
	const contactBanner = document.querySelector('.kontakt__banner')
	if (contactBanner) {
		let currentActive
		var hasScrolled = false
		const tabButtons = contactBanner.querySelectorAll('.methods__item')
		const tabContents = document.querySelectorAll('.methods__content')

		tabButtons.forEach((button) => {
			button.addEventListener('click', (e) => {
				openTab(e.target.dataset.index)
			})
		})

		function openTab(index) {
			// Hide Elements for no Selection
			tabButtons.forEach((button) => {
				button.classList.remove('--arrows')
			})
			document.querySelector('.form__dummy').style.display = 'none'

			// Highlight current Tab
			const activeTab = tabButtons[index]
			if (activeTab.dataset.index != currentActive) {
				tabButtons.forEach((button) => {
					button.classList.remove('--active')
				})
				activeTab.classList.add('--active')
			}
			currentActive = index

			// Show current Tab Content
			tabContents.forEach((content) => {
				content.classList.add('--hidden')
				if (content.dataset.index == currentActive) {
					content.classList.remove('--hidden')
				}
			})

			if (!hasScrolled) {
				document.querySelector('.kontakt__forms').scrollIntoView({ behavior: 'smooth', block: 'center' })
				hasScrolled = true
			}
		}

		if (window.location.hash) {
			var hash = window.location.hash // = "#login"
			hash = hash.substring(1)
			console.log(document.querySelector('.kontakt__methods'))
			tabButtons.forEach((button) => {
				if (button.dataset.hash === hash) {
					button.classList.add('--active')
					openTab(button.dataset.index)
				}
			})
		}
	}

	// Schnuppertermin Formular

	const variableFormConditionFieldClass = '.condition__field'
	const variableFormToggleFieldClass = '.toggle__field'

	function variableForm(form, condition) {
		let toggleFieldsIsVisible = false
		const toggleFields = form.querySelectorAll(variableFormToggleFieldClass)
		if (toggleFields.length > 0) {
			toggleFields.forEach((field) => {
				field.style.display = 'none'
			})

			const textarea = document.querySelector("label[for='nachricht']")

			const conditionField = form.querySelector(variableFormConditionFieldClass)
			if (conditionField !== null) {
				const SplitLeftFieldsCount = form.querySelectorAll('.form__split:first-child label').length
				const SplitLeftConstantFieldsCount =
					SplitLeftFieldsCount -
					form.querySelectorAll('.form__split:first-child ' + variableFormToggleFieldClass).length

				conditionField.querySelector('select').addEventListener('change', (e) => {
					const conditionFieldValue = e.target.options[e.target.selectedIndex].value
					if (conditionFieldValue.includes(condition)) {
						if (toggleFieldsIsVisible === false) {
							toggleFields.forEach((field) => {
								field.querySelector('input').value = ''
								field.style.display = 'block'
							})
							textarea.classList.remove('height--' + SplitLeftConstantFieldsCount)
							textarea.classList.add('height--' + SplitLeftFieldsCount)
						}
						toggleFieldsIsVisible = true
					} else {
						if (toggleFieldsIsVisible === true) {
							toggleFields.forEach((field) => {
								field.style.display = 'none'
								field.querySelector('input').value = '-'
							})
							textarea.classList.add('height--' + SplitLeftConstantFieldsCount)
							textarea.classList.remove('height--' + SplitLeftFieldsCount)
						}
						toggleFieldsIsVisible = false
					}
				})
			} else {
				throw new Error(
					'Es wurde keine Select-Feld mit der Klasse "' +
						variableFormConditionFieldClass +
						'" definiert. Bei diesem Feld wird die Bedingung "' +
						condition +
						'" abgefragt.'
				)
			}
		} else {
			throw new Error(
				'Es wurde keine Input-Feld mit der Klasse "' +
					variableFormToggleFieldClass +
					'" definiert. Diese Felder werden angezeigt/versteckt, wenn die Bedingung "' +
					condition +
					'" passt/nicht passt.'
			)
		}
	}

	const schnupperForm = document.querySelector('.schnuppertermin')
	if (schnupperForm) {
		variableForm(schnupperForm, 'Kinder')
	}
})

jQuery(document).ready(function ($) {
	console.log('script: archive.js')
})

function sibSendEmail(event, customer, content) {

    if( customer["name"] ) {
        const fullname = customer["name"]
        const splitName = fullname.split(" ")
        customer["firstname"] = splitName[0]
        customer["lastname"] = ""
        splitName.forEach((part, index) => {
            if( index >= 1) {
                customer["lastname"] = customer["lastname"] + " " + part
            }
        })
    }

    sendinblue.identify( customer["email"],
        {
            'VORNAME' : customer["firstname"],
            'NACHNAME' : customer["lastname"],
            'TELEFON' : customer["phone"],
        }
    )

    content["email"] = customer["email"]
    setTimeout(function() {
        sendinblue.track( event,
            {
                "email_id" : customer["email"]
            },
            content
        )
    }, 20)

    return true
}



jQuery( document ).ready(function($) {

    const sibConfigs = document.querySelectorAll(".sib-config")
    let sibForms = []
    sibConfigs.forEach(config => {
        sibForms.push(config.parentElement)
    })
    sibForms.forEach(form => {
        const sibConfig = form.querySelector(".sib-config")
        const formFields = form.querySelectorAll("input, select, textarea")
        const sibFields = []
        formFields.forEach(field => {
            if( field.id.includes("sib-") ) {
                sibFields.push(field)
            }
        })

        const submitButton = form.querySelector(".wpcf7-submit")
        let sibEvent = null
        let sibCustomer = {}
        let sibValues = {
            "data" : {}
        }
        submitButton.addEventListener("click", (e) => {
            sibEvent = sibConfig.dataset.sibEvent   

            formFields.forEach(field => {
                let fieldID = field.id
                if( fieldID.includes("sib-c-") ) {
                    fieldID = fieldID.replace('sib-c-', '');
                    const fieldValue = field.value
                    sibCustomer[fieldID] = fieldValue;
                }
            })

            formFields.forEach(field => {
                let fieldID = field.id
                if( fieldID.includes("sib-v-") ) {
                    fieldID = fieldID.replace('sib-v-', '');
                    const fieldValue = field.value
                    sibValues["data"][fieldID] = fieldValue;
                }
            })
        })

        const formSubmitObserver = new MutationObserver(entries => {
            console.log(sibEvent)
            console.log(sibCustomer)
            console.log(sibValues)
            if( entries[0].target.innerText === "Vielen Dank für deine Nachricht. Sie wurde gesendet." ) {
                console.log("Formular abgesendet.")
                sibSendEmail(sibEvent, sibCustomer, sibValues)
            }
        })
        formSubmitObserver.observe(form.querySelector(".wpcf7-response-output"), { childList: true })
    
    })

})
jQuery( document ).ready(function($) {


    class Gallery {

        constructor(galleryElement) {
            this.galleryElement = galleryElement

            this.lightboxImages = this.galleryElement.querySelectorAll(".lightbox__image")
            this.imageData = []
    
            this.galleryIndex = 0
            this.popupIsOpened = false
    
            this.popupElement = this.galleryElement.querySelector(".gallery__popup")
            this.popupBackground = this.popupElement.querySelector(".popup__background")
            this.popupImage = this.popupElement.querySelector(".popup__image .image__img")
            this.imageMetaTitle = this.popupElement.querySelector(".meta__text h5")
            this.imageMetaCaption = this.popupElement.querySelector(".meta__text h6")
    
            this.thumbnailImages
    
            this.prevButton = this.popupElement.querySelector(".button__prev")
            this.nextButton = this.popupElement.querySelector(".button__next")

            this.setLightboxData()
            this.createEventHandlers()
        }

        





        // Bilder in Array Speichern
        setLightboxData() {
            this.lightboxImages.forEach((image, index) => {
                const data = {}
                data["src"] = image.dataset.lightboxSrc
                data["title"] = image.dataset.title
                data["caption"] = image.dataset.caption
                this.imageData.push(data)
                image.dataset.index = index
            });
            console.log(this.imageData)
        }


        // Event Listener
        createEventHandlers() {
            this.prevButton.addEventListener("click", () => this.move(-1) )
            this.nextButton.addEventListener("click", () => this.move(1) )
            this.lightboxImages.forEach(image => {
                image.addEventListener("click", (e) => {
                    // console.log(e.target)
                    // if( e.target.parentElement.classList.contains("swiper-slide-active") ) {
                        this.showImage(e) 
                    // }
                })
            })
            this.popupBackground.addEventListener("click", () => this.closePopup())
        }


        //Popup öffnen
        showImage(event) {
            this.updateImage(parseInt(event.target.dataset.index))
            if(this.popupIsOpened === false) {
                this.popupElement.classList.add("--opened")
                this.popupIsOpened = true
            }
        }


        //Popup schließen
        closePopup() {
            this.popupElement.classList.remove("--opened")
            this.popupIsOpened = false
        }


        // Bild vor/zurück
        move(moveIndex) {
            this.galleryIndex = this.galleryIndex + moveIndex
            if(this.galleryIndex > (this.imageData.length - 1)) {
                this.galleryIndex = 0;
            } else if(this.galleryIndex < 0) {
                this.galleryIndex = this.imageData.length - 1
            }
            this.updateImage(this.galleryIndex)
        }


        // Hauptbild aktualisieren
        updateImage(index) {
            this.popupImage.src = this.imageData[index]["src"]
            this.imageMetaTitle.innerText = this.imageData[index]["title"]
            this.imageMetaCaption.innerText = this.imageData[index]["caption"]
            this.galleryIndex = index
            // imageIndicator.innerHTML = `${(parseInt(index) + 1)} / ${images.length}`
            //toggleActive(index)
        }

    }


    // const lightboxElement = document.querySelector(".lightbox")
    // const gallery1 = new Gallery(lightboxElement)


    const galleryAusstellungBlocks = document.querySelectorAll(".galerie__ausstellung")
    if( galleryAusstellungBlocks.length > 0 ) {
        galleryAusstellungBlocks.forEach(block => {
            const gallery = new Gallery(block)
        })
    }








    function initGallery(element) {

    //     const lightboxImages = element.querySelectorAll(".lightbox__image")
    //     // const currentLighboxImage = element.querySelector(".swiper-slide-active .lightbox__image")
    //     let imageData = []

    //     let galleryIndex = 0
    //     let popupIsOpened = false

    //     // const thumbnailContainer = document.querySelector(".gallery__thumbnails")
    //     const popupElement = document.querySelector(".gallery__popup")
    //     const popupBackground = document.querySelector(".popup__background")
    //     const popupImage = document.querySelector(".popup__image .image__img")
    //     const imageMetaTitle = popupElement.querySelector(".meta__text h5")
    //     const imageMetaCaption = popupElement.querySelector(".meta__text h6")

    //     let thumbnailImages

    //     const prevButton = popupElement.querySelector(".button__prev")
    //     const nextButton = popupElement.querySelector(".button__next")
    //     // const imageIndicator = document.querySelector(".gallery__indicator")

    //     // createImages()
    //     setLightboxData()
    //     createEventHandlers()





    //     // Bilder in Array Speichern
    //     function setLightboxData() {
    //         lightboxImages.forEach((image, index) => {
    //             const data = {}
    //             data["src"] = image.dataset.src
    //             data["title"] = image.dataset.title
    //             data["caption"] = image.dataset.caption
    //             imageData.push(data)
    //             image.dataset.index = index
    //         });
    //         console.log(imageData)
    //     }


    //     // Event Listener
    //     function createEventHandlers() {
    //         prevButton.addEventListener("click", () => move(-1) )
    //         nextButton.addEventListener("click", () => move(1) )
    //         lightboxImages.forEach(image => {
    //             image.addEventListener("click", (e) => showImage(e) )
    //         })
    //         // currentLighboxImage.addEventListener("click", (e) => {
    //         //     e.target.dataset.index
    //         // })
    //         popupBackground.addEventListener("click", () => closePopup())
    //     }


    //     //Popup öffnen
    //     function showImage(event) {
    //         updateImage(parseInt(event.target.dataset.index))
    //         if(popupIsOpened === false) {
    //             popupElement.classList.add("--opened")
    //             popupIsOpened = true
    //         }
    //     }


    //     //Popup schließen
    //     function closePopup() {
    //         popupElement.classList.remove("--opened")
    //         popupIsOpened = false
    //     }


    //     // Bild vor/zurück
    //     function move(moveIndex) {
    //         galleryIndex = galleryIndex + moveIndex
    //         if(galleryIndex > (imageData.length - 1)) {
    //             galleryIndex = 0;
    //         } else if(galleryIndex < 0) {
    //             galleryIndex = imageData.length - 1
    //         }
    //         updateImage(galleryIndex)
    //     }


    //     // Hauptbild aktualisieren
    //     function updateImage(index) {
    //         popupImage.src = imageData[index]["src"]
    //         imageMetaTitle.innerText = imageData[index]["title"]
    //         imageMetaCaption.innerText = imageData[index]["caption"]
    //         galleryIndex = index
    //         // imageIndicator.innerHTML = `${(parseInt(index) + 1)} / ${images.length}`
    //         //toggleActive(index)
    //     }

    // }

    }


})
//# sourceMappingURL=main.js.map