export class LocalStorage {
  private localStorage:any;

  constructor() {
    if (!localStorage) throw new Error('Current browser does not support Local Storage');
    this.localStorage = localStorage;
  }

  public set(key:string, value:string):void {
    this.localStorage[key] = value;
  }

  public get(key:string):string {
    return this.localStorage[key] || undefined;
  }

  public setObject(key:string, value:any):void {
    this.localStorage[key] = JSON.stringify(value);
  }

  public getObject(key:string):any {
    var vl = localStorage[key];
    if(vl === undefined) return undefined;
    return JSON.parse(vl);
  }

  public remove(key:string):any {
    this.localStorage.removeItem(key);
  }
}
