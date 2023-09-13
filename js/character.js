export class Character {
  constructor(screenHeight) {
    this.g = 0.168;
    this.x = 100;
    this.y = 200;
    this.vy = 0;
    this.minY = 200;
    this.maxY = 500;
    this.width = 50;
    this.height = 50;
    this.isJump = false;
    this.beforY = 200;
    this.acceleration = 100;
    this.screenHeight = screenHeight;
  }

  resize(screenHeight) {
    this.screenHeight = screenHeight;
  }

  animate(ctx) {
    if (this.isJump) {
      this.vy -= this.g; // 중력 가속도 계산
      this.y = this.y + this.vy;
      if (this.y <= this.minY) {
        this.y = this.minY;
        this.isJump = false;
      }
    }

    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.screenHeight - this.y, this.width, this.height);
  }
}
