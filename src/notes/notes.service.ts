import { InjectRepository } from '@mikro-orm/nestjs';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/auth/entities/users.entity';

import { CreateNoteDto } from './dtos/createNote.dto';
import { UpdateNoteDto } from './dtos/updateNote.dto';
import { Note } from './entities/notes.entity';
import { NoteRepository } from './repositories/notes.repository';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: NoteRepository,
  ) {}

  async createNote(createNoteDto: CreateNoteDto, user: User) {
    const { content, title } = createNoteDto;
    const newNote = new Note(title, content, user);
    await this.noteRepository.createNewNote(newNote);
    return newNote;
  }

  async getNote(note_id: number, user: User) {
    const note = await this.noteRepository.getNote(note_id);
    this.noteExists(note);
    this.noteIsFromUser(note, user);
    return note;
  }

  private noteIsFromUser(note: Note, user: User) {
    if (note.user.user_id !== user.user_id) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'You are not authorized to manipulate this note',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    return true;
  }

  private noteExists(note: Note) {
    if (!note) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Note not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return true;
  }

  async getAllNotesOfUser(user: User) {
    return await this.noteRepository.getAllNotesOfUser(user);
  }

  async updateNote(note_id: number, updateNoteDto: UpdateNoteDto, user: User) {
    const { title, content } = updateNoteDto;
    const note = await this.noteRepository.getNote(note_id);
    this.noteExists(note);
    this.noteIsFromUser(note, user);
    const updatedNote = await this.noteRepository.updateNote(
      note,
      title,
      content,
    );
    return updatedNote;
  }

  async deleteNote(note_id: number, user: User) {
    const note = await this.noteRepository.getNote(note_id);
    this.noteExists(note);
    this.noteIsFromUser(note, user);
    await this.noteRepository.deleteNote(note);
    return note;
  }
}
