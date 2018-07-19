namespace RRS_DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class newTableTest : DbMigration
    {
        public override void Up()
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
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Cuisines", t => t.CuisineId, cascadeDelete: true)
                .ForeignKey("dbo.Restaurants", t => t.Restaurant_Id)
                .Index(t => t.CuisineId)
                .Index(t => t.Restaurant_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.RestaurantCuisines2", "Restaurant_Id", "dbo.Restaurants");
            DropForeignKey("dbo.RestaurantCuisines2", "CuisineId", "dbo.Cuisines");
            DropIndex("dbo.RestaurantCuisines2", new[] { "Restaurant_Id" });
            DropIndex("dbo.RestaurantCuisines2", new[] { "CuisineId" });
            DropTable("dbo.RestaurantCuisines2");
        }
    }
}
