$(document).ready(function()
{
	$(".menu-toggle").click(function(e) {
		e.preventDefault();
		$("#wrapper").toggleClass("toggled");
	});

	window.registerButtons = function()
	{
		$(".section-button").on("click", function(e)
		{
			e.preventDefault();
			var toLoad = $(this).attr("id") +".html";

			window.location.href = window.location.origin + "/content/" + toLoad;
		});
	}

	Prism.highlightAll();

	$("#sidebar-wrapper").load(window.location.origin + "/content/sidebar.html", function()
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

		var duration = Math.min(Math.max(100, dist), 500);

		$("html, body").animate({ scrollTop: st }, duration, function()
		{
			window.location.hash = id;
		});
	});
});
