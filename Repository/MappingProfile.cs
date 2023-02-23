using AutoMapper;
using Repository.Data.Dtos;

namespace Repository
{
    /// <summary>
    /// Provides configuration for mappings between entities and dtos
    /// </summary>
    public class MappingProfile : Profile
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="MappingProfile"/> class.
        /// </summary>
        public MappingProfile()
        {
            // Source, Destination
            CreateMap<Data.Entities.AccessToken, AccessToken>();
        }
    }
}