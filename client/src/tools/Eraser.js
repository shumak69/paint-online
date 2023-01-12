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
    this.ctx.strokeStyle = this.previousColor;
    this.socket.send(
      JSON.stringify({
        method: "draw",
        id: this.id,
        figure: {
          type: "finish",
          eraser: this.previousColor,
        },
      })
    );
  }
  mouseDownHandler(e) {
    this.previousColor = this.ctx.strokeStyle;
    console.log(e.pageX, e.target.offsetLeft);
    this.mouseDown = true;
    this.ctx.beginPath();
    this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop); // mouse position in window minus left margin of canvas
  }
  mouseMoveHandler(e) {
    // if (this.mouseDown) {
    //   this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
    // }
    if (this.mouseDown) {
      // this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
      this.socket.send(
        JSON.stringify({
          method: "draw",
          id: this.id,
          figure: {
            type: "eraser",
            x: e.pageX - e.target.offsetLeft,
            y: e.pageY - e.target.offsetTop,
            settings: {
              lineWidth: this.ctx.lineWidth,
            },
          },
        })
      );
    }
  }

  // draw(x, y) {
  //   this.ctx.strokeStyle = "#ffffff";
  //   this.ctx.lineTo(x, y);
  //   this.ctx.stroke();
  // }
  static draw(ctx, x, y, settings) {
    // ctx.beginPath();
    ctx.lineWidth = settings.lineWidth;
    ctx.strokeStyle = "#ffffff";
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
