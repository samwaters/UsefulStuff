import {Component, Input, HostBinding, OnInit} from '@angular/core';
import * as classNames from 'classnames';
const styles = require('./grid.component.scss');

@Component({
  selector: 'app-grid-row',
  template: '<ng-content></ng-content>',
  styleUrls: ['./grid.component.scss']
})
export class GridRowComponent {
  @HostBinding('className') cN = 'row';

  constructor() { }
}

@Component({
  selector: 'app-grid-col',
  template: '<ng-content></ng-content>',
  styleUrls: ['./grid.component.scss']
})
export class GridColComponent implements OnInit {
  @Input()
  public xs:number = 0;
  @Input()
  public xsOffset:number = 0;
  @Input()
  public sm:number = 0;
  @Input()
  public smOffset:number = 0;
  @Input()
  public md:number = 0;
  @Input()
  public mdOffset:number = 0;
  @Input()
  public lg:number = 0;
  @Input()
  public lgOffset:number = 0;
  @Input()
  public xl:number = 0;
  @Input()
  public xlOffset:number = 0;
  @HostBinding('className') calculatedClassName = '';

  constructor() { }

  public ngOnInit() {
    this.getColClass();
    console.log(styles);
  }

  public getColClass():void {
    let classObj = {col: true};
    if(this.xs > 0) {
      classObj['xs-' + this.xs] = true;
    }
    if(this.xsOffset > 0) {
      classObj['xs-offset-' + this.xsOffset] = true;
    }
    if(this.sm > 0) {
      classObj['sm-' + this.sm] = true;
    }
    if(this.smOffset > 0) {
      classObj['sm-offset-' + this.smOffset] = true;
    }
    if(this.md > 0) {
      classObj['md-' + this.md] = true;
    }
    if(this.mdOffset > 0) {
      classObj['md-offset-' + this.mdOffset] = true;
    }
    if(this.lg > 0) {
      classObj['lg-' + this.lg] = true;
    }
    if(this.lgOffset > 0) {
      classObj['lg-offset-' + this.lgOffset] = true;
    }
    if(this.xl > 0) {
      classObj['xl-' + this.xl] = true;
    }
    if(this.xlOffset > 0) {
      classObj['xl-offset-' + this.xlOffset] = true;
    }
    this.calculatedClassName = classNames(classObj);
  }
}


