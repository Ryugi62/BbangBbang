const RANDOM_Y = [200, 400];
const OBSTACLE_SPEED = 10;

export class Obstacle {
  constructor(screeWidth, screenHeight) {
    const random_index = Math.floor(Math.random() * RANDOM_Y.length);

    this.x = screeWidth;
    this.y = RANDOM_Y[random_index];
    this.width = 50;
    this.height = 50;
    this.screeWidth = screeWidth;
    this.screenHeight = screenHeight;
  }

  resize(screenWidth, screenHeight) {
    this.screeWidth = screenWidth;
    this.screenHeight = screenHeight;
  }

  animate(ctx) {
    this.y;
    this.x -= OBSTACLE_SPEED;
    if (this.x - 50 <= 0) this.recreate();

    ctx.beginPath();
    ctx.fillStyle = "blue";
    ctx.fillRect(
      this.x - 50,
      this.screenHeight - this.y,
      this.width,
      this.height
    );
  }

  recreate() {
    const random_index = Math.floor(Math.random() * RANDOM_Y.length);

    this.x = this.screeWidth;
    this.y = RANDOM_Y[random_index];
  }
}
