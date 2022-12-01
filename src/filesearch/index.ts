export abstract class FileSystemEntity {
    public name: string;
    public extension: string;
    public size: number;
    public isDirectory: boolean;
    public children: FileSystemEntity[];

    constructor(isDirectory: boolean, name: string) {
        this.name = name;
        this.size = 0;
        this.isDirectory = isDirectory;
        this.extension ='';
        this.children = [];
    }
}

export class FSFile extends FileSystemEntity {

    constructor(name: string, size: number) {
        super(false, name);
        this.size = size;
        this.extension = this.extractExtension(name);
    }

    private extractExtension(name: string): string {
        const indexOfDot = name.lastIndexOf(".");
        return name.substring(indexOfDot + 1);
    }
}

export class Directory extends FileSystemEntity {

    constructor(name: string) {
        super(true, name);
        this.size = 0;
    }

    public addEntity(entity: FileSystemEntity) {
        this.children.push(entity);
    }
}

/* Filter Logic */

export interface IFilter {
    apply(fsEntity: FileSystemEntity): boolean;
}


export class NameFilter implements IFilter {

    private _name: string;

    constructor(filename: string) {
        this._name = filename
    }

    apply(fsEntity: FileSystemEntity): boolean {
        return fsEntity.name.includes(this._name);
    }
}


export class SizeFilter implements IFilter {

    private _sizeLimit: number;

    constructor(sizeLimit: number) {
        this._sizeLimit = sizeLimit
    }

    apply(fsEntity: FileSystemEntity): boolean {
        return fsEntity.size <= this._sizeLimit;
    }
}

export class ExtensionFilter implements IFilter {

    private _allowedExtension: string;

    constructor(ext: string) {
        this._allowedExtension = ext
    }

    apply(fsEntity: FileSystemEntity): boolean {
        return fsEntity.extension <= this._allowedExtension;
    }
}

/* Search Logic */

export class SearchCommand {

    public search(directory: FileSystemEntity, filters: IFilter[]): FileSystemEntity[] {

        if (!directory.isDirectory) {
            return [];
        }

        let filterResult: FileSystemEntity[] = [];

        directory.children.forEach((child: FileSystemEntity) => {
            if (child.isDirectory) {

                filterResult = [...filterResult, ...this.search(child, filters)];
            } else if(filters.every((filter) => filter.apply(child))) {
                filterResult.push(child);
            }

            
        })
        
        return filterResult;
    }
}