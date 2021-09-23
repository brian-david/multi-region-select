import ReactDOM from "react-dom";
import { Stage, Layer, Rect } from "react-konva";
import { useState } from "react";

const DrawAnnotations = () => {
	const [annotations, setAnnotations] = useState<any>([]);
	const [newAnnotation, setNewAnnotation] = useState<any>([]);

	const handleMouseDown = (event:any) => {
		if (newAnnotation.length === 0) {
			const { x, y } = event.target.getStage().getPointerPosition();
			setNewAnnotation([{ x, y, width: 0, height: 0, key: "0" }]);
		}
	};

	const handleMouseUp = (event:any) => {
		if (newAnnotation.length === 1) {
			const sx = newAnnotation[0].x;
			const sy = newAnnotation[0].y;
			const { x, y } = event.target.getStage().getPointerPosition();
			const annotationToAdd = {
				x: sx,
				y: sy,
				width: x - sx,
				height: y - sy,
				key: annotations.length + 1
			};
			annotations.push(annotationToAdd);
			setNewAnnotation([]);
			setAnnotations(annotations);
		}
	};

	const handleMouseMove = (event:any) => {
		if (newAnnotation.length === 1) {
			const sx = newAnnotation[0].x;
			const sy = newAnnotation[0].y;
			const { x, y } = event.target.getStage().getPointerPosition();
			setNewAnnotation([
				{
					x: sx,
					y: sy,
					width: x - sx,
					height: y - sy,
					key: "0"
				}
			]);
		}
	};

	const annotationsToDraw = [...annotations, ...newAnnotation];
	return (
		<Stage
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			onMouseMove={handleMouseMove}
			width={900}
			height={700}
		>
			<Layer>
				{annotationsToDraw.map(value => {
					return (
						<Rect
							x={value.x}
							y={value.y}
							width={value.width}
							height={value.height}
							fill="transparent"
							stroke="black"
						/>
					);
				})}
			</Layer>
		</Stage>
	);
};

export default DrawAnnotations