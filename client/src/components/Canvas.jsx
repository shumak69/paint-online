import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import "../styles/canvas.scss";
import Brush from "../tools/Brush";
import Rect from "../tools/Rect";
import Circle from "../tools/Circle";
import Eraser from "../tools/Eraser";
import Line from "../tools/Line";
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Canvas() {
  const canvasRef = useRef();
  const usernameRef = useRef();
  const [modal, setModal] = useState(true);
  const params = useParams();
  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
    let ctx = canvasRef.current.getContext("2d");
    axios.get(`http://localhost:5000/image?id=${params.id}`).then((res) => {
      const img = new Image();
      img.src = res.data;
      img.onload = () => {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
      };
    });
  }, []);

  useEffect(() => {
    if (canvasState.username) {
      const socket = new WebSocket("ws://localhost:5000/");
      canvasState.setSocket(socket);
      canvasState.setSessionId(params.id);
      toolState.setTool(new Brush(canvasRef.current, socket, params.id));
      socket.onopen = () => {
        console.log("connection established");
        socket.send(
          JSON.stringify({
            id: params.id,
            username: canvasState.username,
            method: "connection",
          })
        );
      };
      socket.onmessage = async (event) => {
        let msg = JSON.parse(event.data);
        switch (msg.method) {
          case "connection":
            console.log(`User ${msg.username} connected`);
            break;
          case "draw":
            drawHandler(msg);
            break;
          default:
            break;
        }
      };
    }
  }, [canvasState.username]);

  const drawHandler = (msg) => {
    const figure = msg.figure;
    const ctx = canvasRef.current.getContext("2d");
    switch (figure.type) {
      case "brush":
        Brush.draw(ctx, figure.x, figure.y, figure.settings);
        break;
      case "rect":
        Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height, figure.settings);
        break;
      case "circle":
        Circle.staticDraw(ctx, figure.x, figure.y, figure.radius, figure.settings);
        break;
      case "eraser":
        Eraser.draw(ctx, figure.x, figure.y, figure.settings);
        break;
      case "line":
        Line.staticDraw(ctx, figure.x, figure.y, figure.startX, figure.startY, figure.settings);
        break;
      case "finish":
        if ("eraser" in figure) {
          ctx.strokeStyle = figure.eraser;
        }
        console.log(ctx.strokeStyle);
        toolState.setLineWidth(ctx.lineWidth);
        toolState.setStrokeColor(ctx.strokeStyle);
        toolState.setFillColor(ctx.fillStyle);
        ctx.beginPath();
        break;
      default:
        break;
    }
  };

  const mouseUpHandler = () => {
    canvasState.pushToUndo(canvasRef.current.toDataURL());
    axios
      .post(`http://localhost:5000/image?id=${params.id}`, { img: canvasRef.current.toDataURL() })
      .then((res) => console.log(res.data));
  };

  const connectHandler = () => {
    canvasState.setUsername(usernameRef.current.value);
    setModal(false);
  };

  return (
    <div className="canvas">
      <Modal show={modal} onHide={() => {}}>
        <Modal.Header closeButton>
          <Modal.Title>Your username</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" ref={usernameRef} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => connectHandler()}>
            Sign in
          </Button>
        </Modal.Footer>
      </Modal>
      <canvas width={800} height={500} ref={canvasRef} onMouseUp={() => mouseUpHandler()}></canvas>
    </div>
  );
}

export default observer(Canvas);
