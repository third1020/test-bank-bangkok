import { Item } from '../items/entities/item.entity';
import { v4 as uuidv4 } from 'uuid';

export let items: Item[] = [
  {
    id: uuidv4(),
    name: "Test Item 1",
    description: "Description for Test Item 1",
    createdAt: new Date('2025-08-30T10:30:00.000Z'),
  },
  {
    id: uuidv4(),
    name: "Test Item 2",
    description: "Description for Test Item 2",
    createdAt: new Date('2025-08-30T14:20:00.000Z'),
  },
];
