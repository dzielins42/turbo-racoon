import { NameGenerator } from './name-generator';

export class CapitalizeNameGenerator extends NameGenerator {

    constructor(
        private _base: NameGenerator
    ) {
        super();
    }

    generate(): string {
        let base = this._base.generate();
        return base.charAt(0).toUpperCase() + base.slice(1);
    }
}
