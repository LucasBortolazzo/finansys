import { Category } from "../../categories/shared/category.model";

export class Entry {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public type?: string,
        public amount?: string,
        public date?: string,
        public paid?: boolean,
        public categoryId?: number,
        public category?: Category,
    ){}

    static types = {
        renevue: 'Receita',        
        expense: 'Despesa',

    }

    public get paidText(): string {
        console.log('chamando metodo')
        return this.paid ? 'Pago' : 'Pendente';        
    }
}