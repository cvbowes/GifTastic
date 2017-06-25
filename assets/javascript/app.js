$(document).ready(function() {
	var topics = ["cold", "ice", "glacier", "penguin", "antarctica", "polar bear", "balto", "canada", "snow", "frozen"];
	
	function renderButtons() {
		$("#topics-display").empty();

		for (var i = 0; i < topics.length; i++) {
			var newButton = $("<button>").text(topics[i]).attr("data-topic", topics[i]).addClass("topic-button");
			$("#topics-display").append(newButton);
		}
	}

	function renderGifs() {
		$("#gifs-display").empty();

		var topic = $(this).attr("data-topic");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topic + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
        	url: queryURL,
        	method: 'GET'
        }).done(function(response) {

        	console.log(response);

        	var results = response.data;

        	for (var i = 0; i < results.length; i++) {
        		var topicDiv = $("<div>");
        		var rating = $("<p>").html("Rating: " + results[i].rating);
        		var still = results[i].images.fixed_height_still.url;
        		var animate = results[i].images.fixed_height.url;
        		//sets still image as initial source, saves still and animated URLs for laters
        		var topicImg = $("<img>").addClass("gif").attr({"src": still, "data-still": still, "data-animate": animate, "data-state": "still"});
        		
        		topicDiv.append(topicImg).append(rating);
        		$("#gifs-display").append(topicDiv);
        	}
        })
	}

	function changeState() {
		var state = $(this).attr("data-state");

		if (state === "still") {
			$(this).attr("src", $(this).attr("data-animate"));
			$(this).attr("data-state", "animate");
		} else {
			$(this).attr("src", $(this).attr("data-still"));
			$(this).attr("data-state", "still");
		}
	}

	$(document).on("click", ".topic-button", renderGifs);

	$(document).on("click", ".gif", changeState);

	$("#add-search").on("click", function(event) {
		event.preventDefault();

		var topic = $("#user-search").val().trim();

		if (topics.indexOf(topic.toLowerCase()) === -1) {
			$("#user-search").val("");
			topics.push(topic);
			renderButtons();
		} else {
			alert("Enter a new search term!");
		}

	})

	renderButtons();
})

