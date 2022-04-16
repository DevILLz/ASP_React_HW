namespace Domain;
public class Note
{
    public Guid Id { get; set; }
    public string FirstName { get; set; }
    public string SecondName { get; set; }
    public string ThridName { get; set; }
    public string PhoneNumber { get; set; }
    public string Address { get; set; }
    public string Description { get; set; }
    public bool IsImportant { get; set; }
    public DateTime CreationDate { get; set; }
    public AppUser Creator { get; set; }
}
