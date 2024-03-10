// When implementing a cell for C# let's say
// something like 'javascript' | 'text' | 'cs' can be used
export type CellTypes = 'code' | 'text';
export interface Cell {
  id: string;
  type: CellTypes;
  content: string;
}
