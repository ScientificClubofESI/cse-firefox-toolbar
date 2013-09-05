/*
	csetoolbar.js file 
	created on Saturday, August 31st, 2013 at 23:26
	by BETTA Mohamed Islem
	bettamedislem@gmail.com
*/


function CSETB_Search(event, type)
	{

		/*
			CSETB_Search function
			This function performs a search in the cse website
			if the SearchBox is empty it loads the cse default URL (HomePage) 
		*/		
		
		var URL = ""; // using this variable to holding on the URL

		var isEmpty = false; // is the SearchBox Empty or not? initially is false we suppose that the user will search for a word

		// Get a handle to our search terms box (the <menulist> element)

		var searchTermsBox = document.getElementById("CSETB-Search-Textbox");
    
		// Get the value in the search terms box, trimming whitespace as necessary using the CSETB_TrimString() function
		// See farther down in this file for details on how it works.

		var searchTerms = CSETB_TrimString(searchTermsBox.value);

		if(searchTerms.length == 0) // Is the search terms box empty?
		isEmpty = true;             // If so, set the isEmpty flag to true
		else                        // If not, convert the terms to a URL-safe string
		searchTerms = CSETB_ConvertTermsToURI(searchTerms);

		// Now switch on whatever the incoming type value is
		// If the search box is empty, we simply redirect the user to cse homepage
		// if not perform a full search.

		switch(type)
		{

			// Build up the URL
			case "word":
			if(isEmpty) { URL = "http://cse-club.org/"; }
			else        { URL = "http://cse-club.org/?s=" + searchTerms; }
			break;
		
		}

		// Load the URL in the browser window using the CSETB_LoadURL function
		CSETB_LoadURL(URL);
		CSETB_Add();

	}


	function CSETB_TrimString(string)
	{

		/*
			CSETB_TrimString function
			This function trims all leading and trailing whitespace from the incoming string 
			and convert them into one 
			whitespace; the new string is returned 
		*/

		// If the incoming string is invalid, or nothing was passed in, return empty
		if (!string)
		return "";
		
		string = string.replace(/(^\s*)|(\s*$)/g,""); // Remove leading and trailing whitespace
		string = string.replace(/\s+/g, ' '); // Replace all whitespace runs with a single space
		return string; // Return the altered value

	}


	function CSETB_ConvertTermsToURI(terms)
	{
		
		/*
			CSETB_ConvertTermsToURI
			This function converts an incoming string of search terms
			to a safe value for passing into a URL
		*/

		// Create an array to hold each search term
		var termArray = new Array();

		// Split up the search term string based on the space character
		termArray = terms.split(" ");

		// Create a variable to hold our resulting URI-safe value
		var result = "";

		// Loop through the search terms
		for(var i=0; i<termArray.length; i++)
		{

			// All search terms (after the first one) are to be separated with a '+'
			if(i > 0)
			result += "+";

			// Encode each search term, using the built-in Firefox function
			// encodeURIComponent().
			result += encodeURIComponent(termArray[i]);
		}

		return result; // Return the result

	}



	function CSETB_LoadURL(url)
	{
		
		/*
			CSETB_LoadURL
			This function loads the specified URL in the browser (new tab)
		*/
		gBrowser.selectedTab = gBrowser.addTab(url);
	}

	function CSETB_KeyHandler(event)
	{
	
		/*
			CSETB_KeyHandler
			This function checks if the [enter] button was pressed
			if yes; it loads the CSETB_Search function and as parameters the text in SearchBox
		*/
		
		// Was the key that was pressed [ENTER]? If so, perform a web search.
		if(event.keyCode == event.DOM_VK_RETURN)
		CSETB_Search(event, 'word');

	}

	function CSETB_Add()
	{

		/* 
			CSETB_Add
			This function save the historic search terms
		*/

			var fhService = Components.classes["@mozilla.org/satchel/form-history;1"].getService(Components.interfaces.nsIFormHistory2);
			fhService.addEntry("searchHistory", document.getElementById("CSETB-Search-textbox").value);

	}
