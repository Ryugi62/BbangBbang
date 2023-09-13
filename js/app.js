import { Pointer } from "./pointer.js";
import { Character } from "./character.js";
import { Obstacle } from "./obstacle.js";

class App {
  constructor() {
    this.canvas = document.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.pixelRatio = window.pixelRatio > 1 ? 2 : 1;

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    this.startGame();

    window.addEventListener("pointermove", this.onMove.bind(this), false);
    window.addEventListener("keydown", this.keyDown.bind(this), false);
    window.addEventListener("keyup", this.keyUp.bind(this), false);

    window.requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.screenWidth = document.body.clientWidth;
    this.screenHeight = document.body.clientHeight;

    this.canvas.width = this.screenWidth * this.pixelRatio;
    this.canvas.height = this.screenHeight * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    if (this.Character) this.Character.resize(this.screenHeight);
    if (this.Obstacles)
      this.Obstacles.forEach((e) => {
        e.resize(this.screenWidth, this.screenHeight);
      });
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.Character.animate(this.ctx);
    this.Obstacles.forEach((e) => {
      if (
        this.Character.x <= e.x &&
        this.Character.x - e.x >= -this.Character.width * 2 &&
        this.Character.y <= e.y &&
        this.Character.y + this.Character.height >= e.y
      ) {
        alert("GAME OVER");
        this.startGame();
      }

      e.animate(this.ctx);
    });

    this.Pointer.animate(this.ctx);
  }

  onMove(e) {
    this.Pointer.x = e.clientX;
    this.Pointer.y = e.clientY;
  }

  keyDown(e) {
    if (e.code === "Space" && !this.Character.isJump) {
      this.Character.g = 0.172;
      this.Character.vy = 10;
      this.Character.isJump = true;
    } else if (e.code === "ArrowDown") {
      this.Character.g = 1.8;
    }
  }

  keyUp(e) {
    if (e.code === "Space" && this.Character.y <= this.Character.maxY / 2) {
      this.Character.g = 0.35;
    }
  }

  startGame() {
    this.Pointer = new Pointer();
    this.Character = new Character(this.screenHeight);
    this.Obstacles = [];

    this.Obstacles.push(new Obstacle(this.screenWidth, this.screenHeight));
    setTimeout(() => {
      this.Obstacles.push(new Obstacle(this.screenWidth, this.screenHeight));
    }, 700);
  }
}

window.onload = () => {
  new App();
};
