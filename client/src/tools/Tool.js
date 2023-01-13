export default class Tool {
  constructor(canvas, socket, id) {
    this.canvas = canvas;
    this.socket = socket;
    this.id = id;
    this.ctx = canvas.getContext("2d");
    this.destroyEvents();
  }

  set fillColor(color) {
    this.ctx.fillStyle = color;
  }

  set strokeColor(color) {
    this.ctx.strokeStyle = color;
  }

  set lineWidth(width) {
    this.ctx.lineWidth = width;
  }

  IswithinCanvas(e) {
    console.log(e.target.offsetTop + e.target.offsetHeight - e.pageY);
    return (
      e.pageX - e.target.offsetLeft <= 2 ||
      e.pageY - e.target.offsetTop <= 2 ||
      e.target.offsetLeft + e.target.offsetWidth - e.pageX <= 2 ||
      e.target.offsetTop + e.target.offsetHeight - e.pageY <= 2
    );
  }

  destroyEvents() {
    this.canvas.onmousemove = null;
    this.canvas.onmousedown = null;
    this.canvas.onmouseup = null;
  }
}
