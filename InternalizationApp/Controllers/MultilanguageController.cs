using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InternalizationApp.Controllers;

[ApiController]
[Route("[controller]")]
public class MultilanguageController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    // Constructor üzerinden ApplicationDbContext'i dependency injection ile alıyoruz
    public MultilanguageController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET api/product
    [HttpGet("GetMultilanguage")]
    public async Task<ActionResult<IEnumerable<Dictionary>>> GetMultilanguage()
    {
        // Veritabanındaki tüm ürünleri alır
        var MLList = await _context.DICTIONARY_TABLE.ToListAsync();

        return Ok(MLList); // HTTP 200 ile döner
    }
}
