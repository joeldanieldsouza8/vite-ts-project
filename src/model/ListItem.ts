export interface Item {
  id: string;
  item: string;
  checked: boolean;
}

export default class ListItem implements Item {
  private _id: string = "";
  private _item: string = "";
  private _checked: boolean = false;

  constructor(id: string, item: string, checked: boolean) {
    this._id = id;
    this._item = item;
    this._checked = checked;
  }

  get id(): string {
    return this._id;
  }

  get item(): string {
    return this._item;
  }

  get checked(): boolean {
    return this._checked;
  }

  set id(value: string) {
    this._id = value;
  }

  set item(value: string) {
    this._item = value;
  }

  set checked(value: boolean) {
    this._checked = value;
  }
}
