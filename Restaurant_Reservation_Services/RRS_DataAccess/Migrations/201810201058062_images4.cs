namespace RRS_DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class images4 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.RestaurnatImages", "Restaurant_Id", "dbo.Restaurants");
            DropIndex("dbo.RestaurnatImages", new[] { "Restaurant_Id" });
            AddColumn("dbo.RestaurnatImages", "RestaurantId", c => c.Int(nullable: false));
            DropColumn("dbo.RestaurnatImages", "Restaurant_Id");
        }
        
        public override void Down()
        {
            AddColumn("dbo.RestaurnatImages", "Restaurant_Id", c => c.Int());
            DropColumn("dbo.RestaurnatImages", "RestaurantId");
            CreateIndex("dbo.RestaurnatImages", "Restaurant_Id");
            AddForeignKey("dbo.RestaurnatImages", "Restaurant_Id", "dbo.Restaurants", "Id");
        }
    }
}
