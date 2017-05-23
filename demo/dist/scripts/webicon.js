!function(n,t){"use strict";function e(n){function t(n,o){var r,c;if(!o){if(!e[n])throw r=new Error('Cannot found service provider "'+n+'"'),console.error(r),r;if(!i.hasOwnProperty(n))try{i[n]=new e[n](t)}catch(r){throw console.error(r),r}return i[n]}if(i.hasOwnProperty(n))throw r=new Error('Cannot override instantiated service "'+n+'"'),console.error(r),r;if("function"!=typeof o)return void console.error('Provider "'+n+'" is not a function');e.hasOwnProperty(n)?(c=e[n],e[n]=function(n){return new o(n,new c(n))}):e[n]=o}var e={},i={};return Object.keys(o.providers).forEach(function(n){e[n]=o.providers[n]}),t.has=function(n){return e.hasOwnProperty(n)},t("ready",function(n){return function(t){"function"==typeof t?t(n):t&&console.error("Ready listener not a function")}}),n&&("function"==typeof n?n(t):console.error("Injector initializer not a function")),(r.listeners||[]).forEach(function(n){n(t)}),t}function o(n,t){var e,r;if(r=o.providers=o.providers||{},"function"!=typeof t)return void console.error('Provider "'+n+'" is not a function');r.hasOwnProperty(n)?(e=r[n],r[n]=function(n){return new t(n,new e(n))}):r[n]=t}function r(n){var t;t=r.listeners=r.listeners||[],"function"==typeof n?t.push(n):n&&console.error("Ready listener not a function")}function i(n,t){var e,o,r=n("publicApi"),i=n("iconManager"),c={ios8:["ios7","i7","i8","ios9","i9"],win8:["w8","windows8","windows-8","metro","windows-metro"],android:["android-kitkat","kitkat","ak"],androidL:["android-lollipop","android-l","lollipop","al"],color:["flat_color","c","colored"],win10:["w10","windows10","windows-10"]};e={},Object.keys(c).forEach(function(n){e[n.toLowerCase()]=n,c[n].forEach(function(t){e[t]=n})}),i.setDefaultIconSet("icons8").addSvgIconSet("icons8",function(n){var e={url:t.api.url,params:{}};return n&&(Array.isArray(n)||(n=[n]),e.params.icons=n.join(",")),o&&(e.params.token=o),e},{cumulative:!0,iconIdParser:function(n,t){var o;for(n=String(n||""),Array.isArray(t)||(t=[]),t=t.map(function(n){return String(n).toLowerCase()}),o=0;o<t.length;o++)if(e.hasOwnProperty(t[o]))return[e[t[o]],n].join("-");return[e.c,n].join("-")}}),r.icons8Token=function(n){o=n},n.has("configPerformer")&&n("configPerformer").strategy(function(n){void 0!==n.icons8Token&&r.icons8Token(n.icons8Token)})}function c(n,t){function e(n,t){var e;switch(n){case"maki":e=o(s,{iconIdResolver:c});break;case"material-design-icons":e=o(s,{iconIdResolver:i});break;default:e=o(s)}u.addSvgIconSet(n,t,e)}function o(){var n={};return Array.prototype.slice.call(arguments).forEach(function(t){t&&Object.keys(t).forEach(function(e){n[e]=t[e]})}),n}var r,i,c,s,a,u=n("iconManager");r=function(n){return String(n||"").replace(/_/g,"-")},i=function(n){return r(n).replace(/^ic-/,"").replace(/-\d+px$/,"")},c=function(n){return r(n).replace(/-\d+$/,"")},s={iconIdResolver:r,iconIdParser:r,preloadable:!1},a=t.svgSets,a.libs.forEach(function(n){var t,o;"object"==typeof n?(t=n.lib,o=n.filename||(n.name||t)+".svg",n=n.name||t):(t=n,o=n+".svg"),e(n,[a.url,t,o].join("/"))}),Object.keys(t.libs||{}).forEach(function(n){e(n,t.libs[n])}),Object.keys(t.aliases||{}).forEach(function(n){u.addIconSetAlias(t.aliases[n],n)})}function s(n){r(n)}o("ScopeCollection",function(n){function t(){this.collection=[]}return t.prototype={add:function(t){var e=n("SvgCumulativeIconSetScope"),o=n("FontIconSetScope");t instanceof e||t instanceof o?this.collection.push(t):this.collection.unshift(t)},preload:function(t){var e=n("Promise"),o=[];return this.collection.forEach(function(n){var e;(e=n.preload(t))&&"object"==typeof e&&"function"==typeof e.then&&o.push(e)}),o.length>0?e.all(o.map(function(n){return n.then(null,function(){return null})})).then(function(){return null}):null},getIconScope:function(t,e){var o,r=n("Promise"),i=(n("SvgCumulativeIconSetScope"),this.collection);return o=r.all(i.map(function(n){return r.resolve(n.hasIcon(t,e)).then(function(t){return!!t&&n},function(){return!1})})),o.then(function(n){var t;for(t=0;t<n.length;t++)if(n[t])return n[t];return r.reject()})},getIcon:function(n,t){return this.getIconScope(n,t).then(function(e){return e.getIcon(n,t)})}},t}),o("SvgIconSet",function(n){function t(t,e){var o,r,i,c,s,a,u,l=n("log"),f=n("parseSvgOptions"),h=n("SvgIcon"),p=n("nodeWrapper");a="function"==typeof e.iconIdResolver?e.iconIdResolver:function(n){return n},u=f(e),this.icons={},s=u.viewBox||t[0].getAttribute("viewBox"),c=u.iconSize;try{for(r=t[0].querySelectorAll("[id]"),o=0;o<r.length;o++)i=r[o],this.icons[a(i.getAttribute("id"))]=new h(p(i.cloneNode(!0)),{iconSize:c,viewBox:s})}catch(n){l.warn(n)}this.iconSize=c,this.viewBox=s,this.iconIdResolver=a}return t.loadByUrl=function(e,o){return n("loadSvgByUrl")(e).then(function(n){return new t(n,o)})},t.prototype={notExists:function(n){var t=this.icons;return n.filter(function(n){return!t.hasOwnProperty(n)})},exists:function(n){return this.icons.hasOwnProperty(n)},getIconById:function(n){return this.icons.hasOwnProperty(n)?this.icons[n]:null},merge:function(n){var t=this,e=n.icons;return Object.keys(e).forEach(function(n){t.icons[n]=e[n]}),this},mergeByUrl:function(n,e){var o=this;return t.loadByUrl(n,e).then(function(n){return o.merge(n)})}},t}),o("iconManager",function(n){function t(){this._collections={},this._defaultCollectionId=null,this._defaultSvgIconSize=i}function e(t,e){var o=n("log"),r=n("Promise"),i='icon "'+t+'" not found';return e&&(i+=' in "'+e+'" icon set'),o.warn(i),r.reject(i)}function o(n,t){return function(){return e(n,t)}}var r=/[-a-zA-Z0-9@:%_\+.~#?&\/\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)?/i,i=24;return t.prototype={addIcon:function(n,t,e){function o(n){return n.split("?")[0].split(/[\/\\]/).slice(-1)[0].split(".").slice(-1)[0].toLowerCase()}var r,i=t;return"object"==typeof t&&(i=t.url),r=o("function"==typeof i?i():i+""),"svg"!=r&&r?this.addImageIcon(n,t):this.addSvgIcon(n,t,e)},addSvgIcon:function(t,e,o){var r=n("SvgIconScope");return this._getSingleIconsCollection().add(new r(t,e,o)),this},addImageIcon:function(t,e,o){var r=n("ImageIconScope");return this._getSingleIconsCollection().add(new r(t,e,o)),this},addSvgIconSet:function(t,e,o){var r,i=n("SvgCumulativeIconSetScope"),c=n("SvgIconSetScope");return o=o||{},r=o.cumulative?i:c,this._getCollection(t).add(new r(t,e,o)),this},addFontIconSet:function(t,e,o){var r=n("FontIconSetScope");return this._getCollection(t).add(new r(t,e,o)),this},addSpriteIconSet:function(t,e,o){var r=n("SpriteIconSetScope");return this._getCollection(t).add(new r(t,e,o)),this},addIconSetAlias:function(n,t){return this._collections.hasOwnProperty(t)||(this._collections[t]=this._getCollection(n)),this},setDefaultIconSet:function(n){return this._defaultCollectionId=n,this},setDefaultSvgIconSize:function(n){return this._defaultSvgIconSize=n,this},getDefaultSvgIconSize:function(){return this._defaultSvgIconSize},preload:function(t){var e,o=this,r=this._collections,i={},c=!1,s=!1,a=[],u={},l=n("Promise");return-1!=["string","number"].indexOf(typeof t)&&(t=[t]),t&&"object"==typeof t?((Array.isArray(t)?t:Object.keys(t)).forEach(function(n){i[String(n).toLowerCase()]=!0}),c=!0):t&&(s=!0),Object.keys(r).forEach(function(n){var t;(t=r[n].preload(s||c&&i.hasOwnProperty(String(n).toLowerCase())))&&"object"==typeof t&&"function"==typeof t.then&&(a.push(t),"__SINGLE_ICONS_COLLECTION"!=n&&(u[n]=t.then(function(){return o._getCollection(n)})))}),e=l.all(a),e.iconSets=u,e},getIcon:function(n,t){var i,c,s,a;if(n=n||"",t=t||[],i=n.split(/\s+/).filter(function(n){return n}),n=i[0],Array.prototype.push.apply(t,i.slice(1)),r.test(n))return this.hasSingleIcon(n)||this.addIcon(n,n),this._getSingleIconsCollection().getIcon(n,t).then(null,o(n));if(s=n,a=null,c=n.indexOf(":"),-1!=c&&(a=n.slice(0,c),s=n.slice(c+1)),a){if(this.hasIconSet(a))return this._getCollection(a).getIcon(s,t).then(null,o(s,a))}else{if(this.hasSingleIcon(s,t))return this._getSingleIconsCollection().getIcon(s,t).then(null,o(s));if(this.hasDefaultIconSet())return this._getCollection(this._defaultCollectionId).getIcon(s,t).then(null,o(s,this._defaultCollectionId))}return e(n)},hasSingleIcon:function(n,t){return this._getSingleIconsCollection().collection.filter(function(e){return e.hasIcon(n,t)}).length>0},hasIconSet:function(n){return this._collections.hasOwnProperty(n)},hasDefaultIconSet:function(){return this._defaultCollectionId&&this.hasIconSet(this._defaultCollectionId)},_getCollection:function(t){var e=n("ScopeCollection");return this._collections.hasOwnProperty(t)||(this._collections[t]=new e),this._collections[t]},_getSingleIconsCollection:function(){return this._getCollection("__SINGLE_ICONS_COLLECTION")}},new t}),o("inherit",function(n){return function(n,t,e,o){return n.prototype=Object.create(t.prototype,o||{}),Object.keys(e||{}).forEach(function(t){n.prototype[t]=e[t]}),n}}),o("initIconElement",function(t){function e(t,e){function o(e,o){var r=t[0];r.hasAttribute(e)||function(t,e){var o,r,i,c=t.hasChildNodes();if(c)for(o=t.childNodes,r=0;r<o.length;r++)if(i=o[r],1===i.nodeType&&i.hasAttribute(e)&&!function(t){return"none"===(t.currentStyle?t.currentStyle:n.getComputedStyle(t)).display}(i))return!0;return!1}(r,e)||(o="string"==typeof o?o.trim():"",o.length&&t.attr(e,o))}""==e||function(){var n=t.parent();return!(!n.attr("aria-label")&&!n.text().trim())||!("BODY"==n.prop("tagName")||!n.parent().attr("aria-label")&&!n.parent().text().trim())}()?o("aria-hidden","true"):(o("aria-label",e),o("role","img"))}return function(n,t,o){var r;t||"string"==typeof t||(o=String(o||"").split(":").slice(-1)[0].trim(),/[\/\\.]/.test(o)?(r=o.split(/[\/\\]/).slice(-1)[0].split("."),r.length>1&&(r=r.slice(0,-1)),t=r.join(".")):t=o.split(/\s/)[0]),e(n,t||""),n.hasClass("webicon")||n.addClass("webicon")}}),o("loadSvgByUrl",function(n){return function(t){var e=n("httpGet"),o=n("log"),r=n("Promise"),i=n("nodeWrapper"),c=t,s=null;return"object"==typeof t&&(c=t.url,s=t.params),e(c,s).then(function(n){var t=i("<div>").append(n.data),e=t.find("svg");return e.length>0?e:t.children().first()},function(n){var t="string"==typeof n?n:String(n.message||n.data||n.responseText||n.statusText);return o.warn(t),r.reject(t)})}}),o("parseSvgOptions",function(n){return function(n){if(n)switch(typeof n){case"number":n={iconSize:n};break;case"string":n={viewBox:n}}else n={};return{iconSize:n.iconSize,viewBox:n.viewBox}}}),o("publicApi",function(n){var t,e=n("iconManager"),o=n("ready");return t={icon:function(n,t,o){return e.addIcon(n,t,o),this},svgSet:function(n,t,o){return e.addSvgIconSet(n,t,o),this},font:function(n,t,o){return e.addFontIconSet(n,t,o),this},sprite:function(n,t,o){return e.addSpriteIconSet(n,t,o),this},sourceAlias:function(n,t){return e.addIconSetAlias(n,t),this},defaultSvgSetUrl:function(n,t){return e.addSvgIconSet(n,n,t).setDefaultIconSet(n),this},defaultSource:function(n){return e.setDefaultIconSet(n),this},defaultSvgIconSize:function(n){return e.setDefaultSvgIconSize(n),this},preload:function(n,t){var o;return"function"==typeof n&&(t=n,n=null),o=e.preload(n),t&&t(o),this},extension:o},t.iconSet=t.svgSet,t.defaultIconSetUrl=t.defaultSvgSetUrl,t.defaultSvgIconSetUrl=t.defaultSvgSetUrl,t.alias=t.sourceAlias,t.default=t.defaultSource,t}),r(function(t){var e,o,r,i=t("nodeWrapper");r='<style type="text/css">@charset "UTF-8";webicon,[webicon],[data-webicon],.webicon,.webicon{display:inline-block;}.svg-webicon svg{fill:currentColor;}</style>',e=i(n.document).find("head"),(o=e.find("style")[0])&&o.outerHTML==r||e.prepend(r)}),o("AbstractCssClassIcon",function(n){function t(n,t){e.call(this,n),this.className=t}var e=n("AbstractIcon");return n("inherit")(t,e,{render:function(n){function t(){return n.attr("class").split(/\s+/)}var o,r,i;return i=e.prototype.render.call(this,n),o=t(),n.addClass(this.className),r=function(n){var e=t();return n=n||[],e.filter(function(t){return-1==n.indexOf(t)})}(o).join(" "),function(){n.removeClass(r),i&&i()}}})}),o("AbstractElementIcon",function(n){function t(n,t){e.call(this,n),this.element=t}var e=n("AbstractIcon");return n("inherit")(t,e,{cloneNode:function(){return this.element[0].cloneNode(!0)},render:function(n){var t;return t=e.prototype.render.call(this,n),n.append(this.cloneNode()),function(){for(;n.firstChild;)n.removeChild(n.firstChild);t&&t()}}})}),o("AbstractIcon",function(n){function t(n){this.iconClassName=n}return t.prototype={render:function(n){var t=this.iconClassName;return n.addClass(t),function(){n.removeClass(t)}}},t}),o("FontIcon",function(n){function t(n){e.call(this,"font-webicon",n)}var e=n("AbstractCssClassIcon");return n("inherit")(t,e)}),o("ImageIcon",function(n){function t(n){n.attr({width:"100%",height:"100%"}),n.css({"pointer-events":"none",display:"inline-block"}),e.call(this,"image-webicon",n)}var e=n("AbstractElementIcon"),o=n("inherit");return t.loadByUrl=function(e){var o,r,i=n("buildUrlParams"),c=n("nodeWrapper"),s=n("Promise"),a=e;return"object"==typeof e&&(a=e.url,(o=i(e.params))&&(a=[a,o].join("?"))),new s(function(n,e){r=c("<img>"),r.bind("load",function(){n(new t(r))}),r.bind("error",e),r.attr("src",a)})},o(t,e)}),o("SpriteIcon",function(n){function t(n){e.call(this,"sprite-webicon",n)}var e=n("AbstractCssClassIcon");return n("inherit")(t,e)}),o("SvgIcon",function(n){function t(t,o){var r,i,c,s,a,u,l,f,h,p,d=n("nodeWrapper"),v=n("iconManager"),g=n("parseSvgOptions");if(o=g(o),["id","x","y"].forEach(function(n){t.removeAttr(n)}),h=t[0],"svg"!=h.tagName)if("symbol"==h.tagName){for(r=d('<svg xmlns="http://www.w3.org/2000/svg">'),i=r[0],c=h.attributes,u=0;u<c.length;u++)i.setAttribute(c[u].name,c[u].value);t=r.append(d(h).children())}else t=d('<svg xmlns="http://www.w3.org/2000/svg">').append(t);h=t[0],a={xmlns:"http://www.w3.org/2000/svg",version:"1.0"},Object.keys(a).forEach(function(n){h.getAttribute(n)||h.setAttribute(n,a[n])}),p=o.iconSize||v.getDefaultSvgIconSize(),c={fit:"",height:"100%",width:"100%",preserveAspectRatio:"xMidYMid meet",viewBox:h.getAttribute("viewBox")||o.viewBox},c.viewBox||(l=h.getAttribute("width"),f=h.getAttribute("height"),null!==l&&null!==f&&(c.viewBox="0 0 "+parseFloat(l)+" "+parseFloat(f))),c.viewBox=c.viewBox||"0 0 "+p+" "+p,Object.keys(c).forEach(function(n){h.setAttribute(n,c[n])}),s={"pointer-events":"none",display:"inline-block"},Object.keys(s).forEach(function(n){h.style[n]=s[n]}),this.iconSize=p,e.call(this,"svg-webicon",t)}var e=n("AbstractElementIcon"),o=n("inherit");return t.loadByUrl=function(e,o){return n("loadSvgByUrl")(e).then(function(n){return new t(n,o)})},o(t,e)}),o("AbstractCssClassIconSetScope",function(n){function t(n,t,r){o.call(this,n,r),this._classResolver=e(t)}function e(n){var t;return"function"==typeof n?n:(n=(n||"")+"",t=n.split(/[?%]/),function(n){return t.join(n)})}var o=n("AbstractScope");return n("inherit")(t,o,{_resolveCssClass:function(n,t){return this._classResolver(n,t)}})}),o("AbstractRemoteResourceScope",function(t){function e(n,t,e){r.call(this,n,e),this._urlResolver=o(t),this._preloadable=this.options.preloadable||void 0===this.options.preloadable,this._cache=null,this._resource=null}function o(e){var o,r,i=t("mergeObjects"),c=null;return o&&"object"==typeof o?(o=e.url,c=e.params):o=e,r="function"==typeof o?o:function(){return o},function(){var t,e,o=null;return t=r.apply(null,Array.prototype.slice.call(arguments)),e=t,t&&"object"==typeof t&&(e=t.url,o=t.params),e=String(e||""),"//"===e.slice(0,2)&&(e=n.document.location.protocol+e),{url:e,params:i({},c||{},o||{})}}}var r=t("AbstractScope");return t("inherit")(e,r,{preload:function(n){return this._preloadable||n?this._getResource():null},_resolveUrl:function(n){return this._urlResolver(n)},_getResource:function(){var n,t=this;return this._cache?this._cache:(n=this._cache=this._loadResource(),n.then(function(n){t._resource=n},function(){t._cache=null}),n)},_loadResource:function(){return t("Promise").reject()}})}),o("AbstractRemoteSvgResourceScope",function(n){function t(n,t,o){var i=r(o),c=this;e.call(this,n,t,o),Object.keys(i).forEach(function(n){c.options[n]=i[n]})}var e=n("AbstractRemoteResourceScope"),o=n("inherit"),r=n("parseSvgOptions");return o(t,e)}),o("AbstractScope",function(n){function t(n,t){t=t&&"object"==typeof t?t:{},this.id=n,this.options=t,this._iconIdParser=e(t.iconIdParser),this._iconIdResolver=e(t.iconIdResolver)}function e(n){return"function"==typeof n?n:function(n){return n}}return t.prototype={preload:function(){return null},hasIcon:function(){return!0},_parseIconId:function(n,t){return this._iconIdParser(n,t)},_resolveIconId:function(n){return this._iconIdResolver(n)}},t}),o("FontIconSetScope",function(n){function t(n,t,o){e.call(this,n,t,o)}var e=n("AbstractCssClassIconSetScope");return n("inherit")(t,e,{getIcon:function(t,e){return new(n("FontIcon"))(this._resolveCssClass(this._parseIconId(t,e),e))}})}),o("ImageIconScope",function(n){function t(n,t,o){e.call(this,n,t,o)}var e=n("AbstractRemoteResourceScope");return n("inherit")(t,e,{_loadResource:function(){return n("ImageIcon").loadByUrl(this._resolveUrl())},hasIcon:function(n,t){return this._parseIconId(n,t)==this._resolveIconId(this.id)},getIcon:function(){return this._getResource()}})}),o("SpriteIconSetScope",function(n){function t(n,t,o){e.call(this,n,t,o)}var e=n("AbstractCssClassIconSetScope");return n("inherit")(t,e,{getIcon:function(t,e){return new(n("SpriteIcon"))(this._resolveCssClass(this._parseIconId(t,e),e))}})}),o("SvgCumulativeIconSetScope",function(n){function t(n,t,o){e.call(this,n,t,o),this.waitDuration=this.options.waitDuration||10,this.waitPromise=null,this.waitIconIds=[]}var e=n("AbstractRemoteSvgResourceScope");return n("inherit")(t,e,{_loadResource:function(){return n("SvgIconSet").loadByUrl(this._resolveUrl(this.waitIconIds),this.options)},preload:function(){return null},getIcon:function(t,e){var o=n("Promise"),r=n("timeout"),i=this;return t=this._parseIconId(t,e),this._resource&&this._resource.exists(t)?o.resolve(this._resource.getIconById(t)):(this.waitPromise?-1==this.waitIconIds.indexOf(t)&&this.waitIconIds.push(t):(this.waitIconIds=[t],this.waitPromise=r(this.waitDuration).then(function(){return i.waitPromise=null,i._resource?i._resource.mergeByUrl(i._resolveUrl(i._resource.notExists(i.waitIconIds)),i.options):i._getResource()})),this.waitPromise.then(function(n){var e=n.getIconById(t);return e||o.reject()}))}})}),o("SvgIconScope",function(n){function t(n,t,o){e.call(this,n,t,o)}var e=n("AbstractRemoteSvgResourceScope");return n("inherit")(t,e,{_loadResource:function(){return n("SvgIcon").loadByUrl(this._resolveUrl(),this.options)},hasIcon:function(n,t){return this._parseIconId(n,t)==this._resolveIconId(this.id)},getIcon:function(){return this._getResource()}})}),o("SvgIconSetScope",function(n){function t(n,t,o){e.call(this,n,t,o)}var e=n("AbstractRemoteSvgResourceScope");return n("inherit")(t,e,{_loadResource:function(){return n("SvgIconSet").loadByUrl(this._resolveUrl(),this.options)},hasIcon:function(n,t){return n=this._parseIconId(n,t),this._getResource().then(function(t){return t.exists(n)})},getIcon:function(t,e){var o=n("Promise");return t=this._parseIconId(t,e),this._getResource().then(function(n){var e=n.getIconById(t);return e||o.reject()})}})}),o("IconDirective",function(n){function t(t){return{restrict:"EA",scope:!0,link:function(e,o,r){var i,c=n("initIconElement"),s=r.$normalize(r.$attr.alt||""),a=r.$normalize(r.$attr.icon||r.$attr.webicon||""),u=null;i=s?r[s]:null,c(o,i,r[a]),a&&r.$observe(a,function(n){u&&u(),u=null,n&&t(n).then(function(n){u=n.render(o)})})}}}return t.$inject=["$webicon"],t}),o("IconProvider",function(n){function t(){var t=[];this.preload=function(){return t.push(Array.prototype.slice.call(arguments)),this},this.$get=["$injector",function(e){var o,r=n("iconManager"),i=n("ensureDependenciesRegistered");return i(e),o=function(n){return r.getIcon(n)},o.preload=function(n,t){var o;return("function"==typeof n||Array.isArray(n)&&"function"==typeof n.slice(-1)[0])&&(t=n,n=null),o=r.preload(n),t&&e.invoke(t,null,{$promise:o}),o},o.$checkLazyPreload=function(){var n=this;t.length&&t.forEach(function(t){n.preload.apply(n,t)})},o}]}return t.prototype=n("publicApi"),t}),o("buildUrlParams",function(n){return function(n){var t=[];return n=n||{},Object.keys(n).filter(function(){return void 0!==n[key]&&null!==n[key]}).map(function(t){return Array.isArray(n[t])?n[t]:[n[t]]}).forEach(function(e){n[e].forEach(function(n){t.push(encodeURIComponent(e)+"="+encodeURIComponent(n+""))})}),t.join("&")}}),o("ensureDependenciesRegistered",function(n){var t=!1;return function(e){t||(n("$injector",function(){return e}),n("log",function(){return e.get("$log")}),n("httpGet",function(){var n=e.get("$http"),t=e.get("$templateCache");return function(e,o){var r={cache:t};return o&&"object"==typeof o&&Object.keys(o).length>0&&(r.params=o),n.get(e,r)}}),n("Promise",function(){function n(n){return function(){var t=Array.prototype.slice.call(arguments);r.$$phase?n.apply(this,t):r.$apply(function(){n.apply(this,t)})}}function t(e){var r;return"function"!=typeof e?t.resolve(e):(r=o.defer(),e(n(r.resolve),n(r.reject)),r.promise)}var o=e.get("$q"),r=e.get("$rootScope");return t.reject=o.reject,t.resolve=o.when,t.all=o.all,t}),n("timeout",function(){var n=e.get("$timeout");return function(t,e){return"function"!=typeof t&&(e=t,t=function(){}),n(t,e)}}),t=!0)}}),o("mergeObjects",function(){return function(n){function t(n,e){return!n||!e||"object"!=typeof n||"object"!=typeof e||Array.isArray(n)||Array.isArray(e)?e:(Object.keys(e).forEach(function(o){n.hasOwnProperty(o)?n[o]=t(n[o],e[o]):n[o]=e[o]}),n)}var e=Array.prototype.slice.call(arguments);if(0==e.length)return{};if(e.length<2){if(!Array.isArray(n))return n;e=n,n=e[0]}return e.slice(1).forEach(function(e){n=t(n,e)}),n}}),o("nodeWrapper",function(n){return n("angular").element});var a={api:{url:"https://api.icons8.com/api/iconsets/svg-symbol"}},u={svgSets:{url:"//cdn.rawgit.com/icons8/welovesvg/78f7305/libs",libs:["brandico","elusive-icons","entypo","font-awesome","fontelico","foundation-icons","glyphicons-halflings","icomoon-free","icons8-color-icons","icons8-win10","icons8-wpf","ionicons","ligaturesymbols","linecons",{lib:"maki",name:"maki-12"},{lib:"maki",name:"maki-18"},{lib:"maki",name:"maki-24"},"material-icons","meteocons","metrize-icons","mfglabs-iconset","octicons","open-iconic","openwebicons","raphael-icons","simple-line-icons","stateface","stroke7","typicons","weather-icons","webhostinghub-glyphs","zocial"]},aliases:{"color-icons":"icons8-color-icons","flat-color-icons":"icons8-color-icons",win10:"icons8-win10","wpf-ui-framework-icons":"icons8-wpf",wpf:"icons8-wpf",glyphicons:"glyphicons-halflings",ion:"ionicons",lsf:"ligaturesymbols",maki:"maki-24","material-design-icons":"material-icons",material:"material-icons",weather:"weather-icons",icomoon:"icomoon-free",elusive:"elusive-icons",fa:"font-awesome",foundation:"foundation-icons",metrize:"metrize-icons",mfglabs:"mfglabs-iconset",iconic:"open-iconic",raphael:"raphael-icons","simple-line":"simple-line-icons",webhostinghub:"webhostinghub-glyphs"}};s(function(n){i(n,a)}),s(function(n){c(n,u)}),t.module("webicon",[]).config(["$provide","$compileProvider",function(n,o){var r=e(function(n){n("angular",function(){return t})});n.provider("$webicon",r("IconProvider")),o.directive("webicon",r("IconDirective"))}]).run(["$webicon",function(n){n.$checkLazyPreload()}])}(window,window.angular);
//# sourceMappingURL=webicon.js.map
