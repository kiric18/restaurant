namespace RRS_DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class images6 : DbMigration
    {
        public override void Up()
        {
            RenameTable(name: "dbo.RestaurnatImages", newName: "RestaurantImages");
            CreateIndex("dbo.RestaurantImages", "RestaurantId");
            AddForeignKey("dbo.RestaurantImages", "RestaurantId", "dbo.Restaurants", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.RestaurantImages", "RestaurantId", "dbo.Restaurants");
            DropIndex("dbo.RestaurantImages", new[] { "RestaurantId" });
            RenameTable(name: "dbo.RestaurantImages", newName: "RestaurnatImages");
        }
    }
}
