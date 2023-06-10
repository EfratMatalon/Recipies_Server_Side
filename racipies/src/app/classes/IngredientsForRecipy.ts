export class IngredientForRecipy {
 

  constructor(
    public id?: number, 
    public recipyID?: number,

    
    public ingridientID?: number,
    public ingredientName?: string,

    public quantity?: number,
    public meashureID?: number,
    public measure?: string,
    public measurePlural?: string,
    public measureGorL?: number,
    public g?: boolean,


    public note?: string,

    //לחסוך חיפושים בכל המרה
    public grams?: number,
    public mililiters?: number,

    
    public parveIngridientID?: number,
    public parveIngridient?: string,
    public parveQuantity?: number,
    public parveMeashureID?: number,
    public parveMeashure?: string,
    public parveMeashurePlural?: string,
    //לחסוך חיפושים בכל המרה
    public gramsParve?: number,
    public mililitersParve?: number,

    
    public parveMeasureGorL?: number,
    public parveG?: boolean,


    public parveNote?: string,


    public veganIngridientID?: number,
    public veganIngridient?: string,
    public veganQuantity?: number,
    public veganMeashureID?: number,
    public veganMeashure?: string,
    public veganMeashurePlural?: string,
    //לחסוך חיפושים בכל המרה
    public gramsVegan?: number,
    public mililitersVegan?: number,

    
    public veganMeasureGorL?: number,
    public veganG?: boolean,

    public veganNote?: string,


    public glutenFreeIngridientID?: number,
    public glutenFreeIngridient?: string,
    public glutenFreeQuantity?: number,
    public glutenFreeMeashureID?: number,
    public glutenFreeMeashure?: string,
    public glutenFreeMeashurePlural?: string,
    //לחסוך חיפושים בכל המרה
    public gramsGlutenFree?: number,
    public mililitersGlutenFree?: number,
    public glutenFreeNote?: string,

    public glutenFreeMeasureGorL?: number,
    public glutenFreeG?: boolean,
    


    public healthyIngridientID?: number,
    public healthyIngridient?: string,
    public healthyQuantity?: number,
    public healthyMeashureID?: number,
    public healthyMeashure?: string,
    public healthyMeashurePlural?: string,
    public healthyNote?: string,

    public healthyMeasureGorL?: number,
    public healthyG?: boolean,
     //לחסוך חיפושים בכל המרה
     public gramsHealthy?: number,
     public mililitersealthy?: number,
    


    public nutFreeIngridientID?: number,
    public nutFreeIngridient?: string,
    public nutFreeQuantity?: number,
    public nutFreeMeashureID?: number,
    public nutFreeMeashure?: string,
    public nutFreeMeashurePlural?: string,
    public nutFreeNote?: string,

    
    public nutFreeMeasureGorL?: number,
    public nutFreeG?: boolean,


   


    // נטו להצגה באנגולר
    public programerNote?: string,
    public isSubsShow:boolean = false)

     { }
}