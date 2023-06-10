import { measureForIngredient } from './measuresForIngredient';

export class ingredient{
    
    constructor(public ingridientID?:number, 
        public name?:string, 
        public isVegan?:boolean,
        public isGlutenFree?:boolean,
        public isNutFree?:boolean,
        public isParve?:boolean,
        public isDairy?:boolean,
        public isMeaty?:boolean,
        public calloriesPer100g?:number,
        public pluralForm?:string,
        public measuresForIngredientList?: Array<measureForIngredient>
        ){}
}