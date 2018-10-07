namespace RRS_DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changeFieldName2 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.UserBookings", "Restaurant_Id", "dbo.Restaurants");
            DropForeignKey("dbo.UserBookings", "RestaurantTables_Id", "dbo.RestaurantTables");
            DropIndex("dbo.UserBookings", new[] { "Restaurant_Id" });
            DropIndex("dbo.UserBookings", new[] { "RestaurantTables_Id" });
            AddColumn("dbo.UserBookings", "RestaurantId", c => c.Int(nullable: false));
            AddColumn("dbo.UserBookings", "RestaurantTableId", c => c.Int(nullable: false));
            DropColumn("dbo.UserBookings", "Restaurant_Id");
            DropColumn("dbo.UserBookings", "RestaurantTables_Id");
        }
        
        public override void Down()
        {
            AddColumn("dbo.UserBookings", "RestaurantTables_Id", c => c.Int());
            AddColumn("dbo.UserBookings", "Restaurant_Id", c => c.Int());
            DropColumn("dbo.UserBookings", "RestaurantTableId");
            DropColumn("dbo.UserBookings", "RestaurantId");
            CreateIndex("dbo.UserBookings", "RestaurantTables_Id");
            CreateIndex("dbo.UserBookings", "Restaurant_Id");
            AddForeignKey("dbo.UserBookings", "RestaurantTables_Id", "dbo.RestaurantTables", "Id");
            AddForeignKey("dbo.UserBookings", "Restaurant_Id", "dbo.Restaurants", "Id");
        }
    }
}
