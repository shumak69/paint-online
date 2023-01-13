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
          type: "finish",
        },
      })
    );
  }
  mouseDownHandler(e) {
    this.mouseDown = true;
    // this.ctx.beginPath();
    this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop); // mouse position in window minus left margin of canvas
  }
  mouseMoveHandler(e) {
    // e
    if (this.mouseDown) {
      if (this.IswithinCanvas(e)) {
        this.mouseUpHandler(e);
      } else {
        this.socket.send(
          JSON.stringify({
            method: "draw",
            id: this.id,
            figure: {
              type: "brush",
              x: e.pageX - e.target.offsetLeft,
              y: e.pageY - e.target.offsetTop,
              settings: {
                color: this.ctx.strokeStyle,
                lineWidth: this.ctx.lineWidth,
              },
            },
          })
        );
      }
    }
  }

  static draw(ctx, x, y, settings) {
    // ctx.beginPath();
    ctx.lineWidth = settings.lineWidth;
    ctx.strokeStyle = settings.color;
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
