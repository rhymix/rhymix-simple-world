jQuery(function($)
{
	"use strict";

	/* adjust the width of the right member menu */
	var menu_width = function()
	{
		if($('#layout_gnb>ul>li:first-child').width() > 50)
		{
			$('#layout_gnb>ul>li:first-child .layout_dropdown-content, #layout_gnb>ul>li:first-child .layout_dropdown-content a').css('width', $('#layout_gnb>ul>li:first-child').width()).css('min-width', $('#layout_gnb>ul>li:first-child').width());
		}
	}

	$( window ).resize(function()
	{
		if($('#layout_gnb>ul>li:first-child').width() > 50)
		{
			menu_width();
		}
	});

	menu_width();

	/* mobile hamburger menu toggle */
	$(".layout_mobile_menu").each(function()
	{
		$( this ).click(function( event )
		{
			event.preventDefault();
			layout_toggleMenuOpener( $( this ).get(0) );
		});
	});

	/* detect scrolling up or down to hide or show the hamburger menu */
	var previousScroll = 0;
	var simpleScrolled = false;
	var scrollThreshold = 5;

	/* detect window scrolling */
	$( window ).scroll(function()
	{
		simpleScrolled = true;
	});

	/* refresh window scrolling per 250 ms, and show/hide the menu */
	setInterval(function()
	{
		if (simpleScrolled) {
			display_menu();
			simpleScrolled = false;
		}
	}, 250);

	/* function to show/hide the menu */
	var display_menu = function()
	{
		var currentScroll = $(window).scrollTop();

		if (currentScroll > previousScroll)
		{
			if($("#layout_menu_toggle").css( 'position' ) === 'fixed')
			{
				$("#layout_menu_toggle").fadeOut();
			}
		}
		else
		{
			if($("#layout_menu_toggle").css( 'position' ) === 'fixed')
			{
				$("#layout_menu_toggle").fadeIn(400, function() {
					$("#layout_menu_toggle").css('display', '')
				});
				;
			}
		}
		previousScroll = currentScroll;
	}

	/* keyboard accessibility for dropdown menu */
	$(".layout_dropdown").each(function()
	{
		$( this ).focusin( function( event )
		{
			$('*[data-dropdown="active"]').css('display', '').attr('data-dropdown', '').parents('li.layout_dropdown').removeClass('layout_focus');
			$( this ).addClass('layout_focus');
			$( this ).find("ul.layout_dropdown-content").css('display', 'block').attr('data-dropdown', 'active');
		});
	});

	$('body').focusin(function( event )
	{
		if (!$(event.target).parents('.layout_dropdown').is('.layout_dropdown'))
		{
			$('*[data-dropdown="active"]').css('display', '').attr('data-dropdown', '').parents('li.layout_dropdown').removeClass('layout_focus');
		}
	});
	/* keyboard accessibility for dropdown menu END */

	function layout_toggleMenuOpener(obj)
	{
		if(obj.classList.contains("is-active") === true)
		{
			var targetMenu = $(obj).attr('data-target');
			$('#' + targetMenu).slideUp('300', function()
			{
				$(this).css('display', '');
			});

			obj.classList.remove("is-active");
		}
		else {
			var targetMenu = $(obj).attr('data-target');
			if(targetMenu == 'layout_gnb')
			{
				$('#layout_gnb>ul>li:first-child .layout_dropdown-content, #layout_gnb>ul>li:first-child .layout_dropdown-content a').css('width', '').css('min-width', '');
				$('html,body').animate({scrollTop:0}, 200);
			}
			$('#' + targetMenu).slideDown('300');

			obj.classList.add("is-active");
		}
	}

	function layout_toggleDarkmode() {
		if(layout_darkmode_enabled != 'Y') return;
		
		if(getCookie('is_darktheme') !== 'N') {
			setCookie('is_dark_theme', null, new Date('Thu, 01 Jan 1970 00:00:01 GMT'));
			setCookie('is_darktheme', 'N');
			$('.layout_frame').removeClass('layout_darkmode');
		}
		else {
			setCookie('is_dark_theme', true);
			setCookie('is_darktheme', 'Y');
			$('.layout_frame').addClass('layout_darkmode');
		}
	}
	// Language Select
	$('.layout_language>.toggle').click(function()
	{
		$('.selectLang').toggle();
	});
	
	/* mobile hamburger menu toggle */
	if(layout_darkmode_enabled == 'Y') {
		$(".layout_darkmode_toggle").each(function()
		{
			$( this ).click(function( event )
			{
				event.preventDefault();
				layout_toggleDarkmode( );
				location.reload();
			});
		});
	}
	// Dark-mode toggle
	if (((window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) || (getCookie('is_dark_theme'))) && getCookie('is_darktheme') != 'N' && layout_darkmode_enabled == 'Y') {
		if ( !getCookie('is_dark_theme') || !(getCookie('is_darktheme') == 'Y' || getCookie('is_darktheme') == 'N') ) {
			setCookie('is_dark_theme', true);
			setCookie('is_darktheme', 'Y');
			location.reload();
		}
		$('.layout_frame').addClass('layout_darkmode');
	}
});

// Dark-mode toggle
if (getCookie('is_dark_theme') == true && getCookie('is_darktheme') == 'Y' && document.querySelector("meta[name='color-scheme']").getAttribute('content') == 'light dark') {
	var css = "body { background: black; }",
	head = document.head || document.getElementsByTagName('head')[0],
	style = document.createElement('style');
	head.appendChild(style);

	style.type = 'text/css';
	if (style.styleSheet){
		style.styleSheet.cssText = css;
	} else {
		style.appendChild(document.createTextNode(css));
	}
}