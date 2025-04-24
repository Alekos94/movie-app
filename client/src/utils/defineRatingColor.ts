export function defineRatingColor(rating:number): string {
  if (rating<40) return 'red'
  if (rating<60) return 'orange'
  if(rating<80) return 'yellow'
  return 'green'
}