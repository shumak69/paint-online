import Tool from "./Tool";

export default class Brush extends Tool {
  constructor(canvas) {
    super(canvas);
    this.listen();
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
  }

  mouseUpHandler(e) {
    this.mouseDown = false;
  }
  mouseDownHandler(e) {
    console.log(e.pageX, e.target.offsetLeft);
    this.mouseDown = true;
    this.cxt.beginPath();
    this.cxt.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop); // mouse position in window minus left margin of canvas
  }
  mouseMoveHandler(e) {
    if (this.mouseDown) {
      this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
    }
  }

  draw(x, y) {
    this.cxt.lineTo(x, y);
    this.cxt.stroke();
    console.log("draw brush");
  }
}
