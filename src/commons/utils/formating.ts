export const convertTime = (totalMinutes: number): string => {
    const hours = Math.floor(totalMinutes / 60)
    const minute = totalMinutes % 60

    return `${hours} jam ${minute} menit`
}