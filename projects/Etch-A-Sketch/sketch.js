function get_random_color() {
    color_string = "#";
    hex_alphabet = ['1','2','3','4','5','6','7','8','9','0','A','B','C','D','E','F'];

    for (var i = 0; i < 6; i++) {
        color_string += hex_alphabet[Math.floor(Math.random() * 15)];
    }

    return color_string;
}

$(document).ready(function() {

    function buildDisplay(input) {
        var rows = input;
        var columns = input;

        for (var i = 0; i < rows; i++) {
            $(".game-container").append("<div class='row'></div>");
        }

        var row_height = $(".game-container").height() / rows;
        var row_width = $(".game-container").width() - parseFloat($(".game-container").css("padding"));
        $(".row").css("height", row_height);
        $(".row").css("width", row_width);

        for (var i = 0; i < columns; i++) {
            $(".game-container").children().append("<div class='box'></div>");
        }

        var box_margin = $(".box").css("margin");
        var box_padding = $(".box").css("padding");
        var box_border = $(".box").css("border-width");
        var spacing = 2 * (parseInt(box_margin) + parseInt(box_padding) + parseInt(box_border));
        var box_width = (row_width / columns) - spacing;
        var box_height = row_height - spacing;

        $(".box").css("width", box_width.toString());
        $(".box").css("height", box_height.toString());

        $(".box").hover(function() {
            $(this).css("background-color", "red");
        }, function() {
            $(this).css("background-color", "#333333");
        });
    };

    // Intialize page with a 40 x 40 grid
    grid = 40;
    buildDisplay(grid);

    // Functions to handle the various buttons
    $("#clear").click(function() {
        $(".game-container").empty();
        buildDisplay(grid);
    });

    $("#colorful").click(function() {
        $(".box").hover(function(){
            $(this).css("background-color", get_random_color());
        }, function(){
            $(this).css("background-color", get_random_color());
        });
    });

    $("#detailed").click(function() {
        $(".game-container").empty();
		buildDisplay(grid);
		$(".box").css("opacity",0);

		$(".box").hover(function() {
			$(this).css("opacity", function() {
				return parseFloat($(this).css("opacity")) + 0.2;
			});
		});
	});

    $("#change-resolution").click(function() {
        while (true) {
            input = prompt("Enter a grid size from 1-100.");
            if (input > 0 & input <= 100) {
                grid = input;
                break;
            }
            else {
                alert("Please enter a valid number from 1-100.");
            }
        }
        $(".game-container").empty();
        buildDisplay(input);
    });
});
