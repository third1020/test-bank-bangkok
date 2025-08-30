import { Injectable, ConflictException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from './entities/item.entity';
import { items } from '../database/items.db';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ItemsService {
  private checkDuplicateId(id: string): boolean {
    for (let i = 0; i < items.length; i++) {
      if (items[i].id === id) {
        return true;
      }
    }
    return false;
  }

  create(createItemDto: CreateItemDto): Item {
    const newId = uuidv4();
    
    if (this.checkDuplicateId(newId)) {
      throw new ConflictException('Generated ID already exists');
    }

    const newItem: Item = {
      id: newId,
      name: createItemDto.name,
      description: createItemDto.description,
      createdAt: new Date(),
    };

    items.push(newItem);
    return newItem;
  }

  findAll(): Item[] { 
    return [...items];
  }
}
