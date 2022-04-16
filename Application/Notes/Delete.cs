using Application.Core;
using MediatR;
using Persistence;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Notes
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var note = await context.Notes.FindAsync(request.Id);
                context.Notes.Remove(note);

                if (!(await context.SaveChangesAsync(cancellationToken) > 0))
                    return Result<Unit>.Failure("Failed to delete note");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}