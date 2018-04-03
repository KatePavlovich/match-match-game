    let timer;
    let Memory = {
         
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
            this.startScreenEvents();
    },

          startScreenEvents: function() {
            this.gameStartScreen.classList.remove("visability-hidden");
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
              console.log(this.level);
              this.gameStartScreen.classList.add("visability-hidden");
              this.cardsBacksScreen();
          },

          cardsBacksScreen: function(){
              this.gameCardsBackChanger.classList.remove("visability-hidden");
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
                //this.gameCardsBackChanger.parentNode.removeChild(this.gameCardsBackChanger);
                this.gameCardsBackChanger.classList.add("visability-hidden");
                this.game.appendChild(this.gameWrapper);
                
                this.buildTiles();
          },

          buildTiles: function(){
              this.level *=1;
              this.cardBack *=1;
              let cback='back1';

              switch(this.level) {
                case 1:
                this.numTiles = 4;
                break;
                case 2:
                this.numTiles = 8;
                break;
                default:
                this.numTiles = 16;
              }

              this.shuffle(cards);   
              this.halfNumTiles = this.numTiles/2;
              this.newCardsArray = [];
                  for ( let i = 0; i < this.halfNumTiles; i++ ) {
                    this.newCardsArray.push(cards[i], cards[i]);
                  }
              this.shuffle(this.newCardsArray);
              this.tilesHTML = '';

              switch(this.cardBack) {
                  case 2:
                      cback='back2';
                      break;
                  case 3:
                    cback='back3';
              }

              for ( let i = 0; i < this.numTiles; i++  ) {
                  this.tilesHTML += `<div class="container"><div class="card" data-id="${this.newCardsArray[i]["id"]}">
                      <span class="front ${cback}" id="cardFront"></span><span class="back"><img src="${this.newCardsArray[i]["img"]}"></span></div></div>`;
                }
        
              this.gameContents.innerHTML = this.tilesHTML;
              this.gameContents.classList.add("gameContents-style");
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
                      self.card1id = this.getAttribute("data-id");
                      self.card1flipped = true;
                    } else if( self.card1flipped === true && self.card2flipped === false ) {
                      this.classList.add("flipped");
                      self.card2 = this;
                      self.card2id = this.getAttribute("data-id");
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

          winGame: function() {
                  let self=this;
                  //this.clearTimer();
                  this.gameContents.parentNode.removeChild(this.gameContents);
                  //this.gameTimer.parentNode.removeChild(this.gameTimer);
                  this.gameMessagesHTML = `<h2 class="congratulations">You won!</h2>
                  <p>You made it in ${this.minutesAmount} minutes and ${this.secondsAmount} seconds! Lucky you are)</p>
                    <button id="restart-button" class="buttonPlay">New game?</button>`;
                  this.gameMessages.innerHTML = this.gameMessagesHTML;
                  this.game.appendChild(this.gameMessages);

                  document.getElementById("restart-button").addEventListener( "click",  function(e) {
                    self.resetGame();
                   });
          },
               
          shuffle: function(arr) {
                  let counter = arr.length;
                  let index;
                       while (counter > 0) {
                      index = Math.floor(Math.random() * counter);
                      counter--;
                      [arr[counter], arr[index]]=[arr[index], arr[counter]];
                    }
                    return arr;
          },

          setGameTimer: function() {
              this.secondsAmount++;
                    if (this.secondsAmount===60){
                      this.minutesAmount++;
                      this.secondsAmount=0;
                    }
              this.gameTimerHTML = `<span>Timer: ${this.minutesAmount}: ${this.secondsAmount} </span>`;
              this.gameTimer.innerHTML = this.gameTimerHTML;
              this.gameContents.appendChild(this.gameTimer);
              timer=setTimeout(this.setGameTimer.bind(this),1000); 
          },

              clearTimer: function(){
                clearTimeout(timer);
              },


          resetGame: function() {
               this.clearTimer();
                //clearTimeout(timer);
               this.gameTimer.parentNode.removeChild(this.gameTimer);
                this.gameMessages.parentNode.removeChild(this.gameMessages);
                this.init();  
          }


      };

    let cards = [
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