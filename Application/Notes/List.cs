using Application.Core;
using Application.interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Notes
{
    public class List
    {
        public class Query : IRequest<Result<List<NoteDto>>> { }
        public class Handler : IRequestHandler<Query, Result<List<NoteDto>>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                this.context = context;
                this.mapper = mapper;
            }
            public async Task<Result<List<NoteDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var notes = await context.Notes
                .ProjectTo<NoteDto>(mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

                return Result<List<NoteDto>>.Success(notes);
            }
        }
    }
}