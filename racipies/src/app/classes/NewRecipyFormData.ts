import { subCategory } from './category';
import { IngredientForRecipy } from './IngredientsForRecipy';

/**
 * ממשק המתכון - לשמירה בלוקל סטורג'
 * ובעת שליחה - העלאת פרטיו לשרת 
 */
export interface NewRecipyFormData {
    name?: string;
    description?: string;
    image?: string;
    imgToLoad?: any;
    category: subCategory;
    time?: string;
    level?: number;
    numOfportions?: number;
    poritionDesc?: string;
    /**רשימת הרכיבים למתכון זה */
    ingFr?: Array<IngredientForRecipy>;
    instractions?: string;
    recipyNotes?: string;
    makeItHealthy?: boolean;
    userID?: number;
  }