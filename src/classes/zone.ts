export class Zone{
   private x: number;
   private y: number;
   private width: number;
   private height: number;
   private zoneType: string;

   constructor (x:number, y:number, width:number, height:number, zoneType:string){
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.zoneType = zoneType;
      console.log("new zone created");
   }
}