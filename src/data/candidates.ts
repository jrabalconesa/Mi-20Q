import type { Candidate } from '../types/game'

export const candidates: Candidate[] = [
  { id: 'elephant', name: 'Elefante', category: 'animal', attributes: { living:true, animal:true, domestic:false, large:true, flies:false, water:false, fourLegs:true, dangerous:true } },
  { id: 'dog', name: 'Perro', category: 'animal', attributes: { living:true, animal:true, domestic:true, large:false, flies:false, water:false, fourLegs:true, dangerous:false } },
  { id: 'cat', name: 'Gato', category: 'animal', attributes: { living:true, animal:true, domestic:true, large:false, flies:false, water:false, fourLegs:true, dangerous:false } },
  { id: 'dolphin', name: 'Delfín', category: 'animal', attributes: { living:true, animal:true, domestic:false, large:true, flies:false, water:true, fourLegs:false, dangerous:false } },
  { id: 'eagle', name: 'Águila', category: 'animal', attributes: { living:true, animal:true, domestic:false, large:false, flies:true, water:false, fourLegs:false, dangerous:true } },
  { id: 'shark', name: 'Tiburón', category: 'animal', attributes: { living:true, animal:true, domestic:false, large:true, flies:false, water:true, fourLegs:false, dangerous:true } },
  { id: 'horse', name: 'Caballo', category: 'animal', attributes: { living:true, animal:true, domestic:true, large:true, flies:false, water:false, fourLegs:true, dangerous:false } },
  { id: 'lion', name: 'León', category: 'animal', attributes: { living:true, animal:true, domestic:false, large:true, flies:false, water:false, fourLegs:true, dangerous:true } },

  { id: 'phone', name: 'Teléfono móvil', category: 'object', attributes: { living:false, usedDaily:true, electronic:true, portable:true, indoors:true, large:false } },
  { id: 'laptop', name: 'Ordenador portátil', category: 'object', attributes: { living:false, usedDaily:true, electronic:true, portable:true, indoors:true, large:false } },
  { id: 'chair', name: 'Silla', category: 'object', attributes: { living:false, usedDaily:true, electronic:false, portable:false, indoors:true, large:true } },
  { id: 'book', name: 'Libro', category: 'object', attributes: { living:false, usedDaily:true, electronic:false, portable:true, indoors:true, large:false } },
  { id: 'fridge', name: 'Frigorífico', category: 'object', attributes: { living:false, usedDaily:true, electronic:true, portable:false, indoors:true, large:true } },
  { id: 'umbrella', name: 'Paraguas', category: 'object', attributes: { living:false, usedDaily:false, electronic:false, portable:true, indoors:false, large:false } },

  { id: 'beach', name: 'Playa', category: 'place', attributes: { living:false, natural:true, urban:false, famous:false, europe:false } },
  { id: 'forest', name: 'Bosque', category: 'place', attributes: { living:false, natural:true, urban:false, famous:false, europe:false } },
  { id: 'paris', name: 'París', category: 'place', attributes: { living:false, natural:false, urban:true, famous:true, europe:true } },
  { id: 'rome', name: 'Roma', category: 'place', attributes: { living:false, natural:false, urban:true, famous:true, europe:true } },
  { id: 'sahara', name: 'Desierto del Sáhara', category: 'place', attributes: { living:false, natural:true, urban:false, famous:true, europe:false } },

  { id: 'einstein', name: 'Albert Einstein', category: 'person', attributes: { living:false, realPerson:true, historical:true, artist:false, sports:false, famous:true, europe:true } },
  { id: 'picasso', name: 'Pablo Picasso', category: 'person', attributes: { living:false, realPerson:true, historical:true, artist:true, sports:false, famous:true, europe:true } },
  { id: 'messi', name: 'Lionel Messi', category: 'person', attributes: { living:true, realPerson:true, historical:false, artist:false, sports:true, famous:true, europe:false } },
  { id: 'frida', name: 'Frida Kahlo', category: 'person', attributes: { living:false, realPerson:true, historical:true, artist:true, sports:false, famous:true, europe:false } },
  { id: 'shakespeare', name: 'William Shakespeare', category: 'person', attributes: { living:false, realPerson:true, historical:true, artist:true, sports:false, famous:true, europe:true } }
]
