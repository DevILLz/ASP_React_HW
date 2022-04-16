using Application.Notes;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;
public class NotesController : BaseAPIController
{
    [HttpGet]
    public async Task<IActionResult> Getnotes()
    {
        return HandleResult(await Mediator.Send(new List.Query()));
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> Getnote(Guid id)
    {
        return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
    }
    [HttpPost]
    public async Task<IActionResult> Createnote(NoteDto note)
    {
        return HandleResult(await Mediator.Send(new Create.Command {Note = note}));
    }
    [Authorize(Policy = "IsNoteHost")]
    [HttpPut("{id}")]
    public async Task<IActionResult> Editnote(Guid id, NoteDto note)
    {
        note.Id = id;
        return HandleResult(await Mediator.Send(new Edit.Command {Note = note}));
    }
    [Authorize(Policy = "IsNoteHost")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Deletenote(Guid id)
    {
        return HandleResult(await Mediator.Send(new Delete.Command {Id = id}));
    }

}
