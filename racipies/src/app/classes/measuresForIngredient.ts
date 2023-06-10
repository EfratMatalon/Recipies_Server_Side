
export class measureForIngredient{
    constructor(
        public measuresForIngredientID? :number,
         public measureID?:number,
         public measureName?:string,
         public measurePlural?: string,
        public ingredientID?:number,
       /**כמות הגרמים של ברכיב שנכנסים בכלי */
        public grams?:number,
        public mililiters?:number){}
}