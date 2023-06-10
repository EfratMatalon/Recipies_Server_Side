export class recipy{

    constructor(
        public recipyID?:number,
        public name?:string,
        public description?:string,
        public image?:string ,
        public time?:string,
        public numOfportions?:number,
        public portionDescription?:string,
        public instractions?:string,        
        public notes?:string,
        public categoryID?:number,
        public categoryName?:string,
        public dificultLevel?:number,
        public likes?:number,

        public writerId?:number,
        public writerName?:string, 
        public insertationDate?:Date,
        
     
        public isParve?:boolean,
        public isDairy?:boolean,
        public isMeaty?:boolean,
        public isGlutenFree?:boolean,
        public isVegan?:boolean,
        public isNutFree?:boolean, 
        
        public makeItHealthy?:boolean,
        public makeItGlutenFree?:boolean,
        public makeItVegan?:boolean,
        public makeItNutFree?:boolean,
        public MakeItParve?:boolean,
        public numOfLikes ?:number,
        public rating ?:number,
        public numOfRating ?:number)
        {}
}