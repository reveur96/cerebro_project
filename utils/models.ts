export class CerebroApiError {
  public code: number
  public message: string

  public showDefaultAlert() {
    alert(`[${this.code}] ${this.message}`)
  }

  constructor(code: number, message: string) {
    this.code = code
    this.message = message
  }
}
