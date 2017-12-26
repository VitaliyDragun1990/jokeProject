export class Joke {
  public hide: boolean;

  constructor(public setup: string, public punchline: string) {
    this.hide = true;
  }

  toggle() {
    this.hide = !this.hide;
  }
}
