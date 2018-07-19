namespace RRS_DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class restaurants : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.RestaurantManagers", "Restaurant_Id", "dbo.Restaurants");
            DropForeignKey("dbo.RestaurantTables", "Restaurant_Id", "dbo.Restaurants");
            DropIndex("dbo.RestaurantManagers", new[] { "Restaurant_Id" });
            DropIndex("dbo.RestaurantTables", new[] { "Restaurant_Id" });
            AddColumn("dbo.Restaurants", "RestaurantManager_Id", c => c.Int());
            AddColumn("dbo.Restaurants", "RestaurantTables_Id", c => c.Int());
            CreateIndex("dbo.Restaurants", "RestaurantManager_Id");
            CreateIndex("dbo.Restaurants", "RestaurantTables_Id");
            AddForeignKey("dbo.Restaurants", "RestaurantManager_Id", "dbo.RestaurantManagers", "Id");
            AddForeignKey("dbo.Restaurants", "RestaurantTables_Id", "dbo.RestaurantTables", "Id");
            DropColumn("dbo.RestaurantManagers", "Restaurant_Id");
            DropColumn("dbo.RestaurantTables", "Restaurant_Id");
        }
        
        public override void Down()
        {
            AddColumn("dbo.RestaurantTables", "Restaurant_Id", c => c.Int());
            AddColumn("dbo.RestaurantManagers", "Restaurant_Id", c => c.Int());
            DropForeignKey("dbo.Restaurants", "RestaurantTables_Id", "dbo.RestaurantTables");
            DropForeignKey("dbo.Restaurants", "RestaurantManager_Id", "dbo.RestaurantManagers");
            DropIndex("dbo.Restaurants", new[] { "RestaurantTables_Id" });
            DropIndex("dbo.Restaurants", new[] { "RestaurantManager_Id" });
            DropColumn("dbo.Restaurants", "RestaurantTables_Id");
            DropColumn("dbo.Restaurants", "RestaurantManager_Id");
            CreateIndex("dbo.RestaurantTables", "Restaurant_Id");
            CreateIndex("dbo.RestaurantManagers", "Restaurant_Id");
            AddForeignKey("dbo.RestaurantTables", "Restaurant_Id", "dbo.Restaurants", "Id");
            AddForeignKey("dbo.RestaurantManagers", "Restaurant_Id", "dbo.Restaurants", "Id");
        }
    }
}
