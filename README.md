# Slider Puzzle
Completing this assignment depends on knowing:

- Basic JavaScript: variables, functions, conditionals
- jQuery: DOM traversal, adding/removing items from the DOM, setting/getting attributes, & iteration

## Intro
In this assignment we will make an image slider puzzle using jQuery. Open the HTML file in a browser and you’ll see the puzzle, but it doesn’t do anything yet. You will need to set up the behavior to allow the pieces of the puzzle to move into the open space when the image is clicked on. When the images are all in the correct spot, the puzzle should update to show a green win border around the puzzle and replace the empty image with the missing image piece. You should also disable the click behavior.

### Requirements
Puzzle Behavior:

- Images can only move left, right, up, or down
- Images can only move into the open spot in the puzzle (cell with the "empty" image)
- Show a *help* message if clicks on the “empty” image tile or an image tile that cannot be moved. The message should explain what they did wrong and what to do instead.
- When the puzzle is solved (images are all in the correct order from 1-15):
  - replace the empty image with the missing image piece (image 16)
  - change the puzzle border from brown to green by applying the win style to the puzzle grid
  - disable the click behavior that attempts to slide the image pieces
- Add a reset button to the page that will mix up the puzzle so that it can be solved again

JavaScript Code:

- Use the module pattern to keep things out of global scope
- Use functions to break down the functionality into small tasks
- Practice good coding standards with clear variable and function names, use $ for variables that will hold jQuery objects, use ES6 `let` and `const` instead of `var`


## Extras
The following are extras that you can add to the *working* game to earn you up to 5 bonus  points. Bonus points will not be earned for projects that are not functional or do not meet the listed requirements.  

### Help
Add hint buttons:

1. A button to show/hide the completed image so that the player can see what the final result looks like.
2. A button to show/hide the image numbers (found in alt text) over the images.  The image number is found in the alt text for the image.  Do NOT show anything for the empty image.  

### Extraordinary Win
Do something extra special when the puzzle is solved.  Something more than a “You win” message or changing the color.  Something that requires more than just a line or two of code.  Perhaps floating balloons or confetti, sound, or shooting rainbows.  We haven’t really talked about these things, so you’ll have to do some research for this one.  Be sure to only use resources you have rights to use and add any attributions to a footer in the HTML.

### Additional Puzzle
Add additional images to create different puzzles to solve.  Provide a list so the player can choose between the available puzzles.  This puzzle is made from a photo I took of my cats and chopped up using MS Paint - very low tech.  Don't infringe on any copyrights here.  Use your own "safe-for-work/school" images or provide attribution for ones that allow free non-commercial use.
