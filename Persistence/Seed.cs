using Domain;
using Microsoft.AspNetCore.Identity;
using System;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    UserName = "admin",
                    DisplayName = "Admin",
                    Email = "admin@skillbox.com",
                };
                var user2 = new AppUser
                {
                    UserName = "Unknown",
                    DisplayName = "Unknown",
                    Email = "Unknown@skillbox.com",
                };
                await userManager.CreateAsync(user, "Password1");
                await userManager.CreateAsync(user2, "Password1");

                var notes = new List<Note>
                {
                    new Note
                    {
                        FirstName = "Александр",
                        SecondName = "Петров",
                        ThridName = "Иванович",
                        PhoneNumber = "+79994443322",
                        Address = "Москва",
                        Description = "",
                        Creator = user,
                        IsImportant = true, 
                        CreationDate = DateTime.Now
                    },
                    new Note
                    {
                        FirstName = "Иван",
                        SecondName = "Александров",
                        ThridName = "Петрович",
                        PhoneNumber = "+79995554433",
                        Address = "Нижний Новгород",
                        Description = "",
                        Creator = user,
                        CreationDate = DateTime.Now.AddDays(4)
                    },
                    new Note
                    {
                        FirstName = "Пёрт",
                        SecondName = "Иванов",
                        ThridName = "Александрович",
                        PhoneNumber = "+79993332211",
                        Address = "Ярославль",
                        Description = "",
                        Creator = user,
                        CreationDate = DateTime.Now.AddDays(12)
                    },
                    new Note
                    {
                        FirstName = "Астап",
                        SecondName = "Бендер",
                        ThridName = "",
                        PhoneNumber = "+78888882211",
                        Address = "Кострома",
                        Description = "",
                        Creator = user2,
                        CreationDate = DateTime.Now.AddDays(1)
                    },
                    new Note
                    {
                        FirstName = "Карл",
                        SecondName = "Маркс",
                        ThridName = "",
                        PhoneNumber = "+66666666666",
                        Address = "Мир",
                        Description = "",
                        Creator = user2,
                        CreationDate = DateTime.Now.AddDays(1)
                    }
                };

                await context.Notes.AddRangeAsync(notes);
                await context.SaveChangesAsync();
            }
        }
    }
}
