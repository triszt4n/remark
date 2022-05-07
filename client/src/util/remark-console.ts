class RemarkConsole {
  log(...messages: any[]): void {
    const message = '%c[DEBUG] %c'.concat(messages.join(' '))
    console.debug(message, 'font-weight: 700; color: #bada55;', 'font-weigth: 400; color: #ff9524;')
  }
}

export const rconsole = new RemarkConsole()
