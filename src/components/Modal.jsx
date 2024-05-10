import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Image, Text, Rect, Transformer } from "react-konva";
import { downloadURI } from "./utils/downloadURI";

const Modal = ({ imageSrc }) => {
  const [image, setImage] = useState(null);  

  useEffect(() => {
    if (imageSrc) {
      console.log(imageSrc);
      const img = new window.Image();
      img.src = imageSrc;
      img.onload = () => {
        setImage(img);
      };
    }
  }, [imageSrc]);

  const [text, setText] = useState("");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontSize, setFontSize] = useState(20);
  const [fontColor, setFontColor] = useState("black");
  const [fontWeight, setFontWeight] = useState("normal");
  const [selectedShapeIndex, setSelectedShapeIndex] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [transformAttrs, setTransformAttrs] = useState({});
  const trRef = useRef();

  const handleAddText = () => {
    const newText = (
      <Text
        key={Math.random()}
        text={text}
        fontSize={fontSize}
        fontFamily={fontFamily}
        fill={fontColor}
        fontStyle={fontWeight}
        x={50}
        y={50}
        draggable
        onClick={() => {
          setSelectedShapeIndex(null);
          setEditMode(true);
        }}
        onTap={(e) => {
          setSelectedShapeIndex(e.target.index);
          setEditMode(true);
          setTransformAttrs({
            x: e.target.x(),
            y: e.target.y(),
            rotation: e.target.rotation(),
            scaleX: e.target.scaleX(),
            scaleY: e.target.scaleY(),
          });
          trRef.current.nodes([e.target]);
        }}
      />
    );
    setText("");
    return newText;
  };

  const handleDownload = () => {
    const dataURL = stageRef.current.toDataURL();
    downloadURI(dataURL, "canvas.png");
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

 
  const clearTextArea = () => {
    setText(""); // Clear the text area when modal is closed
  };

  const stageRef = useRef();
  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 class="modal-title">Modal title</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={clearTextArea} 
            ></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-8 h-100">
                <Stage width={700} height={500} ref={stageRef}>
                  <Layer>
                    {/* Static image */}
                    <Image image={image} width={700} height={500} />
                    <Rect
                      width={700}
                      height={500}
                      fill="transparent"
                      draggable
                      onMouseDown={(e) => {
                        setSelectedShapeIndex(null);
                        setEditMode(false);
                      }}
                    />
                    <Text
                      text={text}
                      fontSize={fontSize}
                      fontFamily={fontFamily}
                      fill={fontColor}
                      fontStyle={fontWeight}
                      x={50}
                      y={50}
                      draggable
                      visible={!editMode}
                      className="textHover"
                      onMouseEnter={(e) => {
                        e.target.getStage().container().style.cursor = 'move'; // Change cursor on hover                        
                        e.target.getLayer().batchDraw(); // Redraw the layer
                      }}
                      onMouseLeave={(e) => {
                        e.target.getStage().container().style.cursor = 'default'; // Change cursor back on leave
                        e.target.fill(fontColor); // Restore original text color
                        e.target.getLayer().batchDraw(); // Redraw the layer
                      }}
                    />
                    <Transformer
                      ref={trRef}
                      selectedShapeIndex={selectedShapeIndex}
                      anchorFill="#ffffff"
                      borderStroke="#0099FF"
                      borderDash={[6, 2]}
                      borderStrokeWidth={2}
                      keepRatio={false}
                      rotateEnabled={true}
                      enabledAnchors={[
                        "middle-left",
                        "middle-right",
                        "bottom-center",
                      ]}
                      rotateAnchorOffset={20}
                      borderEnabled={true}
                      onTransform={(e) => {
                        const nodes = trRef.current.nodes();
                        if (nodes.length === 1) {
                          const selectedNode = nodes[0];
                          setTransformAttrs({
                            x: selectedNode.x(),
                            y: selectedNode.y(),
                            rotation: selectedNode.rotation(),
                            scaleX: selectedNode.scaleX(),
                            scaleY: selectedNode.scaleY(),
                          });
                        }
                      }}
                    />
                  </Layer>
                </Stage>
              </div>
              <div className="col-4 h-100 ">
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    Edit
                  </label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    value={text}
                    onChange={handleTextChange}
                    placeholder="Type your text here..."
                    disabled={editMode}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    Font family
                  </label>
                  <select
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                    className="form-select"
                  >
                    <option value="Arial">Arial</option>
                    <option value="Verdana">Verdana</option>
                    <option value="Georgia">Georgia</option>
                    {/* Add more font options as needed */}
                  </select>
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    Font size
                  </label>
                  <input
                    type="number"
                    value={fontSize}
                    onChange={(e) => setFontSize(parseInt(e.target.value))}
                    placeholder="Font size"
                    disabled={editMode}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    Text color
                  </label>
                  <input
                    type="color"
                    value={fontColor}
                    onChange={(e) => setFontColor(e.target.value)}
                    placeholder="Font color"
                    disabled={editMode}
                    className="form-control px-1"
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    Font family
                  </label>
                  <select
                    className="form-select"
                    value={fontWeight}
                    onChange={(e) => setFontWeight(e.target.value)}
                    disabled={editMode}
                  >
                    <option value="normal">Normal</option>
                    <option value="bold">Bold</option>
                    <option value="italic">Italic</option>
                    {/* Add more font weight options as needed */}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            {/* <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Share
            </button> */}
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleDownload}
            >
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
