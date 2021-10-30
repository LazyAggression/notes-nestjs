import { EntityRepository } from '@mikro-orm/knex';
import { User } from 'src/auth/entities/users.entity';

import { Note } from '../entities/notes.entity';

export class NoteRepository extends EntityRepository<Note> {
  async createNewNote(newNote: Note) {
    await this.persistAndFlush(newNote);
  }

  async getNote(note_id: number) {
    const note = await this.findOne({ note_id });
    return note;
  }

  async getAllNotesOfUser(user: User) {
    const notesOfUser = await this.find({ user });
    return notesOfUser;
  }

  async updateNote(note: Note, title: string, content: string) {
    note.title = title;
    note.content = content;
    await this.flush();
    return note;
  }

  async deleteNote(note: Note) {
    await this.removeAndFlush(note);
  }
}
