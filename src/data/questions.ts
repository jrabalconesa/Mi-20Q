import type { Question } from '../types/game'

export const questions: Question[] = [
  { id: 'living', text: '¿Es un ser vivo?', attribute: 'living' },
  { id: 'animal', text: '¿Es un animal?', attribute: 'animal' },
  { id: 'domestic', text: '¿Suele ser doméstico?', attribute: 'domestic' },
  { id: 'large', text: '¿Es grande?', attribute: 'large' },
  { id: 'flies', text: '¿Puede volar?', attribute: 'flies' },
  { id: 'water', text: '¿Vive principalmente en el agua?', attribute: 'water' },
  { id: 'four_legs', text: '¿Tiene cuatro patas?', attribute: 'fourLegs' },
  { id: 'dangerous', text: '¿Puede resultar peligroso para una persona?', attribute: 'dangerous' },
  { id: 'used_daily', text: '¿Se usa habitualmente a diario?', attribute: 'usedDaily' },
  { id: 'electronic', text: '¿Es electrónico?', attribute: 'electronic' },
  { id: 'portable', text: '¿Se puede transportar fácilmente con una mano?', attribute: 'portable' },
  { id: 'indoors', text: '¿Se encuentra normalmente en interiores?', attribute: 'indoors' },
  { id: 'natural', text: '¿Es un lugar principalmente natural?', attribute: 'natural' },
  { id: 'urban', text: '¿Está relacionado con una ciudad?', attribute: 'urban' },
  { id: 'famous', text: '¿Es conocido internacionalmente?', attribute: 'famous' },
  { id: 'real_person', text: '¿Es una persona real?', attribute: 'realPerson' },
  { id: 'historical', text: '¿Es una figura histórica?', attribute: 'historical' },
  { id: 'artist', text: '¿Está relacionado con el arte o el entretenimiento?', attribute: 'artist' },
  { id: 'sports', text: '¿Está relacionado con el deporte?', attribute: 'sports' },
  { id: 'europe', text: '¿Está relacionado con Europa?', attribute: 'europe' }
]
