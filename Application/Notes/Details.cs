using Application.Core;
using Application.interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Notes
{
    public class Details
    {
        public class Query : IRequest<Result<NoteDto>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<NoteDto>>
        {
            private DataContext context;
            private readonly IMapper mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<Result<NoteDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var act = await context.Notes
                .ProjectTo<NoteDto>(mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == request.Id);

                return Result<NoteDto>.Success(act);
            }
        }
    }
}