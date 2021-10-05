import { Stage, Layer, Rect, Transformer } from "react-konva";
import Konva from "konva";
import React, { useState } from "react";
import { useStore } from "react-redux";
import drawSlice from "../drawSlice";
import { Mode } from "./mode";
import './ZoningCanvas.css';
import Zone from "./Zone";

//State dependency
// If drawState = true, then you can create new rectangles, cannot interact with the existing rectangles
// If drawState = false, cannot create new rectangles, can move and resize existing shapes

const ZoningCanvas = () => {
	const store = useStore();

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
			if (layer) {
				layer.draw();
			}
		});
		group.add(anchor);
	}

	const [zones, setZones] = useState<any>([]);
	const [newZone, setNewZone] = useState<any>([]);
	const [drawingState, setDrawingState] = useState<boolean>(true);

	const handleMouseDown = (event: any) => {
		if (!drawingState) {
			if (newZone.length === 0) {
				const { x, y } = event.target.getStage().getPointerPosition();
				setNewZone([{ x, y, width: 0, height: 0, key: "0" }]);
			}
		}
	};

	const handleMouseUp = (event: any) => {
		if (!drawingState) {
			if (setNewZone.length === 1) {
				const sx = newZone[0].x;
				const sy = newZone[0].y;
				const { x, y } = event.target.getStage().getPointerPosition();
				const zoneToAdd = new Zone({
					x: sx,
					y: sy,
					width: x - sx,
					height: y - sy,
					zoneType: "default",
					key: zones.length + 1
				});
				zones.push(zoneToAdd);
				setNewZone([]);
				setZones(zones);
			}
			console.log(zones);
		}

	};

	const handleMouseMove = (event: any) => {
		if (newZone.length === 1) {
			const sx = newZone[0].x;
			const sy = newZone[0].y;
			const { x, y } = event.target.getStage().getPointerPosition();
			setNewZone([
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

	const changeDrawingState = () => {
		if (drawingState) {
			setDrawingState(false)
		} else {
			setDrawingState(true);
		}
		console.log(drawingState);
		//addAnchor(zones, )
	}

	const handleDragStart = (e: any) => {
		const id = e.target.id();
		setZones(
			zones.map((zone: any) => {
				return {
					...zone,
					isDragging: zone.id === id,
				};
			})
		);
	};
	const handleDragEnd = (e: any) => {
		setZones(
			zones.map((zone: any) => {
				return {
					...zone,
					isDragging: false,
				};
			})
		);
	};

	const zonesToDraw = [...zones, ...newZone];
	return (
		<React.Fragment>
			<button onClick={changeDrawingState}>Change State</button>
			<Stage
				onMouseDown={handleMouseDown}
				onMouseUp={handleMouseUp}
				onMouseMove={handleMouseMove}
				width={900}
				height={700}
			>
				<Layer>
					{zones.map((zone: any) => (
						<Zone
							x={zone.x}
							y={zone.y}
							height={zone.height}
							width={zone.width}
						/>
					))}
				</Layer>
				<Layer>
					{zonesToDraw.map(value => {
						return (
							<React.Fragment>
								{/* why is zone not rendering dynamically????? react-dom rendering????*/}
								<Zone
									x={value.x}
									y={value.y}
									width={value.width}
									height={value.height}
									draggable
									onDragStart={handleDragStart}
									onDragEnd={handleDragEnd}
								/>
								
							</React.Fragment>
						);
					})}
				</Layer>
			</Stage>
		</React.Fragment>
	);
};

export default ZoningCanvas