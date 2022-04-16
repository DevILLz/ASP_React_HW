using Domain;
using FluentValidation;

namespace Application.Notes
{
    public class NoteValidator : AbstractValidator<NoteDto>
    {
        public NoteValidator()
        {
            RuleFor(x => x.FirstName).NotEmpty();
            RuleFor(x => x.SecondName).NotEmpty();
            RuleFor(x => x.PhoneNumber).NotEmpty();
        }
    }
}