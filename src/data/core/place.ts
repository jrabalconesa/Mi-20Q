import type { Candidate } from '../../types/game'

export const coreCandidates: Candidate[] = [
  { id: 'beach', name: 'Playa', category: 'place', attributes: { natural:true, urban:false, famous:false, europe:false, coastal:true, mountain:false, desert:false, building:false, americas:false, asia:false } },
  { id: 'forest', name: 'Bosque', category: 'place', attributes: { natural:true, urban:false, famous:false, europe:false, coastal:false, mountain:false, desert:false, building:false, americas:false, asia:false } },
  { id: 'paris', name: 'París', category: 'place', attributes: { natural:false, urban:true, famous:true, europe:true, coastal:false, mountain:false, desert:false, building:false, americas:false, asia:false, ancientCity:false } },
  { id: 'rome', name: 'Roma', category: 'place', attributes: { natural:false, urban:true, famous:true, europe:true, coastal:false, mountain:false, desert:false, building:false, americas:false, asia:false, ancientCity:true } },
  { id: 'sahara', name: 'Desierto del Sáhara', category: 'place', attributes: { natural:true, urban:false, famous:true, europe:false, coastal:false, mountain:false, desert:true, building:false, americas:false, asia:false } },
  { id: 'everest', name: 'Monte Everest', category: 'place', attributes: { natural:true, urban:false, famous:true, europe:false, coastal:false, mountain:true, desert:false, building:false, americas:false, asia:true } },
  { id: 'new_york', name: 'Nueva York', category: 'place', attributes: { natural:false, urban:true, famous:true, europe:false, coastal:true, mountain:false, desert:false, building:false, americas:true, asia:false } },
  { id: 'machu_picchu', name: 'Machu Picchu', category: 'place', attributes: { natural:false, urban:false, famous:true, europe:false, coastal:false, mountain:true, desert:false, building:true, americas:true, asia:false } },
  { id: 'taj_mahal', name: 'Taj Mahal', category: 'place', attributes: { natural:false, urban:true, famous:true, europe:false, coastal:false, mountain:false, desert:false, building:true, americas:false, asia:true } },
  { id: 'grand_canyon', name: 'Gran Cañón', category: 'place', attributes: { natural:true, urban:false, famous:true, europe:false, coastal:false, mountain:false, desert:true, building:false, americas:true, asia:false } },
]
