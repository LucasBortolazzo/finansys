import { OnInit } from '@angular/core';
import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

import { BaseResourceService } from 'src/app/shared/services/base-resource.service';

export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {

    resources: T[] = [];

    constructor(protected baseResourceService: BaseResourceService<T>) { }

    ngOnInit() {
        this.baseResourceService.getAll().subscribe(
            resources => this.resources = resources.sort((a, b) => b.id - a.id),
            error => alert("Erro ao carregar a lista de entradas")
        )
    }

    public deleteEntry(resource: T) {
        const mustDelete = confirm('Deseja excluir este item?');

        if (mustDelete) {
            this.baseResourceService.delete(resource.id).subscribe(
                (res) => this.resources.splice(this.resources.indexOf(resource), 1),
                (err) => alert('erro ao excluir'),
            )
        }
    }

}
