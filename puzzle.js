// Kenner Luoma
$(function() {
  const $cell = $(`#puzzle td`),
    $cellImage = $(`#puzzle img`),
    cellSize = 100;
  let imgSrc = `images/rock.jpg`,
    $empty, inv,
    valid = false;
  const puzzleWidth = $(`#puzzleGrid`).width();
  $(`<div id="options"></div>`).insertAfter($(`#puzzle`));
  const $options = $(`#options`);
  $options.css({
    maxWidth: puzzleWidth,
    margin: `1.5rem auto`
  });
  let START = 0,
    PLAY = 1,
    WIN = 2,
    gameState = START;
  update();

  function update() {
    switch (gameState) {
      case START:
        newGame();
        break;
      case PLAY:
        playGame();
        break;
      case WIN:
        winGame();
        break;
    }
  }

  function newGame() {
    $cell.empty();
    $options.html(`<p>Enter the URL of an image, or start with the default image</p><div class="input-group"><input type="text" id="image-input" placeholder="Enter image URL"/><button id="submit">Submit</button></div><button id="start">Start</button>`);
    $(`.input-group`).css({
      display: `flex`,
      margin: `0 0 0.5rem`
    });
    $(`#image-input`).css({
      flex: `1`
    });
    $(`button`).css({
      height: `2rem`,
      padding: `0 1rem`,
      borderRadius: `0`
    });
    const $submitBtn = $(`#submit`),
      $startBtn = $(`#start`);
    let submit = function() {
      imgSrc = $(`#image-input`).val();
      setup();
    };
    $submitBtn.click(submit);
    $(`#image-input`).keypress(function() {
      if (event.which == 13) submit();
    });
    $startBtn.click(function() {
      setup();
      do {
        shuffle();
        check();
      } while (!valid);
      if (valid) {
        gameState = PLAY;
        update();
      }
    });
  }

  function playGame() {
    $options.html(``);
    $cell.click(function(e) {
      e.preventDefault();
      $(this).moveCell();
      check();
      solved();
    });
  }

  function winGame() {
    $options.html(`<p>Wow! You did it!</p><button id="restart">Play Again?</button>`);
    $(`button`).css({
      height: `2rem`,
      padding: `0 1rem`,
      borderRadius: `0`
    });
    $(`#restart`).click(function() {
      gameState = 0;
      update();
    });
  }

  function setup() {
    $(`td`).html(`<div class="image"><img height="${cellSize*4}" width="${cellSize*4}" src="${imgSrc}"></div>`);
    $(`.image`).css({
      position: `relative`,
      overflow: `hidden`,
      width: `${cellSize}px`,
      height: `${cellSize}px`
    });
    let i = 0;
    while (i <= $cell.length) {
      let alt;
      if (i === 0) {
        alt = `empty`;
        $(`td img:eq(${i})`).attr(`alt`, alt).attr(`src`, `images/empty.jpg`);
      } else {
        alt = i;
        $(`td img:eq(${i})`).attr(`alt`, alt).css({
          position: `absolute`,
          top: `${Math.floor(i/4)*-cellSize}%`,
          left: `${i%4*-cellSize}%`,
          zIndex: `10`
        });
      }
      i++;
    }
    return $empty = $(`img[alt="empty"]`);
  }

  function shuffle() {
    const $image = $(`#puzzle img`),
      $images = $image.get(),
      randArray = $.map($images, function() {
        const rand = Math.floor(Math.random() * $images.length),
          randItem = $($images[rand]).clone(true)[0];
        $images.splice(rand, 1);
        return randItem;
      });
    $image.each(function(i) {
      $(this).replaceWith($(randArray[i]));
    });
    return $empty = $(`img[alt="empty"]`);
  }

  function check() {
    let altRay = [];
    altRay = $(`#puzzle img`).map(function() {
      const $alt = $(this).attr(`alt`);
      if ($alt != `empty`) {
        return parseInt($alt);
      }
    }).toArray();
    let i = 0;
    for (let j = 0; j < altRay.length; j++) {
      for (let k = j + 1; k < altRay.length; k++) {
        if (altRay[k] && altRay[j] && altRay[j] > altRay[k])
          i++;
      }
    }
    const $emptyRow = $empty.closest(`tr`);
    if (i % 2 === 0 && $emptyRow.is(`:odd`) ||
      i % 2 === 1 && $emptyRow.is(`:even`)) {
      valid = true;
    } else {
      valid = false;
    }
    return inv = i;
  }

  function solved() {
    if (inv === 0 && $(`#puzzle img`).first().is($empty)) {
      $(`#puzzleGrid`).addClass(`win`);
      $empty.attr(`src`, imgSrc).css({
        position: `absolute`,
        top: 0,
        left: 0,
        zIndex: `10`
      });
      gameState = WIN;
      update();
    }
  }
  (function($) {
    $.fn.moveCell = function() {
      const $emptyCell = $empty.parents(`.image`),
        $img = $(this).children(`.image`),
        imgX = $img.position().left,
        imgY = $img.position().top,
        distX = $emptyCell.position().left - imgX,
        distY = $emptyCell.position().top - imgY;
      if (Math.abs(distX) + Math.abs(distY) === 0) {
        $options.html(`<p>Put the picture back in order. Click on a tile adjacent to the empty tile to move it into the empty space.</p>`)
      } else if (Math.abs(distX) + Math.abs(distY) <= cellSize) {
        $options.empty();
        $img.css({
          position: `absolute`,
          top: imgY,
          left: imgX
        });
        $img.animate({
          top: `+=${distY}`,
          left: `+=${distX}`
        }, 100, function() {
          $img.css({
            position: `relative`,
            top: 0,
            left: 0
          });
        });
        $emptyCell.parent().append($img);
        $(this).append($emptyCell);
      }
    }
  })($);
});
