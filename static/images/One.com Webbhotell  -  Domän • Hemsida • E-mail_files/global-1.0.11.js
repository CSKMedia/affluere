if (!Array.prototype.forEach) {
	Array.prototype.forEach = function(lambda, thisObject) {
		for (var i=0 ; i<this.length ; i++) {
			lambda.call(thisObject, this[i]);
		}
	};
}

if (!Array.prototype.map) {
	Array.prototype.map = function(lambda, thisObject) {
		var ret = [];
		for (var i=0 ; i<this.length ; i++) {
			ret.push(lambda.call(thisObject, this[i]));
		}
		return ret;
	};
}



var Util = {
	localStorage : {
		isSupported : function() {
		    var mod = 'one.com';
		    try {
				localStorage.setItem(mod, mod);
				localStorage.removeItem(mod);
				return true;
		    } catch(e) {
				return false;
		    }			
		}
	},
	sessionStorage : {
		isSupported : function() {
		    var mod = 'one.com';
		    try {
				sessionStorage.setItem(mod, mod);
				sessionStorage.removeItem(mod);
				return true;
		    } catch(e) {
				return false;
		    }			
		}		
	}
};

function isElementInViewport (el) {

    //special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/* Notice: Copied from BO.js */
/* Notice: changes to this script should also be applied to global.js */

var BO = new function() {
	var ua = navigator.userAgent.toLowerCase();
	var that = this;
	var check = function(r){
		return r.test(ua);
	};

	// Notice: different from the jslib version;
	this.ipod = check(/ipod/);
	this.iphone = check(/iphone/);
	this.ipad = check(/ipad/);
	this.android = check(/android/);

	this.isWindows = check(/windows|win32/);
	this.isMac = check(/macintosh|mac os x/);
	this.isAir = check(/adobeair/);
	this.isLinux = check(/linux/);
	this.X11 = navigator.appVersion.indexOf("X11") !== -1;

	this.opera = check(/opera/);
	this.chrome = check(/chrome/);
	this.webkit = check(/webkit/);

	this.safari = !this.chrome && check(/safari/);
	this.safari20 = this.safari && check(/applewebkit\/4/); // unique to Safari 2
	this.safari30 = this.safari && check(/version\/3/);
	this.safari4 = this.safari && check(/version\/4/);

	this.ie11 = this.isWindows && check(/trident.*rv( |\:)+11\./);
	this.ie = !this.opera && (check(/msie/) || this.ie11);
	this.ie7 = this.ie && check(/msie 7/);
	this.ie8 = this.ie && check(/msie 8/);
	// Notice: different from the jslib version;
	this.ie9 = this.ie && check(/msie 9/);
	this.ie10 = this.ie && check(/msie 10/);
	this.edge = check(/edge/);

	this.ie6 = this.ie && !this.ie7 && !this.ie8 && !this.ie9 && !this.ie10 && !this.ie11;

	this.gecko = !this.webkit && !this.ie11 && check(/gecko/);
	this.gecko2 = this.gecko && check(/rv:1\.8/);
	this.gecko3 = this.gecko && check(/rv:1\.9/);

	this.isRetina = (function() {
		if(window.devicePixelRatio) {
			if(window.devicePixelRatio > 1) {
				return true;
			}
		}
		return false;
	})();

	this.isIOS = this.ipod || this.iphone || this.ipad;

	// Adapted from http://detectmobilebrowser.com/
	var nav = navigator.userAgent || navigator.vendor || window.opera;
	this.isMobile = /android|avantgo|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(nav) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(nav.substr(0,4));

	this.iOSVersion = (function() {
	    var agent = window.navigator.userAgent,
	        start = agent.indexOf( 'OS ' );

	    if ( that.isIOS && start > -1 ) {
	        return window.Number( agent.substr( start + 3, 3 ).replace( '_', '.' ) );
	    }

	    return 0; 
	}());

	// Internet explorer with Chromeframe
	if (this.ie && this.chrome) { // Chromeframe installed
		if (!!window.chrome) { // Chromeframe activated
			this.ie = this.ie6 = this.ie7 = this.ie8 = false;
			this.chrome = this.webkit = true;
		} else {
			this.chrome = this.webkit = false;
		}
	}
};



function placeholderIsSupported() {
    var test = document.createElement('input');
    return ('placeholder' in test);
}

function applyPlaceholderSupport() {
	var fieldsToModify = $('.placeholder');

	fieldsToModify.attr('placeholder', function() {
		return this.value;
	});

	if( ! placeholderIsSupported()) {
		var fields = $('[placeholder]');

		fields.addClass('unmodified');

		fields.each(function() {
			this.value = $(this).attr('placeholder');
		});

		fields.on('click keypress', function() {
			var $this = $(this);
			if($this.hasClass('unmodified')) {
				$this.removeClass('unmodified');
				this.value = '';
			}
		});
	} else {
		fieldsToModify.val('');
	}
}

function applyContextHelpBehaviour() {
	$('a.contextHelp').on({
		'mouseover' : function(e) {
			var span = this.getElementsByTagName('span')[0];
			if (span) {
				span.className = 'contextHelpContent';
			}
		},
		'mouseout' : function(e) {
			var span = this.getElementsByTagName('span')[0];
			if (span) {
				span.className = '';
			}
		},
		'click' : function(e) {
			if ($(this).data('clickable') != true) {
				e.preventDefault();
			}
		}
	});
}

function setValidationMark(fieldIsValid, fieldNameValidation) {
	// Sets the picture on check_[fieldNameValidation] according to validation, red or green
	var imageName = 'check_' + fieldNameValidation;

	if (document.images[imageName]) {
		if (fieldIsValid == false) {	
			document.images[imageName].src='/static/images/onecom/blank.png';
		} else {
			document.images[imageName].src='/static/images/onecom/sprite-source/check-green.svg';
		}
	}
}

// Surpresses pressing enter key, so the form does not submit
function noenter(e) {
	if (!e && window.event) {
		var e = window.event;
	}
	if (e && e.keyCode == 13) {
		return false;
	}
	return true;
}

// Hack needed to get Safari to post the form correctly. Doesn't post elements with display: none;
function prepareForm(submitForm, submitName, submitValue) {
	var submitValue = document.createElement("input");
	submitValue.type='hidden';
	submitValue.name=submitName;
	submitValue.value=submitValue; // Optional value to hidden field
	submitForm.appendChild(submitValue);
}

function doupdate(id, show, showClass) {
	var obj;
	if (document.getElementById) {
		obj = document.getElementById(id);
	} else if (document.layers) {
		obj = document.layers[id];
	} else if (document.all) {
		obj = document.all[id];
	} else {
		return;
	}

	if (obj) {
		showClass = showClass != null ? showClass : "show";
		obj.className = show ? showClass : "hide";
	} else {
		return;
	}
}

// Trim whitespace from left and right sides of s.
function trim(s) {
	return s.replace( /^\s*/, "" ).replace( /\s*$/, "" );
}

function applySearchAnimation() {
	var globalProgress = document.getElementById('globalProgress');
	var templateGlobalSearch = document.getElementById('template_search');
	if (templateGlobalSearch) {
		var form = templateGlobalSearch.getElementsByTagName('form')[0];
		var input = $(form).find('input.globalDomainSearchInput').first().get(0);

		$(form).on('submit', function(e) {
			if( input ) {
				if(input.value == '') {
					return false;
				}				
			}
			displaySearchAnimation(this);
		});

		if (input) {
			$(input).on('focus', function(e) {
				if (globalProgress && globalProgress.getElementsByTagName('img').length == 0) {
					var imgTag = document.createElement('img');
					imgTag.src = '/static/images/template/progress-bar.gif';
					globalProgress.appendChild(imgTag);
				}
			});
		}
	}
}

function displaySearchAnimation(form) {
	var $form = $(form);
	var input = $form.find('div.globalInputContainer').first().get(0);
	var progress = $form.find('div.progress').first().get(0);
	progress.id = 'progress';
	generalWaitAnimation('progress');
	input.style.display = 'none';
}

function templateSearchBehaviour() {
	var domainSearchContainer = $('.header-domainsearch');
	if (domainSearchContainer.length) {
		var form = domainSearchContainer.find('form').first();
		var buttonGroup = domainSearchContainer.find('.input-group-btn').first(),
			domainField = $('.header-domainsearch-input');
		form.on('submit', function(e) {
			if( domainField.val() != '') {
				buttonGroup.removeClass('input-group-btn');
				buttonGroup.addClass('template-loader');				
			}
		});
	}
}

function globalOnload() {
	// Call specificOnload if defined
	if (window.specificOnload) {
		specificOnload();
	}
	
	applySearchAnimation();
	applyContextHelpBehaviour();
	new MobileMenu('mobileMenuButton', 'menu');
	new MobileMenu('menuButton', 'menu');
	new MobileMenu('mobileLoginButton', 'global_login');
	templateSearchBehaviour();
}


window.onunload = function(e) {
	if (e) {
		e.preventDefault();
		e.stopPropagation();		
	}
};

function DemoPopup(demoButton, embedUrl) {
	this.demoButton = null;
	this.embedUrl = embedUrl;
	this.popup = null;
	this.popupDemoContainer = null;
	this.iframe = null;
	this.overlay = null;
	this.popupOpen = false;
	if (!(getDisplayType() == 'mobile') && !(getDisplayType() == 'phablet')) {
		this.demoButton = demoButton;
		this.popupOpen = false;
		this.popup = document.getElementById('demo-popup');
		this.popupDemoContainer = $('#demoMovie');
		
		if (this.popupDemoContainer.length) {
			if (this.demoButton) {
				$(this.demoButton).on('click', $.proxy(function(e) {
					e.preventDefault();
					e.stopPropagation();
					this.showDemoPopup();
				}, this));
			}
		}
	} else {
		$(demoButton).on('click', function(e) {
			e.preventDefault();
			e.stopPropagation();

			var parent = demoButton.parentNode;
			var iframe = document.createElement('iframe');
			iframe.width = demoButton.offsetWidth + 'px';
			iframe.height = demoButton.offsetHeight + 'px';
			iframe.frameBorder = 0;
			parent.insertBefore(iframe, demoButton);
			parent.removeChild(demoButton);
			iframe.src = embedUrl;
		});
	}
}

DemoPopup.prototype = {
	toString : function(){return '[object DemoPopup]';},
	
	loadSocial: function () {
		var defer = function (config) {
			var inc;
			if (config.id && !document.getElementById(config.id)) {
				inc = document.createElement('script');
				if (config.id) {
					inc.id = config.id;
				}
				inc.async = true;
				inc.src = config.url;
				inc.onload = config.callback || function () {};
				document.getElementsByTagName('head')[0].appendChild(inc);
			}
		}
		/*
			Social media buttons removed for old IE two reasons:
			1: Google+ gives JS-error for IE6
			2: Facebook gives blank page for certain versions of IE7: http://stackoverflow.com/questions/3923775/integrating-facebook-to-the-leads-to-blank-pages-on-some-browsers-fb-xd-fragmen
		*/
		if (!BO.ie6 && !BO.ie7) {
			defer({
				url: '//connect.facebook.net/en_US/all.js#xfbml=1',
				id: 'facebook-jssdk'
			});
			defer({
				url: '//platform.twitter.com/widgets.js',
				id: 'twitter-jssdk'
			});
			defer({
				url: '//apis.google.com/js/plusone.js',
				id: 'plusone-jssdk'
			});
		}
	},
	
	showDemoPopup : function() {
		if (this.popup.obj) {
			this.popup.obj.hideDemoPopup();
		}
		this.popup.obj = this;
		this.loadSocial();
		if (this.popupOpen) {
			this.hideDemoPopup();
		}
		this.iframe = $('<iframe></iframe>');

		this.iframe.attr('src', this.embedUrl);
		var width;
		var height;
		if (getDisplayType() == 'desktop' || getDisplayType() == 'widescreen') {
			width = '853';
			height = '510';
		} else {
			width = '640';
			height = '360';
		}
		this.iframe.width(width + 'px');
		this.iframe.height(height + 'px');
			
		this.iframe.frameBorder = 0;
		
		this.popupDemoContainer.append(this.iframe);
		
		this.overlay = document.createElement('div');
		this.overlay.id = 'overlay';
		this.overlay.style.height = $(document).height() + 'px';
		document.getElementsByTagName('body')[0].appendChild(this.overlay);
		
		this.closeFn = $.proxy(this.hideDemoPopup, this);
		$(this.overlay).on('click.closeFn', $.proxy(this.closeFn, this));
		$("#demoPopupClose").on('click.closeFn', $.proxy(this.closeFn, this));
		
		this.popup.style.top = $(document).scrollTop() + ($(window).height()-this.popup.offsetHeight)/2+"px";
		this.popup.style.width = width + 'px';
		this.popup.style.marginLeft = -(width/2) + 'px';
		
		this.popupOpen = true;
	},

	hideDemoPopup : function(e) {
		e = e || window.event;
		e.preventDefault();
		e.stopPropagation();
		$(this.overlay).off('click.closeFn');
		$("#demoPopupClose").off('click.closeFn');
		this.overlay.parentNode.removeChild(this.overlay);
		this.popup.style.top = "-3000px";
		// Required to avoid wierd black box for IE8.
		this.iframe.attr('src', '#');
		this.iframe.parent().find(this.iframe).remove();
		this.popupOpen = false;
		this.popup.obj = null;
	}
}

/** The next two methods are all nessecary to make the search-animation work our supported
  * browsers. The animation works in IE6+, Opera, FF and Safari. IE5-5.5 fails in an acceptable
  * way. For all browsers (except IE6), the "search in progress" is hidden with visibility:hidden
  * and position:absoulte, which should provide the same behaviour as display:none. But because
  * Opera doesn't fetch images that has display:none, and doesn't fetch images after unload has begun,
  * we cannot use display:none. On the other hand, because of the way the search bar is positioned
  * in Internet Explorer 6, the browser cannot contain absolutely positioned elements, and therefore,
  * IE6 demands that the wrapper is hidden with display:none. The properties is reversed it the IE6
  * specific stylesheet.
  */
/** To force Internet Explorers to display the animation every time we need to refresh the source.
  */
function refreshSource(objHtmlImg) {
	if (objHtmlImg) {
		if (objHtmlImg.src) {
			objHtmlImg.src = objHtmlImg.src;
		}
	}
}
function generalWaitAnimation(waitMessageId) {
	var waitmessageWrapper = document.getElementById(waitMessageId);
	if (waitmessageWrapper) {
		waitmessageImage = waitmessageWrapper.getElementsByTagName("img")[0];
		if (waitmessageImage) {
			setTimeout('refreshSource(waitmessageImage)',0);
		}
		doupdate(waitMessageId, true);
	}
}

function openGuide(objHtmlLink) {
	window.open(objHtmlLink.href, "GUIDE", "width=758, height=552, top=0, menubar=no, status=no, location=no, toolbar=no, scrollbars=yes, resizable=no");
}

function equalButtons(container) {
	var cls = 'equalbuttons',
		nodes,nodeContainer,
		buttonGroups = [];
	if (container) {
		nodeContainer= container;
	} else {
		nodeContainer = document.getElementById('content');
	}
	// Find any button groups that need to be worked on
	if (document.querySelectorAll) {
		nodes = nodeContainer.querySelectorAll('.' + cls);
	} else {
		// Poor mans fallback: getElementsByClassName
		var select = function (el, cls) {
			var nodes = [];
			if ($(el).hasClass(cls)) {
				nodes.push(el);
			}
			for (var i = 0; i < el.childNodes.length; i += 1) {
				Array.prototype.push.apply(nodes, select(el.childNodes[i], cls));
			}
			return nodes;
		};
		nodes = select(nodeContainer, cls);
	}
	
	// Iteration to measure widths of buttons in groups.
	// Do not set widths here to avoid triggering reflows
	if (nodes && nodes.length) {
		for (var i = 0; i < nodes.length; i += 1) {
			var buttons = [];
			if (nodes[i].querySelectorAll) {
				buttons = nodes[i].querySelectorAll('.button');
			} else {
				buttons = select(nodes[i], 'button');
			}
			
			if (buttons.length) {
				var group = {
					max: 0,
					buttons: []
				};
				for (var j = 0; j < buttons.length; j += 1) {
					var w = buttons[j].offsetWidth;
					group.max = Math.max(group.max, w);
					group.buttons.push({
						el: buttons[j],
						width: w,
						padding: parseInt($(buttons[j]).css('padding-left')) + parseInt($(buttons[j]).css('padding-right'))
					});
				}
				buttonGroups.push(group);
			}
		}
	}
	
	// Iteration to set widths and reduce to a single reflow
	buttonGroups.forEach(function (group) {
		group.buttons.forEach(function (button) {
			if (BO.ie6 || BO.ie7) {
				button.el.style.width = (group.max - (button.el.tagName === 'INPUT' ? 40 : 0)) + 'px';
			} else if (button.width < group.max) {
				button.el.style.width = group.max - button.padding + 'px';			
			}
		});
	});
};

function getDisplayType() {
	var displayType;
	if (window.matchMedia) {
		if (window.matchMedia("(max-width: 460px)").matches) {
			displayType = 'mobile';
		} else if (window.matchMedia("(min-width: 461px)").matches &&
				window.matchMedia("(max-width: 711px)").matches) {
			displayType = 'phablet';
		} else if (window.matchMedia("(min-width: 712px)").matches &&
				window.matchMedia("(max-width: 915px)").matches) {
			displayType = 'tablet';
		} else if (window.matchMedia("(min-width: 1026px)").matches) {
			displayType = 'widescreen';
		} else {
			displayType = 'desktop';
		}
	} else {
		// window.innerWidth is for IE9, document.documentElement.clientWidth is for IE8. IE10 supports mathMedia
		var visualViewportWidth = window.innerWidth || document.documentElement.clientWidth;
		var displayType = 'desktop';
		if (visualViewportWidth <= 460) {
			displayType = 'mobile';
		} else if (visualViewportWidth < 712) {
			displayType = 'phablet';
		} else if (visualViewportWidth < 916) {
			displayType = 'tablet';
		} else if (visualViewportWidth > 1026) {
			displayType = 'widescreen';
		}
	}
	return displayType;
}
function resizeIframesForSmallDisplays() {
	if (getDisplayType() == 'mobile' || getDisplayType() == 'phablet') {
		var iframes = document.getElementsByTagName('iframe');
		for (var i = 0 ; i < iframes.length ; i++) {
			var iframe = iframes[i];
			if (iframe.offsetWidth > window.innerWidth-40) {
				iframe.style.width = window.innerWidth-40 + 'px';
			}
		}
	}
}

var initalTemplateSearchValue;
var initalCenterSearchValue;

$(function(){

	// Frame buster
	if (top!= self) {
		top.location.replace(self.location.href);
	}

	// Set identified browser name as classnames on #page-container for CSS triggers
	function applyFixesIfReady(count) {
		if (count > 100) {
			return false;		
		}

		var el = document.getElementsByTagName("body")[0];
		
		if (el) {
			if (BO.ie) {
				/* Fails in IE 6.0.2800.1106 */
				try {
					document.execCommand("BackgroundImageCache", false, true);
				}catch(e) {}
			}
			el.className = el.className || '';
			for (var p in BO) {
				if (BO.hasOwnProperty(p) && BO[p] === true) {
					$(el).addClass(p);
				}
			}
		} else {
			setTimeout(function() { applyFixesIfReady(count++); }, 30); /* Wait until document.body is available (strange IE issue) */
		}
	};
	applyFixesIfReady();

	$('.demoButton').each(function() {
	    var youtubeUrl;
	    if (this.id == 'emailEngagement') {
	        youtubeUrl = window.emailEmbedUrl;
	    } else if (this.id == 'websiteEngagement') {
	        youtubeUrl = window.websiteEmbedUrl;
	    } else if (this.id == 'galleryEngagement') {
	        youtubeUrl = window.galleryEmbedUrl;
	    }
		new DemoPopup(this, youtubeUrl);
	});
	
	applyAdwordsBehaviour();

	var templateInput = $('#template_search input.border').first();
	if (templateInput.length) {
		initalTemplateSearchValue = templateInput.val();
		templateInput.on('click keydown', function() {
				clearInput(this);
		});
		templateInput.closest('form').on('submit', function() {
			if(templateInput.val() == initalTemplateSearchValue) {
				clearInput(this);
			}
		});
	}
	

	if (document.getElementById('choose_domain_form_domain')) {
		var centerInput = $('#center_search input').first();
		if (centerInput.length) {
			initalCenterSearchValue = centerInput.val();

			centerInput.on('click keydown', function() {
				clearInput(this);
			});
			centerInput.closest('form').on('submit', function(e) {
				if (centerInput.val() == initalCenterSearchValue) {
					clearInput(this);
				}
			});
		}
	}
	
	var container = $('.addon-search');
	if (container) {
		
		var domainInput = container.find('input[type="text"]').get(0);
		if(domainInput) {

			initalCenterSearchValue = domainInput.value;
			$(domainInput).on('click keydown', function() {
				clearInput(this);
			});
			$(domainInput.form).on('submit', function() {
				if (domainInput.value == initalCenterSearchValue) {
					clearInput(domainInput);
				}
			});		
		}
	}
	globalOnload();
	applyPlaceholderSupport();
});

function applyAdwordsBehaviour() {
	var adwordsContainer = document.getElementById('adwords');
	if (adwordsContainer) {
		adwordsContainer.style.visibility = 'visible';

		$(adwordsContainer).on('click', function(e) {
			e.preventDefault();
			var adwordsContainer = e.target || e.srcElement;
			openAdwordsPopup(adwordsContainer);
		});	
	}
}

function openAdwordsPopup(adwordsContainer) {
	var existingPopup = document.getElementById('adwords-popup');
	if (existingPopup) {
		existingPopup.parentNode.removeChild(existingPopup);
	}
	var popup = new DHTMLPopup('adwords-popup');
	var popupTextElement = document.getElementById('popup-text');
	if (popupTextElement) {
		popup.inner.innerHTML = popupTextElement.innerHTML;
		popup.show(0);
		
		var triangle = document.createElement('div');
		triangle.className = 'adwords-triangle';
		popup.popup.insertBefore(triangle, popup.frame);
		positionGoogleAdwords(adwordsContainer, popup, triangle);
	}
}

function positionGoogleAdwords(adwordsContainer, popup, triangle) {
	var offset = $(adwordsContainer).offset(),
		leftOffset = offset.left,
		topOffset = offset.top,
		extraOffset = 0;
	popup.popup.style.left = (leftOffset - popup.popup.offsetWidth + 8) + 'px';
	popup.popup.style.top = (topOffset + adwordsContainer.offsetHeight/2 - popup.popup.offsetHeight/2) + 'px';
	triangle.style.top = popup.popup.offsetHeight/2 - triangle.offsetHeight/2 + extraOffset + 'px';
    if (!isElementInViewport(popup.popup)) {
        var extraOffset = $(window).height() - popup.popup.getBoundingClientRect().bottom;
        popup.popup.style.top = (parseInt(popup.popup.style.top) + extraOffset ) + 'px';
    }
}

function clearInput(input) {
	var $input = $(input);
	if($input.hasClass('unmodified')) {
		$input.removeClass('unmodified');
		input.value = '';
	}
}

function insertAjaxLoader(objHtmlElement) {
	var loader = document.createElement('div');
	loader.className = 'loader';
	loader.style.height = objHtmlElement.offsetHeight + 'px';
	loader.style.width = objHtmlElement.offsetWidth + 'px';
	objHtmlElement.insertBefore(loader, objHtmlElement.firstChild);
	return loader;
}

function objectInsertAjaxLoader( objectCollection ) {
	objectCollection.addClass('is-loading');
}

function objectInsertAjaxFullscreenLoader( ) {
	var objectCollection = $('body');

	$.each(objectCollection, function() {
		var $this = $(this),
			loader = $('<div></div>');
			$(this).prepend(loader);	

			loader.addClass('fullscreen-loader');	
	});	
}

function objectRemoveAjaxLoader( objectCollection ) {
	objectCollection.removeClass('is-loading');
}

/* Related to the template */
function applyBrowserSearchButtonBehavior() {
	var domainButton = document.getElementById('choose_domain_form_domain');
	if (domainButton) {
		$(domainButton).on('click', submitChooseDomainForm);
	}
}

function submitChooseDomainForm() {
	doupdate('center_search_container', false);
	generalWaitAnimation('waitmessage');
	return true;
}
$(window).on('load', applyBrowserSearchButtonBehavior);

function showHidePriceRows() {
	var container = $('#browserPrices');
	var rows = container.find('tr');
	if (container.hasClass('full')) {
		container.removeClass('full').addClass('limited');
	} else {
		container.removeClass('limited').addClass('full');
	}
}
function applyShowHidePriceRowsBehaviour() {
	$('#showAll').on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		showHidePriceRows();
	});
	$('#showLess').on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		showHidePriceRows();
	});
}

$(window).on('load', applyShowHidePriceRowsBehaviour);


function scrollTo(id, offset){
	var obj = document.getElementById(id);
	if(obj){
		var scrollOffset = offset ? obj.offsetTop - offset : obj.offsetTop ;
		window.scroll(0, scrollOffset);
	}
}

function DHTMLPopup(popupId, popupClass){
	var This = this;
	this.popup = document.createElement("div");
	var frame = document.createElement("div");
	this.frame = frame;
	this.inner = document.createElement("div");
	var closer = document.createElement("a");

	if (popupClass) {
		this.popup.className = popupClass;
	}
	$(this.popup).addClass('dhtml-popup');
	if (popupId) {
		this.popup.id = popupId;
	}
	frame.className = "frame";
	this.inner.className = "inner";
	closer.className = "closer";
	frame.appendChild(closer);
	frame.appendChild(this.inner);
	this.popup.appendChild(frame);

	var outerContainer = document.getElementById('outer-sitecontainer');

	if (outerContainer) {
		outerContainer.appendChild(this.popup);
	} else {
		$('body').get(0).appendChild(this.popup);
	}

	$(closer).on('click', $.proxy(this.hide, this));
	$(document).on('keyup', function(e) {
		e = e || window.event;
		if (e && e.keyCode == 27) {
			This.hide();
		}
	});
}

DHTMLPopup.prototype = {
	toString : function(){return '[object DHTMLPopup]';},
	show : function(top){
		this.popup.style.top = top + "px";
		$(document).on('mousedown', $.proxy(this.hide, this));

		$(this.popup).on('mousedown', function(e) {
			e.stopPropagation();
		});
	},
	hide : function(){
		this.popup.style.top = "-3000px";
	},
	loadContent : function(HTMLObject){
		this.inner.innerHTML = HTMLObject.innerHTML;
		equalButtons(this.inner);
	},
	getInner : function(){
		return this.inner;
	},
	clear : function(){
		this.inner.innerHTML = "";
	},
	top : function(height){
		this.popup.style.top = $(document).scrollTop()+($(window).height()-height)/2+"px";
		$(window).on('mousedown', $.proxy(this.hide, this));
		$(this.popup).on('mousedown', function(e) {
			e.stopPropagation();
		});
	},
	top : function(){
		this.popup.style.top = $(document).scrollTop()+($(window).height()-this.popup.offsetHeight)/2+"px";

		$(document).on('mousedown', $.proxy(this.hide, this));
		$(this.popup).on('mousedown', function(e) {
			e.stopPropagation();
		});
	},
	insertAjaxLoader : function() {
		this.loader = document.createElement('div');
		this.loader.className = 'loader2';
		this.loader.style.height = (this.inner.offsetHeight-2) + 'px';
		this.loader.style.width = (this.inner.offsetWidth-2) + 'px';
		this.inner.appendChild(this.loader);
	},
	removeAjaxLoader : function() {
		if (this.loader) {
			this.loader.parentNode.removeChild(this.loader);
		}
	},
	insertSuccessLoader : function() {
		this.removeAjaxLoader();
		this.success = document.createElement('div');
		this.success.className = 'success-loader';
		this.success.style.height = (this.inner.offsetHeight-2) + 'px';
		this.success.style.width = (this.inner.offsetWidth-2) + 'px';
		this.inner.appendChild(this.success);
		var This = this;
		setTimeout(function() {This.clear();This.hide()},1500);
	}
}

/* Notice: Copied from Dropdown.js */
function Dropdown(itemList, container, defaultIndex, submitFunction, fixposition) {
	this.container = container;

	this.domref = document.createElement("div");
	this.domref.className = 'dropdown';

	this.headerNode = document.createElement("div");
	this.headerNode.className = 'header';
	this.headerAnchor = document.createElement("a");
	this.headerAnchor.href = '#';
	this.domref.appendChild(this.headerNode).appendChild(this.headerAnchor);

	this.headerNode.onkeypress = $.proxy(function(e) {
		e = e || window.event;
		var currentIndex, newIndex;
		if ($(this.domref).hasClass('dropped') && this.currentlyHoveredItem) {
			currentIndex = this.currentlyHoveredItem.itemIndex;
		}else{
			currentIndex = this.selectedIndex;
		}
		var ch = String.fromCharCode(e.charCode || e.keyCode).toLowerCase();
		if (/^[\u0020-\uffff]$/.test(ch)) {
			if (this.itemList[currentIndex].title.charAt(0).toLowerCase() === ch &&
				currentIndex+1 < this.itemList.length &&
				this.itemList[currentIndex+1].title.charAt(0).toLowerCase() === ch) {
				newIndex = currentIndex+1;
			}else{
				for (var i=0 ; i<this.itemList.length ; i++) {
					if (this.itemList[i].title.charAt(0).toLowerCase() === ch) {
						newIndex = i;
						break;
					}
				}
			}
		}
		if (typeof newIndex !== 'undefined') {
			if ($(this.domref).hasClass('dropped')) {
				this.setHoveredItem(this.ul.childNodes[newIndex]);
			}else{
				this.setActiveIndex(newIndex);
			}
		}
	}, this);

	this.headerNode.onkeydown = $.proxy(function(e) {
		e = e || window.event;
		var currentIndex, newIndex;
		if ($(this.domref).hasClass('dropped') && this.currentlyHoveredItem) {
			currentIndex = this.currentlyHoveredItem.itemIndex;
		}else{
			currentIndex = this.selectedIndex;
		}
		switch (e.keyCode) {
		case 38: /* Arrow up */
		case 37: /* Arrow left */
		case 63232:
			newIndex = currentIndex - 1;
			e.preventDefault();
			break;
		case 40: /* Arrow down */
		case 39: /* Arrow right */
		case 63233:
			newIndex = currentIndex + 1;
			e.preventDefault();
			break;
		case 33: /* Page up */
		case 63276:
			newIndex = currentIndex - 10;
			e.preventDefault();
			break;
		case 34: /* Page down */
		case 63277:
			newIndex = currentIndex + 10;
			e.preventDefault();
			break;
		case 36: /* Home */
			newIndex = 0;
			e.preventDefault();
			break;
		case 35: /* End */
			newIndex = this.itemList.length - 1;
			e.preventDefault();
			break;
		case 13:
			if ($(this.domref).hasClass('dropped')) {
				this.setActiveIndex(currentIndex);
				/* Fall through */
			} else {
				if (submitFunction) {
					if (this.selectElement && this.selectElement.form) {
						this.selectElement.form.submit();
						submitFunction(this.selectElement.form);
					}
				}
			}
		case 27:
			this.unDrop();
			return;
		default:
			return;
		}
		if (newIndex >= this.itemList.length) {
			newIndex = this.itemList.length-1;
		}
		if (newIndex < 0) {
			newIndex = 0;
		}
		if ($(this.domref).hasClass('dropped')) {
			this.setHoveredItem(this.ul.childNodes[newIndex]);
		}else{
			this.setActiveIndex(newIndex);
		}
	}, this);

	this.itemList = itemList;

	this.ul = document.createElement("ul");
	this.ul.className = 'dropdownList';
	if (fixposition) {
		this.ul.style.position = 'fixed';
	}

	for (var i=0 ; i<this.itemList.length ; i++) {
		var item = this.itemList[i];

		var a = document.createElement("a");
		a.className = item.className || '';
		a.onclick = function(e) {
			e.preventDefault();
		};

		var li = document.createElement("li");
		li.itemIndex = i;
		li.className = 'notSelected';

		if (item.invisible) {
			li.className += ' invisible';
		}

		if (BO.ie || BO.opera) {
			li.unselectable = a.unselectable = "on";
		}
		this.ul.appendChild(li).appendChild(a).appendChild(document.createTextNode(item.title));
	}
	defaultIndex = defaultIndex || 0;
	this.setActiveIndex(defaultIndex);

	this.domref.onmouseover = this.domref.onmouseout = this.domref.onmousedown = this.domref.onmouseup =
		this.ul.onmouseover = this.ul.onmousedown = this.ul.onmouseup = $.proxy(this.eventHandler, this);

	if (BO.ie) {
		e.stopPropagation();
		this.domref.ondragstart = this.domref.onselectstart =
			this.ul.ondragstart = this.ul.onselectstart = e.preventDefault();
		this.ul.ondblclick = this.ul.onclick;
	}

	if (BO.opera) {
		this.headerNode.unselectable = this.headerAnchor.unselectable = this.domref.unselectable = this.ul.unselectable = 'on';
	}

	this.domref.onclick = function(e) {
		e.stopPropagation();
		return e.preventDefault();
	};

	this.ul.onclick = this.ul.ondblclick = $.proxy(function(e) {
		e = e || window.event;
		var target = e.target || e.srcElement;
		this.headerAnchor.focus();
		e.stopPropagation();
		return e.preventDefault();
	}, this);
	if (this.container) {
		this.container.appendChild(this.domref);
	}
}

Dropdown.fromSelect = function(select, submitFunction, fixposition) {
	/* For webkit browsers we will used -webkit-appearance: textarea; */
	if (BO.webkit) {return;}
	var itemList = [];
	for (var i=0 ; i<select.options.length ; i++) {
		var option = select.options[i];
		itemList.push({
			className: option.className,
			value: option.value,
			title: ((option.firstChild ? option.firstChild.nodeValue : option.value) || '').replace(/\s/g, "\u00a0")
		});
	}
	var dropdown = new Dropdown(itemList, null, select.selectedIndex, submitFunction, fixposition);
	dropdown.domref.style.width = select.offsetWidth + (BO.safari ? 10: 3) + 'px';
	select.parentNode.insertBefore(dropdown.domref, select);
	select.style.display = 'none';
	dropdown.onChange = function(newValue) {
		select.value = newValue;
	};
	dropdown.selectElement = select;
	return dropdown;
};

Dropdown.prototype = {
	setActiveId : function(id, triggerOnChange) {
		for (var i=0 ; i<this.itemList.length ; i++) {
			if (id === this.itemList[i].id) {
				this.setActiveIndex(i, triggerOnChange);
				return;
			}
		}
		this.setActiveIndex(0, triggerOnChange); /* ID not recognized, select first index */
	},

	setActiveIndex : function(index, triggerOnChange) {
		if (typeof this.selectedIndex !== 'undefined') {
			if (this.selectedIndex === index) {
				return;
			}
			this.headerAnchor.removeChild(this.headerAnchor.firstChild);
			var currentlySelectedItem = this.ul.childNodes[this.selectedIndex];
			$(currentlySelectedItem).removeClass('selected').addClass('notSelected');
		}
		var previouslySelectedIndex = this.selectedIndex;
		this.selectedIndex = index;
		var selectedItem = this.ul.childNodes[this.selectedIndex];
		$(selectedItem).removeClass('notSelected').addClass('selected');
		this.value = this.itemList[this.selectedIndex].id;
		this.headerAnchor.appendChild(document.createTextNode(this.itemList[this.selectedIndex].title));

		if (previouslySelectedIndex !== this.selectedIndex && triggerOnChange !== false) {
			if (this.onChange) {
				this.onChange(this.itemList[this.selectedIndex].value);
			}
		}
	},

	setHoveredItem : function(hoveredItem) {
		if (this.currentlyHoveredItem) {
			$(this.currentlyHoveredItem).removeClass('hover');
		}

		this.currentlyHoveredItem = hoveredItem;
		$(this.currentlyHoveredItem).addClass('hover');

		if (this.currentlyHoveredItem.offsetTop < this.ul.scrollTop) {
			this.ul.scrollTop = this.currentlyHoveredItem.offsetTop + (BO.opera ? 0 : 1);
		}else if (this.currentlyHoveredItem.offsetTop > this.ul.offsetHeight + this.ul.scrollTop - this.itemHeight + (BO.opera ? 1 : 2)) {
			this.ul.scrollTop = this.currentlyHoveredItem.offsetTop - this.ul.offsetHeight + this.itemHeight + (BO.opera ? 1 : 2);
		}
	},

	drop : function() {
		var $domref = $(this.domref);
		if (this.blurTimeout) {
			clearTimeout(this.blurTimeout);
			delete this.blurTimeout;
			return;
		}
		$domref.addClass('dropped');

		this.ul.style.width = this.domref.offsetWidth + 'px';

		if (this.itemList.length > 10) {
			this.ul.style.height = 1.2 * 10 + 'em';
		}

		document.body.appendChild(this.ul);

		this.itemHeight = this.ul.firstChild.offsetHeight;
		this.numItemsPerPage = Math.floor(this.domref.offsetHeight / this.itemHeight);

		this.ul.style.left = $domref.offset().left + 2 + 'px';
		this.ul.style.top = $domref.offset().top + this.domref.offsetHeight + 1 + 'px';

		if (BO.ie6) { /* Blergh. Set width on each dropdown item explicitly, otherwise the LIs won't receive events in IE6 */
			this.ie6width = this.ie6width || (this.ul.clientWidth - 2);
			var lis = this.ul.getElementsByTagName("li");
			for (var i=0 ; i<lis.length ; i++) {
				lis[i].style.width = this.ie6width + 'px';
			}
		}

		/* Use header anchor as a focus hack */
		this.headerAnchor.focus();

		this.headerAnchor.onblur = $.proxy(function() {
			this.unDrop();
		}, this);

		this.setHoveredItem(this.ul.childNodes[this.selectedIndex]);
	},

	unDrop : function() {
		if (this.ignoreNextUndrop) { /* In Opera, this.headerAnchor gets blurred onmouseup for now reason */
			delete this.ignoreNextUndrop;
			return;
		}
		if (this.blurTimeout) {
			return;
		}else{
			this.blurTimeout = setTimeout($.proxy(function() {
				delete this.blurTimeout;
				var $domref = $(this.domref);
				if ($domref.hasClass('dropped')) {
					$domref.removeClass('dropped');
					document.body.removeChild(this.ul);
				}
			}, this), 20);
		}
	},

	toggleDrop : function() {
		if ($(this.domref).hasClass('dropped')) {
			this.unDrop();
		}else{
			this.drop();
		}
	},

	eventHandler : function(e) {
		e = e || window.event;
		var target = e.target || e.srcElement;
		var targetContainer;
		if (/^(?:li|div)$/i.test(target.nodeName)) {
			targetContainer = target;
		}else if (target.nodeName.toLowerCase() === 'a') {
			targetContainer = target.parentNode;
		}
		if (targetContainer === this.headerNode) {
			var $headerNode = $(this.headerNode);
			if (e.type === 'mouseover') {
				$headerNode.addClass('hover');
			}else if (e.type === 'mouseout') {
				$headerNode.removeClass('hover');
			}else if (e.type === 'mousedown' || e.type === 'dblclick') {
				this.toggleDrop();
			}else if (BO.opera && e.type === 'mouseup' && target === this.headerAnchor) {
				this.ignoreNextUndrop = true;
				return false;
			}
		}else if (targetContainer && targetContainer.nodeName.toLowerCase() === 'li') {
			if (e.type === 'mousedown' || e.type === 'dblclick' || e.type === 'mouseup') {
				this.setActiveIndex(targetContainer.itemIndex);
				this.unDrop();
			}else if (e.type === 'mouseover') {
				this.setHoveredItem(targetContainer);
			}
		}else if (e.type === 'mousedown' || e.type === 'dblclick' && target === this.ul) {
			setTimeout($.proxy(function() {
				if (this.blurTimeout) {
					clearTimeout(this.blurTimeout);
					delete this.blurTimeout;
				}
			}, this), 0);
			this.headerAnchor.focus();
			return true;
		}
		e.stopPropagation();
		return false;
	},

	destruct : function() {
		this.ul = this.container = this.domref = this.headerNode = this.domref.onkeydown =
			this.domref.onmouseover = this.domref.onmouseout = this.domref.onmousedown = this.domref.onmouseup =
			this.ul.ondblclick = this.ul.onmouseover = this.ul.onmousedown = this.ul.onmouseup = this.onChange = null;
	}
};

MobileMenu.prototype = {
	toString : function(){return '[object MobileMenu]';},
	overlay : null,
	
	applyOpenMenuBehaviour : function() {
		$(this.openButton).on('click', $.proxy(this.openMenu, this));
	},
	
	openMenu : function() {
		$(this.menu).addClass('mobileMenu');
		this.overlay = document.createElement('div');
		this.overlay.id = 'overlay';
		this.overlay.style.height = $(document).height() + 'px';

		$(this.overlay).on('click', $.proxy(this.closeMenu, this));

		document.getElementsByTagName('body')[0].appendChild(this.overlay);
		var lis = this.menu.getElementsByTagName('li');
		for (var i = 0; i < lis.length ; i++) {
			var curLi = $(lis[i]);
			var submenu = curLi.children('span.submenu');

			if(submenu.length > 0 && ! curLi.hasClass('expandable')) {
				curLi.addClass('expandable');
				var This = this,
					link = curLi.children('a').first();
				link.on('click', function(e) {
					This.openSubmenu(e, this);
				});
			}
		}
	},
	
	openSubmenu : function(e, link) {
		e = e || window.event;
		e.preventDefault();
		e.stopPropagation();
		var li = link.parentNode;
		if (!$(li).hasClass('expanded')) {
			$(li).addClass('expanded');
			var This = this;
			$(link).on('click.openSubmenu', function(e) {
				This.closeSubmenu(e, this);
				$(this).off('click.openSubmenu');
			});
		}
	},
	
	closeSubmenu : function(e, link) {
		e = e || window.event;
		e.preventDefault();
		e.stopPropagation();
		$(link.parentNode).removeClass('expanded');
	},
	
	closeMenu : function() {
		this.overlay.parentNode.removeChild(this.overlay);
		$(this.menu).removeClass('mobileMenu');
	}
}
function MobileMenu(buttonId, menuId) {
	this.openButton = document.getElementById(buttonId);
	this.menu = document.getElementById(menuId);
	this.applyOpenMenuBehaviour();
}

function scrollToInitContent(title) {
	var element = $('#' + title);
	window.scroll(0, parseInt(element.offset().top));
}

function hashScroll() {
	var hash = location.hash;
	if (hash && hash.length > 2 && hash.substring(1, 2) == 's') {e
		var value = parseInt(hash.substring(2));
		if (value != NaN) {
			if (BO.ie8) {
				setTimeout(function(){window.scroll(0, value);},0);
			} else {
				window.scroll(0, value);
			}
		}
	}
}
function debounce(fn, delay) {
	var timer = null;
	return function () {
		var context = this, args = arguments;
		clearTimeout(timer);
		timer = setTimeout(function () {
			fn.apply(context, args);
		}, delay);
	};
}
function getX(e) {
	var touches = e.changedTouches;
	if (touches) {
		if (touches.length == 1) {
			return touches[0].pageX;
		}
	} else if (e.pageX) {
		return e.pageX;
	} else {
		return event.clientX + document.body.scrollLeft;
	}
}
function getY(e) {
	var touches = e.changedTouches;
	if (touches) {
		if (touches.length == 1) {
			return touches[0].pageY;
		}
	} else if (e.pageY) {
		return e.pageY;
	} else {
		return event.clientY + document.body.scrollTop;
	}
}
function applyJSLayoutBehaviour() {
	
	var header = document.getElementById('head-container');

	if(header) {
		var headerHeight = header.offsetHeight;

		$('#websiteLink, #emailLink, #cloudLink, #domainLink').on('click', function() {
			var navigateTo = this.id.match(/([A-Z]?[^A-Z]*)/g).slice(0,-1)[0];
			scrollTo.smooth(navigateTo + 'Title', headerHeight);
		});
	}
}

function activationSMSresend() {
	var resendContainer = $('.updateAndResendCode'),
		tryagain = $('.activation-sms-tryagain');

	if (resendContainer.length) {
		tryagain.click(function(e) {
			e.preventDefault();
			resendContainer.toggleClass('hide hidden');
		});
	}
}

$(function() {
	applyJSLayoutBehaviour();
	activationSMSresend();
});

(scrollTo.smooth = function(id, offset){
	
	//Clear any other scroll animation if exists
	clear();
	function clear(){
		clearInterval(scrollTo.interval);
	}
	
	//Attach clear to user scroll
	$(window).on('DOMMouseScroll mousewheel', clear);
	
	//define
	var pattern	 = [],
		obj		 = document.getElementById(id),
		start	   = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop,
		end		 = offset ? obj.offsetTop - offset : obj.offsetTop,
		distance	= end - start + 1,
		isDownwards = (distance > 0),
		speed	   = 15,
		splitInt	= BO.ie ? 4 : 7,
		stopLimit   = 0.1,
		intLoop	 = 0;
		
	//Create scroll easing pattern
	for(var i = 0; i < 100; i++){
		
		var curDistance = (distance / splitInt);
		
		if((isDownwards && curDistance > stopLimit) || (!isDownwards && curDistance < -stopLimit)){
			pattern.push(curDistance);
		}else{
			distance = 0;
		}
		
		distance = distance - curDistance;
	}
	
	//Set interval to go thrugh pattern array
	scrollTo.interval = setInterval(function(){
		
		if( intLoop == pattern.length-1){
			distance = end - start;
			clear();
		}else{
			distance += pattern[intLoop++];
		}
		window.scroll(0, start + distance);
	}, speed);
});

;
/*
(function ( $, window, document, undefined ) {
  	"use strict";
  	var clickOk = true;
  	var oldInput = '';

    var pluginName = 'domainSearch',
        defaults = {
        	textAvailable: 'is available',
        	textUnavailable: 'not available',
        	textMore: 'More extensions',
        	searchLimit : 5,
        	excludeByFormParent: [],
        	excludeByContainer: []
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
    	element.autocomplete = 'off';
        this.element = $(element);
        this.options = $.extend( {}, defaults, options);
        this.tldObject = this.getTLDList();
        this.pluginName = pluginName;
        this.expandedSearch = false;
        this.isCustomerAdmin = false;
        this.cadminSidemenu = null;
        this.cadminSidemenuInitHeight = null;
        this.init();
    }

    Plugin.prototype.init = function () {
    	if( ! this.exclude()) {
    		this.buildResultsContainer();
			this.addEvents();

			if( $('.customeradmin').get(0) ) {
				this.isCustomerAdmin = true;
				this.cadminSidemenu = $('.sideMenu.domainList');
			}
    	}
    };

    Plugin.prototype.exclude = function() {
    	var that = this;
    	var exclude = false;

    	$.each( this.options.excludeByFormParent, function() {		
    		if (typeof this == 'string') {
				if( that.element.parent( 'form'+this ).length ) {
	    			exclude = true;
	    		} 
    		}
    	});

    	$.each(this.options.excludeByContainer, function() {
    		if (that.element.parents(this).length) {
    			exclude = true;
    		}
    	});
    	return exclude;
    }


    Plugin.prototype.calcSidebarMenu = function() {
    	if( this.isCustomerAdmin ) {
    		var resultsContainer = this.cadminSidemenu.find('.domainSearchResultContainer').first(),
				resultsContainerHeight = resultsContainer.is(':visible') ? resultsContainer.outerHeight() : 0;

    		var height = this.cadminSidemenu.css('height','').outerHeight() + resultsContainerHeight;

			this.cadminSidemenu.height( height );
    	}
    };

    Plugin.prototype.addEvents = function() {
    	var $this = this;
        this.element.on('keyup.domainSearch input.domainSearch', $.proxy(this.checkInput, this));

		this.resultsContainer.delegate('div:not(:has(p.more))', 'click.domainSearch', $.proxy(this.selectDomain, this));
    	this.resultsContainer.delegate('div:has(p.more)', 'click.domainSearch', $.proxy(this.loadMore, this));

		$(document).delegate('', 'click', function(e) {
    		if(!$this.element.is(e.target) && !$this.element.siblings().is(e.target) && !$this.resultsContainer.is(e.target) && $this.resultsContainer.has(e.target).length === 0 && !$(e.target).hasClass('more')) {
    			//$this.resultsContainer.hide();
    			//$this.calcSidebarMenu();
    		}
    	});

    	$(window).on('touchstart', function(e) {
    		if($(e.target) !== $this.element) {
    			$this.element.blur();
    		}	
    	});

    	this.element.closest('form').on('submit.domainSearch', function() {
    		var form = $(this);
    		var input = form.find('[name="extraDomainName"]');

    		if(input.val() == '') {
    			return false;
    		}
    	});

    	this.element.closest('form').find('[name="extraDomainName"]').bind('focus.' + this.pluginName, $.proxy(this.styleResultsContainer, this));
        $(window).bind('resize.' + this.pluginName, $.proxy(this.styleResultsContainer, this));
    };

    Plugin.prototype.preventClickBleeding = function(method) {
    	if(clickOk) {
	  		clickOk = false;
			setTimeout(function() {
				clickOk = true;
			}, 500);  		

	  		if(method) {
	  			method();
	  		}
    	}
    };

    Plugin.prototype.checkInput = function(forceUpdate) {
    	var searchString = this.element.val();

  		if(searchString.length > 1) {
	  		if(oldInput !== searchString || forceUpdate == true) {

	  			var domain = this.getRawDomain ( searchString );

	  			this.clearResultsView();
	  			this.buildResultsView( domain, this.resultsContainer.show(), 0, this.options.searchLimit );
		  		this.setTimer(this);
		  		oldInput = searchString;	  			
	  		}
  		} else {
  			this.resultsContainer.hide();
  		}

  		//this.calcSidebarMenu();
  	};

    Plugin.prototype.checkAvailability = function(domain) {
    	var promise = $.Deferred();
    	$.post('/test-domain.do', { domain: domain.toLowerCase() }, function(result) {
    		console.log(result);
    		promise.resolve({ 'available': result.available, 'domain': result.domain});
    	}, "json").fail(function() {
    		promise.reject(false);
    	});
    	return promise;
    };



	Plugin.prototype.checkAvailability = function (domain) {
    var promise = $.Deferred();
    var bool = false;

    $.ajax({
            url: '/ajax-domain-search.do',
            type: 'POST',
            dataType: 'json',
            data: {keyword: domain.toLowerCase(), type: 1 },
            success: function(result) {
                console.log(result);                                 
            }
            /*complete: function () {
                deferred.resolve(trueOrFalse(bool));
            }
	    });

	    return promise;
	}
    Plugin.prototype.checkDomains = function() {
		var $this = this,
    		domains = this.resultsContainer.find('span.domain'),
    		statusMaxWidth = 0,
    		resultsContainerWidth = this.resultsContainer.innerWidth();

    	$.each(domains, function(key, domainObject) {
    		domainObject = $(domainObject);

    		$this.checkAvailability(domainObject.text()).done(function(result) {
    			var availabilityClass = result.available ? 'available' : 'unavailable',
    				availabilityText = result.available ? $this.options.textAvailable : $this.options.textUnavailable,
    				statusContainer = domainObject.siblings('.statusContainer'),
    				statusContainerWidth;
    			
    			domainObject.text(result.domain && result.avaible == true);
    			statusContainer.find('.img').addClass(availabilityClass)
    			statusContainer.find('.status').addClass(availabilityClass).text(availabilityText);
    			statusContainer.css('margin-top', (domainObject.height()-statusContainer.height())/2 + 'px');

    			statusContainerWidth = statusContainer.outerWidth();

    			if(statusContainerWidth > statusMaxWidth) {
    				statusMaxWidth = statusContainerWidth;
    			}

    			domains.css({'max-width' : (resultsContainerWidth - statusMaxWidth - 50) + 'px'});
    	 	}); 
    	});
    };

    Plugin.prototype.setTimer = function() {
    	var timer;
    	return function($this) {
    		window.clearTimeout(timer);
    		timer = window.setTimeout(function() {
	   			$this.checkDomains();
	    	},600);
    	};
    }();

   
    Plugin.prototype.buildResultsContainer = function() {
    	var parent = this.element.parent(),
    		container = $('<div class="domainSearchResultContainer"></div>'),
    		results = $('<div id="searchResults"></div>');

    	this.resultsContainer = container;
    	this.styleResultsContainer();

    	parent.append(container);
    };

    Plugin.prototype.buildResultsRow = function(searchString, tld) {
		var $this = this,
			subContainer = $('<div></div>'),
			textContainer = $('<p></p>'),
			spanSearchString = $('<span class="domain"></span>').text(searchString + tld),
			spanStatusContainer = $('<span class="statusContainer"></span>'),
			spanAvailability = $('<span class="status"></span>'),
			spanAvailabilityIcon = $('<span class="img"></span>');

		textContainer.append(spanSearchString).append(spanStatusContainer.append(spanAvailabilityIcon).append(spanAvailability));
		subContainer.append(textContainer);

		return subContainer;
    };

    Plugin.prototype.buildResultsView = function(searchString, callback, startPointer, endPointer) {
    	var $this = this,
    		row,
    		domainFields,
    		startPointer = startPointer || 0,
    		endPointer = endPointer || $this.tldObject.length;

    	$.each(this.tldObject, function(key, tld) {
    		if( key >= startPointer && key < endPointer ) {
	    		row = $this.buildResultsRow(searchString, tld);
	    		$this.resultsContainer.append(row);
    		}
    	});

    	// Get the value from a checked checkbox
		var domainInputText = $( "input[type=text][name=extraDomainName]" ).val();
		console.log(domainInputText);

    	var moreContainer = $('<div></div>'),
    		moreLabel = $('<p></p>').text(this.options.textMore).addClass('more');

    	if( ! this.expandedSearch) {
	     	this.resultsContainer.append(
	    		moreContainer.append(moreLabel)
	    	);   		
	    }

	    this.expandedSearch = false;

  		domainFields = this.resultsContainer.find('span.domain');
		domainFields.css('width', Math.max.apply(Math, $.map(domainFields, function(e) {
			return $(e).outerWidth() + 40;
		})));

		if(callback) {
			callback;
		}
    };

    Plugin.prototype.styleResultsContainer = function() {
    	var parent = this.element.parent();

    	this.resultsContainer.css({
    		'width': parent.innerWidth(),
 			'border-width': parent.css('border-left-width'),
    		'margin-left': '-' + parent.css('border-left-width'),
    		'margin-top': this.element.innerHeight()
    	});
    };

    Plugin.prototype.loadMore = function(e) {
    	var $this = this;
    	
    	this.preventClickBleeding(function() {
    		var domain = $this.getRawDomain( $this.element.val() );

    		$this.expandedSearch = true;
    		$this.resultsContainer.children('div').last().hide();
    		$this.buildResultsView( domain, false, $this.options.searchLimit );

    		$this.checkDomains();
    	});

    	//$this.calcSidebarMenu();
    };

    Plugin.prototype.getRawDomain = function( searchString ) {
		if( searchString.match(/\./) ) {
			searchString = searchString.split('.')[0];
		}

		return searchString;
    };

    Plugin.prototype.selectDomain = function(e) {
		var $this = this;
		this.preventClickBleeding(function() {
			$this.element.val($(e.currentTarget).find('span.domain').text());
			$this.element.closest('form').find('[type="submit"]').click();
		});					
		return false;
    };

    Plugin.prototype.clearResultsView = function() {
    	this.resultsContainer.children().remove();
    };
    
    Plugin.prototype.getTLDList = function() {
    	var tlds = [],
    		options = $('#extraDomainSuffix').first().find('option').slice(1);

    	$.each(options, function(key, option) {
    		tlds.push(option.value);
    	});

    	return tlds;
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
            }
        });
    }

})( jQuery, window, document );*/
