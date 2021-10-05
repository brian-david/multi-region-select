import React from "react";
import { Rect } from "react-konva";

class Zone extends React.Component<any, any, any> {

   private x: number;
   private y: number;
   private width: number;
   private height: number;
   private zoneType: string;

   constructor(props: any) {
      super(props);
      this.x = props.x;
      this.y = props.y;
      this.width = props.width;
      this.height = props.height;
      this.zoneType = props.zoneType;
      console.log("new zone created");
   }

   render() {
      return (
         <Rect
            x={this.x}
            y={this.y}
            width={this.width}
            height={this.height}
            fill="transparent"
            stroke="black"
         />
      )
   }
}

export default Zone;