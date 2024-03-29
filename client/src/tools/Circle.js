import Tool from "./Tool";

export default class Brush extends Tool {
  constructor(canvas, socket, id) {
    super(canvas, socket, id);
    this.listen();
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
  }

  mouseUpHandler(e) {
    this.mouseDown = false;
    this.socket.send(
      JSON.stringify({
        method: "draw",
        id: this.id,
        figure: {
          type: "circle",
          x: this.startX,
          y: this.startY,
          radius: this.radius,
          settings: {
            fill: this.ctx.fillStyle,
            lineWidth: this.ctx.lineWidth,
            color: this.ctx.strokeStyle,
          },
        },
      })
    );
    this.socket.send(
      JSON.stringify({
        method: "draw",
        id: this.id,
        figure: {
          type: "finish",
        },
      })
    );
  }
  mouseDownHandler(e) {
    this.mouseDown = true;
    this.ctx.beginPath();
    this.startX = e.pageX - e.target.offsetLeft;
    this.startY = e.pageY - e.target.offsetTop;
    this.saved = this.canvas.toDataURL();
  }
  mouseMoveHandler(e) {
    if (this.mouseDown) {
      if (this.IswithinCanvas(e)) {
        this.mouseUpHandler(e);
      } else {
        let currentX = e.pageX - e.target.offsetLeft;
        let currentY = e.pageY - e.target.offsetTop;
        this.radius = Math.sqrt((currentX - this.startX) ** 2 + (currentY - this.startY) ** 2);
        this.draw(this.startX, this.startY, this.radius);
      }
    }
  }

  draw(x, y, radius) {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.ellipse(x, y, radius, radius, 0, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.stroke(); //обводка
    };
  }

  static staticDraw(ctx, x, y, radius, settings) {
    ctx.fillStyle = settings.fill;
    ctx.strokeStyle = settings.color;
    ctx.lineWidth = settings.lineWidth;
    ctx.beginPath();
    ctx.ellipse(x, y, radius, radius, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke(); //обводка
  }
}
