using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Notes
{
    public class Edit
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
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var note = await context.Notes.FindAsync(request.Note.Id);
                if (note == null) return null;
                mapper.Map(request.Note, note);

                if (!(await context.SaveChangesAsync(cancellationToken) > 0))
                    return Result<Unit>.Failure("Failed to edit note");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}