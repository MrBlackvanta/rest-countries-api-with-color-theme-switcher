using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RestCountriesApi.Migrations
{
    /// <inheritdoc />
    public partial class AddCountryDetailFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BorderCodes",
                table: "Countries",
                type: "TEXT",
                nullable: false,
                defaultValue: "[]");

            migrationBuilder.AddColumn<string>(
                name: "Currencies",
                table: "Countries",
                type: "TEXT",
                nullable: false,
                defaultValue: "[]");

            migrationBuilder.AddColumn<string>(
                name: "Languages",
                table: "Countries",
                type: "TEXT",
                nullable: false,
                defaultValue: "[]");

            migrationBuilder.AddColumn<string>(
                name: "NativeName",
                table: "Countries",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Subregion",
                table: "Countries",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TopLevelDomain",
                table: "Countries",
                type: "TEXT",
                nullable: false,
                defaultValue: "[]");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BorderCodes",
                table: "Countries");

            migrationBuilder.DropColumn(
                name: "Currencies",
                table: "Countries");

            migrationBuilder.DropColumn(
                name: "Languages",
                table: "Countries");

            migrationBuilder.DropColumn(
                name: "NativeName",
                table: "Countries");

            migrationBuilder.DropColumn(
                name: "Subregion",
                table: "Countries");

            migrationBuilder.DropColumn(
                name: "TopLevelDomain",
                table: "Countries");
        }
    }
}
