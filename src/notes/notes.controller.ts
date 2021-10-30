import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/getUser.decorator';
import { User } from 'src/auth/entities/users.entity';

import { CreateNoteDto } from './dtos/createNote.dto';
import { UpdateNoteDto } from './dtos/updateNote.dto';
import { NotesService } from './notes.service';

@UseGuards(AuthGuard())
@Controller({ version: '1', path: 'notes' })
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  async createNote(
    @Body() createNoteDto: CreateNoteDto,
    @GetUser() user: User,
  ) {
    const newNote = await this.notesService.createNote(createNoteDto, user);
    return newNote;
  }

  @Get()
  async getAllNotesOfUser(@GetUser() user: User) {
    const notes = await this.notesService.getAllNotesOfUser(user);
    return notes;
  }

  @Get('/:note_id')
  async getNote(@Param('note_id') note_id: number, @GetUser() user: User) {
    const notes = await this.notesService.getNote(note_id, user);
    return notes;
  }

  @Patch(':note_id')
  async updateNote(
    @Param('note_id') note_id: number,
    @Body() updateNoteDto: UpdateNoteDto,
    @GetUser() user: User,
  ) {
    const updatedNote = await this.notesService.updateNote(
      note_id,
      updateNoteDto,
      user,
    );
    return updatedNote;
  }

  @Delete('/:note_id')
  async deleteNote(@Param('note_id') note_id: number, @GetUser() user: User) {
    const deletedNote = await this.notesService.deleteNote(note_id, user);
    return deletedNote;
  }
}
