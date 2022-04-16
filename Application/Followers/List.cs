using Application.Core;
using Application.interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Followers
{
    public class List
    {
        public class Query : IRequest<Result<List<Profiles.Profile>>>
        {
            public string Predicate { get; set; }
            public string UserName { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<List<Profiles.Profile>>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            private readonly IUserAccessor userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                this.userAccessor = userAccessor;
                this.context = context;
                this.mapper = mapper;
            }
            public async Task<Result<List<Profiles.Profile>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var profiles = request.Predicate switch
                {
                    "followers" => await context.UserFollowings
                            .Where(x => x.Target.UserName == request.UserName)
                            .Select(u => u.Observer)
                            .ProjectTo<Profiles.Profile>(mapper.ConfigurationProvider, new {currentUserName = userAccessor.GetUsername()})
                            .ToListAsync(),

                    "following" => await context.UserFollowings
                        .Where(x => x.Observer.UserName == request.UserName)
                        .Select(u => u.Target)
                        .ProjectTo<Profiles.Profile>(mapper.ConfigurationProvider, new {currentUserName = userAccessor.GetUsername()})
                        .ToListAsync(),

                    _ => new List<Profiles.Profile>()
                };
                return Result<List<Profiles.Profile>>.Success(profiles);
            }
        }
    }
}