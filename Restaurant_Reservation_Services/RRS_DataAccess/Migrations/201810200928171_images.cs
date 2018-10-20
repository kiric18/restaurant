namespace RRS_DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class images : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.RestaurnatImages",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Image = c.String(),
                        DateAdded = c.DateTime(nullable: false),
                        DateModified = c.DateTime(nullable: false),
                        RestaurantTables_Id = c.Int(),
                        Restaurant_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.RestaurantTables", t => t.RestaurantTables_Id)
                .ForeignKey("dbo.Restaurants", t => t.Restaurant_Id)
                .Index(t => t.RestaurantTables_Id)
                .Index(t => t.Restaurant_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.RestaurnatImages", "Restaurant_Id", "dbo.Restaurants");
            DropForeignKey("dbo.RestaurnatImages", "RestaurantTables_Id", "dbo.RestaurantTables");
            DropIndex("dbo.RestaurnatImages", new[] { "Restaurant_Id" });
            DropIndex("dbo.RestaurnatImages", new[] { "RestaurantTables_Id" });
            DropTable("dbo.RestaurnatImages");
        }
    }
}
