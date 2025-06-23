using Microsoft.AspNetCore.Mvc;

namespace PaletaCores.Controllers;

[ApiController]
[Route("[controller]")]
public class PaletaCoresController : ControllerBase
{
    private static readonly List<Dictionary<string, object>> Themes = new()
    {
        new Dictionary<string, object>
        {
            { "theme", "scarlet" },
            { "cores", new Dictionary<string, string>
                {
                    { "primaria", "#1A0004" },    //COR DO FUNDO ESQUERDO 
                    { "secundaria", "#7F0119" },  //COR DO FUNDO DIREITO 
                    { "extra", "#500010" }    //COR DAS LETRAS E SHADOWS
                }
            }
           
        },

        new Dictionary<string, object>
        {
            { "theme", "ocean" },
            { "cores", new Dictionary<string, string>
                {
                   { "primaria", "#26A69A" },
                    { "secundaria", "#4527A0" },
                    { "extra", "#030569" }
            }
            }

        },

        new Dictionary<string, object>
        {
            { "theme", "florest" },
            { "cores", new Dictionary<string, string>
                {
                    { "primaria", "#314633" },   
                    { "secundaria", "#72825C" },   
                    { "extra", "#19271D" }   
                }
            }

        },
        new Dictionary<string, object>
        {
            { "theme", "dark" },
            { "cores", new Dictionary<string, string>
                {
                    {"primaria", "#040D12" },    
                    { "secundaria", "#183D3D" },   
                    { "extra", "#5C8374" }    
                }
            }
            
        },
        new Dictionary<string, object>
        {
            { "theme", "veneno" },
            { "cores", new Dictionary<string, string>
                {
                    { "primaria", "#8E24AA" },
                    { "secundaria", "#4A148C" },
                    { "extra", "#7B1FA2" }
                }
            }
        },
        new Dictionary<string, object>
        {
            { "theme", "bege" }, 
            { "cores", new Dictionary<string, string>
                {
                    { "primaria", "#978871" },
                    { "secundaria", "#7D746B" },
                    { "extra", "#262626" }
                }
            }
        },
        new Dictionary<string, object>
        {
            { "theme", "summer" },
            { "cores", new Dictionary<string, string>
                {
                    { "primaria", "#86112E" },
                    { "secundaria", "#D44E19" },
                    { "extra", "#A12A26" }
                }
            }
        },
        new Dictionary<string, object>
        {
            { "theme", "jade" },
            { "cores", new Dictionary<string, string>
                {
                    { "primaria", "#0B2836" },
                    { "secundaria", "#469A80" },
                    { "extra", "#18666A" }
                }
            }
        },
        new Dictionary<string, object>
        {
            { "theme", "classic" },
            { "cores", new Dictionary<string, string>
                {
                    { "primaria", "#45717E" },
                    { "secundaria","#6B8B80" },
                    { "extra", "#21393B" }
                }
            }
        },
         new Dictionary<string, object>
        {
            { "theme", "coffee" },
            { "cores", new Dictionary<string, string>
                {
                    { "primaria", "#503C3C" },
                    { "secundaria", "#7E6363" },
                    { "extra", "#3E3232" }
                }
            }
        },
          new Dictionary<string, object>
        {
            { "theme", "barbie" },
            { "cores", new Dictionary<string, string>
                {
                    { "primaria", "#E91E63" },
                    { "secundaria", "#F06292" },
                    { "extra", "#AD1457" }
                }
            }
        },

          new Dictionary<string, object>
        {
            { "theme", "pastel" },
            { "cores", new Dictionary<string, string>
                {    
                { "primaria", "#9E99D1" },    
                { "secundaria", "#DBAAD7" },    
                { "extra", "#85BADA" }
            }

            }
        },

           new Dictionary<string, object>
        {
            { "theme", "twilight" },
            { "cores", new Dictionary<string, string>
                {
                    { "primaria", "#830B3B" },
                    { "secundaria", "#471E46" },
                    { "extra", "#29274C" }
                }
            }
        }

    };  

    [HttpGet(Name = "GetPaletaCores")]
    public IActionResult Get()
    {
        var randomTheme = Themes[Random.Shared.Next(Themes.Count)];
        return Ok(randomTheme);
    }


    // NOVO ENDPOINT - Busca paleta por nome
    [HttpGet("{nomePaleta}")]
    public IActionResult GetPorNome(string nomePaleta)
    {
        // Busca a paleta com nome correspondente (case insensitive)
        var paleta = Themes.FirstOrDefault(t =>
            t["theme"].ToString().Equals(nomePaleta, StringComparison.OrdinalIgnoreCase));

        if (paleta == null)
        {
            return NotFound($"Paleta '{nomePaleta}' não encontrada");
        }

        return Ok(paleta);
    }

}



