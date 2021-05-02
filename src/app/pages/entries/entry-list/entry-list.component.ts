import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

import { Entry } from "../shared/entry.model";
import { EntryService } from "../shared/entry.service"

@Component({
    selector: 'app-entry-list',
    templateUrl: './entry-list.component.html',
    styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {

    entries: Entry[] = [];

    constructor(private entryService: EntryService) { }

    ngOnInit() {
        this.entryService.getAll().subscribe(
            cat => this.entries = cat,
            error => alert("Erro ao carregar a lista de entradas")
        )
    }

    public deleteEntry(entry: Entry) {
        const mustDelete = confirm('Deseja excluir este item?');

        if (mustDelete) {
            this.entryService.delete(entry.id).subscribe(
                (res) => this.entries.splice(this.entries.indexOf(entry), 1),
                (err) => alert('erro ao excluir'),
            )
        }
    }

}
