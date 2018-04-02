    var timer;
      let levelsNodes = document.querySelectorAll(".levels-menu a");
            console.log(levelsNodes);
    var Memory = {
         
          init: function(cards){
            this.game = document.querySelector("#game");
            this.secondsAmount = 0;
            this.minutesAmount = 0;
            this.card1 = "";
            this.card2 = "";
            this.card1id = "";
            this.card2id = "";
            this.card1flipped = false;
            this.card2flipped = false;
            this.flippedTiles = 0;

            this.gameStartScreen = document.querySelector("#startScreen");
            this.gameCardsBackChanger = document.querySelector("#gameCardsBackChangermy");
            this.gameWrapper = document.createElement("div");
            this.gameContents = document.createElement("div");
            this.gameWrapper.appendChild(this.gameContents);
            this.gameMessages = document.createElement("div");
            this.gameTimer =document.createElement("div");
            
            //this.startScreen();
            this.startScreenEvents();
            this.levelsNodes = document.querySelectorAll(".levels-menu a");
            //console.log(levelsNodes);
    },

          /*startScreen: function(){
            this.gameStartScreenHTML = '<h1>Match-match game</h1>\
              <section class="gamerules">\
                <p>On each turn, a player turns over any two cards (one at a time).</p>\
                <p>If they successfully match a pair they disappear, and the player gets another turn.</p>\
                <p>When a player turns over two cards that do not match, those cards are turned face down again (in the same position).</p>\
                <p>The trick is to remember which cards are where.</p>\
                <p>The person with all pairs matched wins!</p>\
              </section>\
              <h2>Choose difficulty of the game</h2>\
                <ul class="levels-menu">\
                  <li><a href=# data-level="1">Low 2*2</a></li>\
                  <li><a href=# data-level="2">Medium 4*3</a></li>\
                  <li><a href=# data-level="3">Hard 4*4</a></li>\
                </ul>';
            this.gameStartScreen.innerHTML = this.gameStartScreenHTML;
            this.game.appendChild(this.gameStartScreen);
            this.startScreenEvents();
      
          },*/


          startScreenEvents: function() {
             let levelsNodes = document.querySelectorAll(".levels-menu a");
             let length = levelsNodes.length;
             console.log(levelsNodes, length);
               for ( let i = 0;  i < length; i++ ) {
                  let levelNode = levelsNodes[i];
                  this.startScreenEventsHandler(levelNode);
                }
                
          },

          startScreenEventsHandler: function(levelNode) {
              let self = this;
              levelNode.addEventListener( "click", function(e) {
                  self.setupCardsBackScreen(this);

              });
          },

          setupCardsBackScreen: function(levelNode) {
              this.level = levelNode.getAttribute("data-level");
              this.gameStartScreen.classList.add("visability-hidden");

              //this.gameStartScreen.parentNode.removeChild(this.gameStartScreen);
             // this.game.appendChild(this.gameCardsBackChanger);
              this.cardsBacksScreen();
          },

          cardsBacksScreen: function(){
              this.gameStartScreen.classList.add("visability-hidden");

              this.gameCardsBackChanger.classList.remove("visability-hidden");
              //this.game.appendChild(this.gameCardsBackChanger);
              this.startCardsBackEvents();

        },

          startCardsBackEvents: function() {
                let cardsBacks = this.gameCardsBackChanger.querySelectorAll(".cardsBacks-menu li");
                let length = cardsBacks.length;
                for ( let i = 0;  i < length; i++ ) {
                  let cardBack = cardsBacks[i];
                  this.cardsBacksHandler(cardBack);
                }
          },

          cardsBacksHandler: function(cardBack) {
                let self = this;
                cardBack.addEventListener( "click", function(e) {
                    self.setupGameWrapper(this);      
                });
          },

          setupGameWrapper: function(cardBack) {
                this.cardBack = cardBack.getAttribute("data-cardBack");
                this.gameCardsBackChanger.parentNode.removeChild(this.gameCardsBackChanger);
                this.game.appendChild(this.gameWrapper);
                this.buildTiles();
          },

           buildTiles: function(){
                  if (this.level===1){this.numTiles = 4;}
                  else if (this.level===2){this.numTiles = 8;}
                  else if (this.level===3){this.numTiles = 16;}
              this.shuffle(cards);   
              this.halfNumTiles = this.numTiles/2;
              this.newCardsArray = [];
                  for ( let i = 0; i < this.halfNumTiles; i++ ) {
                    this.newCardsArray.push(cards[i], cards[i]);
                  }
              this.shuffle(this.newCardsArray);
              this.tilesHTML = '';
                for ( let i = 0; i < this.numTiles; i++  ) {
                   if (this.cardBack===1){this.tilesHTML += ' <div class="container"><div class="card" id="' + this.newCardsArray[i]["id"]+'">\
                   <span class="front back1" id="cardFront"></span>\
                    <span class="back"><img src="' + this.newCardsArray[i]["img"] + '"></span>\
                    </div></div>';}
                    else if (this.cardBack===2){this.tilesHTML += ' <div class="container"><div class="card" id="' + this.newCardsArray[i]["id"]+'">\
                   <span class="front back2" id="cardFront"></span>\
                    <span class="back"><img src="' + this.newCardsArray[i]["img"] + '"></span>\
                    </div></div>';}
                    else if (this.cardBack===3){this.tilesHTML += ' <div class="container"><div class="card" id="' + this.newCardsArray[i]["id"]+'">\
                   <span class="front back3" id="cardFront"></span>\
                    <span class="back"><img src="' + this.newCardsArray[i]["img"] + '"></span>\
                    </div></div>';}
                }
        
              this.gameContents.innerHTML = this.tilesHTML;
              this.gamePlay();
      
          },

             gamePlay: function() {
              let tiles = document.querySelectorAll(".card");
              let length = tiles.length;
              for (let i = 0; i < length; i++) {
                let tile = tiles[i];
                this.gamePlayEvents(tile);
              };
             this.setGameTimer();
           
            
            },

            gamePlayEvents: function(tile) {
                let self = this;
                tile.addEventListener( "click", function(e) {
                  if (!this.classList.contains("flipped")) {
                    if (self.card1flipped === false && self.card2flipped === false) {
                      this.classList.add("flipped");
                      self.card1 = this;
                      self.card1id = this.getAttribute("id");
                      self.card1flipped = true;
                    } else if( self.card1flipped === true && self.card2flipped === false ) {
                      this.classList.add("flipped");
                      self.card2 = this;
                      self.card2id = this.getAttribute("id");
                      self.card2flipped = true;
                      if ( self.card1id === self.card2id ) {
                        self.gameCardsMatch();
                      } else {
                        self.gameCardsMismatch();
                        }
                      }
                  }
                });
        
              },

          gameCardsMatch: function() {
            let self = this;
            setTimeout( function(){
              self.card1.classList.add("correct");
              self.card2.classList.add("correct");
            }, 300 );

            setTimeout( function(){
              self.card1.classList.remove("correct");
              self.card2.classList.remove("correct");
              self.card1.classList.add("hide");
              self.card2.classList.add("hide");
              self.gameResetVars();
              self.flippedTiles = self.flippedTiles + 2;
              if (self.flippedTiles ===self.numTiles) {
                self.winGame();
              }
            }, 1500 );

          },

            gameCardsMismatch: function() {
              let self = this;
              setTimeout( function(){
                self.card1.classList.remove("flipped");
                self.card2.classList.remove("flipped");
                self.gameResetVars();
              }, 900 );
            },


              gameResetVars: function() {
              this.card1 = "";
              this.card2 = "";
              this.card1id = "";
              this.card2id = "";
              this.card1flipped = false;
              this.card2flipped = false;

                },

              winGame: function(){
                  let self=this;
                  this.gameContents.parentNode.removeChild(this.gameContents);
                  this.gameMessagesHTML = '<h2 class="congratulations">You won!</h2>\
                    <p>You made it in '+this.minutesAmount+'minutes and ' + this.secondsAmount + ' seconds! Lucky you are)</p>\
                    <button id="restart-button" class="buttonPlay">New game?</button>';
                  this.gameMessages.innerHTML = this.gameMessagesHTML;
                  this.game.appendChild(this.gameMessages);
                  document.getElementById("restart-button").addEventListener( "click",  function(e) {
                    self.resetGame();
                   });

              },
               
              shuffle: function(arr){
                  let counter = arr.length;
                  let temp;
                  let index;
                       while (counter > 0) {
                      index = Math.floor(Math.random() * counter);
                      counter--;
                      temp = arr[counter];
                      arr[counter] = arr[index];
                      arr[index] = temp;
                    }
                    return arr;
                },

              setGameTimer: function(){
                  this.secondsAmount++;
                    if (this.secondsAmount===60){
                      this.minutesAmount++;
                      this.secondsAmount=0;
                    }
                  this.gameTimerHTML = `<span>Timer: ${this.minutesAmount}: ${this.secondsAmount}</span>`;
                  this.gameTimer.innerHTML = this.gameTimerHTML;
                  this.gameContents.appendChild(this.gameTimer);
                  timer=setTimeout(this.setGameTimer.bind(this),1000); 
              },

              clearTimer: function(){
                clearTimeout(timer);
              },


               resetGame: function() {
                this.clearTimer();
                this.gameTimer.parentNode.removeChild(this.gameTimer);
                this.gameMessages.parentNode.removeChild(this.gameMessages);
                this.init();
              }

      };

    var cards = [
      {
        img: "img/dog-1.png",
        id: 1,
      },
      {
        img: "img/dog-2.png",
        id: 2
      },
      {
        img: "img/dog-3.png",
        id: 3
      },
      {
        img: "img/dog-4.png",
        id: 4
      }, 
      {
        img: "img/dog-5.png",
        id: 5
      },
      {
        img: "img/dog-6.png",
        id: 6
      },
      {
        img: "img/dog-7.png",
        id: 7
      },
      {
        img: "img/dog-8.png",
        id: 8
      },
    ];
    
  Memory.init(cards);




  //document.getElementById('restart').addEventListener('click', startGame);