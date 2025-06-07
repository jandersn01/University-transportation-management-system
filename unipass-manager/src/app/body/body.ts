import { NgClass } from '@angular/common';
import { Component, Input} from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [RouterOutlet,NgClass],
  templateUrl: './body.html',
  styleUrl: './body.css'
})
export class Body {
  @Input() collapsed = false;
  @Input() screenWidth = 0;


  getBodyClass(): string{
    let styleClass = '';
    if(this.collapsed && this.screenWidth > 768){
      styleClass = 'body-trimmed';
    } else if(this.collapsed && this.screenWidth < 768 && this.screenWidth > 0 ){
      styleClass = 'body-md-screen';
    }
    return styleClass;
  }

}
