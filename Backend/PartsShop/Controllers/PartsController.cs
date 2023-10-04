﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PartsShop.Data;
using PartsShop.Entities;

namespace PartsShop.Controllers
{
    [Route("parts")]
    [ApiController]
    public class PartsController : ControllerBase
    {
        private readonly DBContext DBContext;

        public PartsController(DBContext DBContext)
        {
            this.DBContext = DBContext;
        }

        [HttpGet("find-part")]
        public async Task<ActionResult<List<Part>>> FindPart([FromQuery] string searchData)
        {
            var keyWords = searchData.ToLower().Split();
            var result = new List<Part>();
            var manufatures = await DBContext.Manufactures.ToListAsync();
            var parts = await DBContext.Parts.ToListAsync();

            foreach (var keyWord in keyWords)
            {

                foreach (var part in parts)
                {
                    var isContains = part.VendorCode.ToLower().Contains(keyWord) || part.Name.ToLower().Contains(keyWord) || part.Manufacturer.Name.ToLower().Contains(keyWord);
                    if (isContains && !result.Contains(part))
                    {
                        result.Add(part);
                    }
                }
            }

            if (result.Count > 0)
            {
                return Ok(result);
            }

            return NotFound();
        }


        [HttpGet("part")]
        public async Task<ActionResult> GetPartById([FromQuery] int id)
        {
            var part = await DBContext.Parts.Where(part => part.Id == id).FirstOrDefaultAsync();
            var manufactures = await DBContext.Manufactures.ToListAsync();
            return Ok(part);
        }
    }
}
