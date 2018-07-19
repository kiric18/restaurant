namespace RRS_DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changeRestaurant : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Restaurants", "RestaurantTables_Id", "dbo.RestaurantTables");
            DropIndex("dbo.Restaurants", new[] { "RestaurantTables_Id" });
            AddColumn("dbo.RestaurantTables", "Restaurant_Id", c => c.Int());
            CreateIndex("dbo.RestaurantTables", "Restaurant_Id");
            AddForeignKey("dbo.RestaurantTables", "Restaurant_Id", "dbo.Restaurants", "Id");
            DropColumn("dbo.Restaurants", "RestaurantTables_Id");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Restaurants", "RestaurantTables_Id", c => c.Int());
            DropForeignKey("dbo.RestaurantTables", "Restaurant_Id", "dbo.Restaurants");
            DropIndex("dbo.RestaurantTables", new[] { "Restaurant_Id" });
            DropColumn("dbo.RestaurantTables", "Restaurant_Id");
            CreateIndex("dbo.Restaurants", "RestaurantTables_Id");
            AddForeignKey("dbo.Restaurants", "RestaurantTables_Id", "dbo.RestaurantTables", "Id");
        }
    }
}
