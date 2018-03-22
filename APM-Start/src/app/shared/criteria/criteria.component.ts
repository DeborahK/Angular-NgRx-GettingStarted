import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit {
  @Input()
  set defaultListFilter(value: string) {
    this.listFilter = value;
  }
  @Output() valueChange: EventEmitter<string> =
                          new EventEmitter<string>();

  private _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.valueChange.emit(value);
  }

  constructor() { }

  ngOnInit() {
  }

}
