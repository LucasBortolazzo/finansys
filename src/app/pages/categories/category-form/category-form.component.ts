import { group } from '@angular/animations';
import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { switchMap } from "rxjs/operators";

import toastr from "toastr"

// aplicação
import { Category } from "../shared/category.model"
import { CategoryService } from "../shared/category.service"

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {

  currentAction: string;
  categoryForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  category: Category = new Category();

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();
  }

  ngAfterContentChecked() {
    this.setPageTitle();
  }

  // PRIVATE METHODS

  private setCurrentAction() {
    if (this.route.snapshot.url[0].path === 'new') {
      this.currentAction = 'new'
    } else {
      this.currentAction = 'edit';
    }
  }

  private buildCategoryForm(){
    this.categoryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(10)]],
      description: [null, [Validators.required]]
    })
  }

  private loadCategory() {
    if(this.currentAction === 'edit') {
      this.route.paramMap.pipe(
        switchMap((parametros) => this.categoryService.getById(+parametros.get('id')))
      ).subscribe(
        (categoria) => {
          this.category = categoria,
          this.categoryForm.patchValue(this.category)
        },
        (error) => alert('Ocorreu um erro no servidor')
      )
    } else {
      this.category = {};
      this.categoryForm.reset();
    }
  }

  private setPageTitle() {
    if(this.currentAction === 'edit') {
      this.pageTitle = 'Editando categoria'
    } else {
      this.pageTitle = 'Cadastrando nova categoria';
    }
  }

}