using Application.Core;
using System.Net;
using System.Text.Json;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate next;
        private readonly IHostEnvironment env;
        private readonly ILogger<ExceptionMiddleware> logger;

        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
        {
            this.next = next;
            this.logger = logger;
            this.env = env;
        }
        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await next(context);
            }
            catch (System.Exception ex)
            {
                 logger.LogError(ex, ex.Message);
                 context.Response.ContentType = "application/json";
                 context.Response.StatusCode = (int) HttpStatusCode.InternalServerError;

                 var response = env.IsDevelopment()
                 ? new AppException(context.Response.StatusCode, ex.Message, ex.StackTrace?.ToString())
                 : new AppException(context.Response.StatusCode, ex.Message);

                 await context.Response.WriteAsync(
                     JsonSerializer.Serialize(response, 
                     new JsonSerializerOptions {PropertyNamingPolicy = JsonNamingPolicy.CamelCase}));
            }
        }
    }
}