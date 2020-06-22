export interface ActionQueues {
  [key: string]: { 
    chain: Promise<any>,
    lastAction: 'add' | 'update' | 'delete';
  }
}