import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import "../styles/toolbar.scss";
import Brush from "../tools/Brush";
import Rect from "../tools/Rect";
import Circle from "../tools/Circle";
import Eraser from "../tools/Eraser";
import Line from "../tools/Line";
import { observer } from "mobx-react-lite";

const initialTool = [
  {
    tool: "brush",
    instance: Brush,
  },
  {
    tool: "rect",
    instance: Rect,
  },
  {
    tool: "circle",
    instance: Circle,
  },
  {
    tool: "eraser",
    instance: Eraser,
  },
  {
    tool: "line",
    instance: Line,
  },
];

function Toolbar() {
  console.log(toolState.getFillColor);
  const changeColor = (e) => {
    toolState.setStrokeColor(e.target.value);
    toolState.setFillColor(e.target.value);
  };

  const download = () => {
    const dataUrl = canvasState.canvas.toDataURL();
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = canvasState.sessionid + ".jpg";
    console.log(dataUrl);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  console.log(toolState.getTool instanceof initialTool[0].instance);

  return (
    <div className="toolbar">
      {initialTool.map((item) => {
        // console.log(toolState.getTool instanceof item.instance);
        const isActive = toolState.getTool instanceof item.instance ? "active" : "";
        return (
          <button
            className={`toolbar__btn ${item.tool} ${isActive}`}
            onClick={() =>
              toolState.setTool(new item.instance(canvasState.canvas, canvasState.socket, canvasState.sessionid))
            }
          ></button>
        );
      })}
      {/* <button
        className="toolbar__btn brush"
        onClick={() => toolState.setTool(new Brush(canvasState.canvas, canvasState.socket, canvasState.sessionid))}
      ></button>
      <button
        className="toolbar__btn rect"
        onClick={() => toolState.setTool(new Rect(canvasState.canvas, canvasState.socket, canvasState.sessionid))}
      ></button>
      <button
        className="toolbar__btn circle"
        onClick={() =>
          toolState.setTool(new Circle(canvasState.canvas, canvasState.socket, canvasState.sessionid))
        }
      ></button>
      <button
        className="toolbar__btn eraser"
        onClick={() =>
          toolState.setTool(new Eraser(canvasState.canvas, canvasState.socket, canvasState.sessionid))
        }
      ></button>
      <button
        className="toolbar__btn line"
        onClick={() => toolState.setTool(new Line(canvasState.canvas, canvasState.socket, canvasState.sessionid))}
      ></button> */}
      <input type="color" value={toolState.getFillColor} id="style1" onChange={(e) => changeColor(e)} />
      <button className="toolbar__btn undo" onClick={() => canvasState.undo()}></button>
      <button className="toolbar__btn redo" onClick={() => canvasState.redo()}></button>
      <button className="toolbar__btn save" onClick={() => download()}></button>
    </div>
  );
}

export default observer(Toolbar);
