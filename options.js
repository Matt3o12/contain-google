function onOptionsPageSave(e)
{
	e.preventDefault();

	// Save settings
	browser.storage.sync.set({
		"ignore_youtube": document.querySelector("#ignore_youtube").checked,
		"ignore_searchpages": document.querySelector("#ignore_searchpages").checked,
		"ignore_maps": document.querySelector("#ignore_maps").checked,
		"ignore_flights": document.querySelector("#ignore_flights").checked,
		"whitelist_domains": document.querySelector("#whitelist_domains").value,
	});

	browser.runtime.reload();
}

function onOptionsPageLoaded()
{
	// Load saved settings or use defaults when nothing was saved yet
	var storageItem = browser.storage.sync.get();
	storageItem.then((res) =>
	{
		document.querySelector("#ignore_youtube").checked = res.ignore_youtube || false;
		document.querySelector("#ignore_searchpages").checked = res.ignore_searchpages || false;
		document.querySelector("#ignore_maps").checked = res.ignore_maps || false;
		document.querySelector("#ignore_flights").checked = res.ignore_flights || false;
		document.querySelector("#whitelist_domains").value = res.whitelist_domains || "";
	});
}

document.addEventListener("DOMContentLoaded", onOptionsPageLoaded);
document.querySelector("form").addEventListener("submit", onOptionsPageSave);
