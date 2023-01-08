export default class Tool {
  constructor(canvas) {
    this.canvas = canvas;
    this.cxt = canvas.getContext("2d");
    this.destroyEvents();
  }

  set fillColor(color) {
    this.cxt.fillStyle = color;
  }

  set strokeColor(color) {
    this.cxt.strokeStyle = color;
  }

  set lineWidth(width) {
    this.cxt.lineWidth = width;
  }

  destroyEvents() {
    this.canvas.onmousemove = null;
    this.canvas.onmousedown = null;
    this.canvas.onmouseup = null;
  }
}
