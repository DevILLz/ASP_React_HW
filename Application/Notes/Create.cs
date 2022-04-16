using Application.Core;
using Application.interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Notes
{
    public partial class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public NoteDto Note { get; set; }
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Note).SetValidator(new NoteValidator());
            }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;
            private readonly IUserAccessor userAccessor;
            private readonly IMapper mapper;

            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
            {
                this.context = context;
                this.userAccessor = userAccessor;
                this.mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await context.Users.FirstOrDefaultAsync(u => u.UserName == userAccessor.GetUsername());
                var note = mapper.Map<Note>(request.Note);
                note.Creator = user;
                context.Notes.Add(note);
                if (!(await context.SaveChangesAsync(cancellationToken) > 0))
                    return Result<Unit>.Failure("Failed to create note");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}