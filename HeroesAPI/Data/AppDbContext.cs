using Microsoft.EntityFrameworkCore;
using HeroesAPI.Models;

namespace HeroesAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Heroi> Herois { get; set; }
        public DbSet<Superpoder> Superpoderes { get; set; }
        public DbSet<HeroiSuperpoder> HeroisSuperpoderes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // chave composta da tabela de relacionamento
            modelBuilder.Entity<HeroiSuperpoder>()
                .HasKey(hs => new { hs.HeroiId, hs.SuperpoderId });

            // Heroi -> HeroiSuperpoder
            modelBuilder.Entity<HeroiSuperpoder>()
                .HasOne(hs => hs.Heroi)
                .WithMany(h => h.HeroisSuperpoderes)
                .HasForeignKey(hs => hs.HeroiId)
                .OnDelete(DeleteBehavior.Cascade);

            // Superpoder -> HeroiSuperpoder
            modelBuilder.Entity<HeroiSuperpoder>()
                .HasOne(hs => hs.SuperpoderObj)
                .WithMany(s => s.HeroisSuperpoderes)
                .HasForeignKey(hs => hs.SuperpoderId)
                .OnDelete(DeleteBehavior.Cascade);

            // NomeHeroi único
            modelBuilder.Entity<Heroi>()
                .HasIndex(h => h.NomeHeroi)
                .IsUnique();

            modelBuilder.Entity<Superpoder>().HasData(
                new Superpoder { Id = 1, SuperpoderNome = "Super Força", Descricao = "Força sobre-humana" },
                new Superpoder { Id = 2, SuperpoderNome = "Voo", Descricao = "Capacidade de voar" },
                new Superpoder { Id = 3, SuperpoderNome = "Invisibilidade", Descricao = "Tornar-se invisível" },
                new Superpoder { Id = 4, SuperpoderNome = "Velocidade", Descricao = "Super velocidade" },
                new Superpoder { Id = 5, SuperpoderNome = "Telepatia", Descricao = "Ler e controlar mentes" },
                new Superpoder { Id = 6, SuperpoderNome = "Regeneração", Descricao = "Cura acelerada" },
                new Superpoder { Id = 7, SuperpoderNome = "Visão Raio-X", Descricao = "Ver através de objetos" },
                new Superpoder { Id = 8, SuperpoderNome = "Telecinese", Descricao = "Mover objetos com a mente" }
            );
        }
    }
}