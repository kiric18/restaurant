namespace RRS_DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;

    public partial class addNewTable4 : DbMigration
    {
        public override void Up()
        {
            DropTable("dbo.RestaurantCuisines2");
        }

        public override void Down()
        {
            CreateTable(
                "dbo.RestaurantCuisines2",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CuisineId = c.Int(nullable: false),
                        DateAdded = c.DateTime(nullable: false),
                        DateModified = c.DateTime(nullable: false),
                        Restaurant_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id);

            CreateIndex("dbo.RestaurantCuisines2", "Restaurant_Id");
            CreateIndex("dbo.RestaurantCuisines2", "CuisineId");
            AddForeignKey("dbo.RestaurantCuisines2", "Restaurant_Id", "dbo.Restaurants", "Id");
            AddForeignKey("dbo.RestaurantCuisines2", "CuisineId", "dbo.Cuisines", "Id", cascadeDelete: true);
        }
    }
}
