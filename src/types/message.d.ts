export interface Message {
  text: string
  role: 'user' | 'assistant'
  contextId: string
  timestamp: Date
  metadata?: Metadata
}

interface Metadata {
  type: string
  data: Data
}

interface Data {
  vegetarian: boolean
  vegan: boolean
  glutenFree: boolean
  dairyFree: boolean
  veryHealthy: boolean
  cheap: boolean
  veryPopular: boolean
  sustainable: boolean
  lowFodmap: boolean
  weightWatcherSmartPoints: number
  gaps: string
  preparationMinutes: null
  cookingMinutes: null
  aggregateLikes: number
  healthScore: number
  creditsText: string
  sourceName: string
  pricePerServing: number
  extendedIngredients: ExtendedIngredient[]
  id: number
  title: string
  readyInMinutes: number
  servings: number
  sourceUrl: string
  image: string
  imageType: string
  summary: string
  cuisines: any[]
  dishTypes: string[]
  diets: string[]
  occasions: any[]
  instructions: string
  analyzedInstructions: AnalyzedInstruction[]
  originalId: null
  spoonacularScore: number
  spoonacularSourceUrl: string
}

interface AnalyzedInstruction {
  name: string
  steps: Step[]
}

interface Step {
  number: number
  step: string
  ingredients: Ent[]
  equipment: Ent[]
  length?: Length
}

interface Ent {
  id: number
  name: string
  localizedName: string
  image: string
}

interface Length {
  number: number
  unit: string
}

interface ExtendedIngredient {
  id: number
  aisle: string
  image: string
  consistency: string
  name: string
  nameClean: string
  original: string
  originalName: string
  amount: number
  unit: string
  meta: string[]
  measures: Measures
}

interface Measures {
  us: Metric
  metric: Metric
}

interface Metric {
  amount: number
  unitShort: string
  unitLong: string
}
