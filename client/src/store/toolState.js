import { makeAutoObservable } from "mobx";

class ToolState {
  tool = null;
  lineWidth = 1;
  strokeColor = "#000000";
  fillColor = "#000000";
  constructor() {
    makeAutoObservable(this);
  }

  setTool(tool) {
    this.tool = tool;
  }
  setFillColor(color) {
    this.tool.fillColor = color;
    this.fillColor = color;
  }

  setStrokeColor(color) {
    this.tool.strokeColor = color;
    this.strokeColor = color;
  }

  setLineWidth(width) {
    this.tool.lineWidth = width;
    this.lineWidth = width;
  }
  get getLineWidth() {
    return this.lineWidth;
  }
  get getStrokeColor() {
    return this.strokeColor;
  }
  get getFillColor() {
    return this.fillColor;
  }
}

export default new ToolState();
