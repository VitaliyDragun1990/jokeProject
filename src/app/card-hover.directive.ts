import {Directive, ElementRef, HostBinding, HostListener, Input, Renderer2} from '@angular/core';


@Directive({
  selector: '[ccCardHover]'
})
export class CardHoverDirective {
  @HostBinding('class.card-outline-primary')
  private isHoovering: boolean;

  @Input('ccCardHover')
  config = {
    querySelector: '.card-text'
  };

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('mouseover')
  onHover() {
    const part = this.el.nativeElement.querySelector(this.config.querySelector);
    this.renderer.setStyle(part, 'display', 'block');
    this.isHoovering = true;
  }

  @HostListener('mouseout')
  onMouseOut() {
    const part = this.el.nativeElement.querySelector(this.config.querySelector);
    this.renderer.setStyle(part, 'display', 'none');
    this.isHoovering = false;
  }

}
