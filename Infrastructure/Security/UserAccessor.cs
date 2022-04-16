using Application.interfaces;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace Infrastructure.Security
{
    public class UserAccessor : IUserAccessor
    {
        private readonly IHttpContextAccessor context;

        public UserAccessor(IHttpContextAccessor context)
        {
            this.context = context;
        }

        public string GetUsername() => context?.HttpContext?.User?.FindFirstValue(ClaimTypes.Name) ?? string.Empty;
    }
}