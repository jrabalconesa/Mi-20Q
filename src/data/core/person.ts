import type { Candidate } from '../../types/game'

export const coreCandidates: Candidate[] = [
  { id: 'einstein', name: 'Albert Einstein', category: 'person', attributes: { realPerson:true, living:false, historical:true, artist:false, sports:false, scientist:true, politician:false, writer:false, woman:false, europe:true, bornBefore1900:true } },
  { id: 'picasso', name: 'Pablo Picasso', category: 'person', attributes: { realPerson:true, living:false, historical:true, artist:true, sports:false, scientist:false, politician:false, writer:false, woman:false, europe:true, bornBefore1900:true } },
  { id: 'messi', name: 'Lionel Messi', category: 'person', attributes: { realPerson:true, living:true, historical:false, artist:false, sports:true, scientist:false, politician:false, writer:false, woman:false, europe:false, bornBefore1900:false } },
  { id: 'frida', name: 'Frida Kahlo', category: 'person', attributes: { realPerson:true, living:false, historical:true, artist:true, sports:false, scientist:false, politician:false, writer:false, woman:true, europe:false, bornBefore1900:true } },
  { id: 'shakespeare', name: 'William Shakespeare', category: 'person', attributes: { realPerson:true, living:false, historical:true, artist:true, sports:false, scientist:false, politician:false, writer:true, woman:false, europe:true, bornBefore1900:true } },
  { id: 'curie', name: 'Marie Curie', category: 'person', attributes: { realPerson:true, living:false, historical:true, artist:false, sports:false, scientist:true, politician:false, writer:false, woman:true, europe:true, bornBefore1900:true } },
  { id: 'mandela', name: 'Nelson Mandela', category: 'person', attributes: { realPerson:true, living:false, historical:true, artist:false, sports:false, scientist:false, politician:true, writer:false, woman:false, europe:false, bornBefore1900:true } },
  { id: 'serena', name: 'Serena Williams', category: 'person', attributes: { realPerson:true, living:true, historical:false, artist:false, sports:true, scientist:false, politician:false, writer:false, woman:true, europe:false, bornBefore1900:false } },
  { id: 'rowling', name: 'J. K. Rowling', category: 'person', attributes: { realPerson:true, living:true, historical:false, artist:true, sports:false, scientist:false, politician:false, writer:true, woman:true, europe:true, bornBefore1900:false } },
  { id: 'cleopatra', name: 'Cleopatra', category: 'person', attributes: { realPerson:true, living:false, historical:true, artist:false, sports:false, scientist:false, politician:true, writer:false, woman:true, europe:false, bornBefore1900:true } }
]
