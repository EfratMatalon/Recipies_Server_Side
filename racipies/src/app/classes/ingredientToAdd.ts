
export class ingredientToAdd{
    
    constructor(
        
        public ingridientToAddID?:number,
        public ingredientsForRecipyID?:number,
        public recipyID?:number,
        public ingridientID?:number,
        // public string ingridientName { get; set; }
        public quantity?:number,
        public meashureID?:number,
        public meashureName?:string,
        public Note?:string,

        //ט = טבעוני, ב = בריא, ר = רגיל,  פ = פרווה, ג= ללא גלוטן, ב = ללא בוטנים
        public ingPart?:string
        
        ){}
}