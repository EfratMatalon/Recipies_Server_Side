import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterationComponent } from './components/registeration/registeration.component';
import { LoginComponent } from './components/login/login.component';
import { FullRecipyComponent } from './components/full-recipy/full-recipy.component';
import { NavPrivteComponent } from './components/nav-privte/nav-privte.component';
import { AddRecipyComponent } from './components/add-recipy/add-recipy.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ShowrecepiesComponent } from './components/showrecepies/showrecepies.component';
import { CarosleComponent } from './components/carosle/carosle.component';
import { NavAdminComponent } from './components/nav-admin/nav-admin.component';
import { ManageRecepiesComponent } from './components/manage-recepies/manage-recepies.component';
import { ManageIngridientsComponent } from './components/manage-ingridients/manage-ingridients.component';
import { ManageCategoriesComponent } from './components/manage-categories/manage-categories.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

const routes: Routes = [

  {
    path: '', component: NavComponent,
    children: [
      {
        path: '', component: CarosleComponent,
        children: [
          { path: '', component: SideNavComponent,
          children: [
            { path: '', component: ShowrecepiesComponent }
          ] }]
      },
      {
        path: 'home', component: CarosleComponent,
        children: [
          {
            path: '', component: SideNavComponent,
            children: [
              { path: '', component: ShowrecepiesComponent },
              { path: 'full/:recipyID', component: FullRecipyComponent }
            ]
          }]
      },
      {
        path: '', component: SideNavComponent,
        children: [
          { path: 'recipies/:catID', component: ShowrecepiesComponent },
          { path: 'registeration', component: RegisterationComponent },
          { path: 'login', component: LoginComponent },
          { path: 'full/:recipyID', component: FullRecipyComponent }
        ]
      }
    ]
  },

  // ========  ניתובים למשתמשים רשומים =========
  {
    path: 'private/:userId', component: NavPrivteComponent,
    children: [
      { path: '', component: CarosleComponent },
      {
        path: 'home', component: CarosleComponent,
        children: [
          {
            path: '', component: SideNavComponent,
            children: [
              { path: '', component: HomeComponent },
              { path: 'recipies/:catID', component: ShowrecepiesComponent },
              { path: 'registeration', component: RegisterationComponent },
              { path: 'login', component: LoginComponent },
              { path: 'full/:recipyID', component: FullRecipyComponent }
            ]
          }]
      },
      {
        path: '', component: SideNavComponent,
        children: [
          { path: 'recipies/:catID', component: ShowrecepiesComponent },
          { path: 'registeration', component: RegisterationComponent },
          { path: 'login', component: LoginComponent },
          { path: 'add', component: AddRecipyComponent },
          { path: 'full/:recipyID', component: FullRecipyComponent },
          { path: 'fevo', component: FavoritesComponent }
          
        ]
      }]
  },
    // ========  ניתובים למשתמש מנהל =========
    {
      path: 'admin/IWantMakePeopleFillGood/:userId', component: NavAdminComponent,
      children: [
        { path: '', component: CarosleComponent },
        {
          path: 'home', component: CarosleComponent,
          children: [
            {
              path: '', component: SideNavComponent,
              children: [
                { path: '', component: HomeComponent },
                { path: 'recipies/:catID', component: ShowrecepiesComponent },
                { path: 'registeration', component: RegisterationComponent },
                { path: 'login', component: LoginComponent },
                { path: 'add', component: AddRecipyComponent },
                { path: 'full/:recipyID', component: FullRecipyComponent },                
                // פה נוכל לצפות ביותר פרטים על המתכונים, ולמחוק את אלו שלא חפצים בהם
                { path: 'manageRecepies', component: ManageRecepiesComponent },
                // פה נוכל לצפות בכל הרכיבים, עם כל פרטיהם, להוסיף רכיבים, ולערוך?
                { path: 'manageIngridients', component: ManageIngridientsComponent },
                // פה נוכל לצפות בכל הקטגוריות, להוסיף, ולערוך?
                { path: 'manageCategories', component: ManageCategoriesComponent }
              ]
            }]
        },
        {
          path: '', component: SideNavComponent,
          children: [
            { path: 'recipies/:catID', component: ShowrecepiesComponent },
            { path: 'registeration', component: RegisterationComponent },
            { path: 'login', component: LoginComponent },
            { path: 'add', component: AddRecipyComponent },
            { path: 'full/:recipyID', component: FullRecipyComponent },
            // פה נוכל לצפות ביותר פרטים על המתכונים, ולמחוק את אלו שלא חפצים בהם
            { path: 'manageRecipies', component: ManageRecepiesComponent },
            // פה נוכל לצפות בכל הרכיבים, עם כל פרטיהם, להוסיף רכיבים, ולערוך?
            { path: 'manageIngridients', component: ManageIngridientsComponent },
            // פה נוכל לצפות בכל הקטגוריות, להוסיף, ולערוך?
            { path: 'manageCategories', component: ManageCategoriesComponent }
          ]
        }]
    },
  {
    path: '**', component: NavComponent,
    children: [
      { path: '', component: CarosleComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
