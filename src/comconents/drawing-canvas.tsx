import ReactDOM from "react-dom";
import { Stage, Layer, Rect } from "react-konva";
import Konva from "konva";
import { useState } from "react";

const DrawAnnotations = () => {
	let width = 640;
	let height = 480;

	const update = (activeAnchor: any) => {
		let group = activeAnchor.getParent();
		let topLeft = group.get('.topLeft')[0];
		let topRight = group.get('.topRight')[0];
		let bottomRight = group.get('.bottomRight')[0];
		let bottomLeft = group.get('.bottomLeft')[0];

		let bottom = group.get('.bottom')[0];
		let left = group.get('.left')[0];
		let right = group.get('.right')[0];
		let top = group.get('.top')[0];

		let rect = group.get('Rect')[0];
		let anchorX = activeAnchor.getX();
		let anchorY = activeAnchor.getY();

		//update the anchor positoions
		switch (activeAnchor.getName()) {
			case 'topLeft':
				topRight.setY(anchorY);
				bottomLeft.setX(anchorX);
				top.SetY(anchorY);
				left.SetX(anchorX);
				break;
			case 'topRight':
				topLeft.setY(anchorY);
				bottomRight.setX(anchorX);
				top.SetY(anchorY);
				right.SetX(anchorX);
				break;
			case 'bottomRight':
				bottomLeft.setY(anchorY);
				topRight.setX(anchorX);
				bottom.SetY(anchorY);
				right.SetX(anchorX);
				break;
			case 'bottomLeft':
				bottomRight.setY(anchorY);
				topLeft.setX(anchorX);
				bottom.SetY(anchorY);
				left.SetX(anchorX);
				break;
			case 'bottom':
				bottomRight.setY(anchorY);
				bottomLeft.setY(anchorX);
				break;
			case 'left':
				topLeft.setX(anchorX);
				bottomLeft.setX(anchorX);
				break;
			case 'right':
				topRight.setX(anchorX);
				bottomRight.setY(anchorX);
				break;
			case 'top':
				topLeft.setY(anchorY);
				topRight.setY(anchorY);
				break;
		}

		rect.position(topLeft.position());
		let width = left.getX() - right.getX();
		let height = bottom.getY() - top.getY();
		if (width && height) {
			rect.width(width);
			rect.height(height);
		}
	}

	const addAnchor = (group: any, x: number, y: number, name: string) => {
		let stage = group.getStage();
		let layer = group.getLayer();
		var anchor = new Konva.Circle({
			x: x,
			y: y,
			stroke: '#666',
			fill: '#ddd',
			strokeWidth: 2,
			radius: 8,
			name: name,
			draggable: true,
			dragOnTop: false
		});

		anchor.on('dragmove', function () {
			update(this);
			layer.draw();
		});

		anchor.on('mousedown touchstart', function () {
			group.setDraggable(false);
			this.moveToTop();
		});

		anchor.on('dragend', function () {
			group.setDraggable(true);
			layer.draw();
		});

		anchor.on('mouseover', function () {
			var layer = this.getLayer();
			document.body.style.cursor = 'pointer';
			this.hitStrokeWidth(4);
			if (layer) {
				layer.draw();
			}
		});

		anchor.on('mouseout', function () {
			var layer = this.getLayer();
			document.body.style.cursor = 'default';
			this.hitStrokeWidth(2);
			if (layer){
				layer.draw();
			}
		});
		group.add(anchor);
	}

	const [annotations, setAnnotations] = useState<any>([]);
	const [newAnnotation, setNewAnnotation] = useState<any>([]);

	const handleMouseDown = (event: any) => {
		if (newAnnotation.length === 0) {
			const { x, y } = event.target.getStage().getPointerPosition();
			setNewAnnotation([{ x, y, width: 0, height: 0, key: "0" }]);
		}
	};

	const handleMouseUp = (event: any) => {
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

	const handleMouseMove = (event: any) => {
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