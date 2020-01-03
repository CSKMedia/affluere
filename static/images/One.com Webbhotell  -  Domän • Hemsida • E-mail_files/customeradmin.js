/**
 * Used by the blog
 * TODO: Remove when blog is discontinued EOM February 2019
 */
function setPrevNextBehaviour() {
	for (var i = 0; i < document.forms.length; i++) {
		thisForm = document.forms[i];
		var nextButton,ref;
		if (thisForm.className.indexOf('prevnextform') != -1) {
			inputs = thisForm.getElementsByTagName('input');
			for (var j = inputs.length-1; j > 0; j--) {
				thisInput = inputs[j];
				if ((thisInput.type == 'image' || thisInput.type == 'submit')) {
					if (thisInput.name.toLowerCase().indexOf('next') != -1) {
						nextButton = thisInput.cloneNode(false);
					}
					else{
						ref = thisInput;
					}
				}
			}
			ref.parentNode.insertBefore(nextButton,ref);
			$(nextButton).addClass('hiddenSubmitButton');
		}
	}
}

$(window).on('load', setPrevNextBehaviour);

function existingUserBehaviour() {
	newUserRadio = document.getElementById('newUserTrue');
	newUserLabel = document.getElementById('newUserTrueLabel')
	existingUserRadio = document.getElementById('newUserFalse');
	existingUserLabel = document.getElementById('newUserFalseLabel');
	if (newUserRadio && existingUserRadio && newUserLabel && existingUserLabel) {
		var submitButtonName = 'existingUserSwitchMethod';
		var submitButton = document.getElementById(submitButtonName);
		if (submitButton) {submitButton.style.display = 'none';} 
		newUserRadio.onclick = existingUserRadio.onclick = switchUserMethod;
	}
}
function switchUserMethod() {
	var submitInput = document.createElement("input");
	submitInput.setAttribute("name", "existingUserSwitchMethod");
	submitInput.setAttribute("type", "hidden");
	submitInput.setAttribute("value", "true");
	this.form.appendChild(submitInput);
	this.form.submit();
}

/**
 * @param {*} objHtmlElement 
 * @desc:
 * Used by global.js and various JS files throughout the system.
 */
function insertAjaxLoader(objHtmlElement) {
	var loader = document.createElement('div');
	loader.className = 'loader';
	loader.style.height = objHtmlElement.offsetHeight + 'px';
	loader.style.width = objHtmlElement.offsetWidth + 'px';
	objHtmlElement.insertBefore(loader, objHtmlElement.firstChild);
	return loader;
}

/**
 * 
 * @param {*} data 
 */
function parseStandardAjaxResponse(data) {
	if (data) {
		if( $(data).find('ajax-response').length ) {
			var response = data.getElementsByTagName('ajax-response')[0];
			if (response) {
				if (response.getAttribute('success')=='true') {
					return data.getElementsByTagName('result')[0].firstChild.nodeValue.replace(/^\s+|\s+$/g, '');
				}
			}			
		}
	}
}

/**
 * 
 * @param {*} text 
 * @param {*} onYesFunction 
 * @param {*} onNoFunction 
 * @param {*} yesParam 
 * @param {*} noParam 
 * @param {*} headerText 
 * @param {*} hideNoButton 
 * @desc: 
 * Used by customeredit.jsp
 */
function confirmYesNo(text, onYesFunction, onNoFunction, yesParam, noParam, headerText, hideNoButton) {

	if(yesParam) { yesText = yesParam; }
	if(noParam) { noText = noParam; }

	if (text && typeof onYesFunction === 'function'&& typeof onNoFunction === 'function' && yesText && noText) {
		if( ! BO.isMobile) {
			var existingPopup = document.getElementById('yes-no-confirm');
			if (existingPopup) {
				existingPopup.parentNode.removeChild(existingPopup);
			}
			var popup = new DHTMLPopup('yes-no-confirm');
			var inner = popup.getInner();
			
			var textParagraph = document.createElement('p');
			var header = document.createElement('h2');
			if (headerText) {
				header.innerHTML = headerText;
			}

			if (ko.isObservable(text)) {
				textParagraph.innerHTML = text();
			} else {
				textParagraph.innerHTML = text;
			}
			
			inner.appendChild(header);
			inner.appendChild(textParagraph);
			
			var buttonParagraph = document.createElement('p');
			//buttonParagraph.className = 'equalbuttons';
			buttonParagraph.className = 'popup-buttons';
			
			var yesButton = document.createElement('a');
			yesButton.className = 'button';
			if (ko.isObservable(yesText)) {
				yesButton.innerHTML = yesText();
			} else {
				yesButton.innerHTML = yesText;
			}

			var noButton = document.createElement('a');
			noButton.className = 'button';
			if (ko.isObservable(noText)) {
					noButton.innerHTML = noText();
			} else {
				noButton.innerHTML = noText;
			}
			
			if (!hideNoButton) {
				buttonParagraph.appendChild(noButton);
			}

			buttonParagraph.appendChild(yesButton);
			inner.appendChild(buttonParagraph);
			$(yesButton).on('click', function() {
				popup.hide();
				onYesFunction();
			});
			$(noButton).on('click', function() {
				popup.hide();
				onNoFunction();
			});

			popup.top();
			equalButtons(inner);			
		}
		else {
			if (confirm(text)) {
				onYesFunction();
			} else {
				onNoFunction();
			}
		}
	}
}

/**
 * 
 */
window.BO = window.BO || {
	ie: false /*@cc_on || true @*/,
	opera: !!self.opera,
	gecko: !!document.getBoxObjectFor,
	safari: !!document.childNodes && !document.all && !navigator.taintEnabled && !navigator.accentColorName
};

/**
 * 
 * @param {*} options 
 * @desc:
 * Used by wp.js and rushfiles-drive.js
 */
function handleStandardAjaxRequest(options) {
	options = options || {};
	var targetUrl = options.targetUrl;
	var successHandler = options.successHandler;
	var errorHandler = options.errorHandler;
	var content = options.content;
	$.ajax({
		type : 'POST',
		url : targetUrl,
		data : content,
		success : function(req) {
			var data = req;
			var response = data ? data.getElementsByTagName('ajax-response')[0] : null;
			if (data && response) {
				if (response.getAttribute('success')=='true') {
					if (successHandler != null && typeof successHandler == 'function') {
						successHandler(response.getElementsByTagName('result')[0]);
					}
				} else {
					if (errorHandler != null && typeof errorHandler == 'function') {
						errorHandler(response.getElementsByTagName('error'));
					} else {
						window.location = '/admin/error.do';
					}
				}
			} else {
				window.location = '/admin/error.do';
			}
		},
		error : function(req) {
			window.location = '/admin/error.do';
		}
	});
}

/**
 * @desc:
 * Disk usage bar on onePhoto, rushfiles and disk usage page
 */
function manipulateDiskUsageBar() {
	var usageObject = document.getElementById('unlocalizedUsage');
	var availableObject = document.getElementById('unlocalizedAvailable');

	if(usageObject && availableObject) {
		var usage = parseFloat(usageObject.value),
			availableSpace = parseFloat(availableObject.value),
			percentage = 0;

		percentage = (usage < availableSpace) ? ( (usage/availableSpace) * 100 ) : 100;
	
		$('.spaceusage #usageProgressBar > span').animate({
			'width' : percentage + '%'
		}, function() {
			if(percentage == 100) {
				$(this).parent().addClass('over-quota');
			}
		});		
	}
}

/**
 * @desc:
 * Function to sort the table
 */
;(function ( $, window, document, undefined ) {
  	"use strict";
    var pluginName = 'sortTable',
        defaults = {};

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = $(element);
        this.options = $.extend( {}, defaults, options);
        this.init();
    };
    Plugin.prototype.init = function() {
        this.thead = this.element.children('thead');
        this.tbody = this.element.children('tbody');
        this.rows = this.tbody.children('tr');

    	this.addEvents();

    	this.thead.children('tr').children('th').first().click();
    }
    Plugin.prototype.addEvents  = function() {
    	var This = this;
    	this.element.delegate('th:not(.notSortable)','click', function() {
    		if(This.setSortIndex(this)) {
	    		This.sortRows();
    		}
    		This.highlightIndex(this);
    		This.refresh();
    	});
    };
    Plugin.prototype.setSortIndex = function(elem) {
    	var elemIndex = $(elem).index();
    	if(this.sortIndex === elemIndex) {
    		this.rows = $(this.rows.get().reverse());
    		return false;
    	} else {
			this.sortIndex = elemIndex;
    	}	
    	return true;
    };
    Plugin.prototype.sortRows = function() {	
    	var rows = this.rows.get().sort($.proxy(this.sortByIndex, this));
    	this.rows = $(rows);
    };
    Plugin.prototype.refresh = function() {
    	this.tbody.append(this.rows);
    };
    Plugin.prototype.sortByIndex = function(a, b) {
    	return $(a).children().get(this.sortIndex).innerHTML > $(b).children().get(this.sortIndex).innerHTML ? 1 : -1;
    };
    Plugin.prototype.highlightIndex = function(elem) {
    	var $elem = $(elem);
    	if($elem.hasClass('asc') || $elem.hasClass('desc')) {
    		$elem.toggleClass('asc desc');
    	} else {
   			this.thead.find('th').removeClass('asc desc');
    		$elem.addClass('asc'); 		
    	}	
    };
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, 
                new Plugin( this, options ));
            }
        });
    }
})( jQuery, window, document );

/**
 * @desc:
 * 
 */
function applySubscriptionInvoices() {
	var links = $('a.details-invoices');
	if(links.length > 0) {
		var popup = new DHTMLPopup('invoices-popup', 'invoicesPopup'),
			request;

		links.on('click', function(e) {
			e.preventDefault();
			var invoices,
				domain = $(this).parent().siblings().first().text();	

			request = $.ajax({
				type : 'POST',
				url : this.href,
				beforeSend : function() {
					popup.hide();
					popup.clear();
					popup.top();
					popup.insertAjaxLoader();
				}
			});
			request.done(function(response) {
				var invoices = $(response).find('fieldset#invoices');
				invoices.find('h2').append(' - ' + domain);

				if(invoices) {
					popup.removeAjaxLoader();
					popup.loadContent(invoices[0]);
				}
			});
		});		
	}
}

/**
 * 
 * @param {*} element 
 * @param {*} message 
 */
function deletePrompt(element, message) {
	$(element).on('click', function() {
		if( ! confirm(message)) {
			return false;
		}
		return true;
	});
}

/**
 * 
 */
;(function ( $, window, document, undefined ) {
  	"use strict";

    var pluginName = 'truncate',
        defaults = {
        	maxWidth : null,	// Sets a max allowed width of the text container
        	maxChars : null,	// Sets a max allowed amount of chars in the string
        	type     : 'end',	// Where to truncate from: start, center, end (currently only center is implemented)
        	parent   : false, 	// Measure width of parent instead of the text element
        };

    function Plugin( element, options ) {
        this.element = element;
        this.$element = $(element);
        this.options = $.extend( {}, defaults, options);

        this.originalText = this.element.innerHTML;
        this.text = this.originalText;

        this.cutIndex = 1;

        this.init();
    }

    Plugin.prototype.init = function () {
		if (this.options.maxWidth || this.options.maxChars) {
			if (this.options.maxWidth < this.$element.width() || this.options.maxChars > this.element.innerHTML.length) {
				this['truncate_' + this.options.type]();
			}
		}
    };

    Plugin.prototype.truncate_center = function() {
    	var totalLength = this.originalText.length;
    	var middle = Math.ceil(totalLength / 2);

    	var startCut = Math.floor(this.cutIndex/2);
    	var endCut = Math.ceil(this.cutIndex/2);

    	this.truncate(middle-startCut, this.cutIndex+endCut);
    };

    Plugin.prototype.truncate_start = function() {

    };

    Plugin.prototype.truncate_end = function() {

    };

    Plugin.prototype.truncate = function(start, end) {
    	this.text = this.originalText.substring(0, start) + '...' + this.originalText.substring(end);
		this.update();
    };

    Plugin.prototype.update = function() {
    	this.element.innerHTML = this.text;

    	this.cutIndex++;

    	if (this.options.maxWidth) {
	     	var currentWidth = (this.options.parent) ? this.$element.parent().width() : this.$element.width();
	    	if (currentWidth > this.options.maxWidth) {
	    		this['truncate_' + this.options.type]();
	    	}   		
    	}
    };


    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, 
                new Plugin( this, options ));
            }
        });
    }

})( jQuery, window, document );

/**
 * 
 */
function onScreenResize(){

	var displayType 		= getDisplayType();

	// Actions depending on devicetype
	if (displayType == 'mobile' || displayType == 'phablet') {

        $('.globalDomainSearchInput').attr('placeholder', $('#globalSearchHintShort').val());

	} else {

		if ( displayType == 'tablet' || displayType == 'desktop') {
			$('.globalDomainSearchInput').attr('placeholder', $('#globalSearchHintShort').val());
		}

		if (displayType == 'widescreen') {
            $('.globalDomainSearchInput').attr('placeholder', $('#globalSearchHint').val());
		}
	}
}

/**
 * 
 */
function guestuserToggles() {
	var guestuserOverview = $('.guestuser-overview');

	if (guestuserOverview.length) {
		var isRequesting = false,
			toggleButtons = $('.toggle'),
			activeStateTextYes = $('#textActiveYes').val(),
			activeStateTextNo  = $('#textActiveNo').val();


		toggleButtons.toggles({ text: { on: '', off: '' }, event : 'gtoggle.guestuseractivation', disabledRowStyle: true });

		toggleButtons.on('gtoggle.guestuseractivation', function(e) {
			e.stopPropagation();
			e.preventDefault();
			var $this = $(this),
				isEnabled = $this.data('toggles').active,
				parentRow = $this.closest('tr'),
				request = null;

			if ( ! isRequesting) {
				request =  $.ajax({
		    		type: 'GET',
		    		url: isEnabled ? 'ajax-activate-guestuser.do' : 'ajax-deactivate-guestuser.do',
		    		data: {
			    		guestUserEmail : parentRow.children('.email').children('span').text(),
			    		guestUserDomain : parentRow.children('.domain').children('span').text()
			    	},	
		    		dataType : 'xml',
		    		beforeSend: function() {
		    			isRequesting = true;
		    		}
	    		});

				request.done(function(response) {
		    		var xml = $(response),
		    			responseStatus = xml.find('ajax-response').attr('success');

		    		if(responseStatus == 'true') {
		    			parentRow.find('td.active').text( isEnabled ? activeStateTextYes : activeStateTextNo );
		    		}

		    		isRequesting = false;
				});					
			}
		});		
	}
}

/**
 * 
 */
function multiSubscriptionToggles() {
	var toggleButtons = $('.newsletterSubscription .toggle');

	if (toggleButtons.length > 0) {
		toggleButtons.toggles({ 
			text: { on: '', off: '' }, 
			event : 'radioToggle',
			disabledRowStyle : true
		});

		toggleButtons.on('radioToggle', function() {
			var $this = $(this);
			var data = {};

			data[$this.data('radio')] = $this.data('toggles').active;

			$this.trigger('togglesAjax', {
				ajax_url : '/admin/ajax-mail-subscription.do',
				ajax_data : data,
			});
		});
	}
}

/**
 * 
 */
function bindingTogglesAjax() {
	var standardSettings = {
		ajax_url : null,
		ajax_type : 'POST',
		ajax_data : {},
		ajax_onDone : function() {},
		ajax_onFail : function() {},
	};
	$('.toggle').bind('togglesAjax', function(e, customSettings) {
		var $this = $(this);
		var options = $.extend({}, standardSettings, customSettings || {});

		if(options.ajax_url) {
			var request = $.ajax({
				type : options.ajax_type,
				url : options.ajax_url,
				data : options.ajax_data
			});

			request.done(function() {
				options.ajax_onDone();
			});

			request.fail(function() {
				options.ajax_onFail();
			});
		}
	});	
}

if(typeof jQuery != 'undefined') {
	(function($) {
		$(function() {

			bindingTogglesAjax();
			applySubscriptionInvoices();
			guestuserToggles();
			multiSubscriptionToggles();
			manipulateDiskUsageBar();

			$(window).on('load resize', function() { 
				onScreenResize();
			});

			// Submits a form when pressing Enter key.
			$('form input').keypress(function(e) {
				if(e.keyCode === 13) {
					e.preventDefault();
					$(this).closest('form').find('[type="submit"]:not(#Reset)').last().trigger('click');
				}
			});

			$('table.sortable').sortTable();
		});	
	})(jQuery);
}

/**
 * 
 */
;(function ( $, window, document, undefined ) {
  	"use strict";
  	var clickOk = true;
  	var oldInput = '';

    var pluginName = 'listToSelect',
        defaults = {
        	firstLabel: '--- Select ---',
        	hide: true
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;
        this.$element = $(element);
        this.options = $.extend( {}, defaults, options);
        this.pluginName = pluginName;
        this.init();
    }

    Plugin.prototype.init = function () {
		this.buildSelectView();
		this.destroyOriginalList();
		this.addEvents();
    };

    Plugin.prototype.addEvents = function() {
    	this.select.on('change', function() {
    		window.location = this.value;
    	});
    };

    Plugin.prototype.destroyOriginalList = function() {
    	$(this.element).remove();
    };

    Plugin.prototype.buildSelectView = function() {
    	var elementId = this.$element.attr('id');
    	var select = $('<select id="' + elementId + '" name="' + elementId + '" class="block"></select>'),
    		listElements = this.$element.children('li'),
    		emptyOption = $('<option>' + this.options.firstLabel + '</option>');

    	select.append(emptyOption);

    	listElements.each(function(index, elem) {
    		var link = $(elem).children('a').first(),
    			option = $('<option>' + link.text() + '</option>');
    		option.val(link.attr('href'));
    		select.append(option);
    	});
    	if(this.options.hide === true) {
    		select.addClass('hide');
    	}

    	select.insertAfter(this.$element);

    	this.select = select;
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, 
                new Plugin( this, options ));
            }
        });
    }

})( jQuery, window, document );