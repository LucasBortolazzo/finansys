import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

import { Category } from "../shared/category.model";
import { CategoryService } from "../shared/category.service"

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

    categories: Category[] = [];

    constructor(private categoryService: CategoryService) { }

    ngOnInit() {
        this.categoryService.getAll().subscribe(
            cat => this.categories = cat,
            error => alert("Erro ao carregar a lista de categorias")
        )
    }

    public deleteCategory(category: Category) {
        const mustDelete = confirm('Deseja excluir este item?');

        if (mustDelete) {
            this.categoryService.delete(category.id).subscribe(
                (res) => this.categories.splice(this.categories.indexOf(category), 1),
                (err) => alert('erro ao excluir'),
            )
        }
    }

}
