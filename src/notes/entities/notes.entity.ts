import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { User } from 'src/auth/entities/users.entity';

import { NoteRepository } from '../repositories/notes.repository';

@Entity({ collection: 'notes', customRepository: () => NoteRepository })
export class Note {
  constructor(title: string, content: string, user: User) {
    this.title = title;
    this.content = content;
    this.user = user;
  }

  @PrimaryKey()
  note_id: number;

  @Property()
  title: string;

  @Property()
  content: string;

  @Property()
  created_at: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updated_at: Date = new Date();

  @ManyToOne({ fieldName: 'user_id' })
  user!: User;
}
