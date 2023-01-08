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
    this.startX = e.pageX - e.target.offsetLeft;
    this.startY = e.pageY - e.target.offsetTop;
    this.mouseDown = true;
    this.cxt.beginPath();
    this.cxt.moveTo(this.startX, this.startY); // mouse position in window minus left margin of canvas
    this.saved = this.canvas.toDataURL();
  }
  mouseMoveHandler(e) {
    if (this.mouseDown) {
      this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
    }
  }

  draw(x, y) {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.cxt.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.cxt.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.cxt.beginPath();
      this.cxt.moveTo(this.startX, this.startY);
      this.cxt.lineTo(x, y);
      this.cxt.stroke();
      console.log("draw brush");
    };
  }
}
