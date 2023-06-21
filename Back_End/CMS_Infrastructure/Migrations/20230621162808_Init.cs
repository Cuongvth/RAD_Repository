using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CMS_Infrastructure.Migrations
{
    public partial class Init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            _ = migrationBuilder.CreateTable(
                name: "Data",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Front = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    Back = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    _ = table.PrimaryKey("PK_Data", x => x.Id);
                });

            _ = migrationBuilder.CreateTable(
                name: "CitizenIdentification",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    No = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateOfBirth = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Sex = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Nationality = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateOfExpiry = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PlaceOfResidence = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PlaceOfOnigin = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PersonalIdentitication = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateSupply = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Vnm = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DataId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    _ = table.PrimaryKey("PK_CitizenIdentification", x => x.Id);
                    _ = table.ForeignKey(
                        name: "FK_CitizenIdentification_Data_DataId",
                        column: x => x.DataId,
                        principalTable: "Data",
                        principalColumn: "Id");
                });

            _ = migrationBuilder.CreateTable(
                name: "DrivingLicense",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    No = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateOfBirth = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Nationality = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Class = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    VehiclesAllowedToDrive = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BeginningDate = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateSupply = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DataId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    _ = table.PrimaryKey("PK_DrivingLicense", x => x.Id);
                    _ = table.ForeignKey(
                        name: "FK_DrivingLicense_Data_DataId",
                        column: x => x.DataId,
                        principalTable: "Data",
                        principalColumn: "Id");
                });

            _ = migrationBuilder.CreateIndex(
                name: "IX_CitizenIdentification_DataId",
                table: "CitizenIdentification",
                column: "DataId");

            _ = migrationBuilder.CreateIndex(
                name: "IX_DrivingLicense_DataId",
                table: "DrivingLicense",
                column: "DataId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            _ = migrationBuilder.DropTable(
                name: "CitizenIdentification");

            _ = migrationBuilder.DropTable(
                name: "DrivingLicense");

            _ = migrationBuilder.DropTable(
                name: "Data");
        }
    }
}
