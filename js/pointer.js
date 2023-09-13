const RADIUS = 15;

export class Pointer {
  constructor() {
    this.x = -5000;
    this.y = -5000;
  }

  animate(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = "pink";
    ctx.fill();
  }
}
