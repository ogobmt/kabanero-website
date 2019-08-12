function addTOCClick(){var e=function(e){var n=$(e.currentTarget),o=n.attr("href");e.preventDefault(),e.stopPropagation(),loadContent(n,o,!0),isMobileView()&&$("#breadcrumb-hamburger").trigger("click")};$("#toc-container > ul > li > div").off("click").on("click",e),$("#toc-container > ul > li > div").off("keypress").on("keypress",function(e){e.stopPropagation(),13!==e.which&&13!==e.keyCode&&32!==e.which&&32!==e.keyCode||$(this).trigger("click")}),addOutlineToTabFocus("#toc-container > ul > li > div"),$(window).off("focus").on("focus",function(){windowFocus=!0})}function setSelectedTOC(e){deselectedTOC(),e.parent().addClass("toc-selected")}function deselectedTOC(){var e=$(".toc-selected");1===e.length&&e.removeClass("toc-selected")}function getTOCElement(e){return $("#toc-container > ul > li > div[href$='"+e+"']")}function setupDisplayContent(){setContainerHeight(),adjustParentWindow(),$("#general-content").animate({scrollTop:0},400)}function loadContent(e,n,o){$("footer").hide(),1===e.length?setSelectedTOC(e):deselectedTOC(),$("#general-content").load(n,function(i,t){"success"===t?(updateMainBreadcrumb(e),setupDisplayContent(),$("footer").show(),o&&updateHashInUrl(n),$(this).focus()):$("footer").show()})}function addOutlineToTabFocus(e){$(e).off("blur").on("blur",function(){$(this).hasClass("addFocus")&&$(this).removeClass("addFocus")});var n=!1;$(e).off("mousedown").on("mousedown",function(){n=!0}),$(e).off("focusin").on("focusin",function(){n||windowFocus||($(this).addClass("addFocus"),adjustParentWindow()),n=!1,windowFocus=!1})}function updateMainBreadcrumb(e,n){var o=$(".breadcrumb.fluid-container").find("li:last-child");if(o.find("a").hasClass("inactive-link")&&o.remove(),e!==undefined){var i=e.text();n&&(i=e.attr(n)),$(".breadcrumb.fluid-container").append("<li><a class='inactive-link'>"+i+"</a></li>")}}function updateHashInUrl(e){var n=e;-1!==e.indexOf(generalDocsFolder)&&(n=e.substring(generalDocsFolder.length)),window.location.hash="#"+n}function isMobileView(){return $(window).width()<=mobileWidth}function setContainerHeight(){isMobileView()||($("#background-container").css("height",$(window).height()-$("header").height()),$("#background-container").css("margin-bottom","60px"))}function selectFirstDoc(){if(!isMobileView()){var e=$("#toc-container > ul > li > div").first();return loadContent(e,e.attr("href")),e}}function adjustParentWindow(){$(window.parent.document).scrollTop()>0&&$(window.parent.document).scrollTop(0)}function addContentFocusListener(){var e=!1;$("#general-content").on("mousedown",function(){e=!0}),$("#general-content").on("focusin",function(){e||(adjustParentWindow(),$("#general-content").scrollTop(0)),e=!1})}function addHamburgerClick(){isMobileView()&&$(".breadcrumb-hamburger-nav").on("click",function(){$("#toc-column").hasClass("in")?($("#general-content").show(),$("#breadcrumb-hamburger").show(),$("#breadcrumb-hamburger-title").show()):($("#general-content").hide(),$("#breadcrumb-hamburger").hide(),$("#breadcrumb-hamburger-title").hide(),$("#background-container").css("height","auto"),window.location.hash&&updateHashInUrl(""))})}function scrollToTOC(e){if(!isMobileView()){var n=$("header").height(),o=$("#toc-column").scrollTop(),i=e[0].getBoundingClientRect().top-n,t=$("#toc-column")[0].clientHeight,c=$("#toc-column")[0].scrollHeight;if(i<0||i>0&&i>t){var r=o+i-n+50;r+t>c&&(r=c-t+n+50),$("#toc-column").animate({scrollTop:r},400)}}}function addHashListener(){$(window).on("hashchange",function(){if(window.location.hash){var e=generalDocsFolder+window.location.hash.substring(1),n=$("#toc-container").find("div[href='"+e+"']");1===n.length&&scrollToTOC(n),loadContent(n,e),isMobileView()&&$("#toc-column").hasClass("in")&&$(".breadcrumb-hamburger-nav").trigger("click")}else isMobileView()?$("#toc-column").hasClass("in")||$(".breadcrumb-hamburger-nav").trigger("click"):scrollToTOC(selectFirstDoc())})}function addWindowResizeListener(){$(window).resize(function(){isMobileView()?addHamburgerClick():($("#toc-column").hasClass("in")||$(".breadcrumb-hamburger-nav").trigger("click"),$("#breadcrumb-hamburger").hide(),$("#breadcrumb-hamburger-title").hide(),setContainerHeight())})}var mobileWidth=767,generalDocsFolder="/docs/ref/general/",windowFocus=!1;$(document).ready(function(){addTOCClick(),addContentFocusListener(),addHamburgerClick(),addHashListener(),addWindowResizeListener(),window.location.hash?$(window).trigger("hashchange"):selectFirstDoc()});