import type EventEmitter from 'events';

export default class CarAnimation {
  private readonly carElement: HTMLElement;

  private animationTimeout: ReturnType<typeof setTimeout> | null;

  private readonly speed: number = 0;

  emitter: EventEmitter;

  id: number;

  constructor(id: number, emitter: EventEmitter, velocity?: number, distance?: number) {
    this.carElement = document.getElementById(`car-${id}`) as HTMLElement;
    this.animationTimeout = null;
    this.emitter = emitter;
    this.id = id;

    if (velocity && distance) {
      this.speed = Number((distance / velocity / 1000).toFixed(2));
    }
  }

  animateCar(speed: number = this.speed): void {
    this.carElement.classList.remove('animationDefault');
    this.carElement.classList.add('animateCar');
    this.carElement.style.animationDuration = `${speed}s`;

    this.animationTimeout = setTimeout(() => {
      this.stopCarAnimation();
      this.emitter.emit('carAnimationEnds', this.id, speed);
    }, speed * 1000);
  }

  stopCarAnimation(): void {
    if (this.animationTimeout !== null) {
      clearTimeout(this.animationTimeout);
      this.animationTimeout = null;
    }
  }

  stopCarAfterEngineBroken(): void {
    if (this.animationTimeout !== null) {
      this.carElement.classList.add('stop');
      clearTimeout(this.animationTimeout);
      this.animationTimeout = null;
    }
  }

  resetCarPosition(): void {
    this.carElement.classList.add('animationDefault');
    this.carElement.classList.remove('animateCar');
    this.carElement.classList.remove('stop');
  }
}
