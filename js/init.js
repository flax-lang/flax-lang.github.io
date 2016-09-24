$(document).ready(function()
{
	window.getActualBasePath = function()
	{
		if(window.location.origin == "file://")
			return "../";

		else
			return window.location.origin;
	}

	window.registerButtons = function()
	{
		$(".section-button").on("click", function(e)
		{
			e.preventDefault();
			var toLoad = $(this).attr("id") +".html";

			window.location.href = window.getActualBasePath() + "/content/" + toLoad;
		});
	}

	$(".menu-toggle").click(function(e)
	{
		e.preventDefault();
		$("#wrapper").toggleClass("toggled");
	});

	var currentHash = window.location.hash;
	$(document).scroll(function()
	{
		$(".anchor-clicker").each(function()
		{
			var top = window.pageYOffset;
			var distance = top - $(this).offset().top;
			var hash = $(this).prev().attr("id");

			// 30 is an arbitrary padding choice,
			// if you want a precise check then use distance===0
			if(distance < 30 && distance > -30 && currentHash != hash)
			{
				// modern shit
				window.history.pushState(null, null, '#' + hash);
				currentHash = hash;
			}
		});
	});


	$("#sidebar-wrapper").load(window.getActualBasePath() + "/content/sidebar.html", function()
	{
		registerButtons();
	});

	$(".subcontent-header").on("click", function(e)
	{
		e.preventDefault();
		var id = $(this).attr("id");
		var st = $(this).offset().top;

		var dist = $("html, body").scrollTop() - st;
		dist = Math.abs(dist);

		var duration = Math.min(Math.max(500, dist), 750);

		$("html, body").animate({ scrollTop: st }, duration, "easeOutCubic", function()
		{
			window.history.pushState(null, null, '#' + id);
		});
	});




	// do the thing
	{
		var id = window.location.href.substring(window.location.href.indexOf("#") + 1);
		var st = $("#" + id).offset().top;

		$("html, body").scrollTop(st);
		currentHash = id;
	}


	Prism.highlightAll();
});







