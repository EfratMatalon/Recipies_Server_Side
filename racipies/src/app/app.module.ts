import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import "@angular/compiler";

import { MdbCarouselComponent, MdbCarouselItemComponent, MdbCarouselModule } from "mdb-angular-ui-kit/carousel";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MdbModalService, MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { UsersService } from './services/users.service';
import { RecipiesService } from './services/recipies.service';
import { IngredientsService } from './services/ingredients.service';
import { IngredientsForRecipyService } from './services/ingredients-for-recipy.service';
import { CategoriesService } from './services/categories.service';
import { MeasuresService } from './services/measures.service';
import { MeasuresForIngridientService } from './services/measures-for-ingridient.service';
import { NgForm, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormValueChangesDirective } from './saveForm/form-value-changes.directive';
import { AddRecipyComponent } from './components/add-recipy/add-recipy.component';
import { ModalComponent } from './components/modal/modal.component';
import { AddSubuteComponent } from './components/add-subute/add-subute.component';
import { FullRecipyComponent } from './components/full-recipy/full-recipy.component';
import { ReccomenedToAddComponent } from './components/reccomened-to-add/reccomened-to-add.component';
import { AddIngComponent } from './components/add-ing/add-ing.component';
import { HomeComponent } from './components/home/home.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { NavComponent } from './components/nav/nav.component';
import { NavPrivteComponent } from './components/nav-privte/nav-privte.component';
import { NavAdminComponent } from './components/nav-admin/nav-admin.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterationComponent } from './components/registeration/registeration.component';
import { AbouteComponent } from './components/aboute/aboute.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ShowrecepiesComponent } from './components/showrecepies/showrecepies.component';
import { CarosleComponent } from './components/carosle/carosle.component';
import { ManageRecepiesComponent } from './components/manage-recepies/manage-recepies.component';
import { ManageIngridientsComponent } from './components/manage-ingridients/manage-ingridients.component';
import { ManageCategoriesComponent } from './components/manage-categories/manage-categories.component';
import { SearchPipe } from './pipes/search.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { ShowOnlyPipe } from './pipes/show-only.pipe';
import { AddMeasureToIngComponent } from './components/add-measure-to-ing/add-measure-to-ing.component';
import { ResponsesComponent } from './components/responses/responses.component';
import { LikeAndFevComponent } from './components/like-and-fev/like-and-fev.component';
import { FavoritesService } from './services/favorites.service';
import { ResponssesService } from './services/responsses.service';
import { AddResponseComponent } from './components/responses/add-response/add-response.component';
import { UnrespectfullWordsService } from './services/unrespectfulWords/unrespectfull-words.service';
import { ManageResponsesComponent } from './components/manage-responses/manage-responses.component';
import { ReplacePipe } from './pipes/replace/replace.pipe';
import { SubstrPipe } from './pipes/substr/substr.pipe';
import { SlicePipe } from './pipes/slice/slice.pipe';
import { DateAndMorePipe } from './pipes/dateAndMore/date-and-more.pipe';
//  import { storeMoudle } from "@rxjs/redux";

@NgModule({
  declarations: [
    // בשביל לשמור למשתמש שבאמצע להוסיף
    FormValueChangesDirective,
    // הקומפוננטות
    AppComponent,
    ModalComponent,
    AddRecipyComponent,
    AddSubuteComponent,
    FullRecipyComponent,
    ReccomenedToAddComponent,
    AddIngComponent,
    HomeComponent,
    NavComponent,
    NavPrivteComponent,
    NavAdminComponent,
    LoginComponent,
    RegisterationComponent,
    AbouteComponent,
    SideNavComponent,
   ShowrecepiesComponent,
    CarosleComponent,
    ManageRecepiesComponent,
    ManageIngridientsComponent,
    ManageCategoriesComponent,
    SearchPipe,
    OrderByPipe,
    FilterPipe,
    FavoritesComponent,
    ShowOnlyPipe,
    AddMeasureToIngComponent,
    ResponsesComponent,
    LikeAndFevComponent,
    AddResponseComponent,
    ManageResponsesComponent,
    ReplacePipe,
    SubstrPipe,
    SlicePipe,
    DateAndMorePipe
  ],
  imports: [
    BrowserModule,
    // בשביל לאפשר ניתובים
    AppRoutingModule,
    // בשביל המודאלים
    MdbModalModule,
    // בשביל הטפסים
    FormsModule,
    // בשביל ליצור קשר עם השרת
    HttpClientModule,
    // בשביל טפסים דינאמיים
    ReactiveFormsModule,
    // בשביל הקרוסלות
    MdbCarouselModule,
    // //state
    // storeMoudle

  ],
  providers: [
    // בשביל המודאלים
    MdbModalService,
    // MdbModalModule,
    // בשביל הטפסים
    NgForm,
    //#region  פונקציונאליות יצירת קשר עם השרת שלנו
    UsersService,
    RecipiesService,
    IngredientsService,
    IngredientsForRecipyService,
    CategoriesService,
    MeasuresService,
    MeasuresForIngridientService,
    FavoritesService,
    ResponssesService,
    UnrespectfullWordsService
    //#endregion
  ],
  //schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
