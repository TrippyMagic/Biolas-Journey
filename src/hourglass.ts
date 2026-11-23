import { content } from './content'

const rome = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/Rome', year: 'numeric', month: 'numeric', day: 'numeric',
  hour: 'numeric', minute: 'numeric', second: 'numeric', hourCycle: 'h23',
})

function elapsed(now: Date) {
  const parts = Object.fromEntries(rome.formatToParts(now).map(part => [part.type, Number(part.value)]))
  const { year, month, day, hour, minute, second } = parts
  const [startYear, startMonth, startDay] = content.hourglass.start.split('-').map(Number)
  let months = (year - startYear) * 12 + month - startMonth
  function anniversary(offset: number) {
    const m = startMonth - 1 + offset
    const last = new Date(Date.UTC(startYear, m + 1, 0)).getUTCDate()
    return Date.UTC(startYear, m, Math.min(last, startDay))
  }
  const today = Date.UTC(year, month - 1, day)
  if (anniversary(months) > today) months--
  return [Math.floor(months / 12), months % 12, (today - anniversary(months)) / 86400000, hour, minute, second]
}

export function hourglassPanel(body: HTMLElement) {
  const title = document.createElement('h2')
  title.textContent = content.hourglass.title
  const clock = document.createElement('p')
  clock.setAttribute('role', 'timer')
  body.append(title, clock)
  function tick() {
    const values = elapsed(new Date())
    clock.textContent = content.hourglass.message.replace(/\{(\d)\}/g, (_, index) => String(values[Number(index)]))
  }
  tick()
  const timer = window.setInterval(() => {
    if (clock.isConnected) tick()
    else clearInterval(timer)
  }, 1000)
}
