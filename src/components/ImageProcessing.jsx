import React, { useState, useRef } from "react";
import { Stage, Layer, Image, Text, Rect, Transformer } from "react-konva";
import { downloadURI } from "./utils/downloadURI"; // You need to implement a function to download canvas content as an image

function ImageProcessing() {
  const [text, setText] = useState("");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontSize, setFontSize] = useState(20);
  const [fontColor, setFontColor] = useState("black");
  const [fontWeight, setFontWeight] = useState("normal");
  const [image, setImage] = useState(null);
  const [selectedShapeIndex, setSelectedShapeIndex] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [transformAttrs, setTransformAttrs] = useState({});
  const trRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const img = new window.Image();
      img.src = reader.result;
      img.onload = () => {
        setImage(img);
      };
    };
    reader.readAsDataURL(file);
  };

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

  const handleTextBlur = () => {
    setEditMode(false);
  };

  const stageRef = useRef();

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <br />
      <input
        type="text"
        value={text}
        onChange={handleTextChange}
        placeholder="Type your text here..."
        disabled={editMode}
      />
      <br />
      <select
        value={fontFamily}
        onChange={(e) => setFontFamily(e.target.value)}
      >
        <option value="Arial">Arial</option>
        <option value="Verdana">Verdana</option>
        <option value="Georgia">Georgia</option>
        {/* Add more font options as needed */}
      </select>
      <br />
      <input
        type="number"
        value={fontSize}
        onChange={(e) => setFontSize(parseInt(e.target.value))}
        placeholder="Font size"
        disabled={editMode}
      />
      <br />
      <input
        type="color"
        value={fontColor}
        onChange={(e) => setFontColor(e.target.value)}
        placeholder="Font color"
        disabled={editMode}
      />
      <br />
      <select
        value={fontWeight}
        onChange={(e) => setFontWeight(e.target.value)}
        disabled={editMode}
      >
        <option value="normal">Normal</option>
        <option value="bold">Bold</option>
        <option value="italic">Italic</option>
        {/* Add more font weight options as needed */}
      </select>
      <br />
      <button onClick={handleAddText} disabled={editMode}>
        Add Text
      </button>
      <button onClick={handleDownload}>Download</button>
      <Stage width={500} height={500} ref={stageRef}>
        <Layer>
          {image && <Image image={image} />}
          <Rect
            width={500}
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
            enabledAnchors={["middle-left", "middle-right", "bottom-center"]}
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
  );
}

export default ImageProcessing;
