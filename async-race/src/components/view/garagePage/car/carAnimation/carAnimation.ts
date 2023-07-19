export default class CarAnimation {
  private readonly carElement: HTMLElement | null = null
  private animationTimeout: ReturnType<typeof setTimeout> | null
  private readonly speed: number = 0

  constructor (id: number, velocity?: number) {
    this.carElement = document.getElementById(`car-${id}`)
    this.animationTimeout = null
    if (velocity !== null && velocity !== undefined) {
      this.speed = Number((velocity / 36).toFixed(2))
    }
  }

  animateCar (speed: number = this.speed): void {
    if (this.carElement !== null) {
      this.carElement.classList.remove('animationDefault')
      this.carElement.classList.add('animateCar')
      this.carElement.style.animationDuration = `${speed}s`

      this.animationTimeout = setTimeout(() => {
        this.stopCarAnimation()
      }, speed * 1000)
    }
  }

  stopCarAnimation (): void {
    if (
      this.animationTimeout !== null &&
      this.carElement !== null
    ) {
      clearTimeout(this.animationTimeout)
      this.animationTimeout = null
    }
  }

  stopCarAfterEngineBroken (): void {
    if (
      this.animationTimeout !== null &&
        this.carElement !== null
    ) {
      this.carElement.classList.add('stop')
      clearTimeout(this.animationTimeout)
      this.animationTimeout = null
    }
  }

  resetCarPosition (): void {
    if (this.carElement !== null) {
      this.carElement.classList.add('animationDefault')
      this.carElement.classList.remove('animateCar')
    }
  }
}
