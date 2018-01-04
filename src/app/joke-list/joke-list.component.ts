import {
  AfterContentInit, AfterViewInit, Component, ContentChild, ElementRef, OnInit, QueryList, ViewChild,
  ViewChildren
} from '@angular/core';
import {Joke} from '../joke';
import {JokeComponent} from '../joke/joke.component';

@Component({
  selector: 'app-joke-list',
  templateUrl: './joke-list.component.html',
  styleUrls: ['./joke-list.component.css']
})
export class JokeListComponent implements OnInit, AfterViewInit, AfterContentInit {
  @ViewChild(JokeComponent) jokeViewChild: JokeComponent;
  @ViewChildren(JokeComponent) jokeViewChildren: QueryList<JokeComponent>;
  @ViewChild('header') headerEl: ElementRef;

  @ContentChild(JokeComponent) jokeContentChild: JokeComponent;

  jokes: Joke[] = [
    new Joke('What did the cheese say when it hell in the crap?', 'Hello-me (crap hell)'),
    new Joke('What kind of cheese do you use to disguise a small horse?', 'Mask-a-pony (Mascarpone)'),
    new Joke('A kid threw a lump of cheddar at me', 'I thought ‘That’s not very mature’'),
  ];


  constructor() {
    console.log(`new - jokeViewChild is ${this.jokeViewChild}`);
  }

  ngOnInit() {
  }

  ngAfterContentInit() {
    console.log(`ngAfterContentInit - jokeContentChild is ${this.jokeContentChild}`);
  }

  ngAfterViewInit() {
    console.log(`ngAfterViewInit - jokeViewChild is ${this.jokeViewChild}`);

    const jokes: JokeComponent[] = this.jokeViewChildren.toArray();
    console.log(jokes);

    console.log(`ngAfterViewInit - headerEl is ${this.headerEl}`);
    //noinspection TypeScriptunresolvedVariable
    this.headerEl.nativeElement.textContent = 'Best Joke Machine';
  }
}
