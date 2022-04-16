using Application.Notes;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<NoteDto, Note>();
            CreateMap<Note, NoteDto>()
                .ForMember(d => d.Creator,
                       o => o.MapFrom(s => s.Creator.UserName));
        }
    }
}