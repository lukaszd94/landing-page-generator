
export class PageComponent {
  public id?: number;
  public pageId: number;
  public type: string;
  public name: string;

  public htmlCode: string;
  public cssCode: string;
  public jsCode: string;

  public htmlVars: object;
  public cssVars: object;
  public jsVars: object;

  public createdAt: Date;
  public modifiedAt: Date;
  public isDeleted: boolean;

  constructor() {

  }
}


