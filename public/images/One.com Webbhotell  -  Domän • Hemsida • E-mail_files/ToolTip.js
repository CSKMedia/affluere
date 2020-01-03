/*
TOOL TIP CLASS
*/
$(function() {
	initTooltips();
});

/*
Runs through all inputs fields and checks for error / info messages.
If any is found a new ToolTip object is created
*/
function initTooltips(){
	if (!(getDisplayType() == 'mobile') && !(getDisplayType() == 'phablet')) {
		$('input').each(function() {
			var infoDiv = $("#info_" + this.id)[0];
			if(infoDiv){
				new ToolTip(infoDiv.innerHTML, this);
			}
		});
	}
}

/*
Creates the tooltip objects.
Takes info,error texts as parameters, and also domref, which is a reference to the input field
*/
function ToolTip(info,domref){
	this.domref = domref;
	this.$domref = $(this.domref);
	this.info = info;
	this.msgArea = null; // reference to the node which holds the infotext
	this.tooltip = null; // reference to the tooltip node
	this.tipwrapper = null; // reference to the node that wraps around input field and error/tip

	this.generate();
	this.insertMessage();

	this.$domref.on({
		"focus.ToolTip" : $.proxy(this.show, this),
		"blur.ToolTip" : $.proxy(this.hide, this)
	});

	$(window).on('resize.ToolTip, scroll.ToolTip', $.proxy(function() { this.domref.blur(); }, this));
}

ToolTip.prototype = {
	generate : function(){
		this.tooltip = document.createElement("div");
		$(this.tooltip).addClass("tooltip");
		var wrapper = document.createElement("div");
		wrapper.className = "wrapper";
		this.msgArea = document.createElement("div");
		var arrow = document.createElement("div");
		arrow.className = "arrow";

		wrapper.appendChild(this.msgArea);
		this.tooltip.appendChild(wrapper);
		this.tooltip.appendChild(arrow);
		document.getElementById("content").appendChild(this.tooltip);
		this.hide();
	},

	insertMessage : function(){
		var msg = '';
		if(this.info){msg += '<p>' + this.info + '</p>';}
		this.msgArea.innerHTML = msg;
	},

	show : function(){
		$(this.tooltip).removeClass("hide");
		this.tooltip.style.left = (this.domref.offsetLeft + (this.domref.offsetWidth - 40)) + "px";
		this.tooltip.style.top = ($(this.domref).position().top - this.tooltip.offsetHeight + 10) + "px";
	},

	hide : function(){
		$(this.tooltip).addClass("hide");
	},

	destroy : function(){
		this.$domref.off('focus.ToolTip').off('blur.ToolTip');
		$(window).off('resize.ToolTip');
		this.tooltip.parentNode.removeChild(this.tooltip);
	}
}