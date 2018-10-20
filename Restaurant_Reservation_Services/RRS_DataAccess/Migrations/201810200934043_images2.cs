namespace RRS_DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class images2 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.RestaurnatImages", "RestaurantTables_Id", "dbo.RestaurantTables");
            DropIndex("dbo.RestaurnatImages", new[] { "RestaurantTables_Id" });
            DropColumn("dbo.RestaurnatImages", "RestaurantTables_Id");
        }
        
        public override void Down()
        {
            AddColumn("dbo.RestaurnatImages", "RestaurantTables_Id", c => c.Int());
            CreateIndex("dbo.RestaurnatImages", "RestaurantTables_Id");
            AddForeignKey("dbo.RestaurnatImages", "RestaurantTables_Id", "dbo.RestaurantTables", "Id");
        }
    }
}
