interface College {
  UID: number;
  name: string;
  alias: string;
  city: string;
  state: string;
  website: string;
  appWebsite: string;
  longitude: number;
  latitude: number;
  standardizedTest: number;
  applicants: number;
  applicantsM: number;
  applicantsW: number;
  admitted: number;
  admittedM: number;
  admittedW: number;
  enrolledCycle: number;
  enrolledCycleM: number;
  enrolledCycleW: number;
  enrolled: number;
  enrolledM: number;
  enrolledW: number;
  SATPct: number;
  ACTPct: number;
  SATRW25: number;
  SATRW50: number;
  SATRW75: number;
  SATM25: number;
  SATM50: number;
  SATM75: number;
  ACT25: number;
  ACT50: number;
  ACT75: number;
  ACTE25: number;
  ACTE50: number;
  ACTE75: number;
  ACTM25: number;
  ACTM50: number;
  ACTM75: number;
  americanIndian: number;
  americanIndianM: number;
  americanIndianW: number;
  asian: number;
  asianM: number;
  asianW: number;
  black: number;
  blackM: number;
  blackW: number;
  hispanic: number;
  hispanicM: number;
  hispanicW: number;
  pacificIslander: number;
  pacificIslanderM: number;
  pacificIslanderW: number;
  white: number;
  whiteM: number;
  whiteW: number;
  multipleRaces: number;
  multipleRacesM: number;
  multipleRacesW: number;
  unknownRace: number;
  nonUS: number;
  nonUSM: number;
  nonUSW: number;
  unknownGender: number;
  enrolledGrad: number;
  enrolledGradM: number;
  enrolledGradW: number;
  nonUSGrad: number;
  nonUSGradM: number;
  nonUSGradW: number;
  revenuePublic: string;
  revenuePrivate: string;
  endowmentPerPublic: string;
  endowmentPerPrivate: string;
  instructionPerPublic: string;
  instructionPerPrivate: string;
  researchPerPublic: string;
  researchPerPrivate: string;
  imageUrl: string;
}

export type { College };
