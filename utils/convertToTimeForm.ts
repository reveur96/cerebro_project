export const convertToTimeForm = (timeSlot: string, option: string) => {
  const formattedTime = timeSlot.slice(16, 21)
  const date = new Date(timeSlot)
  const weekdays = ['일', '월', '화', '수', '목', '금', '토']
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const dayOfWeek = weekdays[date.getDay()]
  const formattedDate = `${year}년 ${month}월 ${day}일 `
  const formattedDay = `${year}년 ${month}월 ${day}일 ${dayOfWeek}요일 `
  if (option === 'date') return [formattedDate, formattedTime]
  if (option === 'day') return [formattedDay, formattedTime]
}
